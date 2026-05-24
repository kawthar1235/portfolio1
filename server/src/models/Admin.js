import mongoose from 'mongoose';
import bcrypt    from 'bcryptjs';

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
}, { timestamps: true });

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

adminSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

export default mongoose.model('Admin', adminSchema);
