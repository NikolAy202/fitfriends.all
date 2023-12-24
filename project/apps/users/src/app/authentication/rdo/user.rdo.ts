import { TimeTraining, Location, TrainingLevel, TypeTraining, UserRole } from '@project/shared/app-types';
import { Expose, Transform } from 'class-transformer';

export class UserRdo {

  @Expose({ name: '_id'})
  @Transform(({obj}) => obj._id.toString())
  public id: string;


  @Expose()
  public avatar: string;


  @Expose()
  public dateBirth: string;


  @Expose()
  public email: string;

  @Expose()
  public userName: string;


  @Expose()
  public role: UserRole;

  @Expose()
  public gender?: string;

  @Expose()
  public merits?: string;

  @Expose()
  public description?: string;

  @Expose()
  public location?: Location;

  @Expose()
  public image?: string;

  @Expose()
  public trainingLevel?: TrainingLevel;

  @Expose()
  public typeTraining?: TypeTraining;

  @Expose()
  public certificates?: string;

  @Expose()
  public personalTraining?: boolean;

  @Expose()
  public trainingReadiness?: boolean;

  @Expose()
  public caloriesBurnedDay?: number;

  @Expose()
  public caloriesBurnedTraining?: number;

  @Expose()
  public timeTraining?: TimeTraining;

  @Expose()
  public friends?: string[];
}
