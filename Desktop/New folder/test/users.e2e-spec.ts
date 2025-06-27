import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest"
import { AppModule } from "../src/app.module";

describe("User (e2e)", ()=>{
    let app: INestApplication;
    let token: String;

    jest.setTimeout(15000)
    beforeAll(async ()=>{
        const moduleFixed: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()
        app = moduleFixed.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();

        const response = await request(app.getHttpServer())
        .post("auth/signin")
        .send({
            email: "adminuka@gmail.com",
            password: "123456"
        })
        token = response.body.token
        console.log("token", token);
    })
    it("/user (GET) --> 200 OK ", () =>{
        return request(app.getHttpServer())
        .get("/users")
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-type", /json/)
        .expect(200)
    })
    
    it("/users (GET) --> 401 'unuftarizatsion' error ", () =>{
        return (
        request(app.getHttpServer())
        .get("/users")
        // .set("Authorization", `Bearer ${token}`)
        .expect("Content-type", /json/)
        .expect(401)
        );
    })


    it("/auth/signup (post)", ()=>{
        return request(app.getHttpServer())
        .post("/auth/signin")
        .send({
            name: "user221",
            email: "user4567@#$%@gmail.com",
            password: "2345@#werWE",
            value: "superadmin"
        })
        .expect("Content-type", /json/)
        .expect(201)
    })
    
    
    it("/auth/signup (POST) --> 409", ()=>{
        return request(app.getHttpServer())
        .post("/auth/signin")
        .send({
            name: "komiljon",
            email: "uftgyhujgf%@gmail.com",
            password: "UzbeksilaN1",
            value: "superadmin"
        })
        .expect("Content-type", /json/)
        .expect(409)
        .expect({
            message:"bulday foydalanuvchi mavjud",
            error: "confilict",
            satatusCode: 409
        })
    })
    
    it("/auth/signup (POST) --> 400 on Validation error", ()=>{
        return request(app.getHttpServer())
        .post("/auth/signin")
        .send({
            name: "user2",
            email: "User2%@gmail.com",
            password: "User3",
            value: "superadmin"
        })
        .expect("Content-type", /json/)
        .expect(400)
        .expect({
            message:"parol yetarlicha mustaxkam emas",
            error: "bad rqruest",
            satatusCode: 400
        })
    })


})