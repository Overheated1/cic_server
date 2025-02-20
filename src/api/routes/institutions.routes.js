import { Router } from 'express';
import { getAllInstitutions, getInstitution } from '../controllers/institutions.controller.js';

const router = Router();

// GET ALL INSTITUTIONS DATA
router.get("/institutions",getAllInstitutions);
router.get("/institutions/:institution_id",getInstitution);

export default router;