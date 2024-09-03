import { Router } from 'express';
import { getDeviations } from '../controllers/deviations.controller.js';

const router = Router();

//GET DEVIATIONS DATA
router.post("/deviations",getDeviations);

export default router;