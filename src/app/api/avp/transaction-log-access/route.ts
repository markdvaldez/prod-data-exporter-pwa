import { AuthPermissions, PersonResponse } from "@/Types/global-types";
import {
  TransactionLogAccessContext,
  TransactionLogAccessRequest,
} from "@/Types/verified-permissions";
import { guardApi } from "@/services/aws/guardApi";
import {
  checkAuthorization,
  debugLog,
} from "@/services/aws/verifiedPermissions";
import { NextRequest, NextResponse } from "next/server";

// Import AWS SDK for credential validation
import { STSClient, GetCallerIdentityCommand } from "@aws-sdk/client-sts";
import { VerifiedPermissionsClient, GetPolicyStoreCommand } from "@aws-sdk/client-verifiedpermissions";

// Remove edge runtime to allow access to AWS IAM roles
// export const runtime = "edge";

/**
 * Test if we can access AWS metadata service and get IAM role info
 */
async function testMetadataService(): Promise<{ accessible: boolean; role?: string; error?: string }> {
  try {
    // Try to get IAM role from metadata service
    const response = await fetch('http://169.254.169.254/latest/meta-data/iam/security-credentials/', {
      method: 'GET',
      headers: {
        'Accept': 'text/plain'
      },
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });
    
    if (response.ok) {
      const roleName = await response.text();
      debugLog('Metadata service accessible', { roleName: roleName.trim() });
      return { accessible: true, role: roleName.trim() };
    } else {
      return { accessible: false, error: `HTTP ${response.status}` };
    }
  } catch (error) {
    return { 
      accessible: false, 
      error: error instanceof Error ? error.message : 'Unknown metadata service error' 
    };
  }
}

/**
 * Validate AWS credentials by making a test call to STS GetCallerIdentity
 * Note: Only used in development mode. In production, we use IAM service roles on Elastic Beanstalk.
 */
async function validateAWSCredentials(): Promise<{ valid: boolean; error?: string; identity?: any }> {
  try {
    const stsClient = new STSClient({
      region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
      },
    });

    const command = new GetCallerIdentityCommand({});
    const response = await stsClient.send(command);
    
    debugLog("STS GetCallerIdentity successful", {
      userId: response.UserId,
      account: response.Account,
      arn: response.Arn
    });

    return {
      valid: true,
      identity: {
        userId: response.UserId,
        account: response.Account,
        arn: response.Arn
      }
    };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Unknown AWS credential error'
    };
  }
}

/**
 * Validate AWS Verified Permissions policy store access
 */
async function validateAVPPolicyStore(): Promise<{ valid: boolean; error?: string; policyStore?: any }> {
  try {
    const configuration = process.env.NEXT_PUBLIC_CONFIGURATION || process.env.CONFIGURATION || 'development';
    
    debugLog('validateAVPPolicyStore - Configuration Check', {
      configuration,
      willUseCredentials: configuration === 'development',
      hasAccessKeyId: !!process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      hasSecretAccessKey: !!process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
      region: process.env.NEXT_PUBLIC_AWS_REGION,
      policyStoreId: process.env.NEXT_PUBLIC_AVP_POLICY_STORE_ID?.substring(0, 8) + '...'
    });
    
    let avpClient: VerifiedPermissionsClient;
    
    if (configuration === 'development') {
      // Development: Use access keys (but only if they exist)
      const hasCredentials = !!(process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID && process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY);
      
      if (!hasCredentials) {
        debugLog('Development mode detected but no credentials available - falling back to service role');
        avpClient = new VerifiedPermissionsClient({
          region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1'
          // No credentials needed - uses IAM role
        });
      } else {
        debugLog('Creating AVP client with access keys');
        avpClient = new VerifiedPermissionsClient({
          region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
          credentials: {
            accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
          },
        });
      }
    } else {
      // Production/QA/Staging: Use IAM service role
      debugLog('Creating AVP client with service role');
      avpClient = new VerifiedPermissionsClient({
        region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1'
        // No credentials needed - uses IAM role
      });
    }

    const policyStoreId = process.env.NEXT_PUBLIC_AVP_POLICY_STORE_ID!;
    
    debugLog('Calling GetPolicyStoreCommand', {
      policyStoreId: policyStoreId.substring(0, 8) + '...',
      region: process.env.NEXT_PUBLIC_AWS_REGION
    });
    
    const command = new GetPolicyStoreCommand({
      policyStoreId: policyStoreId
    });
    
    const response = await avpClient.send(command);
    
    debugLog("AVP Policy Store access successful", {
      policyStoreId: response.policyStoreId,
      createdDate: response.createdDate,
      lastUpdatedDate: response.lastUpdatedDate
    });

    return {
      valid: true,
      policyStore: {
        policyStoreId: response.policyStoreId,
        createdDate: response.createdDate,
        lastUpdatedDate: response.lastUpdatedDate
      }
    };
  } catch (error) {
    debugLog("AVP Policy Store validation failed", error);
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Unknown AVP policy store error'
    };
  }
}

