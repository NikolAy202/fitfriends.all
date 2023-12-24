import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './user.repository';
import { UserModel, UserSchema } from './user.model';
import { TrainerModule } from '../trainer/trainer.module';
import { ClientModule } from '../client/client.module';
import { UsersController } from './users.controller';
import { UserService } from './user.service';
import { NotifyUserModule } from '../notify-user/notify-user.module';
import { UserBalanceModule } from '../user-balance/user-balance.module';


@Module({
  imports: [
    UserBalanceModule,
    NotifyUserModule,
    TrainerModule,
    ClientModule,
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UserRepository, UserService],
  exports: [UserRepository, UserService],
})
export class UserModule {}
