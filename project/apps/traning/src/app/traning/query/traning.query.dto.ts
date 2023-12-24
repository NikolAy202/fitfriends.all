import { IsArray, IsIn, IsNumber, IsOptional, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_TRANING_COUNT_LIMIT} from '../traning.const';
import { TypeTraining } from '@project/shared/app-types';

export class TraningQueryDto {
  @Transform(({ value } ) => +value || DEFAULT_TRANING_COUNT_LIMIT)
  @IsNumber()
  @Max(DEFAULT_TRANING_COUNT_LIMIT)
  public limit = DEFAULT_TRANING_COUNT_LIMIT;

  @IsIn(['asc', 'desc', 1, -1])
  @Transform(({ value } ) => value === 'desc' || value==='-1' ? -1 : 1 )
  @IsOptional()
  public sortDate?: 'desc' | 'asc' | '1' | '-1';

  @IsOptional()
  public price?: string;

  @Transform(({ value }) => {if (typeof value === "string") {return value.split(',').map((el: string) => el)} return value })
  @IsArray({})
  @IsArray({})
  @IsOptional()
  public caloriesReset?: number[];

  @Transform(({ value }) => {if (typeof value === "string") {return value.split(',').map((el: string) => el)} return value })
  @IsArray({})
  @IsOptional()
  public rating?: number[];

  @Transform(({ value }) => {if (typeof value === "string") {return value.split(',').map((el: string) => el)} return value })
  @IsArray({})
  @IsOptional()
  public trainingType?: TypeTraining[];

  @IsIn(['asc', 'desc', 1, -1])
  @Transform(({ value } ) => value === 'desc' || value==='-1' ? -1 : 1 )
  @IsOptional()
  public sortPrice?: number

  @Transform(({ value }) => +value)
  @IsOptional()
  public page?: number;
}
