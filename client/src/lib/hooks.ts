import { ReviewData, deleteReadList, postReview } from '@/app/actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

type MutationParams = {
	id: string;
	data: ReviewData; // Change to a single ReviewData object
};

export function useCreateReview() {
	const queryClient = useQueryClient();

	const { isLoading, mutate } = useMutation({
		mutationFn: (params: MutationParams) =>
			postReview(params.id, params.data),
		onSuccess: () => {
			toast.success('Review added!');
			queryClient.invalidateQueries({
				queryKey: ['reviews'],
			});
		},
		onError: (error: any) => {
			toast.error(`${error.message}`);
			console.log(error);
		},
	});

	return { isLoading, mutate };
}

type DeleteParams = {
	bookId: number;
	userId: string;
};

export function useDeleteRead() {
	const queryClient = useQueryClient();

	const { isLoading, mutate } = useMutation({
		mutationFn: (params: DeleteParams) => deleteReadList(params.bookId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['reading-list', 'want-read-list'],
			});
			toast.success('Deleted!');
		},
		onError: (error: any) => {
			toast.error(`${error.message}`);
			console.log(error);
		},
	});

	return { isLoading, mutate };
}
