'use client';
import { useAuth } from '@clerk/nextjs';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

import TextReview from './TextReview';
import Reviews from './Reviews';
import { LoaderIcon } from 'lucide-react';

const getReviews = async (id: string) => {
	const res = await fetch(`http://localhost:3001/reviews/${id}/`, {});
	const data = await res.json();
	return data;
};

export default function User({ id }: { id: string }) {
	const { userId } = useAuth();

	const { data, isLoading: isLoadingReviews } = useQuery({
		queryKey: ['reviews'],
		queryFn: () => getReviews(id),
	});

	if (isLoadingReviews) return <p>Loading...</p>;

	return (
		<div className="py-2">
			<TextReview userId={userId!} id={id} />
			<div className="mt-5 divide-y-2 divide-slate-300">
				<h2 className="font-bold text-lg py-2">Reviews</h2>
				{isLoadingReviews && (
					<p>
						<LoaderIcon className="animate-spin" />
					</p>
				)}
				{!isLoadingReviews && data?.review.length > 0 ? (
					data?.review.map((review: any) => (
						<div key={review.id} className="">
							<Reviews key={review.id} reviews={review} />
						</div>
					))
				) : (
					<p className="font-semibold">Add a review</p>
				)}
			</div>
		</div>
	);
}