/**
 * POST /api/avp/transaction-log-access
 * Checks if a user has permission to access transaction logs based on HisaStaff/HelpDesk security groups
 */
export async function POST(request: Request) {
  try {
    // AWS connectivity validation - only in development configuration
    // In production, QA, and staging, we use IAM service roles on Elastic Beanstalk
    const configuration = process.env.NEXT_PUBLIC_CONFIGURATION || process.env.CONFIGURATION || 'development';
    
    debugLog('AVP API Configuration', {
      configuration,
      NEXT_PUBLIC_CONFIGURATION: process.env.NEXT_PUBLIC_CONFIGURATION,
      CONFIGURATION: process.env.CONFIGURATION,
      NODE_ENV: process.env.NODE_ENV,
      useCredentials: configuration === 'development'
    });
    
    let credentialValidation: { valid: boolean; error?: string; identity?: any } = { valid: true };
    
    if (configuration === 'development') {
      const hasCredentials = !!(process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID && process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY);
      
      if (!hasCredentials) {
        debugLog('Development mode detected but no credentials available - marking as valid (will use service role)');
        credentialValidation = { valid: true };
      } else {
        credentialValidation = await validateAWSCredentials();
        if (!credentialValidation.valid) {
          return NextResponse.json({
            decision: 'DENY',
            errors: [{
              errorDescription: `AWS credential validation failed: ${credentialValidation.error}`
            }],
            awsConnectivity: {
              credentials: 'INVALID',
              error: credentialValidation.error
            }
          }, { status: 200 });
        }
      }
    }

    const policyStoreValidation = await validateAVPPolicyStore();
    if (!policyStoreValidation.valid) {
      return NextResponse.json({
        decision: 'DENY',
        errors: [{
          errorDescription: `AVP Policy Store validation failed: ${policyStoreValidation.error}`
        }],
        awsConnectivity: {
          credentials: (configuration === 'development' && !!(process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID && process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY)) ? 'VALID' : 'SERVICE_ROLE',
          identity: credentialValidation.identity,
          policyStore: 'INVALID',
          error: policyStoreValidation.error
        }
      }, { status: 200 });
    }
    
    // Parse the request body
    const body: TransactionLogAccessRequest = await request.json();
    debugLog("Request body parsed", {
      userId: body.userId,
      logsId: body.logsId,
      action: body.action,
      hasContext: !!body.context
    });
    
    const {
      userId,
      logsId = "system-check",
      action = "view",
      context = {},
    } = body;

    // Validate required fields
    if (!userId) {
      debugLog("Missing userId in request");
      return NextResponse.json(
        {
          error: "Bad Request",
          message: "Missing required field: userId",
        },
        { status: 400 }
      );
    }

    // Get user permissions and data from request context
    const userPermissions = context.userPermissions as
      | AuthPermissions
      | undefined;
    const userData = context.userData as PersonResponse | undefined;

    debugLog("Context extracted", {
      hasUserPermissions: !!userPermissions,
      hasUserData: !!userData,
      authGroups: userPermissions?.generalAuthGroups
    });

    // Prepare the authorization context for AWS Verified Permissions
    const authContext: TransactionLogAccessContext = {
      timestamp: new Date().toISOString(),
      requestSource: "transaction-log-access-api",
      authenticatedPersonId: userId,
      securityGroups: userPermissions?.generalAuthGroups || [],
      generalAuthGroups: userPermissions?.generalAuthGroups || [],
      auditLogged: true,
      userPermissions: userPermissions,
      userData: userData,
      ...context,
    };

    debugLog("Authorization context prepared", {
      timestamp: authContext.timestamp,
      requestSource: authContext.requestSource,
      securityGroups: authContext.securityGroups,
      generalAuthGroups: authContext.generalAuthGroups
    });

    // Use AWS Verified Permissions to check authorization
    debugLog("Calling checkAuthorization", {
      userId,
      logsId,
      action
    });
    
    const authResult = await checkAuthorization({
      userId,
      logsId,
      action,
      context: authContext,
    }, authContext);

    debugLog("Authorization result", {
      decision: authResult.decision,
      policies: authResult.determining_policies?.length || 0,
      errors: authResult.errors?.length || 0
    });

    // Log the authorization decision for audit purposes
    debugLog("Transaction Log Access Authorization:", {
      userId,
      logsId,
      action,
      decision: authResult.decision,
      timestamp: new Date().toISOString(),
      securityGroups: userPermissions?.generalAuthGroups,
      determiningPolicies: authResult.determining_policies?.length || 0,
    });

    // Return the AWS Verified Permissions result with connectivity info
    const responseData = {
      ...authResult,
      awsConnectivity: {
        credentials: (configuration === 'development' && !!(process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID && process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY)) ? 'VALID' : 'SERVICE_ROLE',
        identity: credentialValidation.identity,
        policyStore: 'VALID',
        policyStoreInfo: policyStoreValidation.policyStore
      }
    };

    return NextResponse.json(responseData, {
      status: 200, // Always return 200, let the decision field indicate ALLOW/DENY
    });
  } catch (error) {
    debugLog("Error in transaction-log-access API", {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });

    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "An unexpected error occurred while checking permissions",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/avp/transaction-log-access
 * Returns information about the transaction log access permission endpoint and tests AWS connectivity
 */
export async function GET() {
  try {
    // Test AWS credentials - only in development configuration
    // In production, QA, and staging, we use IAM service roles on Elastic Beanstalk
    const configuration = process.env.NEXT_PUBLIC_CONFIGURATION || process.env.CONFIGURATION || 'development';
    
    debugLog('GET AVP API Configuration Debug', {
      configuration,
      NEXT_PUBLIC_CONFIGURATION: process.env.NEXT_PUBLIC_CONFIGURATION,
      CONFIGURATION: process.env.CONFIGURATION,
      NODE_ENV: process.env.NODE_ENV,
      shouldUseCredentials: configuration === 'development',
      hasAccessKeyId: !!process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      hasSecretAccessKey: !!process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
      hasPolicyStoreId: !!process.env.NEXT_PUBLIC_AVP_POLICY_STORE_ID,
      region: process.env.NEXT_PUBLIC_AWS_REGION,
      // Add AWS environment debugging
      AWS_REGION: process.env.AWS_REGION,
      AWS_EXECUTION_ENV: process.env.AWS_EXECUTION_ENV,
      AWS_LAMBDA_FUNCTION_NAME: process.env.AWS_LAMBDA_FUNCTION_NAME
    });
    
    let credentialValidation: { valid: boolean; error?: string; identity?: any } = { valid: true };
    
    if (configuration === 'development') {
      const hasCredentials = !!(process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID && process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY);
      
      if (!hasCredentials) {
        debugLog('Development mode detected but no credentials available - marking as valid (will use service role)');
        credentialValidation = { valid: true };
      } else {
        debugLog('Using development mode - testing credentials');
        credentialValidation = await validateAWSCredentials();
      }
    } else {
      debugLog('Using service role mode - skipping credential validation');
    }
    
    // Test metadata service access for IAM role debugging
    debugLog('Testing metadata service access');
    const metadataTest = await testMetadataService();
    debugLog('Metadata service test result', metadataTest);
    
    // Test AVP Policy Store access
    debugLog('Testing AVP Policy Store access');
    const policyStoreValidation = await validateAVPPolicyStore();
    
    debugLog('AVP Policy Store validation result', {
      valid: policyStoreValidation.valid,
      error: policyStoreValidation.error,
      hasInfo: !!policyStoreValidation.policyStore
    });
    
    const awsConnectivity = {
      credentials: {
        valid: credentialValidation.valid,
        error: credentialValidation.error,
        identity: credentialValidation.identity,
        mode: (configuration === 'development' && !!(process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID && process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY)) ? 'ACCESS_KEY' : 'SERVICE_ROLE'
      },
      policyStore: {
        valid: policyStoreValidation.valid,
        error: policyStoreValidation.error,
        info: policyStoreValidation.policyStore
      },
      overallStatus: credentialValidation.valid && policyStoreValidation.valid ? 'HEALTHY' : 'ERROR'
    };

    return NextResponse.json({
      endpoint: "/api/avp/transaction-log-access",
      method: "POST",
      description:
        "Check if a user has permission to access transaction logs using AWS Verified Permissions",
      awsConnectivity,
      configuration: {
        region: process.env.NEXT_PUBLIC_AWS_REGION,
        configuration: configuration,
        environmentDetection: {
          NEXT_PUBLIC_CONFIGURATION: process.env.NEXT_PUBLIC_CONFIGURATION,
          CONFIGURATION: process.env.CONFIGURATION,
          computed: configuration
        },
        hasAccessKeyId: !!process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        hasSecretAccessKey: !!process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
        hasPolicyStoreId: !!process.env.NEXT_PUBLIC_AVP_POLICY_STORE_ID,
        nodeEnv: process.env.NODE_ENV,
        shouldUseCredentials: configuration === 'development',
        metadataService: metadataTest
      },
      parameters: {
        userId: "string (required) - The ID of the user",
        logsId:
          'string (optional) - The transaction log ID to check access for (defaults to "system-check")',
        action: 'string (optional) - The action to check permission for (defaults to "view")',
        context:
          "object (optional) - Additional context including userPermissions and userData",
      },
      response: {
        decision: "ALLOW | DENY",
        determining_policies: "Array of policy IDs that determined the decision",
        errors: "Array of errors if access is denied",
        awsConnectivity: "AWS connectivity and validation status"
      },
      authorization: {
        method: "AWS Verified Permissions",
        policyStore: "Uses Cedar policies to determine access",
        requiredEntities: ["Person", "TransactionLogs"],
        supportedActions: ["view"],
        requiredPermissions: ["HisaStaff", "HelpDesk"],
      },
      examples: {
        basicCheck: {
          userId: "user123",
          logsId: "transaction-logs-456",
          action: "view",
          context: {
            userPermissions: {
              generalAuthGroups: ["HisaStaff"],
            },
          },
        },
        systemCheck: {
          userId: "user123",
          context: {
            userPermissions: {
              generalAuthGroups: ["HelpDesk"],
            },
          },
        },
      },
    });
  } catch (error) {
    debugLog("Error in GET endpoint", error);
    return NextResponse.json({
      error: "Failed to test AWS connectivity",
      message: error instanceof Error ? error.message : "Unknown error",
      awsConnectivity: {
        overallStatus: 'ERROR',
        testError: error instanceof Error ? error.message : "Unknown error"
      }
    }, { status: 500 });
  }
}