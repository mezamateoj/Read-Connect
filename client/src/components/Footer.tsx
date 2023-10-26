import { Github } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function Footer() {
	return (
		<footer>
			<div className="flex items-center justify-between text-stone-300 font-semibold h-12 bg-stone-900 sm:h-20 px-10">
				<p>📗ReadConnect.</p>
				<a
					target="_blank"
					href="https://github.com/mezamateoj"
					rel="noopener noreferrer"
				>
					<Github size={24} />
				</a>

				<p>Mateo Meza</p>
			</div>
		</footer>
	);
}
