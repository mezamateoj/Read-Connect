'use client';
import { useDeleteRead } from '@/lib/hooks';

function Test() {
	const { mutate, isLoading } = useDeleteRead();
	return <div></div>;
}

export default Test;
