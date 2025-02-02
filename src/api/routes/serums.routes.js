import { Router } from 'express';
import { getAllCommercialSerums,getAllControllersObjectForm,deleteCommercialSerum, getControllerForId, updateOrCreateCommercialSerums } from '../controllers/serums.controller.js';

const router = Router();

// GET ALL CONTROLLERS IN TEXT VALUE OBJECTS
router.get("/controllers",getAllControllersObjectForm);

router.get("/controllers/commercials",getAllCommercialSerums);

// GET A CONTROLLER FOR THE ID
router.get("/controllers/:id",getControllerForId);
router.post("/controllers",updateOrCreateCommercialSerums);

router.delete("/controllers/commercial/:id",deleteCommercialSerum);

export default router;