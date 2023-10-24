import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import ApiFeature from '../utils/apiFeatures';

const prisma = new PrismaClient();

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

export { createReadingList, getReadingList, createRead, getReadList };
