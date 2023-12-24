import { TimeTraining, TrainingLevel, TypeTraining } from '../../types/questionnaire.js';
import { UserGender, UserRole } from '../../types/user.js';
import { Location } from '../../types/location.enum';

export class CreateUserDto {

  public email!: string;

  public dateBirth!: string;

  public userName!: string;

  public password!: string;

  public gender!: UserGender;

  public role!: UserRole;

  public description?: string;

  public location!: Location;

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

