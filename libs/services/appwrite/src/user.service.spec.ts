import { UserService } from "./user.service";

const mockTablesDB = {
  listRows: jest.fn(),
  createRow: jest.fn(),
};

const mockUsers = {
  create: jest.fn(),
};

describe("UserService", () => {
  let service: UserService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new UserService(
      mockTablesDB as any,
      mockUsers as any,
    );
  });

  describe("getByEmail", () => {
    it("returns null when no user found", async () => {
      mockTablesDB.listRows.mockResolvedValue({ rows: [] });

      const result = await service.getByEmail("test@email.com");

      expect(result).toBeNull();
      expect(mockTablesDB.listRows).toHaveBeenCalled();
    });

    it("throws on duplicate users", async () => {
      mockTablesDB.listRows.mockResolvedValue({
        rows: [{ $id: "1" }, { $id: "2" }],
      });

      await expect(
        service.getByEmail("test@email.com")
      ).rejects.toThrow("Data integrity violation");
    });

    it("returns user when found", async () => {
      const user = {
        $id: "123",
        email: "test@email.com",
      };

      mockTablesDB.listRows.mockResolvedValue({
        rows: [user],
      });

      const result = await service.getByEmail("test@email.com");

      expect(result).toEqual(user);
    });
  });

  describe("createAuthUser", () => {
    it("creates auth user", async () => {
      mockUsers.create.mockResolvedValue({ $id: "abc" });

      const result = await service.createAuthUser({
        userId: "abc",
        email: "test@email.com",
        password: "pass",
        name: "Test",
      });

      expect(mockUsers.create).toHaveBeenCalled();
      expect(result.$id).toBe("abc");
    });
  });
});