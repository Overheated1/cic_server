import { Router } from 'express';
import { getRolesObjectForm } from '../controllers/roles.controller.js';
import { isUserAuthenticated } from '../../middlewares/auth.js';

const router = Router();

//GET ALL ROLES IN [{TEXT : VALUE}] OBJECT FORM
router.get('/roles', getRolesObjectForm)


export default router;