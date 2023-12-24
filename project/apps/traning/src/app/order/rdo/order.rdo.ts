import { ApiProperty } from '@nestjs/swagger';
import { PaymentType } from '@project/shared/app-types';
import { Expose, Transform } from 'class-transformer';

export class OrderRdo {
  @ApiProperty({
    description: 'The uniq user ID',
  })
  @Expose({ name: '_id'})
  @Transform((value) => value.obj['_id'])
  public id: string;

  @ApiProperty({
    description: 'Author order'
  })
  @Expose()
  public userId: string;


  @ApiProperty({
    description: 'The training ID'
  })
  @Expose()
  public trainingId: string;

  @ApiProperty({
    description: 'The training ID'
  })
  @Expose()
  public trainingCount: number;

  @ApiProperty({
    description: 'The training ID'
  })
  @Expose()
  public paymentType: PaymentType;

  @ApiProperty({
    description: 'The training ID'
  })
  @Expose()
  public totalPrice: number;
}
