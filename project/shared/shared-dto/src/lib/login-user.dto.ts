import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { PasswordLength } from './const.dto';

export class LoginUserDto {

  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  @IsEmail({}, {message: 'email must be valid address'})
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString({message: 'password is required'})
  @Length(PasswordLength.MIN, PasswordLength.MAX, {message: 'Min length for password is 6, max is 12'})
  public password: string;

}
