'use server';

import { revalidatePath } from 'next/cache';

export async function getData(pageNumber: any) {
	('use server');
	// the data get cached by the browser
	const res = await fetch(`http://localhost:3001/books/?page=${pageNumber}`, {
		cache: 'no-cache',
	});
	const data = await res.json();

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}
	revalidatePath(`/books`);
	return data;
}
