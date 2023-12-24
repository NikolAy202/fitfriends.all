import { Module } from '@nestjs/common';
import { TraningController } from './traning.controller';
import { TraningService } from './traning.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TraningModel, TraningSchema } from './traning.model';
import { TraningRepository } from './traning.repository';
import { NotifyUserModule } from '../notify-user/notify-user.module';

@Module({
  imports: [MongooseModule.forFeature([
    { name: TraningModel.name, schema: TraningSchema }]),
    NotifyUserModule
  ],
  controllers: [TraningController],
  providers: [TraningService, TraningRepository],
  exports: [TraningRepository, TraningService]
})
export class TraningModule {}
