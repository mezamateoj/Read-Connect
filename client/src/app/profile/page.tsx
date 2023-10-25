import { getReadingList } from '@/app/actions';
import { columns } from '@/app/profile/columns';
import { DataTable } from '@/app/profile/data-table';
import Back from '@/components/Back';
import { Button } from '@/components/ui/button';
import { auth } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

export default async function ReadBooks() {
	const { userId } = auth();
	const { readingList } = await getReadingList(userId!);

	return (
		<div className="flex  flex-col  px-6 py-5 ">
			<div className="flex gap-3 justify-around">
				<div className="flex items-start">
					<Back />
				</div>
				<div className="flex">
					<Link href="/profile/list">
						<Button>Want to read</Button>
					</Link>
				</div>
			</div>
			<div className="flex items-center flex-col justify-center px-6 py-5">
				<h1 className="font-bold text-2xl mb-2">My Read Books</h1>
				<DataTable columns={columns} data={readingList} />
			</div>
		</div>
	);
}
