import mongoose, { Document, Schema } from "mongoose";

export interface IWorkout extends Document {

  title: string;

  level: "Beginner" | "Intermediate" | "Advanced";

  description: string;

  exercises: string[];

  duration?: number;

  createdBy?: mongoose.Types.ObjectId;

}

const WorkoutSchema = new Schema<IWorkout>(
  {

    title: {
      type: String,
      required: true,
      trim: true
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true
    },

    description: {
      type: String,
      required: true
    },

    exercises: {
      type: [String],
      default: []
    },

    duration: {
      type: Number,
      default: 45
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }

  },
  { timestamps: true }
);

const Workout = mongoose.model<IWorkout>("Workout", WorkoutSchema);

export default Workout;