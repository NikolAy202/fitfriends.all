import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';


export const DEFAULT_COMMENT_COUNT_LIMIT = 50;
export const DEFAULT_SORT_DIRECTION = 'desc';


export class CommentQuery {
  @Transform(({ value } ) => +value || DEFAULT_COMMENT_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_COMMENT_COUNT_LIMIT;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
