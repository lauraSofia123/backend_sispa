import { Router } from 'express';
import {
  getInstructores,
  createInstructor
} from '../controller/instructorController.js';

const router = Router();

router.get('/', getInstructores);
router.post('/', createInstructor);

export default router;
