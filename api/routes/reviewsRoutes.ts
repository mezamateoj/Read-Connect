import express from 'express';

import {
	createReview,
	getAllReviews,
	getReviewById,
} from '../controllers/reviewsControllers';

const router = express.Router();

router.route('/:id').get(getReviewById).post(createReview);
router.route('/').get(getAllReviews);

export default router;
