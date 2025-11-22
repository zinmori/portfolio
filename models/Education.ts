import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEducation extends Document {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description?: string;
  logo?: string;
  location?: string;
  highlights?: string[];
  color?: string;
  order: number;
}

const EducationSchema: Schema = new Schema(
  {
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    fieldOfStudy: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    description: { type: String },
    logo: { type: String },
    location: { type: String },
    highlights: [{ type: String }],
    color: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default (mongoose.models.Education as Model<IEducation>) ||
  mongoose.model<IEducation>('Education', EducationSchema);
