import Feed from '@/components/Feed';
import Books from './books';

export type PageProps = {
	params: { [key: string]: string | string[] | undefined };
	searchParams?: { [key: string]: string | string[] | undefined };
};

export default function Page(props: PageProps) {
	return (
		<div className="w-4/6 flex flex-1 mt-5">
			<Feed />
			<Books {...props} />
		</div>
	);
}
