export const normalizeUserPoolId = (region: string, userPoolId: string) =>
  `cognito-idp.${region}.amazonaws.com/${userPoolId}`;
