'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Rating } from '@mui/material';
import { useCreateReview } from '@/lib/hooks';

const FormSchema = z.object({
	review: z
		.string()
		.min(10, {
			message: 'Review must be at least 10 characters.',
		})
		.max(400, {
			message: 'Review must not be longer than 400 characters.',
		}),
	rating: z.number().min(1).max(5),
});

export default function TextReview({
	userId,
	id,
}: {
	userId: string;
	id: string;
}) {
	const { isLoading, mutate } = useCreateReview();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		const postData = { ...data, userId };
		mutate(
			{ id, data: postData },
			{
				onSuccess: () => {
					toast.success('Review Submitted');
					form.reset();
				},
				onError: (error: any) => {
					toast.error(`${error.message}`);
					console.log(error);
				},
			}
		);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-2/3 space-y-6"
			>
				<FormField
					control={form.control}
					name="review"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Review</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Tell us your thoughts about the book..."
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="rating"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Controller
									name="rating"
									control={form.control}
									render={({ field }) => (
										<Rating
											name="rating"
											value={field.value}
											onChange={(event, newValue) => {
												field.onChange(newValue);
											}}
										/>
									)}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button disabled={isLoading} type="submit">
					Submit review
				</Button>
			</form>
		</Form>
	);
}
