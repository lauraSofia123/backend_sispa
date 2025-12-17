import mongoose from 'mongoose';

const aprendizSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  programa: { type: String, required: true },
  instructor: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Aprendiz', aprendizSchema);
