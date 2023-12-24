export type QuestionnaireCoach = {
  trainingLevel: TrainingLevel;
  typeTraining: TypeTraining[];
  certificate?: string;
  merits: string;
  personalTraining: boolean;
}

export type QuestionnaireUser = {
  trainingLevel: TrainingLevel;
  typeTraining: TypeTraining[];
  timeTraining: TimeTraining;
  caloriesReset: number;
  caloriesSpend: number;
  trainingReadiness: boolean;
}

export enum TimeTraining {
  Time30 = '10-30 мин',
  Time50 = '30-50 мин',
  Time80 = '50-80 мин',
  Time100 = '80-100 мин'
}

export const TIME_TRAINING_LIST = Object.values(TimeTraining);

export enum TypeTraining {
  Yoga = 'йога',
  Running = 'бег',
  Boxing = 'бокс',
  Stretching = 'стрейчинг',
  Crossfit = 'кроссфит',
  Aerobics = 'аэробика',
  Pilates = 'пилатес',
}
export const TRAINING_LIST = Object.values(TypeTraining);


export enum TrainingLevel {
  Beginner = 'новичок',
  Amateur = 'любитель',
  Professional = 'профессионал',
}

export const TRAINING_LEVEL_LIST = Object.values(TrainingLevel);
