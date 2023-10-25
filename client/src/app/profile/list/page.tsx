import { getWantReadList } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { auth } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';
import { DataTable } from '../data-table';
import { columns } from '../columns';
import Back from '@/components/Back';

export default async function WantToReadBooks() {
	const { userId } = auth();
	const { readingList } = await getWantReadList(userId!);

	return (
		<div className="flex  flex-col  px-6 py-5">
			<div className="flex gap-3 justify-around">
				<div className="flex items-start">
					<Back />
				</div>
				<div className="flex">
					<Link href="/profile/">
						<Button>Read books</Button>
					</Link>
				</div>
			</div>

			<div className="flex items-center flex-col justify-center px-6 py-5">
				<h1 className="font-bold text-2xl mb-2">Want to read books</h1>
				<DataTable columns={columns} data={readingList} />
			</div>
		</div>
	);
}
