import { getReadingList } from '@/app/actions';
import { columns } from '@/app/profile/columns';
import { DataTable } from '@/app/profile/data-table';
import { Button } from '@/components/ui/button';
import { auth } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

export default async function ReadBooks() {
	const { userId } = auth();
	const { readingList } = await getReadingList(userId!);

	return (
		<div className="flex flex-col justify-center items-center ">
			<div className="flex items-center gap-3 mt-5">
				<div className="flex gap-2">
					<Link href="/profile/list">
						<Button>Want to read</Button>
					</Link>
				</div>
				<h1>Read books</h1>
			</div>
			<div className="flex items-center flex-col justify-center px-6 py-5">
				<DataTable columns={columns} data={readingList} />
			</div>
		</div>
	);
}
