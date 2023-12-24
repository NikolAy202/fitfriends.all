import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { NOT_FOUND_TRAINER, NOT_FOUND_USER } from "./user.const";
import { UserEntity } from "./user.entity";
import { User, UserRole } from "@project/shared/app-types";
import { TrainerEntity } from "../trainer/trainer.entity";
import { TrainerRepository } from "../trainer/trainer.repository";
import { ClientRepository } from "../client/client.repository";
import { ClientEntity } from "../client/client.entity";
import { UpdateUserDto } from "@project/shared/shared-dto";
import { UsersQueryDto } from "@project/shared/shared-query";
import { UsersQuery } from "./query/users-query";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly trainerRepository: TrainerRepository,
    private readonly clientRepository: ClientRepository
  ) {}


  public async update(id: string, dto: UpdateUserDto) {
    const oldUser = await this.userRepository.findById(id);
    if (!oldUser) {
      return {oldUser: NOT_FOUND_USER}
    }
    const updateUser = {
      ...oldUser,
      ...dto
    };

    const userEntity = new UserEntity(updateUser);

    this.userRepository.update(id, userEntity);

    if (oldUser.role === UserRole.Trainer) {
      const oldTrainer = await this.trainerRepository.findByUserId(oldUser._id)
      const trainerEntity = new TrainerEntity({...oldTrainer, ...dto,})
      this.trainerRepository.update(oldTrainer._id, trainerEntity)
      return this.userRepository.infoTrainer(oldUser._id)
    }

    const oldClient = await this.clientRepository.findByUserId(oldUser._id)
    const clientEntity = new ClientEntity({...oldClient, ...dto})
    this.clientRepository.update(oldClient._id, clientEntity)

    return this.userRepository.infoClient(oldUser._id)
  }

  public async getUsers(query: UsersQueryDto) {
    const existUsers = await this.userRepository.showCatalog(query);
    if (!existUsers) {
      throw new NotFoundException(NOT_FOUND_USER);
    }
    return existUsers;
   }

  public async show(id: string) {
    const existTraining = await this.userRepository.findById(id);
    if (!existTraining) {
      return {error: NOT_FOUND_USER}
    }
    return existTraining;
  }


  public async addFriend(id: string, newFriendId: string) {
    const existUser = await this.userRepository.findById(id);
    const existNewFriend = await this.userRepository.findById(newFriendId);
    if (!existUser && !existNewFriend) {
      return {error: NOT_FOUND_USER}
    }

    const newListFriends = [...existUser.friends, existNewFriend._id]

    return await this.userRepository.addFriend(id, newListFriends);
  }


  public async showFriend(id: string) {
    const existUser = await this.userRepository.findById(id);
    if (!existUser ) {
      return {error: NOT_FOUND_USER}
    }

   const katalog = existUser.friends;
   return await this.userRepository.find(katalog)
  }

  public async findById(id: string) {
  return await this.userRepository.findById(id)

  }

  public async subscribeTrainer (userId: string, trainerId: string) {
    const existUser = await this.userRepository.findById(userId);
    if (!existUser ) {
      return {error: NOT_FOUND_USER}
    }

    const existTrainer = await this.userRepository.findById(trainerId);
    if (existTrainer) {
      return {error: NOT_FOUND_TRAINER}
   }

   const subscribe = {
    userEmail: existUser.email,
    trainerId: trainerId,
    trainerName: existTrainer.userName
  }

   return subscribe
}

public async changeTrainerCetrificate(trainerId: string, fileId: string) {
  console.log(trainerId)
  const existUser = await this.trainerRepository.findByUserId(trainerId);
  console.log(existUser)
  if (!existUser)   {
  return {error: NOT_FOUND_USER}
  }
  console.log(2)
  return this.trainerRepository.updateCertificate(existUser._id, fileId);
}
}
