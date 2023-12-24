import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class TrainingRequestRdo {
  @ApiProperty({
    description: 'The uniq user ID',
  })
  @Expose({ name: '_id'})
  @Transform((value) => value.obj['_id'])
  public id: string;

  @ApiProperty({
    description: 'Initiator ID',
  })
  @Expose()
  public authorId: string;

  @ApiProperty({
    description: 'User ID'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Status request '
  })
  @Expose()
  public status: string;

  @ApiProperty({
    description: 'Type request'
  })
  @Expose()
  public type: string;

  @ApiProperty({
    description: 'Date update'
  })
  @Expose()
  public dateUpd: string;

  @ApiProperty({
    description: 'Date create'
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'Error'
  })
  @Expose()
  public error: string;

}
