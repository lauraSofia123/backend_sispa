import { Router } from 'express';
import {
  getAprendices,
  createAprendiz,
  updateAprendiz,
  deleteAprendiz
} from '../controller/aprendizController.js';

const router = Router();

/* GET */
router.get('/', getAprendices);

/* POST */
router.post('/', createAprendiz);

/* PUT */
router.put('/:id', updateAprendiz);

/* DELETE */
router.delete('/:id', deleteAprendiz);


export default router;