import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST reviews/:bookId/reviews
const createReview = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { review, rating, userId } = req.body;
	try {
		const existingReview = await prisma.reviews.findMany({
			where: {
				// userId: userId,
				bookId: Number(id),
			},
		});

		// check if the user already has a review for this book
		existingReview.map((review) => {
			if (review.userId === userId) {
				throw new Error('You already have a review for this book');
			}
		});

		const newReview = await prisma.reviews.create({
			data: {
				review,
				rating,
				bookId: Number(id),
				userId: userId,
			},
		});

		if (!newReview) throw new Error('Review could not be created');

		res.status(201).json({
			status: 'success',
			review: newReview,
		});
	} catch (error: any) {
		res.status(400).json({
			status: 'fail',
			message: `Something went wrong: ${error?.message}`,
		});
	}
};

const getAllReviews = async (req: Request, res: Response) => {
	try {
		const reviews = await prisma.reviews.findMany();
		res.status(200).json({
			status: 'success',
			reviews,
		});
	} catch (error: any) {
		res.status(400).json({
			status: 'fail',
			message: `Something went wrong: ${error?.message}`,
		});
	}
};

const getReviewById = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const review = await prisma.reviews.findMany({
			where: {
				bookId: Number(id),
			},
		});
		res.status(200).json({
			status: 'success',
			review,
		});
	} catch (error: any) {
		res.status(400).json({
			status: 'fail',
			message: `Something went wrong: ${error?.message}`,
		});
	}
};

export { createReview, getAllReviews, getReviewById };
