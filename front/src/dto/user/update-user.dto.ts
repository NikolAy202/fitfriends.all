import { TimeTraining, TrainingLevel, TypeTraining } from '../../types/questionnaire';
import { UserGender } from '../../types/user';
import { Location } from '../../types/location.enum';


export class UpdateUserDto {

  public dateBirth?: Date;

  public userName?: string;

  public gender?: UserGender;

  public avatar?: string;

  public description?: string;

  public location?: Location;

  public image?: string;

  public trainingLevel?: TrainingLevel;

  public typeTraining?: TypeTraining[];

  public timeTraining?: TimeTraining;

  public caloriesBurnedTraining?: number;

  public caloriesBurnedDay?: number;

  public trainingReadiness?: boolean;

  public certificates?: string[];

  public merits?: string;

  public personalTraining?: boolean;
}
