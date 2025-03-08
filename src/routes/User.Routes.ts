import express from 'express';
import { getUsersController, deleteUserController, updateUserController } from '../controllers/User.controller';
import { authenticateUser, authorizeAdmin, } from '../middlewares/Auth.Middleware';

const router = express.Router();

router.get('/get-users', authenticateUser, authorizeAdmin, getUsersController)
router.delete('/delete-user', authenticateUser, authorizeAdmin, deleteUserController)
router.put('/update-user', authenticateUser, updateUserController)
router.delete('/get-me', deleteUserController)


export default router;