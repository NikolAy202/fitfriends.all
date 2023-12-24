import { Module } from '@nestjs/common';
import { TraningController } from './traning.controller';
import { UsersController } from './users.controller';
import { HttpModule } from '@nestjs/axios';
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from './app.config';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { TrainerController } from './trainers-personal-account.controller';
import { ClientsController } from './client-personal-account.controller';
import { UploaderController } from './uploader.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    })
  ],
  controllers: [
    UploaderController,
    ClientsController,
    UsersController,
    TraningController,
    TrainerController,
  ],
  providers: [ CheckAuthGuard ],

})
export class AppModule {}
