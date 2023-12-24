import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainerRepository } from './trainer.repository';
import { TrainerModel, TrainerSchema } from './trainer.model';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: TrainerModel.name, schema: TrainerSchema }]),
  ],
  providers: [TrainerRepository],
  exports: [TrainerRepository],
})
export class TrainerModule {}

