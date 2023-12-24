import { RequestStatus, TrainingRequest, RequestType } from "@project/shared/app-types";



export class TrainingRequestEntity implements TrainingRequest {
  public _id: string;
  public authorId: string;
  public userId: string;
  public status: RequestStatus;
  public type: RequestType;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(item: TrainingRequest) {
    this.fillEntity(item);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(item: TrainingRequest) {
    this._id = item._id;
    this.userId = item.userId;
    this.authorId = item.authorId;
    this.status = item.status;
    this.type = item.type;
    this.createdAt = item.createdAt;
    this.updatedAt = item.updatedAt;
  }

}
