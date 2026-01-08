"use server";

import { cookies } from "next/headers";
import React from "react";
import { AmplifyProvider } from "./amplify-cognito-config";
import { getCognitoConfig } from "./ssmCognitoConfig";

export const ConfigureAmplifyServerSide: React.FC<{
  children: React.ReactNode;
}> = async ({ children }) => {
  const cookieStore = cookies();
  const awsConfig = await getCognitoConfig();

  return <AmplifyProvider awsConfig={awsConfig}>{children}</AmplifyProvider>;
};
