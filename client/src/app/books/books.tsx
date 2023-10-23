import BooksItems from './booksItems';
import { getData } from '@/app/actions';
import { PageProps } from './page';
import Pagination from '@/components/Pagination';

export type BooksProps = {
	id: number;
	title: string;
	isbn: string;
	pageCount: number;
	publishedDate: string;
	thumbnailUrl: string;
	shortDescription: string;
	longDescription: string;
	status: string;
	authors: string[];
	categories: string[];
};

async function Books(props: PageProps) {
	const { data, metadata } = await getData(
		props?.searchParams?.page || 1,
		props?.searchParams || ''
	);
	// const { data, isLoading, error } = useQuery({
	// 	queryKey: ['books'],
	// 	queryFn: () =>
	// 		getData(props?.searchParams?.page || 1, props?.searchParams || ''),
	// });

	// if (isLoading) return <div>Loading...</div>;

	return (
		<div className="mr-auto">
			<ul className="divide-y divide-stone-300/80 px-4 sm:px-3">
				{data.map((b: BooksProps) => (
					<BooksItems key={b.id} b={b} />
				))}
			</ul>
			<div className="">
				<Pagination {...props} {...metadata} />
			</div>
		</div>
	);
}

export default Books;
