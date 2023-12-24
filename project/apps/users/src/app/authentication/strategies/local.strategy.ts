import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from '../authentication.service';
import { UserEntity } from '../../user/user.entity';
import { Injectable } from '@nestjs/common';
import { TrainerEntity } from '../../trainer/trainer.entity';

const USERNAME_FIELD_NAME = 'email';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthenticationService) {
    super({ usernameField: USERNAME_FIELD_NAME });
  }

  public async validate(email: string, password: string): Promise<UserEntity | TrainerEntity> {
    return this.authService.verifyUser({email, password})
  }
}
