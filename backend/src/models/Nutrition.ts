import mongoose, { Schema, Document } from "mongoose";

export interface INutrition extends Document {
  user: mongoose.Types.ObjectId;
  meals: {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  }[];
  totalCalories: number;
  date: Date;
}

const NutritionSchema = new Schema<INutrition>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    meals: [
      {
        name: {
          type: String,
          required: true,
          trim: true
        },
        calories: {
          type: Number,
          default: 0
        },
        protein: {
          type: Number,
          default: 0
        },
        carbs: {
          type: Number,
          default: 0
        },
        fats: {
          type: Number,
          default: 0
        }
      }
    ],

    totalCalories: {
      type: Number,
      default: 0
    },

    date: {
      type: Date,
      default: Date.now,
      index: true // ✅ faster queries
    }
  },
  {
    timestamps: true // ✅ createdAt, updatedAt
  }
);

export default mongoose.model<INutrition>("Nutrition", NutritionSchema);