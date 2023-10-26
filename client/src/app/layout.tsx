import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { ClerkProvider } from '@clerk/nextjs';
import Providers from '@/lib/providers';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/theme-provider';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Read Connect',
	description: 'A minimalist book library app',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={`${inter.className}`}>
					<Providers>
						<ThemeProvider
							attribute="class"
							defaultTheme="dark"
							enableSystem
							disableTransitionOnChange
						>
							<Header />
							{children}

							<Toaster position="top-center" />
						</ThemeProvider>
					</Providers>
				</body>
			</html>
		</ClerkProvider>
	);
}
