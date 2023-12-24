import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigService } from '@nestjs/config';
import { FileRepository } from './file.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModel, FileSchema } from './file.model';
import { UploadUsersModule } from '../upload-users/upload-users.module';
import { UploadTrainingModule } from '../upload-training/upload-training.module';


@Module({
  imports: [
    UploadTrainingModule,
    UploadUsersModule,
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath = configService.get<string>('application.uploadDirectory');
        const serveRoot = configService.get<string>('application.serveRoot');
        return [{
          rootPath,
          serveRoot,
          serveStaticOptions: {
            fallthrough: true,
            etag: true,
          }
        }]
      }
    }),
    MongooseModule.forFeature([
      { name: FileModel.name, schema: FileSchema }
    ])
  ],
  controllers: [FileController],
  providers: [FileService, FileRepository],
})
export class FileModule {}
