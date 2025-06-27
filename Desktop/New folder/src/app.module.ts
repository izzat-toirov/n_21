import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { CompanyModule } from "./company/company.module";
import { Company } from "./company/models/company.model";
import { BuildersModule } from "./builders/builders.module";
import { Builder } from "./builders/models/builder.models";
import { MachineModule } from "./machine/machine.module";
import { Machine } from "./machine/models/machine.model";
import { DriverModule } from "./driver/driver.module";
import { Driver } from "./driver/models/driver.model";
import { MachineDriverModule } from "./machine_driver/machine_driver.module";
import { MachineDriver } from "./machine_driver/models/machine_driver.model";
import { RolesModule } from "./roles/roles.module";
import { UsersModule } from "./users/users.module";
import { Roles } from "./roles/model/role.model";
import { User } from "./users/model/user.model";
import { AuthModule } from "./auth/auth.module";
import { UserRole } from "./users/model/user-role.model";
import { FilesModule } from "./files/files.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "static"),
    }),

    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASS,
      database: process.env.PG_DB,
      models: [
        Company,
        Builder,
        Machine,
        Driver,
        MachineDriver,
        Roles,
        User,
        UserRole,
      ],
      autoLoadModels: true,
      logging: false,
      sync: { alter: true },
    }),
    CompanyModule,
    BuildersModule,
    MachineModule,
    DriverModule,
    MachineDriverModule,
    RolesModule,
    UsersModule,
    AuthModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
