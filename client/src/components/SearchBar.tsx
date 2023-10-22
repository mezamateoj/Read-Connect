'use client';
import { useCallback, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function SearchBar() {
	const [query, setQuery] = useState('');
	const [value, setValue] = useState('');
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams()!;

	// Get a new searchParams string by merging the current
	// searchParams with a provided key/value pair
	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams);
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				// <pathname>?sort=asc
				router.push(pathname + '?' + createQueryString('title', query));
			}}
		>
			<input
				type="text"
				placeholder="Search order number"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className="w-32 rounded-md border-2 border-stone-400 bg-yellow-100 px-2 py-1 
        text-sm transition-all duration-200 ease-in-out 
        placeholder:text-stone-400 focus:w-40 focus:outline-none focus:ring focus:ring-yellow-500
        sm:w-72 sm:focus:w-96"
			/>
		</form>
	);
}

export default SearchBar;
