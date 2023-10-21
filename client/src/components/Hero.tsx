import Link from 'next/link';
import { Button } from './ui/button';
import { getUser } from '@/app/actions';

async function Hero() {
	const user = 'j';
	const currentUser = await getUser();
	console.log(currentUser);

	return (
		<div className="my-10 flex flex-col items-center justify-center px-4 text-center sm:my-12">
			<h1 className="mb-8 text-xl font-semibold text-stone-700 md:mt-10 md:text-5xl">
				Find your next book.
				<br />
				<span className="text-yellow-500 md:text-3xl">
					The best place to find your next favorite book.
				</span>
			</h1>
			{user !== 'mateo' ? (
				<>
					<p className="mb-3 text-xl font-semibold">Welcome {user}</p>
					<Link href="/books">
						<Button>Explore</Button>
					</Link>
				</>
			) : // <CreateUser />
			null}
		</div>
	);
}

export default Hero;
