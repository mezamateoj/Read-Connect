import { Loader2 } from 'lucide-react';
import React from 'react';

export default function loading() {
	return (
		<div className="flex items-center justify-center h-screen">
			<Loader2 className="animate-spin h-1/6 w-1/6" />
		</div>
	);
}
