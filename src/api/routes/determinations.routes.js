import { Router } from 'express';
import { getAllDeterminations } from '../controllers/determinations.controller.js';

const router = Router();

router.get("/determinations",getAllDeterminations);

export default router;