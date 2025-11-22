import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICertificate extends Document {
  title: string;
  institution: string;
  date: Date;
  link?: string;
  image?: string;
  category?: string;
  skills?: string[];
  color?: string;
  credentialId?: string;
  order: number;
}

const CertificateSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    institution: { type: String, required: true },
    date: { type: Date, required: true },
    link: { type: String },
    image: { type: String },
    category: { type: String },
    skills: [{ type: String }],
    color: { type: String },
    credentialId: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default (mongoose.models.Certificate as Model<ICertificate>) ||
  mongoose.model<ICertificate>('Certificate', CertificateSchema);
