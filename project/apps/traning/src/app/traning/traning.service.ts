import { Injectable } from '@nestjs/common';
import { TraningRepository } from '../traning/traning.repository';
import { TraningEntity } from './traning-entity';
import { CreateTraningDto, UpdateTraningDto } from '@project/shared/shared-dto';
import { TRANING_NOT_FOUND } from './traning.const';
import { TraningQueryDto } from './query/traning.query.dto';


@Injectable()
export class TraningService {

  constructor(
    private readonly traningRepository: TraningRepository
  ) {}

  public async create(dto: CreateTraningDto) {

    const traningEntity = await new TraningEntity(dto)

    return this.traningRepository
      .create(traningEntity);
  }

  public async update(id: string, dto: UpdateTraningDto) {
    const oldTraining = await this.traningRepository.findById(id);
    if (!oldTraining) {
      return {error: 'Traning not found'}
    }

    const training = {
      ...oldTraining,
      ...dto
    };

    const trainingEntity = new TraningEntity(training);
    return this.traningRepository.update(id, trainingEntity);
  }

  public async show(id: string) {
    const existTraining = await this.traningRepository.findById(id);
    if (!existTraining) {
      return {error: 'Traning not found'}
    }
    return existTraining;
  }

  public async showCatalog(query: TraningQueryDto) {
    const existTraining = await this.traningRepository.showCatalog(query);
    if (!existTraining) {
      return {error: TRANING_NOT_FOUND}
    }
    return existTraining;
  }


  public async showList(trainerId: string, query: TraningQueryDto) {
    const existTraining = await this.traningRepository.findByTrainerId(trainerId, query);
    if (!existTraining) {
      return {error: TRANING_NOT_FOUND}
    }
    return existTraining;
  }

  public async changeImg(trainingId: string, fileId: string) {
    const existTraining = await this.traningRepository.findById(trainingId);
    if (!existTraining) {
      return {error: TRANING_NOT_FOUND}
    }
      return this.traningRepository.updateImg(trainingId, fileId);
  }

  public async changeVideo(trainingId: string, fileId: string) {
    const existTraining = await this.traningRepository.findById(trainingId);
    if (!existTraining) {
      return {error: TRANING_NOT_FOUND}
    }
      return this.traningRepository.updateVideo(trainingId, fileId);
  }
}
