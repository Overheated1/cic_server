import { Router } from 'express';
import { validateTemplateId } from "../../validations.js";
import { updateTemplate, deleteTemplate, getTemplate, getAllTemplates, createTemplate } from '../controllers/template.controller.js';

const router = Router();

router.get('/template/:id', validateTemplateId, getTemplate);
router.get('/templates', getAllTemplates);
router.delete('/template/:id', validateTemplateId, deleteTemplate);

// Update (or create) only the template (the endpoint for the fiels is in `fields.routes.js`)
router.post('/template', createTemplate);
router.put('/template/:id', validateTemplateId, updateTemplate);

// Update template and its fields
// router.put('/template/:id', updateTemplateWithFields);

export default router;
