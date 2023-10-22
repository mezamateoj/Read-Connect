import express from 'express';

import { createReview } from '../controllers/reviewsControllers';

const router = express.Router();

router.route('/:id').post(createReview);

export default router;
