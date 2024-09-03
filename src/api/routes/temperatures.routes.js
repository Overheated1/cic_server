import { Router } from 'express';
import { getAllTemperatures, insertTemperature } from '../controllers/temperatures.controller.js';

const router = Router();

// GET ALL TEMPERATURES TYPES
router.get("/temperatures",getAllTemperatures);

// INSERT A TEMPERATURE TYPE
router.post("/temperatures",insertTemperature);

export default router;