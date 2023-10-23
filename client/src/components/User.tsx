'use client';
import { useAuth } from '@clerk/nextjs';
import React from 'react';
import { Button } from './ui/button';

export default function User({ id }: { id: string }) {
	const { userId, getToken } = useAuth();

	const handleReview = async () => {
		const res = await fetch(`http://localhost:3001/reviews/${id}/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				// Authorization: `Bearer ${getToken}`,
				mode: 'cors',
			},
			body: JSON.stringify({
				review: 'This book is great!',
				userId: userId,
				rating: 5,
			}),
		});

		const data = await res.json();

		console.log(data);
	};

	return (
		<div>
			<Button onClick={handleReview}>send review</Button>
		</div>
	);
}
