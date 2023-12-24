import { CRUDRepository } from '@project/util/util-types';
import { TrainerSubscribersEntity } from './trainer-subscribers.entity';
import { Subscription } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TrainerSubscribersModel } from './trainer-subscribers.model';
import { Model } from 'mongoose';

@Injectable()
export class TrainerSubscribersRepository implements CRUDRepository<TrainerSubscribersEntity, string, Subscription> {
  constructor(
    @InjectModel(TrainerSubscribersModel.name) private readonly trainerSubscribersModel: Model<TrainerSubscribersModel>
  ) {}

  public async create(item: TrainerSubscribersEntity): Promise<Subscription> {
    const newEmailSubscriber = new this.trainerSubscribersModel(item);
    return newEmailSubscriber.save();
  }

  public async destroy(id: string): Promise<void> {
    console.log(id.toString())
    this.trainerSubscribersModel
      .deleteOne({_id: id.toString()});
  }


  public async findByEmailAndId(trainerId: string, userEmail:string): Promise<Subscription | null> {
    return this.trainerSubscribersModel
      .findOne({trainerId: trainerId, userEmail:userEmail})
      .exec();
  }

  public async findByEmailAndIdAndDelete(trainerId: string, userEmail:string): Promise<void> {
    this.trainerSubscribersModel
      .deleteOne({trainerId: trainerId, userEmail:userEmail})
      .exec();
  }

  public async findById(id: string): Promise<Subscription | null> {
    return this.trainerSubscribersModel
      .findOne({ _id: id })
      .exec();
  }

  public async findByIdAndDelete(id: string): Promise<void> {
    this.trainerSubscribersModel
      .deleteOne({ _id: id.toString })
      .exec();
  }

  public async findByTrainerId(trainerId: string): Promise<Subscription[] | null> {
    console.log(typeof trainerId)
    return this.trainerSubscribersModel
      .find({ trainerId: trainerId})
      .exec();
  }

  public async update(id: string, item: TrainerSubscribersEntity): Promise<Subscription> {
    return this.trainerSubscribersModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }

  public async findByEmail(email: string): Promise<Subscription | null> {
    return this.trainerSubscribersModel
      .findOne({ email })
      .exec()
  }
}
