import { Router } from 'express';
import { getAllDeterminations, getDeterminationsWithoutReproducibility } from '../controllers/determinations.controller.js';

const router = Router();

router.get("/determinations",getAllDeterminations);
router.get("/reproducibility/determinations",getDeterminationsWithoutReproducibility);


export default router;