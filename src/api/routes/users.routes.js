import { Router } from 'express';
import { getUser, getUsers, insertUser, updateUser, deleteUser, getUserByCi } from '../controllers/users.controller.js';
import { isUserAuthenticated } from '../../middlewares/auth.js';

const router = Router();

//GET ALL USERS
router.get('/users', getUsers)

router.get("test",isUserAuthenticated, async (req,resp) => {
    
})
//GET USER
router.get('/users/:id', getUser)

//GET USER
router.get('/users/ci/:ci', getUserByCi)

//DELETE USER
router.delete('/users/:id', deleteUser)

//UPDATE USER
router.put('/users/:id', updateUser)

//CREATE USER
router.post('/users', insertUser)



export default router;