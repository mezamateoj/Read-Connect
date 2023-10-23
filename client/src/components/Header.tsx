import Link from 'next/link';
import { UserButton, auth } from '@clerk/nextjs';
import SearchBar from './SearchBar';
import { Button } from './ui/button';

function Header() {
	const { userId } = auth();
	return (
		<header className="flex flex-wrap items-center justify-between border-b-2 border-stone-200 bg-yellow-500 px-4 py-3 uppercase sm:px-8 sm:py-5">
			<Link href="/" className="tracking-widest">
				ReadConnect.
			</Link>
			<SearchBar />
			{userId ? (
				<UserButton afterSignOutUrl="/" />
			) : (
				<Button>
					<Link href="/sign-in">Sign In</Link>
				</Button>
			)}
		</header>
	);
}

export default Header;
