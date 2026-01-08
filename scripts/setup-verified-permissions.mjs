#!/usr/bin/env node

/**
 * AWS Verified Permissions Setup Script
 * 
 * This script sets up a new AWS Verified Permissions policy store
 * and creates the initial policies for the Long Lived Transactions Viewer app.
 * 
 * Prerequisites:
 * - AWS CLI configured with appropriate permissions
 * - Node.js and npm installed
 * 
 * Usage:
 * node scripts/setup-verified-permissions.mjs [environment]
 * 
 * Example:
 * node scripts/setup-verified-permissions.mjs development
 */

import {
  VerifiedPermissionsClient,
  CreatePolicyStoreCommand,
  CreatePolicyCommand,
  PutSchemaCommand,
  ListPolicyStoresCommand,
} from "@aws-sdk/client-verifiedpermissions";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const AWS_REGION = process.env.AWS_REGION || "us-east-1";
const ENVIRONMENT = process.argv[2] || "development";

// Policy Store Configuration
const POLICY_STORE_CONFIG = {
  description: `Long Lived Transactions Viewer - ${ENVIRONMENT}`,
  validationSettings: {
    mode: "STRICT",
  },
};

// Initialize AWS client
const client = new VerifiedPermissionsClient({
  region: AWS_REGION,
});

async function loadSchema() {
  try {
    const schemaPath = path.join(__dirname, "../policies/cedar-schema.json");
    const schemaContent = fs.readFileSync(schemaPath, "utf8");
    return JSON.parse(schemaContent);
  } catch (error) {
    console.error("Error loading schema:", error);
    throw new Error("Failed to load Cedar schema. Make sure cedar-schema.json exists in policies directory.");
  }
}

async function loadPolicies() {
  try {
    const policiesPath = path.join(__dirname, "../policies/cedar-policies.cedar");
    const policiesContent = fs.readFileSync(policiesPath, "utf8");
    
    // Split policies by the 'permit(' keyword (basic parsing)
    const policies = policiesContent
      .split(/(?=permit\s*\()/g)
      .filter(policy => policy.trim().length > 0)
      .map(policy => policy.trim());
    
    return policies;
  } catch (error) {
    console.error("Error loading policies:", error);
    throw new Error("Failed to load Cedar policies. Make sure cedar-policies.cedar exists in policies directory.");
  }
}

async function checkExistingPolicyStore() {
  try {
    console.log("Checking for existing policy stores...");
    const listCommand = new ListPolicyStoresCommand({});
    const response = await client.send(listCommand);
    
    const existingStore = response.policyStores?.find(store => 
      store.description?.includes(`Long Lived Transactions Viewer - ${ENVIRONMENT}`)
    );
    
    if (existingStore) {
      console.log(`Found existing policy store: ${existingStore.policyStoreId}`);
      console.log("Would you like to use the existing store? (This will skip creation)");
      return existingStore.policyStoreId;
    }
    
    return null;
  } catch (error) {
    console.error("Error checking existing policy stores:", error);
    return null;
  }
}

async function createPolicyStore() {
  try {
    console.log("Creating AWS Verified Permissions policy store...");
    
    const command = new CreatePolicyStoreCommand(POLICY_STORE_CONFIG);
    const response = await client.send(command);
    
    console.log(`✅ Policy store created successfully!`);
    console.log(`Policy Store ID: ${response.policyStoreId}`);
    console.log(`ARN: ${response.arn}`);
    
    return response.policyStoreId;
  } catch (error) {
    console.error("❌ Error creating policy store:", error);
    throw error;
  }
}

async function uploadSchema(policyStoreId) {
  try {
    console.log("Uploading Cedar schema...");
    
    const schema = await loadSchema();
    
    const command = new PutSchemaCommand({
      policyStoreId: policyStoreId,
      definition: {
        cedarJson: JSON.stringify(schema),
      },
    });
    
    await client.send(command);
    console.log("✅ Schema uploaded successfully!");
  } catch (error) {
    console.error("❌ Error uploading schema:", error);
    throw error;
  }
}

async function createPolicies(policyStoreId) {
  try {
    console.log("Creating Cedar policies...");
    
    const policies = await loadPolicies();
    const createdPolicies = [];
    
    for (let i = 0; i < policies.length; i++) {
      const policy = policies[i];
      const policyId = `policy-${i + 1}`;
      
      try {
        const command = new CreatePolicyCommand({
          policyStoreId: policyStoreId,
          definition: {
            static: {
              statement: policy,
              description: `Policy ${i + 1} for Long Lived Transactions Viewer`,
            },
          },
        });
        
        const response = await client.send(command);
        createdPolicies.push({
          id: response.policyId,
          description: `Policy ${i + 1}`,
        });
        
        console.log(`✅ Policy ${i + 1} created: ${response.policyId}`);
      } catch (error) {
        console.error(`❌ Error creating policy ${i + 1}:`, error);
        console.log(`Policy content: ${policy.substring(0, 200)}...`);
        // Continue with other policies even if one fails
      }
    }
    
    console.log(`✅ Created ${createdPolicies.length} policies successfully!`);
    return createdPolicies;
  } catch (error) {
    console.error("❌ Error creating policies:", error);
    throw error;
  }
}

async function generateEnvFile(policyStoreId) {
  const envContent = `
# AWS Verified Permissions Configuration for ${ENVIRONMENT}
NEXT_PUBLIC_AVP_POLICY_STORE_ID=${policyStoreId}
NEXT_PUBLIC_AWS_REGION=${AWS_REGION}

# Add this to your .env.${ENVIRONMENT} file
`;

  console.log("\n" + "=".repeat(60));
  console.log("ENVIRONMENT CONFIGURATION");
  console.log("=".repeat(60));
  console.log(envContent);
  console.log("=".repeat(60));

  // Save to a file for easy reference
  const envFilePath = path.join(__dirname, `../verified-permissions-${ENVIRONMENT}.env`);
  fs.writeFileSync(envFilePath, envContent);
  console.log(`Environment configuration saved to: ${envFilePath}`);
}

async function main() {
  try {
    console.log(`🚀 Setting up AWS Verified Permissions for ${ENVIRONMENT} environment`);
    console.log(`AWS Region: ${AWS_REGION}`);
    console.log("");
    
    // Check for existing policy store
    let policyStoreId = await checkExistingPolicyStore();
    
    // Create policy store if it doesn't exist
    if (!policyStoreId) {
      policyStoreId = await createPolicyStore();
    }
    
    // Upload schema
    await uploadSchema(policyStoreId);
    
    // Create policies
    await createPolicies(policyStoreId);
    
    // Generate environment configuration
    await generateEnvFile(policyStoreId);
    
    console.log("\n🎉 AWS Verified Permissions setup completed successfully!");
    console.log("\nNext steps:");
    console.log("1. Add the environment variables to your .env file");
    console.log("2. Update your application to use the new policy store");
    console.log("3. Test the permissions in your application");
    console.log(`4. Monitor the policy store in the AWS Console: https://console.aws.amazon.com/verifiedpermissions/home?region=${AWS_REGION}#/policy-stores/${policyStoreId}`);
    
  } catch (error) {
    console.error("\n❌ Setup failed:", error);
    process.exit(1);
  }
}

// Run the setup
if (require.main === module) {
  main();
}

module.exports = {
  createPolicyStore,
  uploadSchema,
  createPolicies,
  generateEnvFile,
};