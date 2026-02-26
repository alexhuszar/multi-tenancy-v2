import 'server-only';

const requiredEnv = (name: string) => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env: ${name}`);
  return value;
};

export const appwriteConfig = {
  endpointUrl: requiredEnv('NEXT_PUBLIC_APPWRITE_ENDPOINT'),
  projectId: requiredEnv('NEXT_PUBLIC_APPWRITE_PROJECT_ID'),
  databaseId: requiredEnv('NEXT_PUBLIC_C_APPWRITE_DATABASE'),
  usersCollectionId: requiredEnv('NEXT_PUBLIC_C_APPWRITE_USERS'),
  filesCollectionId: requiredEnv('NEXT_PUBLIC_C_APPWRITE_FILES'),
  bucketId: requiredEnv('NEXT_PUBLIC_C_APPWRITE_BUCKET'),
  secretKey: requiredEnv('NEXT_APPWRITE_SECRET'),
  otpRateLimitsCollectionId: requiredEnv('APPWRITE_C_OTP_RATE_LIMITS'),
};
