import { Router } from 'express';
import { getDeviations, getDeviationsReproducibility } from '../controllers/deviations.controller.js';

const router = Router();

//GET DEVIATIONS DATA
router.post("/deviations",getDeviations);
router.post("/deviations/reproducibility",getDeviationsReproducibility);

export default router;