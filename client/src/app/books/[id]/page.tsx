import User from '@/components/User';
import React from 'react';

const getData = async (id: string) => {
	const res = await fetch(`http://localhost:3001/books/${id}`);

	const data = await res.json();

	return data;
};

export default async function page({ params }: { params: { id: string } }) {
	const { book } = await getData(params.id);

	return (
		<div>
			<h1>Book</h1>
			<h2>{book.title}</h2>
			<p>{book.longDescription}</p>
			<User id={params.id} />
		</div>
	);
}
