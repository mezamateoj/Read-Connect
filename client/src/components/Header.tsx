import Link from 'next/link';
import { UserButton, auth } from '@clerk/nextjs';
import SearchBar from './SearchBar';
import { Button } from './ui/button';

function Header() {
	const { userId } = auth();
	return (
		<header className="flex flex-wrap items-center justify-between border-b-2 border-stone-200 bg-slate-500 px-4 py-3 uppercase sm:px-8 sm:py-5">
			<Link href="/" className="tracking-widest text-sm sm:text-lg">
				ReadConnect.
			</Link>
			<Link className="text-sm sm:text-base" href="/books">
				Books
			</Link>
			<Link className="text-sm sm:text-base" href="/profile">
				Profile
			</Link>
			<div className="hidden sm:block">
				<SearchBar />
			</div>
			{userId ? (
				<div className="hidden sm:block">
					<UserButton afterSignOutUrl="/" />
				</div>
			) : (
				<Button className="hidden sm:block">
					<Link href="/sign-in">Sign In</Link>
				</Button>
			)}
		</header>
	);
}

export default Header;
