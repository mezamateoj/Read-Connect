'use client';
import { useAuth } from '@clerk/nextjs';
import React from 'react';
import { Button } from './ui/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Review from './Review';
import TextReview from './TextReview';

const postReview = async (id: string, userId: string) => {
	const res = await fetch(`http://localhost:3001/reviews/${id}/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			mode: 'cors',
		},
		body: JSON.stringify({
			review: 'This book is great!',
			userId: userId,
			rating: 5,
		}),
	});

	if (!res.ok) {
		throw new Error('Could not post review');
	}

	const data = await res.json();
	return data;
};

const getReviews = async (id: string) => {
	const res = await fetch(`http://localhost:3001/reviews/${id}/`, {});
	const data = await res.json();
	return data;
};

export default function User({ id }: { id: string }) {
	const { userId } = useAuth();
	// const queryClient = useQueryClient();

	const { data, isLoading: isLoadingReviews } = useQuery({
		queryKey: ['reviews'],
		queryFn: () => getReviews(id),
	});

	// const { isLoading, mutate } = useMutation({
	// 	mutationFn: (id: string) => postReview(id, userId!),
	// 	onSuccess: () => {
	// 		toast.success('Review added!');
	// 		queryClient.invalidateQueries({
	// 			queryKey: ['reviews'],
	// 		});
	// 	},
	// 	onError: (error: any) => {
	// 		toast.error(`${error.message}`);
	// 		console.log(error);
	// 	},
	// });

	// if (isLoading) return <div>loading...</div>;

	return (
		<div>
			<div className="mt-5">
				{isLoadingReviews && <p>Add a review</p>}
				{!isLoadingReviews && data?.review.length > 0
					? data?.review.map((review: any) => (
							<div key={review.id}>
								<p>{review.review}</p>
								<p>{review.rating}</p>
							</div>
					  ))
					: 'Add a review'}
			</div>
			<TextReview userId={userId!} id={id} />
			{/* <Button disabled={isLoadingReviews} onClick={() => mutate(id)}>
				send review
			</Button> */}
		</div>
	);
}
