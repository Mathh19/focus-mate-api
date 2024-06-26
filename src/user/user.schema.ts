import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {

  @Prop({ required: true, minlength: 2, maxlength: 25 })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ select: false, minlength: 8 })
  password: string;

  @Prop()
  avatar: string;

  @Prop()
  avatar_url: string;
}

export const UserSchema = SchemaFactory.createForClass(User);