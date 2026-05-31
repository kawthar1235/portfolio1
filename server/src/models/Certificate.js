import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    titleAr: { type: String, trim: true },
    issuer: { type: String, required: true, trim: true },
    issuerAr: { type: String, trim: true },
    year: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    link: { type: String, trim: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Certificate', certificateSchema);
