import mongoose from 'mongoose';

const faltaSchema = new mongoose.Schema({
  aprendiz: { type: String, required: true },
  fecha: { type: Date, required: true },
  motivo: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Falta', faltaSchema);
