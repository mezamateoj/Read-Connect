'use client';
import React from 'react';
import { Sort } from './Sort';

export default function Trysort({
	authors,
	categories,
}: {
	authors: string[];
	categories: string[];
}) {
	const [authorsInitialData, setAuthorsInitialData] = React.useState(authors);
	const [categoriesInitialData, setCategoriesInitialData] =
		React.useState(categories);

	return (
		<div>

	
		</div>
	);
}
