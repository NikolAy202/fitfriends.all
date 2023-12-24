import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { Request } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import {CreateUserDto} from '@project/shared/shared-dto'
import { CheckAuthGuard } from './guards/check-auth.guard';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { UserIdInterceptor } from './interceptors/user-id.interseptor';
import { UpdateUserDto } from '@project/shared/shared-dto';
import { UsersQueryDto } from '@project/shared/shared-query';
import { RequestWithTokenPayload, TrainingRequest } from '@project/shared/app-types';
import { UseridNotifyInterceptor } from './interceptors/user-id-notify.interseptor';
import { UserIdRequestInterceptor } from './interceptors/user-id.request.interceptor';
import { RoleUserInterceptor } from './interceptors/role-user.intersceptor';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @Post('register')
  public async create(@Body() createUserDto: CreateUserDto) {

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/register`, createUserDto);
    return data;
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/login`, loginUserDto);
    return data;
  }

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }

  @Post('check/email')
public async checkEmail(@Body() email: string) {
  const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/check/email`, email);
  return data;
}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Get('login/auth')
  public async loginUser(@Body() body, @Req() req: Request) {

    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Auth}/${body.userId}`,  {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    if (data.avatar) {
      const {data: {path}}  = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Files}/${data.avatar}`);
      data.avatarPath = path
      }

    if (data.certificates) {
      data.certificatesPath=[];
      await Promise.all(data.certificates.map(async (el) => {
         const {data: {path}}  = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Files}/${el}`);
         data.certificatesPath.push({certificateId: el, certificatePath: path});
         }));
      }
      return data;
  }

  @UseGuards(CheckAuthGuard)
  @Get('/:id')
  public async show(@Req() req: Request, @Param('id', MongoidValidationPipe) id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Auth}/${id}`,  {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    if (data.avatar) {
      const {data: {path}}  = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Files}/${data.avatar}`);
      data.avatarPath = path
      }


      if (data.image) {
        const {data: {path}}  = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Files}/${data.image}`);
        data.image = path
        }

    if (data.certificates) {
      data.certificatesPath=[];
      await Promise.all(data.certificates.map(async (el) => {
         const {data: {path}}  = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Files}/${el}`);
         data.certificatesPath.push({certificateId: el, certificatePath: path});
         }));
      }
    return data;
}


  @UseGuards(CheckAuthGuard)
  @Post('update')
  public async edit(@Req() req: Request, @Body() UpdateUserDto: UpdateUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/update`, UpdateUserDto, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }


  @UseGuards(CheckAuthGuard)
  @Get('')
  public async showUsersList(@Req() req: Request, @Query() query: UsersQueryDto) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}`, {
      params : query,
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    await Promise.all(data.map(async (el) => {
      if (el.avatar) {
        const {data: {path}}  = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Files}/${el.avatar}`);
        el.avatar = path;
      }
      }));
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Get('notify/list')
  public async showNotifications(@Req() { user: payload }: RequestWithTokenPayload) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Notify}/list/${payload.sub}`,
  );
    return data;
  }

  @UseInterceptors(UseridNotifyInterceptor)
  @UseGuards(CheckAuthGuard)
  @Delete('notify/:id')
  public async deleteNotifications(@Param('id', MongoidValidationPipe) id: string) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Notify}/${id}`,
  );
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleUserInterceptor)
  @Get('/get/count')
  public async countUsers(@Req() req: Request, @Body() body) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}`,  {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    const users = data.filter((el)=>el.id!==body.userId)
    return users.length;
  }

  //Ответ по заявке на персональную/совместную тренировку
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdRequestInterceptor)
  @Patch('request/:id')
  public async updateRequest(@Body() dto: TrainingRequest, @Param('id', MongoidValidationPipe) id: string) {

    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Request}/update/${id}`, dto)
  return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleUserInterceptor)
  @UseInterceptors(UserIdInterceptor)
  @Get('orders')
  public async showOrders(@Req() { user: payload }: RequestWithTokenPayload) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Orders}/list/${payload.sub}`);
   return data;
  }

  @UseGuards(CheckAuthGuard)
  @Get('comments/:trainingId')
  public async showComments(@Req() req: Request, @Param('trainingId', MongoidValidationPipe) trainingId: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Comment}/${trainingId}`, {
      headers: {
      'Authorization': req.headers['authorization'],
      }
  })
  
  await Promise.all(data.map(async (el) => {
    if (el.avatar) {
      const {data: {path}}  = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Files}/${el.avatar}`);
      el.avatar = path;
    }
    }));

  return data;
  }

  @UseGuards(CheckAuthGuard)
  @Post('friend/:userId')
  public async addFriend(@Req() req: Request, @Param('userId', MongoidValidationPipe) userId: string) {

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/friend/${userId}`, null, {
      headers: {
      'Authorization': req.headers['authorization'],
      }
  })
  return data;
  }
}


