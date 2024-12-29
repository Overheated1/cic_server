import { Router } from 'express';
import { getUser, getUsers, deleteUser, getUserByCi, getUsersActualYear, updateOrCreateUser } from '../controllers/users.controller.js';
import { isUserAuthenticated } from '../../middlewares/auth.js';

const router = Router();

//GET ALL USERS
router.get('/users', getUsers)

router.get('/users/actual-year', getUsersActualYear)

router.get("test",isUserAuthenticated, async (req,resp) => {
    
})
//GET USER
router.get('/users/:id', getUser)

//GET USER
router.get('/users/ci/:ci', getUserByCi)

//DELETE USER
router.delete('/users/:id', deleteUser)


//CREATE OR UPDATE USER
router.post('/users', updateOrCreateUser)



export default router;