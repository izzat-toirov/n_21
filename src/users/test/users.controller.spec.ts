import { UsersController } from "../users.controller"
import { UsersService } from "../users.service"
import { Test } from '@nestjs/testing';
import { JwtService } from "@nestjs/jwt";
import { User } from "../model/user.model";
import { UserStub } from "../stups/user.stub";
import { CreateUserDto } from "../dto/create-user.dto";

jest.mock("../users.service")

describe("User Controller", ()=>{
    let userController: UsersController
    let userServise: UsersService

    beforeAll(async ()=>{
        const modulRef = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService, JwtService]
        }).compile()
        userServise = modulRef.get(UsersService)
        userController = modulRef.get(UsersService)

        jest.clearAllMocks()
    })
    it("User controller should br defined", ()=>{
        expect(userController).toBeDefined();
    })
    test("User controller should br defined", ()=>{
        expect(userServise).toBeDefined();
    });

    describe("findAll", ()=>{
        describe("when findAll is called", ()=>{
            let users:User[]
            beforeAll (async()=>{
                users = await userController.findAll()
            })
            test("thene it should call findAll", ()=>{
                expect(userServise.findAll).toHaveBeenCalled();
            });
            test("then it should return users lists", ()=>{
                expect(users).toEqual([UserStub()]);
            });
        })
    })
    describe("findOne", ()=>{
        describe("when create is called", ()=>{
            let user:User | null
            // let createUserDto:CreateUserDto
            beforeAll (async()=>{
                user = await userController.findOne(String(UserStub().id))
            })
            test("thene it should call finOne", ()=>{
                expect(userServise.findOne).toHaveBeenCalledWith(String(UserStub().id));  // 16:15
            });
            test("then it should return users lists", ()=>{
                expect(user).toEqual([UserStub()]);
            });
        })
    })
    describe("create User", ()=>{
        describe("when findOne is called", ()=>{
            let user:User | null
            let createUserDto:CreateUserDto 
            beforeAll (async()=>{
                createUserDto = {
                    name: UserStub().name!,
                    email:UserStub().email!,
                    password:UserStub().password!,
                    value:"user",
                }
                user = await userController.create(createUserDto)
            })
            test("thene it should call finOne", ()=>{
                expect(userServise.findOne).toHaveBeenCalledWith(String(UserStub().id));
            });
            test("then it should return users lists", ()=>{
                expect(user).toEqual(UserStub());
            });
        })
    })
})
