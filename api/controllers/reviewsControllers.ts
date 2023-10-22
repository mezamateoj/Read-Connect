import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST reviews/:bookId/reviews
const createReview = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { review, rating, userId } = req.body;
	try {
		// check if the user already has a review for this book
		const existingReview = await prisma.reviews.findFirst({
			where: {
				userId: userId,
				bookId: Number(id),
			},
		});

		if (existingReview) {
			throw new Error('You already have a review for this book');
		}

		const newReview = await prisma.reviews.create({
			data: {
				review,
				rating,
				bookId: Number(id),
				userId: userId,
			},
		});
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

export { createReview };
