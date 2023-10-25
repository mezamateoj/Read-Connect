'use client';
import { useCallback, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from './ui/input';

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
				router.push('/books' + '?' + createQueryString('title', query));
				setQuery('');
			}}
		>
			<Input
				type="text"
				placeholder="title word: ex. 'python'"
				value={query}
				className="text-black placeholder:text-xs"
				onChange={(e) => setQuery(e.target.value)}
			/>
		</form>
	);
}

export default SearchBar;
