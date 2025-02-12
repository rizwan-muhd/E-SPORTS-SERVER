import express from 'express';
import { getUsersController } from '../controllers/User.controller';

const router = express.Router();

router.get('/get-users', getUsersController)

export default router;