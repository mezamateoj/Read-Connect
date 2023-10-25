import { getWantReadList } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { auth, useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import { DataTable } from '../data-table';
import { columns } from '../columns';

export default async function WantToReadBooks() {
	const { userId } = auth();
	const { readingList } = await getWantReadList(userId!);

	return (
		<div className="flex items-center flex-col justify-center px-6 py-5">
			<div className="flex items-center gap-3">
				<div className="flex gap-2 justify-start">
					<Link href="/profile/">
						<Button>Read books</Button>
					</Link>
				</div>
				<h1>Want to read</h1>
			</div>

			<div>
				<DataTable columns={columns} data={readingList} />
			</div>
		</div>
	);
}
