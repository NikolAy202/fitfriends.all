import { Document, Schema as MongooseSchema} from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole, Location, BaseUser, TypeTraining, TrainingLevel } from '@project/shared/app-types';
import { UserGender } from '@project/shared/app-types';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserModel extends Document implements BaseUser {
  @Prop()
  public avatar: string;


@Prop({
  required: true,
  type: String,
  enum: TrainingLevel,
  default: TrainingLevel.Beginner,
})
public trainingLevel: TrainingLevel;

  @Prop({
    required: true,
  })
  public dateBirth: Date;

  @Prop({
    type: MongooseSchema.Types.Array
  })
  public typeTraining: TypeTraining[];


  @Prop({
    required: true,

  })
  public friends: string[];


  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public userName: string;

  @Prop()
  public description?: string;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.User,
  })
  public role: UserRole;

  @Prop({
    required: true,
    type: String,
    enum: Location
  })
  public location: Location;

  @Prop()
  public image: string;


  @Prop({
    required: true,
    type: String,
    enum: UserGender,
  })
  public gender: UserGender


}

export const UserSchema = SchemaFactory.createForClass(UserModel);
