'use client';
import User from '@/components/User';
import Image from 'next/image';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

const getData = async (id: string) => {
	const res = await fetch(`http://localhost:3001/books/${id}`);

	if (!res.ok) throw new Error('Could not get the book!');

	const data = await res.json();
	return data;
};

export default function Page({ params }: { params: { id: string } }) {
	const { data, isLoading, error } = useQuery({
		queryKey: ['booksId'],
		queryFn: () => getData(params.id),
	});

	if (error) return <div>{toast.error('Could not get the book!')}</div>;

	if (isLoading) return <div>Loading...</div>;

	const book = data.book;

	return (
		<div className="flex flex-col items-center justify-center mt-8 px-6 py-5 gap-5">
			<div className="flex items-center justify-center flex-col">
				<h1>{book.title}</h1>
				{book.thumbnailUrl && (
					<Image
						src={book.thumbnailUrl}
						alt={book.title}
						width={75}
						height={96}
					/>
				)}
			</div>

			<div className="flex flex-col w-4/6">
				<p className="text-sm text-slate-800 ">
					{book.longDescription}
				</p>
				<User id={params.id} />
			</div>
		</div>
	);
}
