import { executeQuery } from '../services/dbService.js';
import FaltaMongo from '../models/falta.mongo.js';

export const getFaltas = async (req, res, next) => {
  try {
    const { db } = req.query;
    const data = db === 'mongo'
      ? await FaltaMongo.find()
      : await executeQuery(`
          SELECT f.id, a.nombre AS aprendiz, f.fecha, f.motivo
          FROM faltas f
          JOIN aprendices a ON f.aprendiz_id = a.id
        `);

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const createFalta = async (req, res, next) => {
  try {
    const { aprendiz, fecha, motivo } = req.body;
    const { db } = req.query;

    if (db === 'mongo' || db === 'both') {
      await FaltaMongo.create({ aprendiz, fecha, motivo });
    }

    if (db === 'mysql' || db === 'both') {
      await executeQuery(
        `INSERT INTO faltas (aprendiz_id, fecha, motivo)
         VALUES ((SELECT id FROM aprendices WHERE nombre=? LIMIT 1), ?, ?)`,
        [aprendiz, fecha, motivo]
      );
    }

    res.json({ success: true, message: 'Falta registrada' });
  } catch (error) {
    next(error);
  }
};
