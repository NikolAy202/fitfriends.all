import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";


export class CreateOrderDto {
  @ApiProperty({
    description: 'User Id'
  })
  public userId: string;

  @ApiProperty({
    description: 'Training Id'
  })
  @IsInt()
  public trainingId: string;

  @ApiProperty({
    description: 'Training count'
  })
  @IsInt()
  public trainingCount: number;
}
