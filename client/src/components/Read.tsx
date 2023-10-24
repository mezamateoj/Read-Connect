import React from 'react';
import { Button } from './ui/button';
import { addBookToWantList } from '@/app/actions';
import { useAuth } from '@clerk/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function Read({ id }: { id: string }) {
	const { userId } = useAuth();
	const queryClient = useQueryClient();

	const { mutate, isLoading, error } = useMutation({
		mutationFn: () => addBookToWantList(id, userId!),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['read-list'] });
			toast.success('Added to read list');
		},
		onError: () => {
			toast.error('Book already in read list');
		},
	});

	if (error) {
		toast.error('Book already in read list');
	}
	return (
		<div>
			<Button disabled={isLoading} onClick={() => mutate()}>
				Mark as read
			</Button>
		</div>
	);
}
