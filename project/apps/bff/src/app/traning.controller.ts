import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { TrainerIdInterceptor } from './interceptors/trainer-id.interceptor';
import { ApplicationServiceURL } from './app.config';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { CreateTraningDto, UpdateTraningDto } from '@project/shared/shared-dto';
import { TraningQueryDto } from '@project/shared/shared-query';
import {CommentQuery} from '@project/shared/shared-query';

@Controller('training')
@UseFilters(AxiosExceptionFilter)
export class TraningController {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(TrainerIdInterceptor)
  @Post('/')
  public async create(@Body() dto: CreateTraningDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Traning}/create`, dto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(TrainerIdInterceptor)
  @Patch('/')
  public async update(@Body() dto: UpdateTraningDto, @Param('id', MongoidValidationPipe) id: string) {

    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Traning}/update/${id}`, dto);
    return data;
  }

  @Get('/comments/:id')
  public async showCommentsByTraining(@Req() req: Request, @Param('id') id: string, @Query() query: CommentQuery) {

    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Comment}/${id}`, {params : query});
    await Promise.all(data.map(async (el) => {
      const user = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Auth}/${el.userId}`, {
        headers: {
          'Authorization': req.headers['authorization']
        }
      });

      el.userName = user.data.userName;
      if (user.data.avatar) {
      const {data: {path}}  = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Files}/${user.data.avatar}`);
      el.avatarPath = path
      }
       }));

   return data;
  }


  @UseGuards(CheckAuthGuard)
  @Get('count')
  public async trainingCount() {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Traning}/show/list`);
    const prices = data.map((el) => el.price ? el.price : 0);
    const maxPrice = prices.length !== 0 ? prices.reduce((prev, current) => (prev > current) ? prev : current) : 0;

    return {totalTrainings: data.length, maxPrice: maxPrice};
  }

  @UseGuards(CheckAuthGuard)
  @Get('catalog')
  public async showCatalog(@Query() query: TraningQueryDto) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Traning}/show/list`, {params : query});
    await Promise.all(data.map(async (el) => {
      if (el.image) {
        const {data: {path}}  = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Files}/${el.image}`);
        el.image = path
      }

    }))

    return data;
  }


  @Get('/:trainerId')
  public async showList( @Param('trainerId') trainerId: string, @Query() query: TraningQueryDto) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Traning}/trainer/list/${trainerId}`, {params : query});
    await Promise.all(data.map(async (el) => {
      if (el.image) {
        const {data: {path}}  = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Files}/${el.image}`);
        el.image = path
      }

    }))
    return data;
  }
}
