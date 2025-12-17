import { executeQuery } from '../services/dbService.js';
import InstructorMongo from '../models/instructor.mongo.js';

export const getInstructores = async (req, res, next) => {
  try {
    const { db } = req.query;
    const data = db === 'mongo'
      ? await InstructorMongo.find()
      : await executeQuery('SELECT * FROM instructores');

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const createInstructor = async (req, res, next) => {
  try {
    const { nombre, correo, telefono } = req.body;
    const { db } = req.query;

    if (db === 'mongo' || db === 'both') {
      await InstructorMongo.create({ nombre, correo, telefono });
    }

    if (db === 'mysql' || db === 'both') {
      await executeQuery(
        'INSERT INTO instructores (nombre, correo, telefono) VALUES (?,?,?)',
        [nombre, correo, telefono]
      );
    }

    res.json({ success: true, message: 'Instructor creado' });
  } catch (error) {
    next(error);
  }
};
