import { TimeTraining, TrainingLevel, TypeTraining, UserGender } from "@project/shared/app-types";
import { Expose } from "class-transformer";

export class TraningRdo {

  @Expose()
  //@Transform(({obj}) => obj._id.toString())
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public image: string;

  @Expose()
  public trainingLevel: TrainingLevel

  @Expose()
  public typeTraining: TypeTraining

  @Expose()
  public timeTraining: TimeTraining

  @Expose()
  public price: number

  @Expose()
  public caloriesBurnedTraining: number

  @Expose()
  public description: string;

  @Expose()
  public gender: UserGender;

  @Expose()
  public video: string;

  @Expose()
  public rating: number;

  @Expose()
  public trainer: string;

  @Expose()
  public specialOffer: boolean;
}
