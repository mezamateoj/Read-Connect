import Link from 'next/link';
import { Button } from './ui/button';
import { getUser } from '@/app/actions';

async function Hero() {
	const currentUser = await getUser();

	return (
		<div className="my-10 flex flex-col items-center justify-center px-4 text-center sm:my-12">
			<h1 className="mb-8 text-xl font-semibold text-stone-700 md:mt-10 md:text-5xl">
				Find your next book.
				<br />
				<span className="text-yellow-500 md:text-3xl">
					The best place to find your next favorite book.
				</span>
			</h1>
			<p className="mb-3 text-xl font-semibold">
				Welcome {currentUser?.username || ''}
			</p>
			<Link href="/books">
				<Button>Explore</Button>
			</Link>
		</div>
	);
}

export default Hero;
