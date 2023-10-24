'use client';
import { getWantReadList } from '@/app/actions';
import { BooksProps } from '@/app/books/books';
import BooksItems from '@/app/books/booksItems';
import { Button } from '@/components/ui/button';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';

export default function MyBooks() {
	const { userId } = useAuth();
	const { data, isLoading, error } = useQuery({
		queryKey: ['want-read-list'],
		queryFn: () => getWantReadList(userId!),
	});

	if (isLoading) return <div>Loading...</div>;

	return (
		<div>
			<h1>Want to Read Books</h1>
			<div className="flex gap-2">
				<Link href="/profile/">
					<Button>Read books</Button>
				</Link>
			</div>

			<div>
				{data.readingList.map((book: BooksProps) => (
					<BooksItems key={book.id} b={book} />
				))}
			</div>
		</div>
	);
}
