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
		<div>
			<div className="flex items-center gap-2">
				<Sort
					URL="http://localhost:3001/books/"
					text="Select Category"
					target="categories"
					categories={categories.content}
				/>
			</div>
			<div className="w-4/6 flex flex-1 mt-5">
				<Feed />
				<Books {...props} />
			</div>
		</div>
	);
}
