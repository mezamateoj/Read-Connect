'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from './ui/button';

import React from 'react';
import { toast } from 'sonner';
import { useAuth } from '@clerk/nextjs';
import { addBook } from '@/app/actions';

export default function AddToReadingList({ id }: { id: string }) {
	const { userId } = useAuth();
	const queryClient = useQueryClient();

	const { mutate, isLoading, error } = useMutation({
		mutationFn: () => addBook(id, userId!),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['reading-list'] });
			toast.success('Added to want to read list');
		},
		onError: () => {
			toast.error('Book already in want to read list');
		},
	});

	if (error) {
		toast.error('Book already in want to read list');
	}

	return (
		<div>
			<Button disabled={isLoading} onClick={() => mutate()}>
				Want to Read
			</Button>
		</div>
	);
}
