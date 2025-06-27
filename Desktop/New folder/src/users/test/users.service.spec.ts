import { JwtService } from "@nestjs/jwt";
import { UserStub } from "../stups/user.stub";
import { Test, TestingModule } from "@nestjs/testing";
import { RolesService } from "../../roles/roles.service";
import { getModelToken } from "@nestjs/sequelize";
import { Roles } from "../../roles/model/role.model";
import { UsersService } from "../users.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../model/user.model";

describe("UsersService", () => {
  let usersService: UsersService;

  const mockUserModel = {
    create: jest.fn().mockImplementation(() => UserStub()),
    findOne: jest.fn().mockImplementation(() => UserStub()),
    findAll: jest.fn().mockImplementation(() => [UserStub()]),
    findByPk: jest.fn().mockImplementation(() => UserStub()),
    destroy: jest.fn(),
  };

  const mockRoleModel = {
    findOne: jest.fn().mockImplementation(() => ({
      value: "USER",
    })),
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        JwtService,
        RolesService,
        {
          provide: getModelToken(User),
          useValue: mockUserModel,
        },
        {
          provide: getModelToken(Roles),
          useValue: mockRoleModel,
        },
      ],
    }).compile();

    usersService = moduleRef.get(UsersService);
  });

  it("should be defined", () => {
    expect(usersService).toBeDefined();
  });

  describe("Createuser", () => {
    describe("when Create user is called", () => {
      let createUserDto: CreateUserDto;
      let newUser: User;

      beforeEach(async () => {
        createUserDto = {
          name: UserStub().name!,
          email: UserStub().email!,
          password: UserStub().password!,
          value: "user",
        };
        newUser = await usersService.create(createUserDto);
      });

      it("should be created new user", async () => {
        expect(newUser).toMatchObject(UserStub());
      });
    });
  });

  describe("findOne", () => {
    describe("when findOne is called", () => {
      test("then it should call userServise", async () => {
        expect(await usersService.findOne(UserStub().id!)).toEqual(UserStub());
      });
    });
  });

  describe("findAll", () => {
    describe("when findAll is called", () => {
      test("then it should call userServise", async () => {
        expect(await usersService.findAll()).toEqual([UserStub()]);
      });
    });
  });
});
