import { ApiProperty } from "@nestjs/swagger";
import { TimeTraining, TrainingLevel, TypeTraining, UserGender, UserRole, Location } from "@project/shared/app-types";
import { ArrayMaxSize, IsArray, IsBoolean, IsEnum, IsISO8601, IsInt, IsOptional, IsString, Length, Min, ValidateIf } from "class-validator";

const MAX_TRAINING_COUNT = 50;

export class UpdateUserDto {

  @ApiProperty({
    description: 'User birth date',
    example: '1981-03-12',
  })
  @IsISO8601({}, { message: 'The user date birth is not valid' })
  @IsOptional()
  public dateBirth?: Date;

  @ApiProperty({
    description: 'User name',
    example: 'Keks',
  })
  @IsString()
  @Length(1, 15, {message: 'Min length name is 1, max is 15'})
  @IsOptional()
  public userName?: string;

  @ApiProperty({
    description: 'User gender',
    example: 'male'
  })
  @IsEnum(UserGender, {message: 'type must be one of male, female or no matter'})
  @IsOptional()
  public gender?: UserGender;

  @ApiProperty({
    description: 'User avatar',
    example: 'upload/avatar12'
  })
  @IsString()
  @IsOptional()
  public avatar?: string;

  @ApiProperty({
    description: 'Text with general information',
    example: 'Хороший кот ищет товарищей для тренировки'
  })
  @IsString()
  @Length(10, 140, {message: 'Min length text is 10, max is 140'})
  @IsOptional()
  public description?: string;

  @ApiProperty({
    description: 'Metro station',
    example: 'Пионерская'
  })
  @IsEnum(Location)
  @IsOptional()
  public location?: Location;

  @ApiProperty({
    description: 'Background image for the users card',
    example: 'upload/image/user12/21'
  })
  @IsString()
  @IsOptional()
  public image?: string;

  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  @IsEnum(TrainingLevel, {message: 'email must be valid address'})
  @IsOptional()
  public trainingLevel?: TrainingLevel;


  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  @IsEnum(TypeTraining, { each: true })
  @ArrayMaxSize(MAX_TRAINING_COUNT)
  @IsOptional()
  public typeTraining?: TypeTraining[];


  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  @ValidateIf(o => o.role === UserRole.User)
  @IsEnum(TimeTraining, {message: 'email must be valid address'})
  @IsOptional()
  public timeTraining?: TimeTraining;

  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  @ValidateIf(o => o.role === UserRole.User)
  @IsInt()
  @IsOptional()
  public caloriesBurnedTraining?: number;

  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  @ValidateIf(o => o.role === UserRole.User)
  @IsInt()
  @Min(0, {message: 'Minimum calories is 0'})
  @IsOptional()
  public caloriesBurnedDay?: number;

  @IsBoolean()
  @IsOptional()
  public trainingReadiness?: boolean;

  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  @ValidateIf(o => o.role === UserRole.Trainer)
  @IsArray({message: 'password is required'})
  @IsOptional()
  public certificates?: string[];

  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  @ValidateIf(o => o.role === UserRole.Trainer)
  @IsString()
  @IsOptional()
  public merits?: string;


  @ApiProperty({
    description: 'Conducts personal trainings'
  })
  @ValidateIf(o => o.role === UserRole.Trainer)
  @IsBoolean()
  @IsOptional()
  public personalTraining?: boolean;
}
