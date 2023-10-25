'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { ArrowDown10, ArrowUp10 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import React from 'react';

export default function PageCountSort() {
	const router = useRouter();
	const pathname = usePathname();

	const handleSort = (value: string): void => {
		router.push(pathname + '/?sort=' + `${value || ''}`);
	};

	return (
		<Select onValueChange={handleSort}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Sort" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem onClick={() => handleSort('-')} value="pageCount">
					<div className="flex items-center gap-1">
						<ArrowDown10 className="w-6 h-6" />
						<p>page count</p>
					</div>
				</SelectItem>
				<SelectItem onClick={() => handleSort('')} value="-pageCount">
					<div className="flex items-center gap-1">
						<ArrowUp10 className="w-6 h-6" />
						<p>page count</p>
					</div>
				</SelectItem>
			</SelectContent>
		</Select>
	);
}
