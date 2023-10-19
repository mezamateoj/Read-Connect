import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import moment from 'moment';

const prisma = new PrismaClient();

// function to fetch data from github
const fetchFromGitHub = async () => {
	const url = `https://raw.githubusercontent.com/dudeonthehorse/datasets/master/amazon.books.json`;
	try {
		const res = await axios.get(url, { timeout: 5000 });
		const text = await res.data;

		const formattedText = '[' + text.replace(/}\s*{/g, '},{') + ']';
		const data = JSON.parse(formattedText);
		return data.slice(0, 400);
	} catch (error) {
		console.error('Invalid JSON:', error);
	}
};

async function main() {
	try {
		const data = await fetchFromGitHub();
		const books = data
			.map((book: any) => {
				// add validation to check if all the required fields are present, if not skip the book
				if (
					!book.title ||
					!book.isbn ||
					!book.pageCount ||
					!book.publishedDate ||
					!book.status
				) {
					console.error('Missing required book field', book);
					return null;
				}

				return {
					title: book.title,
					isbn: book.isbn,
					pageCount: book.pageCount,
					publishedDate: moment(book.publishedDate.$date).toDate(),
					thumbnailUrl: book.thumbnailUrl,
					shortDescription: book.shortDescription,
					longDescription: book.longDescription,
					status: book.status,
					authors: { set: book.authors },
					categories: { set: book.categories },
				};
			})
			.filter(Boolean);

		const result = await prisma.books.createMany({
			data: books,
			skipDuplicates: true,
		});

		console.log(`Created ${result.count} books.`);
	} catch (error) {
		console.error(error);
	} finally {
		await prisma.$disconnect();
	}
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
