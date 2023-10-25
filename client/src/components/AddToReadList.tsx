'use client';
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useAuth } from '@clerk/nextjs';
import { addBook } from '@/app/actions';
import { LoaderIcon } from 'lucide-react';

export default function AddToReadList({ id }: { id: string }) {
	const { userId } = useAuth();
	const queryClient = useQueryClient();

	const { mutate, isLoading, error } = useMutation({
		mutationFn: () => addBook(id, userId!),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['reading-list'] });
			toast.success('Added to read list');
		},
		onError: () => {
			toast.error('Book already in read list');
		},
	});

	if (isLoading)
		return (
			<div>
				<Button disabled={isLoading}>
					<LoaderIcon className="animate-spin" />
				</Button>
			</div>
		);

	return (
		<div>
			<Button disabled={isLoading} onClick={() => mutate()}>
				Mark as read
			</Button>
		</div>
	);
}
