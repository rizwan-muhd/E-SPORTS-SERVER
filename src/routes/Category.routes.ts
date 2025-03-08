import express from 'express';
import { } from '../controllers/'

const router = express.Router()

router.post('/add-category');
router.get('get-category')
router.delete('/delete-category');
router.put('/update-category')

export default router