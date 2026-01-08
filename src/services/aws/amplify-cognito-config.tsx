"use client";

import { Amplify } from "aws-amplify";
import { cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";
import React, { createContext, useContext, useEffect, useMemo } from "react";
import { getConfig } from "../appConfig";
import getAwsConfig from "./aws-exports";
import { SimplifiedCookieStorage } from "./simplifiedCookieStorage";
import { SSMConfig } from "./ssmCognitoConfig";

type AmplifyContextProps = {
  awsConfig: SSMConfig | null;
  children: React.ReactNode;
};

type AmplifyContext = {
  awsConfig: SSMConfig | null;
};

const defaultConfig = getAwsConfig();

const AmplifyContext = createContext<AmplifyContext | undefined>(undefined);

export const AmplifyProvider: React.FC<AmplifyContextProps> = ({
  awsConfig,
  children,
}) => {
  const resolvedConfig: SSMConfig = useMemo(() => {
    return {
      region: awsConfig?.region ?? defaultConfig.Cognito.region,
      userPoolId: awsConfig?.userPoolId ?? defaultConfig.Cognito.userPoolId,
      userPoolClientId:
        awsConfig?.userPoolClientId ?? defaultConfig.Cognito.userPoolClientId,
      identityPoolId:
        awsConfig?.identityPoolId ?? defaultConfig.Cognito.identityPoolId,
    };
  }, [awsConfig]);

  // Initialize Amplify
  useEffect(() => {
    Amplify.configure(
      {
        Auth: {
          Cognito: {
            region: resolvedConfig.region,
            userPoolId: resolvedConfig.userPoolId,
            userPoolClientId: resolvedConfig.userPoolClientId,
          } as SSMConfig,
        },
      },
      {
        ssr: true,
      }
    );

    if (process.env.NODE_ENV === "production") {
      const { hostname } = getConfig();

      cognitoUserPoolsTokenProvider.setKeyValueStorage(
        new SimplifiedCookieStorage({
          clientId:
            awsConfig?.userPoolClientId ??
            defaultConfig.Cognito.userPoolClientId,
          domain: hostname ? `.${hostname}.hisausapps.org` : `.hisausapps.org`,
          secure: true,
          path: "/",
          sameSite: "lax",
          expires: 30,
        })
      );
    }
  }, [
    awsConfig,
    awsConfig?.userPoolClientId,
    awsConfig?.userPoolId,
    awsConfig?.region,
    resolvedConfig.region,
    resolvedConfig.userPoolId,
    resolvedConfig.userPoolClientId,
  ]);

  const contextValue = useMemo(
    () => ({ awsConfig: resolvedConfig }),
    [resolvedConfig]
  );

  return (
    <AmplifyContext.Provider value={contextValue}>
      {children}
    </AmplifyContext.Provider>
  );
};

// Hook for consuming context
export const useAmplifyConfig = () => {
  const context = useContext(AmplifyContext);
  if (!context) return null;
  return context;
};
