import "server-only";
// AWS Systems Manager
import { extractError } from "@/utils/errors";
import {
  GetParameterCommand,
  GetParameterCommandOutput,
  SSMClient,
} from "@aws-sdk/client-ssm";
import NodeCache from "node-cache";

import { getConfig } from "../appConfig";

export type SSMConfig = {
  region: string;
  userPoolId: string;
  userPoolClientId: string;
  identityPoolId: string;
};

// Determine hostname and appId
const hostname =
  process.env.NEXT_PUBLIC_ENVIRONMENT_NAME === "production"
    ? "prod"
    : getConfig().hostname || "dev1";

const appId = getConfig().appId;

// Region can also be overridden by env
const region = process.env.NEXT_PUBLIC_AWS_REGION || "us-east-1";

// SSM client
const client = new SSMClient({ region });

// Cache with 24 hours TTL
const cache = new NodeCache({ stdTTL: 86400 }); // 86400 24 hours

const key = "cachedConfig";

/**
 * Safely extract parameter value or throw
 */
const getParamValue = (
  res: GetParameterCommandOutput,
  name: string
): string => {
  if (!res?.Parameter?.Value) {
    throw new Error(`Missing SSM parameter: ${name}`);
  }
  return res.Parameter.Value;
};

/**
 * Get Cognito config from environment variables
 */
const getConfigFromEnv = (): SSMConfig | null => {
  const userPoolId = process.env.NEXT_PUBLIC_AWS_USER_POOL_ID;
  const userPoolClientId = process.env.NEXT_PUBLIC_AWS_CLIENT_ID;
  const identityPoolId = process.env.NEXT_PUBLIC_AWS_POOL_ID;

  if (!userPoolId || !userPoolClientId || !identityPoolId) {
    console.warn('Missing required Cognito environment variables:', {
      userPoolId: !!userPoolId,
      userPoolClientId: !!userPoolClientId,
      identityPoolId: !!identityPoolId,
    });
    return null;
  }

  return {
    region,
    userPoolId,
    userPoolClientId,
    identityPoolId,
  };
};

/**
 * Fetch Cognito parameters from SSM and cache them
 * Falls back to environment variables in development
 */
export async function getCognitoConfig(): Promise<SSMConfig | null> {
  "use server";
  const cachedConfig: SSMConfig | undefined = cache.get(key);

  if (cachedConfig) return cachedConfig;

  // In development, try to use environment variables as fallback
  const isDevelopment = process.env.NODE_ENV === 'development' || 
                       process.env.NEXT_PUBLIC_CONFIGURATION === 'development';

  if (isDevelopment) {
    // Try environment variables first in development
    const envConfig = getConfigFromEnv();
    if (envConfig) {
      cache.set(key, envConfig);
      return envConfig;
    }
  }

  const parameterNames = [
    `/${hostname}/${appId}/cognito/UserPoolId`,
    `/${hostname}/${appId}/cognito/UserPoolClientId`,
    `/${hostname}/${appId}/cognito/IdentityPoolId`,
  ];

  try {
    // Fetch all parameters in parallel with individual error handling
    const results = await Promise.allSettled(
      parameterNames.map(async (name) => {
        try {
          return await client.send(
            new GetParameterCommand({ Name: name, WithDecryption: true })
          );
        } catch (error) {
          console.warn(`Failed to fetch SSM parameter ${name}:`, extractError(error));
          throw error;
        }
      })
    );

    // Check if all parameters were successfully fetched
    const successfulResults = results.filter(
      (result): result is PromiseFulfilledResult<GetParameterCommandOutput> =>
        result.status === 'fulfilled'
    );

    if (successfulResults.length !== parameterNames.length) {
      console.warn('Some SSM parameters could not be fetched, falling back to environment variables');
      
      // Fallback to environment variables
      const envConfig = getConfigFromEnv();
      if (envConfig) {
        cache.set(key, envConfig);
        return envConfig;
      }
      
      throw new Error('SSM parameters not found and no valid environment variables available');
    }

    const nextConfig: SSMConfig = {
      region,
      userPoolId: getParamValue(successfulResults[0].value, parameterNames[0]),
      userPoolClientId: getParamValue(successfulResults[1].value, parameterNames[1]),
      identityPoolId: getParamValue(successfulResults[2].value, parameterNames[2]),
    };

    cache.set(key, nextConfig);

    return nextConfig;
  } catch (err) {
    console.error("Failed to fetch Cognito config from SSM:", extractError(err));
    
    // Final fallback to environment variables
    const envConfig = getConfigFromEnv();
    if (envConfig) {
      console.info("Using Cognito config from environment variables");
      cache.set(key, envConfig);
      return envConfig;
    }
    
    return null;
  }
}
