import { Router } from 'express';
import { getRepeatability, insertRepeatability,getRepeatabilityByDate } from '../controllers/repeatability.controller.js';

const router = Router();

//GET A REPEATABILITY DATA
router.post('/repeatability/get', getRepeatability)

//GET A REPEATABILITY DATA BY DATE
router.get('/repeatability', getRepeatabilityByDate)

//INSERT A REPEATABILITY DATA
router.post('/repeatability', insertRepeatability)

export default router;