import { ID, Query, TablesDB, Users } from 'node-appwrite';
import { appwriteConfig } from './appwrite-config';

export type UserRow = {
  $id: string;
  email: string;
  fullName: string;
  avatar: string;
  accountId: string;
  provider: string;
};


export class UserService {
  constructor(
    private tablesDB: TablesDB,
    private users: Users,
  ) {}

  async getByEmail(email: string): Promise<UserRow | null> {

    const result = await this.tablesDB.listRows({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.usersCollectionId,
      queries: [Query.equal('email', [email])],
    });

    return (result.rows[0] as unknown as UserRow) ?? null;
  }

  async getById(id: string): Promise<UserRow | null> {
    const result = await this.tablesDB.listRows({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.usersCollectionId,
      queries: [Query.equal('accountId', [id])],
    });
    
    return (result.rows[0] as unknown as UserRow) ?? null;
  }

  async createAuthUser(data: {
    userId: string;
    email: string;
    password: string;
    name: string;
  }): Promise<{ $id: string }> {
    const result = await this.users.create(data);

    return result as unknown as { $id: string };
  }

  async createRow(data: {
    email: string;
    fullName: string;
    accountId: string;
    provider: string;
    avatar?: string;
  }): Promise<{ $id: string }> {

    const result = await this.tablesDB.createRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.usersCollectionId,
      rowId: ID.unique(),
      data,
    });

    return result as unknown as { $id: string };
  }
}
