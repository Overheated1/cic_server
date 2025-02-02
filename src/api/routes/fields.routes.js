import { Router } from 'express';
import { validateTemplateId } from "../../validations.js";
import { getFields, updateFields } from '../controllers/fields.controller.js';

const router = Router();

router.get('/fields/:id', validateTemplateId, getFields);

// update only the fields (the endpoint for the template is in `template.routes.js`)
router.put('/fields/:id', validateTemplateId, updateFields);

export default router;
