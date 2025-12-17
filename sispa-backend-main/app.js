import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import aprendizRoutes from './routes/aprendiz.routes.js';
import connectMongo from './config/mongo.js';

dotenv.config();

const app = express();

/* 🔥 MIDDLEWARES (SIEMPRE PRIMERO) */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* 📂 SERVIR IMÁGENES */
app.use('/uploads', express.static(path.resolve('uploads')));

/* 🔌 CONEXIÓN A MONGODB */
connectMongo();

/* 🧪 TEST BODY */
app.post('/test-body', (req, res) => {
  res.json({
    recibido: req.body
  });
});

/* 🔗 RUTAS */
app.use('/api/aprendices', aprendizRoutes);

/* ❌ RUTA NO ENCONTRADA */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor SISPA corriendo en http://localhost:${PORT}`);
});
