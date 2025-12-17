import mongoose from 'mongoose';

const instructorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: String,
  telefono: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Instructor', instructorSchema);
