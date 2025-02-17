import express from 'express';
import { getUsersController } from '../controllers/User.controller';
import { authenticateUser, authorizeAdmin } from '../middlewares/Auth.Middleware';

const router = express.Router();

router.get('/get-users', getUsersController)
router.delete('/delete-user',)


export default router;