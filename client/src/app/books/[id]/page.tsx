'use client';
import User from '@/components/User';
import Image from 'next/image';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import Back from '@/components/Back';
import { Skeleton } from '@/components/ui/skeleton';
import AddToReadList from '@/components/AddToReadList';
import AddToWantToRead from '@/components/AddToWantToRead';

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

	if (isLoading)
		return (
			<div className="flex items-center justify-center mt-10 h-screen">
				<Skeleton className="w-[500px] h-[200px] rounded-md" />
			</div>
		);

	const book = data.book;

	return (
		<div className="flex flex-col justify-around mt-2 px-6 py-4 gap-8">
			<div className="flex justify-start">
				<div className="flex">
					<Back />
				</div>
			</div>
			<div className="flex gap-5  justify-around">
				<div className="flex flex-col gap-5 max-w-2xl items-center">
					<div className="flex flex-col gap-10 items-center">
						<div>
							<h1 className="font-semibold text-2xl">
								{book.title}
							</h1>
							<h2 className="truncate max-w-[300px] text-stone-500">
								{book.authors.join(', ')}
							</h2>
						</div>

						{book.thumbnailUrl && (
							<Image
								src={book.thumbnailUrl}
								alt={book.title}
								width={150}
								height={150}
							/>
						)}
					</div>
					<div className="flex gap-2">
						<AddToReadList id={params.id} />
						<AddToWantToRead id={params.id} />
					</div>
				</div>

				<div className="flex flex-col w-4/6">
					<p className="text-sm  justified max-w-4xl">
						{book.longDescription}
					</p>
					<User id={params.id} />
				</div>
			</div>
		</div>
	);
}
