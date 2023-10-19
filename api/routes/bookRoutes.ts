import express from 'express';
import { getAllBooks, getBookById } from '../controllers/booksController';

const router = express.Router();

router.route('/').get(getAllBooks);
router.route('/:id').get(getBookById);

export default router;
