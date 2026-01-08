import './globals.css'
import Providers from '@/components/Providers'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
	title: 'LinguaQuest - Language Learning Adventure',
	description:
		'Learn languages through fun missions, AI-assisted lessons, and competitive challenges',
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className="antialiased">
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}


