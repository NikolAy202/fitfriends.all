import { Injectable, NotFoundException} from '@nestjs/common';
import {  USER_IS_INITIATOR, REQUEST_NOT_FOUND, REQUEST_EXISTS } from './training-request.const';
import { TrainingRequestRepository } from './training-request.repository';
import { TrainingRequestEntity } from './training-request.entity';
import { RequestStatus } from '@project/shared/app-types';
import { CreateRequestDto } from '@project/shared/shared-dto';



@Injectable()
export class TrainingRequestService {
  constructor(
    private readonly requestRepository: TrainingRequestRepository
  ) {}

  public async create(dto: CreateRequestDto) {
    if (dto.userId === dto.authorId) {
     throw new NotFoundException(USER_IS_INITIATOR);
    }
    const reqTrain = await this.requestRepository.findId(dto.authorId, dto.userId)
    const isExists = reqTrain.find((el) => el.type === dto.type && el.status === dto.status);
    if (isExists) {
     throw new NotFoundException(REQUEST_EXISTS);
    }

    const requestEntity = new TrainingRequestEntity({...dto, createdAt: new Date});
    return this.requestRepository.create(requestEntity);
  }

  public async updateStatus(id: string, newStatus: RequestStatus) {
    const existsRequests = await this.requestRepository.findById(id)
    if (!existsRequests) {
     throw new NotFoundException(REQUEST_NOT_FOUND);
    }
    if (existsRequests.status === newStatus) {
      return existsRequests
    }
    console.log(newStatus)
    return this.requestRepository.updateStatus(id, newStatus);
  }

  public async getRequest(initiatorId: string, coachId: string) {
    const existsRequests = await this.requestRepository.findId(initiatorId, coachId)
    if (!existsRequests) {
      return {error: REQUEST_NOT_FOUND}
    }
    return this.requestRepository.findId(initiatorId, coachId);
  }

  public async getRequestById(id: string) {
    const existsRequests = await this.requestRepository.findById(id)
    if (!existsRequests) {
      return {error: REQUEST_NOT_FOUND}
    }
    return existsRequests
  }

  public async delete(id: string) {
    const existsRequests = await this.requestRepository.findById(id)
    if (!existsRequests) {
      return {error: REQUEST_NOT_FOUND}
    }
    return this.requestRepository.destroy(existsRequests._id);
  }

}
