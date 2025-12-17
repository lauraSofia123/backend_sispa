import { executeQuery } from '../services/dbService.js';
import AprendizMongo from '../models/aprendiz.mongo.js';

/* GET */
export const getAprendices = async (req, res, next) => {
  try {
    const { db } = req.query;
    let data;

    if (db === 'mongo') {
      data = await AprendizMongo.find();
    } else {
      data = await executeQuery(`
        SELECT a.id, a.nombre, p.nombre AS programa, i.nombre AS instructor
        FROM aprendices a
        LEFT JOIN programas p ON a.programa_id = p.id
        LEFT JOIN instructores i ON a.instructor_id = i.id
      `);
    }

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

/* CREATE */
export const createAprendiz = async (req, res, next) => {
  try {
    const { nombre, programa, instructor } = req.body;
    const { db } = req.query;

    if (!nombre || !programa) {
      return res.status(400).json({ success: false, message: 'Datos incompletos' });
    }

    if (db === 'mongo' || db === 'both') {
      await AprendizMongo.create({ nombre, programa, instructor });
    }

    if (db === 'mysql' || db === 'both') {
      await executeQuery(
        `INSERT INTO aprendices (nombre, programa_id, instructor_id)
         VALUES (?, 
           (SELECT id FROM programas WHERE nombre=? LIMIT 1),
           (SELECT id FROM instructores WHERE nombre=? LIMIT 1)
         )`,
        [nombre, programa, instructor]
      );
    }

    res.json({ success: true, message: 'Aprendiz creado' });
  } catch (error) {
    next(error);
  }
};

/* UPDATE */
export const updateAprendiz = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, programa, instructor } = req.body;
    const { db } = req.query;

    if (db === 'mongo') {
      await AprendizMongo.findByIdAndUpdate(id, { nombre, programa, instructor });
    }

    if (db === 'mysql') {
      await executeQuery(
        `UPDATE aprendices 
         SET nombre=?, 
             programa_id=(SELECT id FROM programas WHERE nombre=? LIMIT 1),
             instructor_id=(SELECT id FROM instructores WHERE nombre=? LIMIT 1)
         WHERE id=?`,
        [nombre, programa, instructor, id]
      );
    }

    res.json({ success: true, message: 'Aprendiz actualizado' });
  } catch (error) {
    next(error);
  }
};

/* DELETE */
export const deleteAprendiz = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { db } = req.query;

    if (db === 'mongo') {
      await AprendizMongo.findByIdAndDelete(id);
    }

    if (db === 'mysql') {
      await executeQuery('DELETE FROM aprendices WHERE id=?', [id]);
    }

    res.json({ success: true, message: 'Aprendiz eliminado' });
  } catch (error) {
    next(error);
  }
};
