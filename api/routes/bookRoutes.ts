import express from 'express';
import {
	getAllBooks,
	getBookById,
	booksSearch,
	getAllAuthors,
	getAllCategories,
	filterData,
} from '../controllers/booksController';

const router = express.Router();

router.route('/').get(getAllBooks);
router.route('/:id').get(getBookById);
// router.route('/:authors').get(filterData);
// router.route('/:categories').get(filterData);
router.route('/authors/names').get(getAllAuthors);
router.route('/categories/names').get(getAllCategories);
router.route('/search/:text').get(booksSearch);

export default router;
