import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class CommentRdo {
  @ApiProperty({
    description: 'The uniq user ID',
  })
  @Expose({ name: '_id'})
  @Transform((value) => value.obj['_id'])
  public id: string;

  @ApiProperty({
    description: 'Author comment'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'The training ID'
  })
  @Expose()
  public traningId: string;

  @ApiProperty({
    description: 'Rating training'
  })
  @Expose()
  public ratingTraining: number;

  @ApiProperty({
    description: 'Text comment'
  })
  @Expose()
  public text: string;


  @ApiProperty({
    description: 'Comment created date',
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'Error'
  })
  @Expose()
  public error: string;
}
