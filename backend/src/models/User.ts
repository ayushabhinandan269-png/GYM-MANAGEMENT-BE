import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {

  name: string;
  email: string;
  password: string;

  role: "admin" | "trainer" | "member";

  membershipPlan?: mongoose.Types.ObjectId | null;
  trainerAssigned?: mongoose.Types.ObjectId | null;

  membershipStatus: "active" | "expired";

  planStartDate?: Date | null;
  planExpiryDate?: Date | null;

  assignedWorkouts?: {
    workout: mongoose.Types.ObjectId;
    completed: boolean;
    completedAt?: Date | null;
  }[];

  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    },

    role: {
      type: String,
      enum: ["admin", "trainer", "member"],
      default: "member"
    },

    membershipPlan: {
      type: Schema.Types.ObjectId,
      ref: "Plan",
      default: null
    },

    trainerAssigned: {
      type: Schema.Types.ObjectId,
      ref: "Trainer",
      default: null
    },

    membershipStatus: {
      type: String,
      enum: ["active", "expired"],
      default: "expired"
    },

    planStartDate: {
      type: Date,
      default: null
    },

    planExpiryDate: {
      type: Date,
      default: null
    },

    
    assignedWorkouts: [
      {
        workout: {
          type: Schema.Types.ObjectId,
          ref: "Workout"
        },
        completed: {
          type: Boolean,
          default: false
        },
        completedAt: {
          type: Date,
          default: null
        }
      }
    ]

  },
  {
    timestamps: true
  }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;