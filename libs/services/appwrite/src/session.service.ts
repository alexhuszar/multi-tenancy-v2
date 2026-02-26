import { Client, Account, TablesDB, Storage, Avatars, Users } from 'node-appwrite';
import { appwriteConfig } from './appwrite-config';

export class AppwriteClientFactory {
  private static createBaseClient(): Client {
    return new Client()
      .setEndpoint(appwriteConfig.endpointUrl)
      .setProject(appwriteConfig.projectId);
  }

  static createUserClient(sessionToken: string): Client {
    return this.createBaseClient().setSession(sessionToken);
  }

  static createAdminClient(): Client {
    if (!appwriteConfig.secretKey) {
      throw new Error('Missing Appwrite secret key');
    }

    return this.createBaseClient().setKey(appwriteConfig.secretKey);
  }

  static createPublicClient(): Client {
    return this.createBaseClient();
  }
}

export class SessionService {
  createUserSession(sessionToken: string) {
    
    if (!sessionToken) {
      throw new Error('Missing session token');
    }

    const client = AppwriteClientFactory.createUserClient(sessionToken);

    return {
      get account() {
        return new Account(client);
      },
      get tablesDB() {
        return new TablesDB(client);
      },
    };
  }

  createPublicSession() {
    const client = AppwriteClientFactory.createPublicClient();

    return {
      get account() {
        return new Account(client);
      },
    };
  }

  createAdminSession() {
    const client = AppwriteClientFactory.createAdminClient();

    return {
      get account() {
        return new Account(client);
      },
      get tablesDB() {
        return new TablesDB(client);
      },
      get storage() {
        return new Storage(client);
      },
      get avatars() {
        return new Avatars(client);
      },
      get users() {
        return new Users(client);
      },
    };
  }
}
