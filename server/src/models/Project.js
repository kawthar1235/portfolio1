import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  description: { type: String, required: true },
  type:        { type: String, enum: ['code','design'], required: true },
  category:    { type: String, required: true },   // e.g. "web","app","tool" OR "Branding","UI","Illustration"
  techStack:   [String],
  image:       String,
  liveUrl:     String,
  githubUrl:   String,
  year:        String,
  featured:    { type: Boolean, default: false },
  order:       { type: Number,  default: 0 },
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
