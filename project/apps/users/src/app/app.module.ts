import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import {
  ConfigUsersModule,
  getMongooseOptions,
} from '@project/config/config-users';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainerModule } from './trainer/trainer.module';
import { ClientModule } from './client/client.module';
import { TrainingRequestModule } from './training-request/training-request.module';
import { UserBalanceModule } from './user-balance/user-balance.module';

@Module({
  imports: [
    UserBalanceModule,
    ClientModule,
    TrainingRequestModule,
    AuthenticationModule,
    UserModule,
    TrainerModule,
    ConfigUsersModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
