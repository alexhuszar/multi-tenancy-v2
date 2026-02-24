/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const appwriteConfig = {
  endpointUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.NEXT_PUBLIC_C_APPWRITE_DATABASE!,
  usersCollectionId: process.env.NEXT_PUBLIC_C_APPWRITE_USERS!,
  filesCollectionId: process.env.NEXT_PUBLIC_C_APPWRITE_FILES!,
  bucketId: process.env.NEXT_PUBLIC_C_APPWRITE_BUCKET!,
  secretKey: process.env.NEXT_APPWRITE_SECRET!,
};
