import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

type PaginationProps = {
	page: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPrevPage: boolean;
	count: number;
};
export default function Pagination(props: any) {
	const { page = 1, totalPages, hasNextPage, searchParams } = props;

	const currentPage = Math.min(Math.max(Number(page), 1), totalPages);

	const getPagesToShow = () => {
		if (totalPages <= 5)
			return Array.from({ length: totalPages }, (_, i) => i + 1);

		let startPage = currentPage - 2;
		let endPage = currentPage + 2;

		if (currentPage <= 3) {
			startPage = 1;
			endPage = 5;
		} else if (currentPage >= totalPages - 2) {
			startPage = totalPages - 4;
			endPage = totalPages;
		}

		return Array.from(
			{ length: endPage - startPage + 1 },
			(_, i) => startPage + i
		);
	};

	const pages = getPagesToShow();

	// Helper function to generate query string from searchParams object
	const generateQueryString = () => {
		const queryString = new URLSearchParams(searchParams).toString();
		return queryString ? `&${queryString}` : '';
	};

	return (
		<div className="flex items-center justify-center space-x-6 text-black mt-1 mb-2 py-5">
			<Link
				className={cn(
					'rounded-md border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-50',
					currentPage === 1
						? 'pointer-events-none bg-gray-100 line-through text-gray-500'
						: ''
				)}
				href={`?page=${currentPage - 1}${generateQueryString()}`}
			>
				Previous
			</Link>

			<nav
				aria-label="Pagination"
				className="relative z-0 inline-flex -space-x-px rounded-md"
			>
				{pages.map((p, i) => (
					<Link
						key={p}
						className={cn(
							'relative inline-flex items-center border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50',
							p === currentPage
								? 'pointer-events-none bg-gray-100'
								: '',
							i === 0 ? 'rounded-l-md' : '',
							i === pages.length - 1 ? 'rounded-r-md' : ''
						)}
						href={`?page=${p}${generateQueryString()}`}
					>
						{p}
					</Link>
				))}
			</nav>

			<Link
				className={cn(
					'rounded-md border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-50',
					!hasNextPage
						? 'pointer-events-none bg-gray-100 line-through text-gray-500'
						: ''
				)}
				href={`?page=${currentPage + 1}${generateQueryString()}`}
			>
				Next
			</Link>
		</div>
	);
}
