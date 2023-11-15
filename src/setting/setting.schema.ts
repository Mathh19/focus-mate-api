import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/user/user.schema";

@Schema({ timestamps: true })
export class Setting {

  @Prop({ default: 1500 })
  pomodoroTime: number;

  @Prop({ default: 300 })
  shortRestTime: number;

  @Prop({ default: 900 })
  longRestTime: number;

  @Prop({ default: 4 })
  cycles: number;

  @Prop({ default: false })
  auto: boolean;

  @Prop({ default: 100 })
  volume: number;

  @Prop({ default: 'defaultTheme' })
  theme: string;

  @Prop({ default: false })
  notification: boolean;

  @Prop({ default: false })
  routineMode: boolean;

  @Prop({ default: false })
  vibrate: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);