import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/user/user.schema";

@Schema({ timestamps: true })
export class Task {

  @Prop({ required: true })
  name: string;

  @Prop()
  days: string[];

  @Prop({ default: false })
  finished: boolean;

  @Prop({ default: false })
  inFocus: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);