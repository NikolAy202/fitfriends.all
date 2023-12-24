import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { EMAIL_NOT_VALID, USER_NAME_IS_EMPTY } from '../trainer-subscribers.const';

export class CreateTrainerSubscribersDto {
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  public userEmail: string;

  @IsNotEmpty({ message: USER_NAME_IS_EMPTY })
  public trainerId: string;

  @IsString()
  public trainerName: string;
}
