'use client';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from './ui/button';

export default function Back() {
	const router = useRouter();
	return (
		<div className="flex items-center gap-1 ">
			<Button onClick={() => router.back()}>
				<ArrowLeft className="hidden sm:block" width={20} height={20} />{' '}
				Go Back
			</Button>
		</div>
	);
}
