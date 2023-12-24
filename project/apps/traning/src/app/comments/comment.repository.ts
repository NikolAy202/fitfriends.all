import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { Comment } from '@project/shared/app-types';
import { CommentQuery } from './query/comment.query';
import { InjectModel } from '@nestjs/mongoose';
import { CommentModel } from './comments.model';
import { Model } from 'mongoose';


@Injectable()
export class CommentRepository {
  constructor(
    @InjectModel(CommentModel.name) private readonly commentModel: Model<CommentModel>) {
  }

  public async create(item: CommentEntity): Promise<Comment> {
    const newComment = new this.commentModel(item);
    return newComment.save();
  }


  public async findByTrainingId(traningId: string, query?: CommentQuery): Promise<Comment[] > {
    if(query) {
      const {limit, sortDirection, page} = query
        return this.commentModel
          .find({traningId: traningId})
          .sort({ createdAt: sortDirection })
          .limit(page * limit)
          .exec();
    }

    return this.commentModel.find({traningId: traningId}).exec();
    }

}
