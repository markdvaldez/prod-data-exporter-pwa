const getAwsConfig = () => ({
  Cognito: {
    region: String(process.env.NEXT_PUBLIC_AWS_REGION),
    userPoolId: String(process.env.NEXT_PUBLIC_AWS_USER_POOL_ID),
    userPoolClientId: String(process.env.NEXT_PUBLIC_AWS_CLIENT_ID),
    identityPoolId: String(process.env.NEXT_PUBLIC_AWS_POOL_ID),
  },
});

export default getAwsConfig;
