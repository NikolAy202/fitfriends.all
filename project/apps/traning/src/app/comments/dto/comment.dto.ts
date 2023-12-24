import { ApiProperty } from "@nestjs/swagger";
import { Max, MaxLength, Min, MinLength } from "class-validator";

export class CommentDto {

  @ApiProperty({
    description: 'Text comment'
  })
  @MinLength(100)
  @MaxLength(1024)
  public text: string;

  @ApiProperty({
    description: 'Rating training'
  })
  @Min(0)
  @Max(5)
  public ratingTraining: number;

  @ApiProperty({
    description: 'Author comment'
  })
  public userId: string;
}
