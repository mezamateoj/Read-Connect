import Feed from '@/components/Feed';
import Books from './books';
import { Sort } from '@/components/Sort';
import { getAllCategories } from '../actions';

export type PageProps = {
	params: { [key: string]: string | string[] | undefined };
	searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function Page(props: PageProps) {
	const categories = await getAllCategories();

	return (
		<div className="flex px-5 py-4 sm:px-6 sm:py-5 flex-col gap-5">
			<div className="flex items-center gap-2">
				<Sort
					URL="http://localhost:3001/books/"
					text="Select Category"
					target="categories"
					categories={categories.content}
				/>
			</div>
			<div className="flex items-center justify-center max-w-5xl mr-auto ml-auto">
				<Books {...props} />
			</div>
		</div>
	);
}
