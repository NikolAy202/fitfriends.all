import { RequestStatus } from "./request-status.enum";
import { RequestType } from "./request-type.interface";


export interface TrainingRequest {
  _id?: string;
  authorId: string;
  userId: string;
  status: RequestStatus;
  type: RequestType;
  updatedAt?: Date;
  createdAt: Date;
}

export interface TrainingRequestWithName {
  _id?: string;
  authorId: string;
  userId: string;
  status?: RequestStatus;
  type?: RequestType;
  updatedAt?: Date;
  createdAt: Date;
  authorName: string
}
