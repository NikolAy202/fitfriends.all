import { Comment } from '@project/shared/app-types'

export class CommentEntity implements Comment {
  public _id: string;
  public userId: string;
  public traningId: string;
  public ratingTraining: number;
  public text: string;

 constructor(commentTraining: Comment) {
    this.fillEntity(commentTraining);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(commentTraining: Comment) {
    this._id = commentTraining._id;
    this.userId = commentTraining.userId;
    this.traningId = commentTraining.traningId;
    this.ratingTraining = commentTraining.ratingTraining;
    this.text = commentTraining.text;

  }
}
