import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import trainingConfig from './training.config';

const ENV_TRANING_FILE_PATH = 'apps/traning/.traning.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [trainingConfig],
      envFilePath: ENV_TRANING_FILE_PATH
    }),
  ]
})
export class ConfigTraningModule {}
