import { ApiProperty } from "@nestjs/swagger";
import { PaymentType } from "@project/shared/app-types";
import { IsEnum, IsInt, Max, Min } from "class-validator";
import { TrainingCount } from "../order.const";

export class CreateOrderDto {
  @ApiProperty({
    description: 'User Id'
  })
  public userId: string;

  @ApiProperty({
    description: 'Training count'
  })
  @IsInt()
  @Min(TrainingCount.MIN_COUNT)
  @Max(TrainingCount.MAX_COUNT)
  public trainingCount: number;

  @ApiProperty({
    description: 'type payment of training',
    example: 'mir'
  })
  @IsEnum(PaymentType, {message: 'type of payment must be one of mir, visa or iomanay'})
  public paymentType: PaymentType;


}
