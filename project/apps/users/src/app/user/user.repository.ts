import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { BaseUser, Trainer} from '@project/shared/app-types';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './user.model';
import { UserEntity } from './user.entity';
import { UsersQueryDto } from '@project/shared/shared-query';
import { UsersQuery } from './query/users-query';


@Injectable()
export class UserRepository implements CRUDRepository<UserEntity, string, BaseUser> {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>)
     {
  }

  public async create(item: UserEntity): Promise<BaseUser> {

    const newUser = new this.userModel(item);
    return newUser.save();
  }

  public async destroy(id: string): Promise<void> {
    this.userModel.deleteOne({id});
  }

  public async findById(id: string): Promise<BaseUser | null> {
    return  this.userModel
      .findOne({_id: id})
      .exec();
  }

  public async find(ids: string[]) {
    const friends = await this.userModel
    .find({ _id: { $in: ids } })
    .exec();

  return friends;
  }

  public async findByEmail(email: string): Promise<BaseUser | null> {
    return this.userModel
      .findOne({email})
      .exec();

    }

    public async update(id: string, item: UserEntity): Promise<BaseUser> {
      return this.userModel
        .findByIdAndUpdate(id, item.toObject(), {new: true})
        .exec();
    }

    public async infoTrainer(id: string): Promise<BaseUser & Trainer> {
      const trainerInfo = await this.userModel
      .aggregate([
        {$match: { _id: id}},
        { $addFields: { user_id: id}},
        {
          $lookup: {
            from: 'trainers',
            let: { user_id: '$_id' },
            pipeline: [
              { $addFields: { userId: { '$toObjectId': '$userId' }}},
              { $match: { $expr: { $eq: [ '$userId', '$$user_id' ] } } }
            ],
            as: 'result'
          },
        },
        {$unwind: '$result'},
        {
          $project:{
              _id : 1,
              userName : 1,
              email : 1,
              avatar : 1,
              gender : 1,
              dateBirth : 1,
              role : 1,
              description : 1,
              location : 1,
              image : 1,
              friends:1,
              trainingLevel : "$result.trainingLevel",
              typeTraining : 1,
              certificates : "$result.certificates",
              merits : "$result.merits",
              personalTraining : "$result.personalTraining",
          }
      }
      ]).exec();
      return trainerInfo[0];
    }

    public async infoClient(id: string): Promise<BaseUser & Trainer> {
      const clientInfo = await this.userModel
      .aggregate([
        {$match: { _id: id}},
        { $addFields: { user_id: id}},
        {
          $lookup: {
            from: 'clients',
            let: { user_id: '$_id' },
            pipeline: [
              { $addFields: { userId: { '$toObjectId': '$userId' }}},
              { $match: { $expr: { $eq: [ '$userId', '$$user_id' ] } } }
            ],
            as: 'result'
          },
        },
        {$unwind: '$result'},
        {
          $project:{
              _id : 1,
              userName : 1,
              email : 1,
              avatar : 1,
              gender : 1,
              dateBirth : 1,
              role : 1,
              description : 1,
              location : 1,
              image : 1,
              friends:1,
              trainingLevel : 1,
              typeTraining : 1,
              timeTraining : "$result.timeTraining",
              caloriesBurnedTraining : "$result.caloriesBurnedTraining",
              caloriesBurnedDay : "$result.caloriesBurnedDay",
              trainingReadiness : "$result.trainingReadiness",
          }
      }
      ]).exec();
      return clientInfo[0];
    }

  //   public async findAll(query: UsersQuery, userId: string): Promise<User[]> {
  //     const queryObj = new UsersQuery(query).toObject()
  //     //const objQuery = (query);

  //        const usersInfo =  await this.userModel
  //       .aggregate([
  //        { $match: { $expr : { $ne: [ '$_id' , { $toObjectId: userId } ] } } },
  //        {
  //          $lookup: {
  //            from: 'questionnairesUser',
  //            let: { user_id: '$_id' },
  //            pipeline: [
  //              { $addFields: { userId: { '$toObjectId': '$userId' }}},
  //              { $match: { $expr: { $eq: [ '$userId', '$$user_id' ] } } },
  //              { $project: { levelTraining: 1, trainingType: 1, isReady: 1}}
  //            ],
  //            as: 'resultUser'
  //          },
  //        },
  //        { "$unwind": {"path": "$resultUser", "preserveNullAndEmptyArrays": true}
  //        },
  //        { $addFields: { levelTraining: "$resultUser.levelTraining"}},
  //        {
  //          $lookup: {
  //            from: 'questionnairesCoach',
  //            let: { user_id: '$_id' },
  //            pipeline: [
  //              { $addFields: { userId: { '$toObjectId': '$userId' }}},
  //              { $match: { $expr: { $eq: [ '$userId', '$$user_id' ] } } },
  //              { $project: { levelTraining: 1, trainingType: 1}}
  //            ],
  //            as: 'resultCoach'
  //          },
  //        },
  //       { "$unwind": {"path": "$resultCoach","preserveNullAndEmptyArrays": true}
  //       },
  //       { $addFields: {
  //        levelTraining: {
  //        $cond: [
  //            {
  //                "$ifNull": [
  //                    "$resultUser.levelTraining",
  //                     false
  //                ]
  //            },
  //            "$resultUser.levelTraining",
  //            "$resultCoach.levelTraining"
  //        ]
  //      },
  //      trainingType: {
  //      $cond: [
  //          {
  //              "$ifNull": [
  //                  "$resultUser.trainingType",
  //                   false
  //              ]
  //          },
  //          "$resultUser.trainingType",
  //          "$resultCoach.trainingType"
  //      ]
  //    },
  //    isReady: {
  //      $cond: [
  //        {
  //            "$ifNull": [
  //                "$resultUser.isReady",
  //                 false
  //            ]
  //        },
  //        "$resultUser.isReady",
  //        " "
  //    ]
  //    }
  //  }
  //  },
  //       { $match: objQuery.objFiltr},
  //       { $sort: objQuery.objSort},
  //       { $limit: objQuery.limitNumber}
  //       ])
  //      .exec();

  //    return usersInfo
  //    }

    public async showCatalog(query: UsersQueryDto): Promise<BaseUser[]> {
      const queryObj = new UsersQuery(query).toObject()
      return this.userModel
        .find(queryObj.filter)
        .sort(queryObj.sort)
        .limit(queryObj.limit)
        .exec();
     }

    public async addFriend(id: string, newFriends: string[]): Promise<BaseUser> {
      return this.userModel
        .findByIdAndUpdate(id, {friends: newFriends}, {new: true})
        .exec();
    }

    public async updateAvatar(id: string, fileId: string): Promise<BaseUser> {
      return this.userModel
        .findByIdAndUpdate(id, {avatar: fileId}, {new: true})
        .exec();
    }

    public async updateBackgroundImg(id: string, fileId: string): Promise<BaseUser> {
      return this.userModel
        .findByIdAndUpdate(id, {image: fileId}, {new: true})
        .exec();
    }
  }
