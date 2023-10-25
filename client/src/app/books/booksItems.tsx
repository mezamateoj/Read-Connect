import React from 'react';
import Image from 'next/image';
import { BooksProps } from './books';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export default function BooksItems({ b }: { b: BooksProps }) {
	return (
		<li className="flex list-none gap-4 py-2 sm:flex-row flex-col">
			{b.thumbnailUrl && (
				<Image
					src={b.thumbnailUrl}
					alt={b.title}
					width={75}
					height={96}
					className={`h-24 ${
						b.status !== 'PUBLISH' ? 'opacity-70 grayscale' : ''
					}`}
				/>
			)}

			<div className="flex flex-grow flex-col pt-0.5">
				<p className="font-medium">
					<Link href={`/books/${b.id}`}>
						<span className="hover:underline">{b.title}</span>
					</Link>
					<span className="text-sm font-light ml-2">
						{formatDate(b.publishedDate)}
					</span>
				</p>
				<p className="text-sm capitalize  text-stone-800 divide-x-2 divide-slate-400 gap-2">
					{b.authors.map(
						(a) =>
							a !== '' && (
								<Link href={`/books/?authors=${a}`} key={a}>
									<span className="text-stone-800 hover:underline ml-1">
										{a} &nbsp;
									</span>
								</Link>
							)
					)}
				</p>
				<span className="text-sm capitalize italic text-stone-500">
					Category: {b.categories.join(', ')}
				</span>

				<p className="text-sm sm:text-justify tracking-tight sm:tracking-normal pr-4 sm:p-1">
					{b.shortDescription}
				</p>
			</div>
		</li>
	);
}
