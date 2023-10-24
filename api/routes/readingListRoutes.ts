import express from 'express';

import {
	createReadingList,
	getReadingList,
	createRead,
	getReadList,
} from '../controllers/readingController';

const router = express.Router();

router.route('/:id').post(createReadingList);
router.route('/:clerkId').get(getReadingList);

router.route('/want-read/:id').post(createRead);
router.route('/want-read/:clerkId').get(getReadList);

export default router;
