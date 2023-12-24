import { ApiProperty } from "@nestjs/swagger";
import { Max, MaxLength, Min, MinLength } from "class-validator";
import { CommentLength, Rating } from './const.dto';

export class CommentDto {

  @ApiProperty({
    description: 'Text comment'
  })
  @MinLength(CommentLength.MIN)
  @MaxLength(CommentLength.MAX)
  public text: string;

  @ApiProperty({
    description: 'Rating training'
  })
  @Min(Rating.MIN)
  @Max(Rating.MAX)
  public ratingTraining: number;

  @ApiProperty({
    description: 'Author comment'
  })
  public userId: string;
}
