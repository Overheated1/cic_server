import { Router } from 'express';
import { getRepeatability, insertRepeatability } from '../controllers/repeatability.controller.js';

const router = Router();

//GET A REPEATABILITY DATA
router.post('/repeatability/get', getRepeatability)

//INSERT A REPEATABILITY DATA
router.post('/repeatability', insertRepeatability)

export default router;