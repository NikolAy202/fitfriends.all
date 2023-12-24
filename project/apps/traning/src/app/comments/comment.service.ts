import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { TraningRepository } from '../traning/traning.repository';
import { TRANING_NOT_FOUND } from '../traning/traning.const';
import { CommentQuery } from './query/comment.query';
import { CommentDto } from './dto/comment.dto';


@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly trainingRepository: TraningRepository,
  ) {}

  public async createComment(traningId: string, dto: CommentDto) {
    const commentEntity = await new CommentEntity({...dto, traningId})
    const existTraining = await this.trainingRepository.findById(traningId);
    if (!existTraining) {
      return {error: TRANING_NOT_FOUND}
    }
    const newComment = await this.commentRepository.create(commentEntity);
    const allComments = await this.commentRepository.findByTrainingId(newComment.traningId);
    const allRatings = allComments.map((el)=>el.ratingTraining);
    const newRating = Math.round(allRatings.reduce((a,b)=>a+b)/allRatings.length);
    await this.trainingRepository.updateRating(newComment.traningId, newRating);
    return newComment
  }

  public async getTrainingId(trainingId :string, query: CommentQuery) {
    const existTraining = await this.trainingRepository.findById(trainingId);
    if (!existTraining) {
      return {error: TRANING_NOT_FOUND}
    }
    return this.commentRepository.findByTrainingId(trainingId, query);
  }


  public async createTestData(test_data) {
    const commentEntity = await new CommentEntity(test_data)
    const newComment = await this.commentRepository.create(commentEntity);
    return newComment
  }
}
