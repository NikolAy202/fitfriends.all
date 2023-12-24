import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { SharedUser, Trainer } from '@project/shared/app-types';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TrainerModel } from './trainer.model';
import { TrainerEntity } from './trainer.entity';


@Injectable()
export class TrainerRepository implements CRUDRepository<TrainerEntity, string, SharedUser> {
  constructor(
    @InjectModel(TrainerModel.name) private readonly trainerModel: Model<TrainerModel>) {
  }

  public async create(item: TrainerEntity): Promise<Trainer> {
    const newUser = new this.trainerModel(item);
    return newUser.save();
  }

  public async destroy(id: string): Promise<void> {
    this.trainerModel.deleteOne({id});
  }

  public async findById(id: string): Promise<Trainer | null> {
    return  this.trainerModel
      .findOne({_id: id})
      .exec();
  }


  public async findByUserId(userId: string): Promise<Trainer | null> {
    return this.trainerModel
      .findOne({userId})
      .exec();

    }

    public async update(id: string, item: TrainerEntity): Promise<Trainer> {
      return this.trainerModel
        .findByIdAndUpdate(id, item.toObject(), {new: true})
        .exec();
    }

    public async updateCertificate(id: string, certificateId: string): Promise<Trainer | null> {
      const trainer = await this.trainerModel.findOne({_id: id}).exec();
      const existsFile = trainer.certificates.includes(certificateId);
      console.log(certificateId)
      if(!existsFile) {
      const certificates = [...trainer.certificates, certificateId];
      return this.trainerModel
        .findOneAndUpdate({_id: id}, {certificates: certificates}, {new: true})
        .exec();
      }
      return this.trainerModel
      .findOneAndUpdate({_id: id}, {certificates: certificateId}, {new: true})
      .exec();
    }
  }
