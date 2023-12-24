import { ApiProperty } from "@nestjs/swagger";
import { TimeTraining, TrainingLevel, TypeTraining, UserGender } from "@project/shared/app-types";
import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, Length, Max, Min } from "class-validator";
import { CaloriesReset, DescriptionLength, NIN_PRICE, TitleLength } from "./const.dto";

export class UpdateTraningDto {

  @ApiProperty({
    description: 'Name of traning',
    example: 'Tough leg workout!'
  })
  @Length(TitleLength.MIN, TitleLength.MAX, {message: 'Min length title is 1, max is 15'})
  @IsOptional()
  public title?: string;

  @ApiProperty({
    description: 'Background picture of the workout',
    example: 'upload/image/12'
  })
  @IsString()
  @IsOptional()
  public image?: string;


  @ApiProperty({
    description: 'Required level of training',
    example: 'beginner'
  })
  @IsEnum(TrainingLevel, {message: 'TrainingLevel must be one of the following values: beginner, amateur, professional'})
  @IsOptional()
  public trainingLevel?: TrainingLevel

  @ApiProperty({
    description: 'Type of traning',
    example: 'crossfit'
  })
  @IsEnum(TypeTraining, {message: 'TrainingLevel must be one of the following values: beginner, amateur, professional'})
  @IsOptional()
  public typeTraining?: TypeTraining

  @ApiProperty({
    description: 'Time of traning',
    example: '30-50 мин'
  })
  @IsEnum(TimeTraining, {message: ''})
  @IsOptional()
  public timeTraining?: TimeTraining

  @ApiProperty({
    description: 'Price of traning',
    example: '1500'
  })
  @IsInt()
  @Min(NIN_PRICE, {message: 'Minimum price is 0'})
  @IsOptional()
  public price?: number

  @ApiProperty({
    description: 'Energy expenditure during training',
    example: '1200'
  })
  @IsInt()
  @Min(CaloriesReset.MIN, {message: 'Minimum calories is 1000'})
  @Max(CaloriesReset.MAX, {message: 'Maximum calories is 5000'})
  @IsOptional()
  public caloriesBurnedTraining?: number

  @ApiProperty({
    description: 'Training description',
    example: 'We will work out every muscle of your legs, you will leave training as invalids.'
  })
  @IsString()
  @Length(DescriptionLength.MIN, DescriptionLength.MAX, {message: 'Min length text is 10, max is 140'})
  @IsOptional()
  public description?: string;

  @ApiProperty({
    description: 'Gender restrictions',
    example: 'no matter'
  })
  @IsString({message: ''})
  @IsOptional()
  public gender?: UserGender;

  @ApiProperty({
    description: 'Video of traning',
    example: '/upload/video/12'
  })
  @IsString()
  @IsOptional()
  public video?: string;

  @ApiProperty({
    description: 'Evaluation of training',
    example: '4'
  })
  @IsInt()
  @IsOptional()
  public rating?: number;

  @ApiProperty({
    description: 'Availability of special offers',
    example: 'false'
  })
  @IsBoolean()
  @IsOptional()
  public specialOffer?: boolean;
}
