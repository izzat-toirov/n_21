import { UserStub } from "../stups/user.stub";

export const UsersService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(UserStub()),
  findAll: jest.fn().mockResolvedValue([UserStub()]),
  findOne: jest.fn().mockResolvedValue([UserStub()]),
});
