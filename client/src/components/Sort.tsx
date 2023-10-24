'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, RouteOff } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

import { useRouter } from 'next/navigation';
import Back from './Back';

export function Sort({
	URL,
	text,
	target,
	categories,
}: {
	URL: string;
	text: string;
	target: string;
	categories: string[];
}) {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState('');
	const [originData, setOriginData] = React.useState(categories);

	const router = useRouter();

	const handleAuthorClick = (a: string) => {
		// i have to capitalize the first letter of the author name
		// https://github.com/shadcn-ui/ui/issues/173
		const text = a.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
		router.push(`/books/?${target}=${text}`);
	};

	return (
		<div className="flex items-center gap-6 flex-wrap">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-[200px] justify-between"
					>
						{value
							? originData.find((a: string) => a === value) ||
							  value
							: `${text}`}
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0">
					<Command>
						<CommandInput placeholder="Select Item" />
						<CommandEmpty>No item Found.</CommandEmpty>
						<CommandGroup>
							{originData?.map((a: string) => (
								<CommandItem
									key={a}
									className="text-black capitalize"
									onSelect={(a) => {
										setValue(a);
										handleAuthorClick(a);
										setOpen(false);
									}}
								>
									<Check
										className={cn(
											'mr-2 h-4 w-4',
											value === a
												? 'opacity-100 text-black'
												: 'opacity-0'
										)}
									/>
									{a}
								</CommandItem>
							))}
						</CommandGroup>
					</Command>
				</PopoverContent>
			</Popover>
			<Back />
			<div className="flex items-center gap-1">
				<Button onClick={() => router.push('/books')}>
					<RouteOff
						className="hidden sm:block"
						width={20}
						height={20}
					/>{' '}
					Reset filters
				</Button>
			</div>
		</div>
	);
}
