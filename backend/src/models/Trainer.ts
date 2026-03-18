import mongoose, { Document, Schema } from "mongoose";

export interface ITrainer extends Document {
  name: string;
  specialization: string;
  experience: number;
  contact: string;
}

const TrainerSchema = new Schema<ITrainer>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    specialization: {
      type: String,
      required: true
    },

    experience: {
      type: Number,
      required: true
    },

    contact: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Trainer = mongoose.model<ITrainer>("Trainer", TrainerSchema);

export default Trainer;