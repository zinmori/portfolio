import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown/MDX
  coverImage?: string;
  date: Date;
  tags: string[];
  published: boolean;
  author: {
    name: string;
    picture: string;
  };
}

const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String },
    date: { type: Date, default: Date.now },
    tags: [{ type: String }],
    published: { type: Boolean, default: false },
    author: {
      name: { type: String },
      picture: { type: String },
    },
  },
  { timestamps: true },
);

export default (mongoose.models.Post as Model<IPost>) ||
  mongoose.model<IPost>('Post', PostSchema);
