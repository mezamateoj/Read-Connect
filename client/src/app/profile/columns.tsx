'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteRead } from '@/lib/hooks';
import { deleteReadList, getUser } from '../actions';
import { toast } from 'sonner';

interface reviews {
	id: string;
	rating: number;
	bookId: string;
	userId: string;
}

export type Book = {
	id: string;
	title: string;
	pageCount: number;
	authors: string[];
	thumbnailUrl: string;
	reviews: reviews[];
};

export const columns: ColumnDef<Book>[] = [
	{
		accessorKey: 'id',
		header: 'Id',
	},
	{
		accessorKey: 'thumbnailUrl',
		header: 'Cover',
		cell: ({ row }) => {
			return (
				<Image
					src={row.getValue('thumbnailUrl')}
					alt={row.getValue('title')}
					width={75}
					height={96}
				/>
			);
		},
	},
	{
		accessorKey: 'title',
		header: 'Title',
		cell: ({ row }) => {
			return (
				<p className="text-sm font-semibold truncate max-w-[160px] hover:underline">
					<Link href={`/books/${row.getValue('id')}`}>
						{row.getValue('title')}
					</Link>
				</p>
			);
		},
	},
	{
		accessorKey: 'pageCount',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="text-left px-0"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Page Count
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: 'authors',
		header: 'Authors',
		cell: ({ row }) => {
			return (
				<p className="text-sm truncate max-w-[175px]">
					{(row.getValue('authors') as string[]).join(', ')}
				</p>
			);
		},
	},
	{
		accessorKey: 'reviews',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="text-left px-0"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Reviews
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const averageRating =
				((row.getValue('reviews') as reviews[]) || []).reduce(
					(acc, curr) => acc + curr.rating,
					0
				) / ((row.getValue('reviews') as reviews[]) || []).length;
			return (
				<span className="text-sm capitalize italic text-stone-500">
					{!isNaN(averageRating) ? averageRating : 'No Reviews'}
				</span>
			);
		},
	},
	{
		id: 'actions',

		cell: ({ row, table, column }) => {
			const book = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => {
								deleteReadList(Number(book.id));
								setTimeout(() => {
									toast.success(
										'Book deleted from read list'
									);
								}, 2000);
							}}
						>
							Delete from list
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
