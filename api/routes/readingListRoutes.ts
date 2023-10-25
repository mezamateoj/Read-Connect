import express from 'express';

import {
	createReadingList,
	getReadingList,
	createRead,
	getReadList,
	deleteReadBook,
} from '../controllers/readingController';

const router = express.Router();

// Routes for read books list
router.route('/:id').post(createReadingList);
router.route('/:clerkId').get(getReadingList);
router.route('/delete/:clerkId').delete(deleteReadBook);

// Routes for want to read list
router.route('/want-read/:id').post(createRead);
router.route('/want-read/:clerkId').get(getReadList);

export default router;
