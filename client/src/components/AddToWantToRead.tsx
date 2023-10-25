import React from 'react';
import { Button } from './ui/button';
import { addBookToWantList } from '@/app/actions';
import { useAuth } from '@clerk/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { LoaderIcon } from 'lucide-react';

export default function AddToWantToRead({ id }: { id: string }) {
	const { userId } = useAuth();
	const queryClient = useQueryClient();

	const { mutate, isLoading, error } = useMutation({
		mutationFn: () => addBookToWantList(id, userId!),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['want-read-list'] });
			toast.success('Added to want to read list');
		},
		onError: () => {
			toast.error('Book already in want to read list');
		},
	});

	if (error) {
		toast.error('Book already in want to read list');
	}

	if (isLoading) {
		return (
			<div>
				<Button disabled={isLoading}>
					<LoaderIcon className="animate-spin" />
				</Button>
			</div>
		);
	}
	return (
		<div>
			<Button disabled={isLoading} onClick={() => mutate()}>
				Want to read
			</Button>
		</div>
	);
}
