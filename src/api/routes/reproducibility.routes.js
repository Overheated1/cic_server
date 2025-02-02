import { Router } from 'express';
import { getReproducibility, insertReproducibility,getReproducibilityByDate,updateAndGetRemainingModificationsReproducibility,getMonthRange } from '../controllers/reproducibility.controller.js';

const router = Router();

//GET A REPRODUCIBILITY DATA
router.post('/reproducibility/get', getReproducibility)

//GET A REPRODUCIBILITY DATA BY DATE
router.get('/reproducibility', getReproducibilityByDate)

//INSERT A REPRODUCIBILITY DATA
router.post('/reproducibility', insertReproducibility)

router.post("/reproducibility/remaining-modifications",updateAndGetRemainingModificationsReproducibility);
router.post("/reproducibility/get-month-range",getMonthRange);

export default router;