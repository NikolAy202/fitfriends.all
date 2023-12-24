import { IsNumber, IsOptional, IsEnum, IsArray, Max, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';
import {  TrainingLevel, UserRole } from '@project/shared/app-types';
import { DEFAULT_LIST_COUNT_LIMIT } from './query.const';

export class UsersQueryDto {
  @Transform(({ value } ) => +value || DEFAULT_LIST_COUNT_LIMIT)
  @IsNumber()
  @Max(DEFAULT_LIST_COUNT_LIMIT)
  public limit = DEFAULT_LIST_COUNT_LIMIT;


  @IsIn(['asc', 'desc', 1, -1])
  @Transform(({ value } ) => value === 'desc' || value==='-1' ? -1 : 1 )
  @IsOptional()
  public sortDate?: 'desc' | 'asc' | '1' | '-1';

  @IsEnum(UserRole)
  @IsOptional()
  public userRole?: UserRole;

  @Transform(({ value }) => {if (typeof value === "string") {return value.split(',').map((el: string) => el)} return value })
  @IsArray({})
  @IsOptional()
  public location?: string[];

  @Transform(({ value }) => {if (typeof value === "string") {return value.split(',').map((el: string) => el)} return value })
  @IsArray({})
  @IsOptional()
  public typeTaining?: string[];

  @IsEnum(TrainingLevel)
  @IsOptional()
  public trainingLevel?: TrainingLevel;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page?: number;
}
