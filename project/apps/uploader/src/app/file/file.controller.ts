import { Body, Controller, Delete, Get, Inject, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import 'multer';
import { FileService } from './file.service';
import { avatarFileFilter, fillObject, imageFileFilter, pdfFileFilter, videoFileFilter } from '@project/util/util-core';
import { UploadedFileRdo } from './rdo/uploaded-file.rdo';
import { ConfigType } from '@nestjs/config';
import { uploaderConfig } from '@project/config/config-uploader';
import { MongoidValidationPipe } from '@project/shared/shared-pipes'
import { UploadUsersService } from '../upload-users/upload-users.service';
import { UploadTrainingService } from '../upload-training/upload-training.service';

@Controller('files')
export class FileController {

  constructor(
    private readonly fileService: FileService,
    private readonly uploadUsersService: UploadUsersService,
    private readonly uploadTrainingService: UploadTrainingService,

    @Inject(uploaderConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof uploaderConfig>,
  ) {}

  @Post('upload/image/:id')
  @UseInterceptors(FileInterceptor('image', {fileFilter: imageFileFilter}))
  public async uploadImg(@UploadedFile() file: Express.Multer.File, @Param('id', MongoidValidationPipe) id: string) {
    const newFile = await this.fileService.saveFile(file, 'image', id);
    await this.uploadTrainingService.trainingImg(id, newFile.id);
    const path = `${this.applicationConfig.serveRoot}${newFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(newFile, { path }));
  }

  @Post('upload/video/:id')
  @UseInterceptors(FileInterceptor('video', {fileFilter: videoFileFilter}))
  public async uploadVideo(@UploadedFile() file: Express.Multer.File, @Param('id', MongoidValidationPipe) id: string) {
    const newFile = await this.fileService.saveFile(file, 'video', id);
    await this.uploadTrainingService.trainingVideo(id, newFile.id);
    const path = `${this.applicationConfig.serveRoot}${newFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(newFile, { path }));
  }

  @Post('upload/avatar/:userId')
  @UseInterceptors(FileInterceptor('file', {fileFilter: avatarFileFilter}))
  public async uploadAvatar(@UploadedFile() file: Express.Multer.File, @Param('userId', MongoidValidationPipe) userId: string) {
    const newFile = await this.fileService.saveFile(file, 'avatar', userId);
    await this.uploadUsersService.userAvatars(userId, newFile.id);
    const path = `${this.applicationConfig.serveRoot}${newFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(newFile, { path }));
  }

  @Post('upload/background/:userId')
  @UseInterceptors(FileInterceptor('background', {fileFilter: imageFileFilter}))
  public async userBackgroundImg(@UploadedFile() file: Express.Multer.File, @Param('userId', MongoidValidationPipe) userId: string) {
    const newFile = await this.fileService.saveFile(file, 'background', userId);
    await this.uploadUsersService.userBackgroundImg(userId, newFile.id);
    const path = `${this.applicationConfig.serveRoot}${newFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(newFile, { path }));
  }

  @Post('upload/certificate/:trainerId')
  @UseInterceptors(FileInterceptor('certificate', {fileFilter: pdfFileFilter}))
  public async coachCertificate(@UploadedFile() file: Express.Multer.File, @Param('trainerId') trainerId: string) {
    const newFile = await this.fileService.saveFile(file, 'certificate', trainerId);
    await this.uploadUsersService.trainerCertificate(trainerId, newFile.id);
    const path = `${this.applicationConfig.serveRoot}${newFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(newFile, { path }));
  }

  @Post('upload/certificate/update/:trainerId')
  @UseInterceptors(FileInterceptor('certificate', {fileFilter: pdfFileFilter}))
  public async coachCertificateUpd(@UploadedFile() file: Express.Multer.File, @Param('trainerId') trainerId: string, @Body() body) {
    const updfile = await this.fileService.updateFile(file, 'certificate', trainerId, body.certificateId);
    await this.uploadUsersService.trainerCertificate(trainerId, updfile.id);
    const path = `${this.applicationConfig.serveRoot}${updfile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(updfile, { path }));
  }

  @Delete('delete/certificate/:certificateId')
  public async delete(@Param('certificateId', MongoidValidationPipe) certificateId: string) {
   return await this.fileService.delete(certificateId);
  }

  @Get(':fileId')
  public async show(@Param('fileId', MongoidValidationPipe) fileId: string) {
    console.log(fileId)
    const existFile = await this.fileService.getFile(fileId);
    const path = `http://localhost:${process.env.PORT}${this.applicationConfig.serveRoot}${existFile.path}`;
    return  {path}
  }

}
