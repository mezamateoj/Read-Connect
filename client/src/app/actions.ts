'use server';
import { auth, currentUser } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import axios from 'axios';

export async function getData(pageNumber: any, params: any = {}) {
	('use server');
	delete params['page'];

	const queryParams = new URLSearchParams(params).toString();

	if (queryParams.includes('title')) {
		const res = await fetch(
			`http://localhost:3001/books/search/${queryParams.split('=')[1]}`,
			{
				// next: { revalidate: 3600 },
				cache: 'no-cache',
			}
		);
		const data = await res.json();
		revalidatePath(`/books`);
		return data;
	}

	// the data gets cached by the browser
	const res = await fetch(
		`http://localhost:3001/books/?page=${pageNumber}&${queryParams}`,
		{
			// next: { revalidate: 3600 },
			cache: 'no-cache',
		}
	);

	const data = await res.json();
	revalidatePath(`/books`);

	return data;
}

export async function getUser() {
	// Get the userId from auth() -- if null, the user is not logged in
	const { userId, getToken } = auth();
	console.log(userId, getToken);

	if (userId) {
		// Query DB for user specific information or display assets only to logged in users
		// post axios to the express server
	}

	// Get the User object when you need access to the user's information
	const user = await currentUser();
	// Use `user` to render user details or create UI elements
	return user;
}

export async function getAllAuthors() {
	('use server');

	// the data get cached by the browser
	const res = await fetch('http://localhost:3001/books/authors/names', {
		// next: { revalidate: 3600 },
		cache: 'no-cache',
	});

	const data = await res.json();

	// revalidatePath(`/books`);

	return data;
}

export async function getAllCategories() {
	('use server');

	// the data get cached by the browser
	const res = await fetch('http://localhost:3001/books/categories/names', {
		// next: { revalidate: 3600 },
		cache: 'no-cache',
	});

	const data = await res.json();

	// revalidatePath(`/books`);

	return data;
}
