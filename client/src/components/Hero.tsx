import Link from 'next/link';
import { Button } from './ui/button';
import { getUser } from '@/app/actions';
import Image from 'next/image';

async function Hero() {
	const currentUser = await getUser();

	return (
		<div className="my-10 flex flex-col items-center justify-center px-4 text-center sm:my-12 gap-10">
			<h1 className="mb-8 text-xl font-semibold  md:mt-10 md:text-6xl">
				Find your next book.
				<br />
				<span className="text-green-500 md:text-3xl">
					The best place to find your next favorite book.
				</span>
			</h1>
			<div className="">
				<p className="py-3 text-xl capitalize font-semibold">
					Welcome {currentUser?.username || ''}
				</p>
				{currentUser ? (
					<Link href="/books">
						<Button>Explore books</Button>
					</Link>
				) : (
					<Link href="/sign-up">
						<Button>Sign up</Button>
					</Link>
				)}
			</div>

			<div className="mb-3">
				<p className="font-semibold text-2xl">
					Gathering the best books. <br />
					From awesome authors to established a connection with you.
				</p>
			</div>

			<div className="mx-auto flex min-h-screen max-w-screen-sm  justify-center">
				<div className="h-full w-full rounded-md bg-gradient-to-r from-green-500 via-lime-500 to-yellow-500 p-1">
					<div className="flex h-full w-full items-center justify-center bg-stone-950 back">
						<Image
							src={'/preview.png'}
							width={800}
							height={800}
							alt="preview image"
							className="p-2"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Hero;
