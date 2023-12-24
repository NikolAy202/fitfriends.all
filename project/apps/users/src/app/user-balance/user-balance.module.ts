import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserBalanceRepository } from './user-balanse.repository';
import { UserBalanceModel, UserBalanceSchema } from './user-balance.model';
import { UserBalanceService } from './user-balance.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserBalanceModel.name, schema: UserBalanceSchema }]),
  ],

  providers: [UserBalanceRepository, UserBalanceService],
  exports: [UserBalanceRepository,UserBalanceService],
})
export class UserBalanceModule {}
