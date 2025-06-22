import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { SocialModule } from './social/social.module';
import { Social } from './social/entities/social.entity';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';
import { KurierModule } from './kurier/kurier.module';
import { Kurier } from './kurier/entities/kurier.entity';
import { AdminsModule } from './admins/admins.module';
import { UsersModule } from './users/users.module';
import { Admin } from './admins/entities/admin.entity';
import { User } from './users/entities/user.entity';
import { NotificationsModule } from './notifications/notifications.module';
import { Notification } from './notifications/entities/notification.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:".env",
      isGlobal:true
    }),
    SequelizeModule.forRoot({
      dialect:"postgres",
      host:process.env.PG_HOST,
      port:Number(process.env.PG_PORT),
      password:process.env.PG_PASS,
      username:process.env.PG_USER,
      database:process.env.PG_DB,
      models:[Social, Category, Kurier, Admin, User, Notification],
      autoLoadModels: true,
      logging: false,
      sync: { alter: true },
    }),
    SocialModule,
    CategoriesModule,
    KurierModule,
    AdminsModule,
    UsersModule,
    NotificationsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
