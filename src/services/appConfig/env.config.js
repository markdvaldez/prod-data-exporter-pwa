/* eslint-disable @typescript-eslint/no-require-imports */
const dotenv = require("dotenv");
const packageJson = require("../../../package.json");

const env = process.env.CONFIGURATION || "development";

const localVariables = {
  NEXT_PUBLIC_APP_VERSION: packageJson.version,
};

dotenv.config({ path: `.env.${env}`, processEnv: localVariables });

const environmentVariables = {
  APP_ID: process.env.APP_ID,
  NEXT_PUBLIC_CONFIGURATION: process.env.NEXT_PUBLIC_CONFIGURATION,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_AWS_POOL_ID: process.env.NEXT_PUBLIC_AWS_POOL_ID,
  NEXT_PUBLIC_AWS_REGION: process.env.NEXT_PUBLIC_AWS_REGION,
  NEXT_PUBLIC_AWS_USER_POOL_ID: process.env.NEXT_PUBLIC_AWS_USER_POOL_ID,
  NEXT_PUBLIC_AWS_CLIENT_ID: process.env.NEXT_PUBLIC_AWS_CLIENT_ID,
  NEXT_PUBLIC_AVP_POLICY_STORE_ID: process.env.NEXT_PUBLIC_AVP_POLICY_STORE_ID,
  NEXT_PUBLIC_APP_INSIGHTS: process.env.NEXT_PUBLIC_APP_INSIGHTS,
  NEXT_PUBLIC_REACT_APP_DYNATRACE: process.env.NEXT_PUBLIC_REACT_APP_DYNATRACE,
  NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
  ...localVariables,
};

module.exports = { environmentVariables };
