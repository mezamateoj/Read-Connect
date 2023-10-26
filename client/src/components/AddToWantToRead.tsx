import React from 'react';
import { Button } from './ui/button';
import { addBookToWantList } from '@/app/actions';
import { useAuth } from '@clerk/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Loader2, LoaderIcon } from 'lucide-react';

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
				<Button disabled>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					Please wait
				</Button>
			</div>
		);
	}
	return (
		<div>
			<Button
				variant="outline"
				disabled={isLoading}
				onClick={() => mutate()}
			>
				Want to read
			</Button>
		</div>
	);
}
