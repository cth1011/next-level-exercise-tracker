import mongoose, { Document, model } from "mongoose";

export interface IExercise extends Document {
  username: string;
  description: string;
  duration: number;
  date: Date;
}

const Schema = mongoose.Schema;

const exerciseSchema = new Schema<IExercise>(
  {
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Exercise = model<IExercise>("Exercise", exerciseSchema);

export default Exercise;
