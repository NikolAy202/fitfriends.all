import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderRepository } from './order.repository';
import { OrderModel, OrderSchema } from './order.model';
import { OrderController } from './order.controller';
import { TraningModule } from '../traning/traning.module';
import { OrderService } from './order.service';
import { UserBalanceModule } from '../user-balance/user-balance.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrderModel.name, schema: OrderSchema }]),
    TraningModule,
    UserBalanceModule
  ],
  controllers: [OrderController],
  providers: [OrderRepository, OrderService],
})
export class OrderModule {}
