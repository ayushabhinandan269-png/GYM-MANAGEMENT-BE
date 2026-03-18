import mongoose, { Document, Schema } from "mongoose";

export interface IWorkoutProgress extends Document {
  member: mongoose.Types.ObjectId;
  workout: mongoose.Types.ObjectId;
  completedExercises: string[];
  completed: boolean;
  updatedAt: Date;
}

const WorkoutProgressSchema = new Schema<IWorkoutProgress>(
  {
    member: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    workout: {
      type: Schema.Types.ObjectId,
      ref: "Workout",
      required: true
    },

    completedExercises: {
      type: [String],
      default: []
    },

    completed: {
      type: Boolean,
      default: false
    }

  },
  { timestamps: true }
);

const WorkoutProgress = mongoose.model<IWorkoutProgress>(
  "WorkoutProgress",
  WorkoutProgressSchema
);

export default WorkoutProgress;