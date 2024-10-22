import { Router } from 'express';
import { getAllControllers, getControllerForId } from '../controllers/serums.controller.js';

const router = Router();

// GET ALL CONTROLLERS
router.get("/controllers",getAllControllers);

// GET A CONTROLLER FOR THE ID
router.get("/controllers/:id",getControllerForId);

export default router;