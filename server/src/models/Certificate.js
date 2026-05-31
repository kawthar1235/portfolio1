import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  issuer:   { type: String, required: true, trim: true },
  year:     { type: String, required: true },
  link:     { type: String },
  image:    { type: String },
  order:    { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Certificate', certificateSchema);
