import { Router } from 'express';
import { updateOrCreateSamples } from '../controllers/samples.controller.js';

const router = Router();

router.post('/samples', updateOrCreateSamples);

export default router;
