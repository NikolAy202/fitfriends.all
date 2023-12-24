import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { User } from '@project/shared/app-types';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ClientModel } from './client.model';
import { ClientEntity } from './client.entity';


@Injectable()
export class ClientRepository implements CRUDRepository<ClientEntity, string, User> {
  constructor(
    @InjectModel(ClientModel.name) private readonly userModel: Model<ClientModel>)
     {
  }

  public async create(item: ClientEntity): Promise<User> {

    const newUser = new this.userModel(item);
    return newUser.save();
  }

  public async destroy(id: string): Promise<void> {
    this.userModel.deleteOne({id});
  }

  public async findById(id: string): Promise<User | null> {
    return  this.userModel
      .findOne({_id: id})
      .exec();
  }

  public async findByUserId(userId: string): Promise<User | null> {
    return this.userModel
      .findOne({userId})
      .exec();

    }

    public async update(id: string, item: ClientEntity): Promise<User> {
      return this.userModel
        .findByIdAndUpdate(id, item.toObject(), {new: true})
        .exec();
    }
  }
