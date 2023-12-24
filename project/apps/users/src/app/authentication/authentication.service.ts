import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { BaseUser, UserRole } from '@project/shared/app-types';
import dayjs from 'dayjs';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './authentication.const';
import { LoginUserDto } from '@project/shared/shared-dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from '@project/config/config-users';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import * as crypto from 'node:crypto';
import { createJWTPayload } from '@project/util/util-core';
import { CreateUserDto } from '@project/shared/shared-dto';
import { UserEntity } from '../user/user.entity';
import { TrainerEntity } from '../trainer/trainer.entity';
import { TrainerRepository } from '../trainer/trainer.repository';
import { ClientRepository } from '../client/client.repository';
import { ClientEntity } from '../client/client.entity';


@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly trainerRepository: TrainerRepository,
    private readonly clientRepository: ClientRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,

    @Inject (jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
  ) {}

  public async register(dto: CreateUserDto) {
    const {email, dateBirth, password} = dto;

    const user = { ...dto, dateBirth: dayjs(dateBirth).toDate(),
      passwordHash: '',
    };

    const existUser = await this.userRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new UserEntity(user)
      .setPassword(password)

    const newUser = await this.userRepository
      .create(userEntity);


    if (dto.role === UserRole.Trainer) {

      this.trainerRepository
      .create(new TrainerEntity({...dto, userId: newUser._id}));
      return newUser;
    }

    this.clientRepository
      .create(await new ClientEntity({...dto, userId: newUser._id}));

    return newUser;
  }

  public async checkEmail(email: string) {
    const existUser = await this.userRepository.findByEmail(email);
    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
        }
    return {email: null}
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.userRepository.findByEmail(email);


    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const userEntity = new UserEntity(existUser);
      if (!await userEntity.comparePassword(password)) {
          throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
        }

        return userEntity.toObject();
  }

  public async getUser(id: string) {
    const user = await this.userRepository.findById(id);
    console.log(user)
    if (user.role === UserRole.Trainer) {
      const trainer = await this.userRepository.infoTrainer(user._id)
      return trainer
    }

    const client = await this.userRepository.infoClient(user._id)
    console.log(client)
    return client
  }

  public async createUserToken(user: BaseUser) {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload)

    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      })
    }
  }

  public async changeAvatar(userId: string, fileId: string) {
    const existUser = await this.userRepository.findById(userId);
    if (!existUser)   {
    throw new ConflictException(AUTH_USER_EXISTS);
    }
    return this.userRepository.updateAvatar(userId, fileId);
  }

  public async changeBackgroundImg(userId: string, fileId: string) {
    const existUser = await this.userRepository.findById(userId);
    if (!existUser)   {
      throw new ConflictException(AUTH_USER_EXISTS);
    }
    return this.userRepository.updateBackgroundImg(userId, fileId);
  }
}
