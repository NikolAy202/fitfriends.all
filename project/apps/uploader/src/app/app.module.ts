import { Module } from '@nestjs/common';
import { FileModule } from './file/file.module';
import { ConfigUploaderModule } from '@project/config/config-uploader';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadUsersModule } from './upload-users/upload-users.module';
import { UploadTrainingModule } from './upload-training/upload-training.module';
import { getMongooseOptions } from '@project/util/util-core';

@Module({
  imports: [
    FileModule,
    UploadUsersModule,
    UploadTrainingModule,
    ConfigUploaderModule,
    MongooseModule.forRootAsync(getMongooseOptions('application.db')),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
