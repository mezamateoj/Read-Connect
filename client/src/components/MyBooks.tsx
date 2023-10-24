'use client';
import { getReadingList } from '@/app/actions';
import { BooksProps } from '@/app/books/books';
import BooksItems from '@/app/books/booksItems';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export default function MyBooks() {
	const { userId } = useAuth();
	const { data, isLoading, error } = useQuery({
		queryKey: ['reading-list'],
		queryFn: () => getReadingList(userId!),
		// refetchOnMount: true,
	});

	if (isLoading) return <div>Loading...</div>;

	return (
		<div>
			<h1>Want to Read</h1>
			<div>
				{data.readingList.map((book: BooksProps) => (
					<BooksItems key={book.id} b={book} />
				))}
			</div>
		</div>
	);
}
