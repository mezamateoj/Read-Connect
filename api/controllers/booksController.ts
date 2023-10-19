import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAllBooks = async (req: Request, res: Response) => {
	try {
		const books = await prisma.books.findMany({
			skip: 3,
			take: 4,
		});
		res.json({ count: books.length, data: books });
	} catch (error: any) {
		res.status(500).json({ error: error?.message });
	}
};

export { getAllBooks };
