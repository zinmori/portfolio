import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IExperience extends Document {
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  logo?: string;
  location?: string;
  skills: string[];
  achievements?: string[];
  type?: string;
  color?: string;
  order: number;
}

const ExperienceSchema: Schema = new Schema(
  {
    company: { type: String, required: true },
    position: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    description: { type: String, required: true },
    logo: { type: String },
    location: { type: String },
    skills: [{ type: String }],
    achievements: [{ type: String }],
    type: { type: String },
    color: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default (mongoose.models.Experience as Model<IExperience>) ||
  mongoose.model<IExperience>('Experience', ExperienceSchema);
