import { Body, Controller, Delete, Get, Param, Post, Req, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { AxiosExceptionFilter } from "./filters/axios-exception.filter";
import { HttpService } from "@nestjs/axios";
import { CheckAuthGuard } from "./guards/check-auth.guard";
import { ApplicationServiceURL } from "./app.config";
import { MongoidValidationPipe } from "@project/shared/shared-pipes";
import { TrainingRequest } from "@project/shared/app-types";
import { AuthorIdRequestInterceptor } from "./interceptors/author-id-request.interseptor";
import { RoleUserInterceptor } from "./interceptors/role-user.intersceptor";
import { CommentDto, CreateOrderDto } from "@project/shared/shared-dto";
import { UserIdInterceptor } from "./interceptors/user-id.interseptor";

@Controller('client')
@UseFilters(AxiosExceptionFilter)
export class ClientsController {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  //Список друзей пользователя
  @UseGuards(CheckAuthGuard)
  @Get('friends')
  public async showFriends(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/friends`, {
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
  @Get('balance')
  public async showBalance(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/balance`, {
      headers: {
      'Authorization': req.headers['authorization'],
      }
  })
  await Promise.all(data.map(async (el) => {

    const {data} = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Traning}/${el.trainingId}`);
    if (data.image) {
      const {data: {path}}  = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Files}/${data.image}`);
      data.image = path;
    }
    el.training = data;
  }))

  return data;
  }

  @UseGuards(CheckAuthGuard)
  @Post('subscribe/:trainerId')
  public async subscribeToTrainer(@Req() req: Request, @Param('trainerId', MongoidValidationPipe) trainerId: string) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/subscribe/${trainerId}`, null, {
      headers: {
      'Authorization': req.headers['authorization'],
      }
  })
  return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(AuthorIdRequestInterceptor)
  @UseInterceptors(RoleUserInterceptor)
  @Post('request')
  public async requestTraining(@Body() dto: TrainingRequest) {

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Request}/create`, dto)
  return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @UseInterceptors(RoleUserInterceptor)
  @Post('order/:trainingId')
  public async buyTraining(@Body() dto: CreateOrderDto,  @Param('trainingId', MongoidValidationPipe) trainingId: string) {

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Orders}/create/${trainingId}`, dto)
  return data;
  }



  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleUserInterceptor)
  @Delete('subscribe/:trainerId')
  public async unsubscribeFromTrainer(@Req() req: Request, @Param('trainerId', MongoidValidationPipe) trainerId: string) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Users}/subscribe/${trainerId}`, {
      headers: {
      'Authorization': req.headers['authorization'],
      }
  })
  return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleUserInterceptor)
  @UseInterceptors(UserIdInterceptor)
  @Post('comments/:trainingId')
  public async createComment(@Req() req: Request, @Param('trainingId', MongoidValidationPipe) trainingId: string, @Body() dto: CommentDto) {

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Comment}/create/${trainingId}`, dto, {
      headers: {
      'Authorization': req.headers['authorization'],
      }
  })
  return data;
  }

}
