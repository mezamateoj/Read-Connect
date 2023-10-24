'use client';

import React from 'react';
import Rating from '@mui/material/Rating';

interface Review {
	id: number;
	userId: string;
	review: string;
	rating: number;
	bookId: number;
}

interface Props {
	reviews: Review;
}

export default function Reviews(props: Props) {
	const reviews = props.reviews;
	return (
		<div className="flex justify-content flex-col gap-4 py-4">
			<div>
				<p>{reviews.review}</p>
			</div>

			<div>
				<Rating name="read-only" value={reviews.rating} readOnly />
			</div>
		</div>
	);
}
