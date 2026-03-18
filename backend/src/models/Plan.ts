import mongoose, { Document, Schema } from "mongoose";

export interface IPlan extends Document {
  name: string;
  duration: "Monthly" | "Quarterly" | "Yearly";
  price: number;
  features: string[];
  image?: string;
  isActive: boolean;
}

const PlanSchema = new Schema<IPlan>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: String,
      enum: ["Monthly", "Quarterly", "Yearly"],
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    features: {
      type: [String],
      default: [],
    },

    image: {
      type: String,
      default: ""
    },

    isActive: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model<IPlan>("Plan", PlanSchema);