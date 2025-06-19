import { Module } from '@nestjs/common';
import { KurierService } from './kurier.service';
import { KurierController } from './kurier.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Kurier } from './entities/kurier.entity';

@Module({
  imports: [SequelizeModule.forFeature([Kurier])],
  controllers: [KurierController],
  providers: [KurierService],
})
export class KurierModule {}
