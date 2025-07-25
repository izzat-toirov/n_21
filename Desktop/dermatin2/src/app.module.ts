import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AppResolver } from './AppResolver';
import { CategoryModule } from './category/category.module';
import { DermatinModule } from './dermatin/dermatin.module';
import { AuthModuleUser } from './auth for User/auth.module';
import { StoreModule } from './store/store.module';
import { DermatinImageModule } from './dermatin_image/dermatin_image.module';
import { AdvertisementsModule } from './advertisements/advertisements.module';
import { RequestModule } from './request/request.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { HistoryModule } from './history/history.module';
import { SocialModule } from './social/social.module';
import { ReviewModule } from './review/review.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<string>('DB_CONNACTION') as any,
        host: config.get<string>('DB_HOST'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        port: Number(process.env.DB_PORT),
        database: config.get<string>('DB_NAME'),
        entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
        autoLoadEntities: true,
        logging: true,
        synchronize: true,
        ssl: false,
      }),
    }),
    AdminModule,
    UserModule,
    AuthModule,
    AuthModuleUser,
    CategoryModule,
    DermatinModule,
    StoreModule,
    DermatinImageModule,
    AdvertisementsModule,
    RequestModule,
    ChatModule,
    MessageModule,
    HistoryModule,
    SocialModule,
    ReviewModule,
    OrderModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [AppResolver],
})
export class AppModule {}
