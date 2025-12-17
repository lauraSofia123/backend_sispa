import { Router } from 'express';
import {
  getFaltas,
  createFalta
} from '../controller/faltaController.js';

const router = Router();

router.get('/', getFaltas);
router.post('/', createFalta);

export default router;
