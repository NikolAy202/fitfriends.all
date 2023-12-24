import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserBalance } from "@project/shared/app-types";
import { Model } from "mongoose";
import { UserBalanceModel } from "./user-balance.model";
import { UserBalanceEntity } from "./user-balanse.entity.js";


@Injectable()
export class UserBalanceRepository {
  constructor(
    @InjectModel(UserBalanceModel.name) private readonly balanceModel: Model<UserBalanceModel>)
     {
  }

  public async create(item: UserBalanceEntity): Promise<UserBalance> {
    const newOrder = new this.balanceModel(item);
    return newOrder.save();
  }


  public async findByUserId(id: string): Promise<UserBalance[] | null> {
    console.log(id)
    const b =  await this.balanceModel
      .find({userId:  id})
      .exec();

      console.log(b)

      return b
  }

}
