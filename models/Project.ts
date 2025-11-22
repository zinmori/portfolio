import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  content?: string; // Markdown content
  image: string;
  tags: string[];
  technologies: string[];
  demoUrl?: string;
  repoUrl?: string;
  category?: string;
  color?: string;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String },
    image: { type: String },
    tags: [{ type: String }],
    technologies: [{ type: String }],
    demoUrl: { type: String },
    repoUrl: { type: String },
    category: { type: String },
    color: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default (mongoose.models.Project as Model<IProject>) ||
  mongoose.model<IProject>('Project', ProjectSchema);
