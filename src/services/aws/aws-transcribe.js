export const getAwsTranscribeConfig = () => ({
  region: String(process.env.NEXT_PUBLIC_AWS_REGION),
  identityPoolId: String(process.env.NEXT_PUBLIC_AWS_POOL_ID),
  userPoolId: String(process.env.NEXT_PUBLIC_AWS_USER_POOL_ID),
});

export default getAwsTranscribeConfig;
