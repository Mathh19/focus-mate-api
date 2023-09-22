import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  weekDays: {
    type: [{ day: { type: String } }]
  },
  finished: Boolean,
  focused: Boolean
});

const Task = models.Task || model('Task', TaskSchema);

export default Task;