import Link from 'next/link';

function Header() {
	return (
		<header className="flex flex-wrap items-center justify-between border-b-2 border-stone-200 bg-yellow-500 px-4 py-3 uppercase sm:px-8 sm:py-5">
			<Link href="/" className="tracking-widest">
				ReadConnect.
			</Link>
			{/* <SearchOrder /> */}
			{/* <Username /> */}
		</header>
	);
}

export default Header;
