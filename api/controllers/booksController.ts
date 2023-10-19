import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import ApiFeature from '../utils/apiFeatures';

const prisma = new PrismaClient();

const getAllBooks = async (req: Request, res: Response) => {
	try {
		// all the queries ara handle in the ApiFeature class
		const features = new ApiFeature(prisma.books, req.query)
			.filter()
			.sort()
			.limitFields()
			.paginate();

		const getBooks = await features.execute();
		res.json({
			page: features.page,
			count: getBooks.length,
			data: getBooks,
		});
	} catch (error: any) {
		res.status(500).json({ error: error?.message });
	}
};

const getBookById = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const book = await prisma.books.findUnique({
			where: {
				id: Number(id),
			},
		});
		res.status(200).json({
			status: 'success',
			data: {
				book,
			},
		});
	} catch (error: any) {
		res.status(400).json({
			status: 'fail',
			message: `Something went wrong: ${error?.message}`,
		});
	}
};

export { getAllBooks, getBookById };
