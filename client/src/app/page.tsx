import Feed from '@/components/Feed';
import Header from '@/components/Header';
import Hero from '@/components/Hero';

export default async function Home() {
	return (
		<main className="mx-auto h-full max-w-3xl overflow-y-hidden">
			<Hero />
		</main>
	);
}
