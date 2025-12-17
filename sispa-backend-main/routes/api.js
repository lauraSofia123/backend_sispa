import { Router } from 'express';

import aprendizRoutes from './aprendiz.routes.js';
import instructorRoutes from './instructor.routes.js';
import faltaRoutes from './falta.routes.js';

const router = Router();

router.use('/aprendices', aprendizRoutes);
router.use('/instructores', instructorRoutes);
router.use('/faltas', faltaRoutes);

export default router;
