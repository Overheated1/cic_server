import { Router } from 'express';
import { getAllInstitutions } from '../controllers/institutions.controller.js';

const router = Router();

// GET ALL INSTITUTIONS DATA
router.get("/institutions",getAllInstitutions);

export default router;