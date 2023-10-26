import React from 'react';
import Back from './Back';
import Link from 'next/link';
import { Button } from './ui/button';

export default function Empty() {
	return (
		<div className="h-screen">
			<div className="flex items-center gap-16 flex-col justify-center mt-10">
				<div className="text-center">
					<h1 className="text-6xl font-bold">🙃</h1>
					<p className="text-4xl font-bold mt-2">No data Found</p>
				</div>
				<div>
					<h2 className="text-2xl">
						Search again, maybe try java...
					</h2>
				</div>
				<div className="flex items-center gap-5">
					<Back />
					<Link href="/books">
						<Button variant="outline">Home</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
