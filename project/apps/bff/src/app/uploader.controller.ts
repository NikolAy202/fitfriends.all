import { Controller,  Param,  Post,   Req,   UseFilters, UseGuards, UseInterceptors, UploadedFile, Get, Body } from '@nestjs/common';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';
import FormData from 'form-data';
import { UserIdInterceptor } from './interceptors/user-id.interseptor';
import { RoleTrainerInterceptor } from './interceptors/role-trainer.interseptor';
import { TrainerIdInterceptor } from './interceptors/trainer-id.interceptor';
import { UseridTrainingInterceptor } from './interceptors/user-id.taining.interseptor';


@Controller('files')
@UseFilters(AxiosExceptionFilter)
export class UploaderController {

  constructor(
    private readonly httpService: HttpService,
  ) {}


  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('/avatar')
  @UseInterceptors(FileInterceptor('file'))
  public async postAvatar(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    const formData = new FormData();
    formData.append('file', Buffer.from(file.buffer), {filename: file.originalname, contentType: file.mimetype});

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploads}/avatar/${req.body['userId']}`,
    formData,
    {headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('/user/background')
  @UseInterceptors(FileInterceptor('background'))
  public async postBackground(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    const formData = new FormData();
    formData.append('background', Buffer.from(file.buffer), {filename: file.originalname, contentType: file.mimetype});

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploads}/background/${req.body['userId']}`,
    formData,
    {headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(TrainerIdInterceptor)
  @UseInterceptors(RoleTrainerInterceptor)
  @Post('/trainer/certificate')
  @UseInterceptors(FileInterceptor('certificate'))
  public async postCertificate(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    const formData = new FormData();

    formData.append('certificate', Buffer.from(file.buffer), {filename: file.originalname, contentType: file.mimetype});

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploads}/certificate/${req.body['trainer']}`,
    formData,
    {headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(TrainerIdInterceptor)
  @UseInterceptors(RoleTrainerInterceptor)
  @Post('/trainer/certificate/update')
  @UseInterceptors(FileInterceptor('certificate'))
  public async updateCertificate(@Req() req: Request, @UploadedFile() file: Express.Multer.File, @Body() body) {
    const formData = new FormData();
    formData.append('certificate', Buffer.from(file.buffer), {filename: file.originalname, contentType: file.mimetype});
    formData.append('certificateId', body.certificateId);
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploads}/certificate/update/${req.body['trainer']}`,
    formData,
    {headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleTrainerInterceptor)
  @Post('/image/training/:id')
  @UseInterceptors(UseridTrainingInterceptor)
  @UseInterceptors(FileInterceptor('image'))
  public async postImage(@UploadedFile() file: Express.Multer.File,@Param('id') id: string) {
    const formData = new FormData();
     formData.append('image', Buffer.from(file.buffer), {filename: file.originalname,contentType: file.mimetype});
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploads}/image/${id}`,
    formData,
    { headers: {
        'Content-Type': 'multipart/form-data'
      }
  });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleTrainerInterceptor)
  @Post('/video/training/:id')
  @UseInterceptors(UseridTrainingInterceptor)
  @UseInterceptors(FileInterceptor('video'))
  public async postVideo(@UploadedFile() file: Express.Multer.File,@Param('id') id: string) {
    const formData = new FormData();
     formData.append('video', Buffer.from(file.buffer), {filename: file.originalname,contentType: file.mimetype});

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploads}/video/${id}`,
    formData,
    { headers: {
        'Content-Type': 'multipart/form-data'
      }
  });
    return data;
  }


  @Get(':id')
  public async show(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Files}/${id}`);
    return data;
  }
}
