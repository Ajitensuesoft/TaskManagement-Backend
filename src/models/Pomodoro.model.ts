import mongoose, { Schema, Document } from "mongoose";

export interface PomodoroDocument extends Document {
  todoId: mongoose.Types.ObjectId;
  startedAt: Date | null;
  stoppedAt: Date | null;
  totalDuration: number;
  isRunning: boolean;
  isEnded: boolean;
}

const PomodoroSchema = new Schema<PomodoroDocument>(
  {
    todoId: { type: Schema.Types.ObjectId, ref: "Todo", required: true },
    startedAt: { type: Date, default: null },
    stoppedAt: { type: Date, default: null },
    totalDuration: { type: Number, default: 0 },
    isRunning: { type: Boolean, default: false },
    isEnded: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Pomodoro = mongoose.model<PomodoroDocument>("Pomodoro", PomodoroSchema);


