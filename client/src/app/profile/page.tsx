import MyBooks from '@/components/MyBooks';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function page() {
	return (
		<div className="flex flex-col justify-center items-center max-w-4xl">
			<h1>My Books</h1>
			<div className="flex gap-2">
				<Link href="/profile/list">
					<Button>Read</Button>
				</Link>
				<Button>Want to read</Button>
			</div>
			<div>
				<MyBooks />
			</div>
		</div>
	);
}
