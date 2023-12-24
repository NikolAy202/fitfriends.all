import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { OrderService } from "./order.service";
import { Body, Controller, Get, HttpStatus, Param, Post } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create.order.dto";
import { fillObject } from "@project/util/util-core";
import { OrderRdo } from "./rdo/order.rdo";
import { BalanceService } from "../user-balance/user-balance.service";

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly balanceService: BalanceService,

  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.'
  })
  @Post('create/:trainingId')
  public async create(@Param('trainingId') trainingId: string, @Body() dto: CreateOrderDto) {

    const newOrder = await this.orderService.create(dto, trainingId);

    await this.balanceService.createBalance(newOrder);

    return fillObject(OrderRdo, newOrder);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: ''
  })
  @Get('show/list/:trainerId')
  public async showOrder(@Param('trainerId') trainerId: string) {

    const orders = await this.orderService.showListByTrainer(trainerId);

    return fillObject(OrderRdo, orders);
  }


  @ApiResponse({
    status: HttpStatus.OK,
    description: ''
  })
  @Get('list/:id')
  public async showOrderForUser(@Param('id') userId: string) {

    const orders = await this.orderService.showListByUser(userId);

    return fillObject(OrderRdo, orders);
  }
}
