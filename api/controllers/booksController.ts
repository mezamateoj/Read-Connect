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
			.limitFields();

		const { filteredTotal } = await features.getCount();

		const getBooks = await features.paginate().execute();
		const authors = await getBooks.flatMap((book: any) => book.authors);
		const categories = await getBooks.flatMap(
			(book: any) => book.categories
		);

		const uniqueAuthors = [...new Set(authors)];
		const uniqueCategories = [...new Set(categories)];

		const totalPages = Math.ceil(filteredTotal / features.limit);

		res.status(200).json({
			metadata: {
				hasNextPage: features.page + features.limit < filteredTotal,
				hasPrevPage: features.page > 1,
				totalPages,
				page: features.page,
				count: filteredTotal,
			},
			data: getBooks,
			authors: uniqueAuthors,
			categories: uniqueCategories,
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
			book,
		});
	} catch (error: any) {
		res.status(400).json({
			status: 'fail',
			message: `Something went wrong: ${error?.message}`,
		});
	}
};

const booksSearch = async (req: Request, res: Response) => {
	const { text } = req.params;
	try {
		const result = await prisma.books.findMany({
			where: {
				title: {
					search: text.replace(/!/g, '').split(' ').join(' <-> '),
				},
			},
		});

		res.status(200).json({
			metadata: {
				count: result.length,
			},
			data: result,
		});
	} catch (error: any) {
		res.status(400).json({
			status: 'fail',
			message: `Something went wrong: ${error?.message}`,
		});
	}
};

const getAllAuthors = async (req: Request, res: Response) => {
	try {
		// const apiFeatures = new ApiFeature(prisma.books, req.query)
		// 	.filter()
		// 	.sort()
		// 	.limitFields();

		// const allAuthors = await apiFeatures.query.findMany({
		// 	select: {
		// 		authors: true,
		// 	},
		// });

		const allAuthors = await prisma.books.findMany({
			select: {
				authors: true,
			},
		});

		const uniqueAuthors = allAuthors
			.flatMap((book) => book.authors)
			.filter((author, index, self) => self.indexOf(author) === index)
			.filter((n) => n);

		res.status(200).json({
			status: 'success',
			count: uniqueAuthors.length,
			content: uniqueAuthors,
		});
	} catch (error: any) {
		res.status(400).json({
			status: 'fail',
			message: `Something went wrong: ${error?.message}`,
		});
	}
};

const getAllCategories = async (req: Request, res: Response) => {
	try {
		const allCategories = await prisma.books.findMany({
			select: {
				categories: true,
			},
		});

		// return unique categories and remove empty strings
		const uniqueCategories = allCategories
			.flatMap((book) => book.categories)
			.filter((category, index, self) => self.indexOf(category) === index)
			.filter((n) => n);

		res.status(200).json({
			status: 'success',
			count: uniqueCategories.length,
			content: uniqueCategories,
		});
	} catch (error) {}
};

const getAllYears = async (req: Request, res: Response) => {
	try {
		const allYears = await prisma.books.findMany({
			select: {
				publishedDate: true,
			},
		});

		// return unique categories and remove empty strings
		const uniqueYears = allYears
			.flatMap((book) => book.publishedDate)
			.filter((year, index, self) => self.indexOf(year) === index)
			.filter((n) => n);

		res.status(200).json({
			status: 'success',
			count: uniqueYears.length,
			content: uniqueYears,
		});
	} catch (error) {}
};

const filterData = async (req: Request, res: Response) => {
	const { authors, categories } = req.params;
	console.log('filterData', authors, categories);

	try {
		let filteredData = await prisma.books.findMany();

		if (authors) {
			const selectedAuthors = Array.isArray(authors)
				? authors
				: [authors];
			filteredData = filteredData.filter((book) =>
				book.authors.some((author) => selectedAuthors.includes(author))
			);
		}

		if (categories) {
			const selectedCategories = Array.isArray(categories)
				? categories
				: [categories];
			filteredData = filteredData.filter((book) =>
				book.categories.some((category) =>
					selectedCategories.includes(category)
				)
			);
		}

		res.status(200).json({
			status: 'success',
			count: filteredData.length,
			data: filteredData,
		});
	} catch (error: any) {
		res.status(400).json({
			status: 'fail',
			message: `Something went wrong: ${error?.message}`,
		});
	}
};

export {
	getAllBooks,
	getBookById,
	booksSearch,
	getAllAuthors,
	getAllCategories,
	filterData,
};
