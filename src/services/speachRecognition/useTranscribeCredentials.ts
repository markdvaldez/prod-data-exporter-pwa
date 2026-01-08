import { useAmplifyConfig } from "@/services/aws/amplify-cognito-config";
import { useMemo } from "react";
import { getAwsTranscribeConfig } from "../aws/aws-transcribe";
import { normalizeUserPoolId } from "../aws/normalizeUserPoolId";

export type TCredential = {
  identityPoolId: string;
  region: string;
  userPoolId: string;
};

export const useTranscribeCredentials = (): TCredential => {
  const awsConfig = useAmplifyConfig()?.awsConfig;

  const credentials = useMemo<TCredential>(() => {
    const baseConfig = awsConfig ?? getAwsTranscribeConfig();

    return {
      ...baseConfig,
      userPoolId: normalizeUserPoolId(baseConfig.region, baseConfig.userPoolId),
    };
  }, [awsConfig]);

  return credentials;
};
