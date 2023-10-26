import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import ApiFeature from '../utils/apiFeatures';

const prisma = new PrismaClient();

// POST add to read books list
const createReadingList = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { userId } = req.body;
	try {
		const bookInReadingList = await prisma.readingList.findFirst({
			where: {
				bookId: Number(id),
				userId,
			},
		});

		if (bookInReadingList) {
			throw new Error('Book already in reading list');
		}

		const reading = await prisma.readingList.create({
			data: {
				bookId: Number(id),
				userId,
			},
		});

		res.status(201).json({
			status: 'success',
			reading,
		});
	} catch (error: any) {
		res.status(400).json({
			status: 'fail',
			message: `Something went wrong: ${error?.message}`,
		});
	}
};

// GET read books list by user id
const getReadingList = async (req: Request, res: Response) => {
	const { clerkId } = req.params;

	try {
		const readingList = await prisma.user.findUnique({
			where: {
				clerkId: clerkId,
			},
			include: {
				readingList: true,
			},
		});

		const findAllBooks = readingList?.readingList?.map((user) =>
			user.bookId ? user.bookId : 0
		);

		const books = await prisma.books.findMany({
			where: {
				id: {
					in: findAllBooks,
				},
			},
			include: {
				reviews: true,
			},
		});

		res.status(200).json({
			status: 'success',
			count: books.length,
			readingList: books,
		});
	} catch (error: any) {
		res.status(400).json({
			status: 'fail',
			message: `Something went wrong: ${error?.message}`,
		});
	}
};

// DELETE remove book from read or want to read list
const deleteReadBook = async (req: Request, res: Response) => {
	const { clerkId } = req.params;
	const { bookId } = req.body;

	try {
		await prisma.readingList.deleteMany({
			where: {
				bookId: bookId,
				userId: clerkId,
			},
		});

		await prisma.wishList.deleteMany({
			where: {
				bookId: bookId,
				userId: clerkId,
			},
		});

		res.status(200).json({
			status: 'success',
			message: `Book id ${bookId} deleted from list`,
		});
	} catch (error: any) {
		res.status(400).json({
			status: 'fail',
			message: `Something went wrong: ${error?.message}`,
		});
	}
};

// Add to want to read list
const createRead = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { userId } = req.body;
	try {
		const bookInReadingList = await prisma.wishList.findFirst({
			where: {
				bookId: Number(id),
				userId,
			},
		});

		if (bookInReadingList) {
			throw new Error('Book already in want to read list');
		}

		const reading = await prisma.wishList.create({
			data: {
				bookId: Number(id),
				userId,
			},
		});

		res.status(201).json({
			status: 'success',
			reading,
		});
	} catch (error: any) {
		res.status(400).json({
			status: 'fail',
			message: `Something went wrong: ${error?.message}`,
		});
	}
};

// GET want to read list by user id
const getReadList = async (req: Request, res: Response) => {
	const { clerkId } = req.params;

	try {
		const readingList = await prisma.user.findUnique({
			where: {
				clerkId: clerkId,
			},
			include: {
				wishList: true,
			},
		});

		const findAllBooks = readingList?.wishList?.map((user) =>
			user.bookId ? user.bookId : 0
		);

		const books = await prisma.books.findMany({
			where: {
				id: {
					in: findAllBooks,
				},
			},
			include: {
				reviews: true,
			},
		});

		res.status(200).json({
			status: 'success',
			count: books.length,
			readingList: books,
		});
	} catch (error: any) {
		res.status(400).json({
			status: 'fail',
			message: `Something went wrong: ${error?.message}`,
		});
	}
};

// Move book from one list to another
const moveBookToList = async (req: Request, res: Response) => {
	const { clerkId } = req.params;
	const { bookId } = req.body;

	try {
		const bookInWishList = await prisma.wishList.findFirst({
			where: {
				bookId: Number(bookId),
				userId: clerkId,
			},
		});

		const bookInReadingList = await prisma.readingList.findFirst({
			where: {
				bookId: Number(bookId),
				userId: clerkId,
			},
		});

		if (bookInWishList === null && bookInReadingList !== null) {
			await prisma.readingList.deleteMany({
				where: {
					bookId: bookId,
					userId: clerkId,
				},
			});

			await prisma.wishList.create({
				data: {
					bookId: bookId,
					userId: clerkId,
				},
			});
		}

		if (bookInWishList !== null && bookInReadingList === null) {
			await prisma.wishList.deleteMany({
				where: {
					bookId: bookId,
					userId: clerkId,
				},
			});

			await prisma.readingList.create({
				data: {
					bookId: bookId,
					userId: clerkId,
				},
			});
		}
		return res.status(200).json({
			status: 'success',
			message: `Book id ${bookId} moved to another list`,
		});
	} catch (error: any) {
		res.status(400).json({
			status: 'fail',
			message: `Something went wrong: ${error?.message}`,
		});
	}
};

export {
	createReadingList,
	getReadingList,
	createRead,
	getReadList,
	deleteReadBook,
	moveBookToList,
};
