'use server';
import { auth, currentUser } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function getData(pageNumber: any, params: any = {}) {
	('use server');
	delete params['page'];

	const queryParams = new URLSearchParams(params).toString();

	if (queryParams.includes('title')) {
		const res = await fetch(
			`${URL}/books/search/${queryParams.split('=')[1]}`
			// {
			// 	// next: { revalidate: 3600 },
			// 	cache: 'no-cache',
			// }
		);
		const data = await res.json();
		revalidatePath(`/books`);
		return data;
	}

	// the data gets cached by the browser
	const res = await fetch(
		`${URL}/books/?page=${pageNumber}&${queryParams}`
		// {
		// 	// next: { revalidate: 3600 },
		// 	cache: 'no-cache',
		// }
	);

	const data = await res.json();
	revalidatePath(`/books`);

	return data;
}

export async function getUser() {
	// Get the userId from auth() -- if null, the user is not logged in
	const { userId } = auth();

	if (userId) {
		// Query DB for user specific information or display assets only to logged in users
	}

	// Get the User object when you need access to the user's information
	const user = await currentUser();
	// Use `user` to render user details or create UI elements
	return user;
}

export async function getAllCategories() {
	('use server');

	// the data get cached by the browser
	const res = await fetch(`${URL}/books/categories/names`, {
		next: { revalidate: 3600 },
		// cache: 'no-cache',
	});

	const data = await res.json();

	// revalidatePath(`/books`);

	return data;
}

export interface ReviewData {
	review: string;
	rating: number;
	userId: string;
}

export const postReview = async (id: string, data: ReviewData) => {
	const res = await fetch(`${URL}/reviews/${id}/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	if (!res.ok) {
		throw new Error('You already have a review for this book');
	}

	const result = await res.json();
	return result;
};

export const getReviews = async (id: string) => {
	const res = await fetch(`${URL}/reviews/${id}/`, {});
	const data = await res.json();
	return data;
};

// add book to read list
export async function addBook(id: any, userId: string) {
	const postData = {
		userId: userId,
		bookId: Number(id),
	};

	const res = await fetch(`${URL}/reading-list/${id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(postData),
	});

	if (!res.ok) throw new Error('Book already in read list');

	const data = await res.json();
	return data;
}

// delete book from read list
export async function deleteReadList(bookId: number) {
	const userId = await getUser(); // sometimes we get cant get userId in the data table component

	const deleteData = {
		userId: userId?.id,
		bookId: bookId,
	};

	const res = await fetch(`${URL}/reading-list/delete/${userId?.id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(deleteData),
	});

	if (!res.ok) throw new Error('Could not delete book from read list');
	const data = await res.json();
	revalidatePath('/profile');
	return data;
}

// move book from one list to another
export async function moveFromList(bookId: number) {
	const userId = await getUser(); // sometimes we get cant get userId in the data table component

	const moveData = {
		userId: userId?.id,
		bookId: bookId,
	};

	const res = await fetch(`${URL}/reading-list/move/${userId?.id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(moveData),
	});

	if (!res.ok) throw new Error('Could not move book to another list');
	const data = await res.json();
	revalidatePath('/profile');
	return data;
}

// get read books
export async function getReadingList(userId: string) {
	'use server';
	const res = await fetch(`${URL}/reading-list/${userId}`, {
		cache: 'no-store',
	});
	const data = await res.json();

	revalidatePath('/profile');
	return data;
}

// add book to want to read list
export async function addBookToWantList(id: any, userId: string) {
	const postData = {
		userId: userId,
		bookId: Number(id),
	};

	const res = await fetch(`${URL}/reading-list/want-read/${id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(postData),
	});

	if (!res.ok) throw new Error('Book already in reading list');

	const data = await res.json();
	return data;
}

// get want to read books
export async function getWantReadList(userId: string) {
	'use server';
	const res = await fetch(`${URL}/reading-list/want-read/${userId}`, {
		cache: 'no-store',
	});
	const data = await res.json();

	revalidatePath('/profile');
	return data;
}
