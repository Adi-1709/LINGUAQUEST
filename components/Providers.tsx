'use client'

import { AppProvider } from '@/contexts/AppContext'
import { Toaster } from 'react-hot-toast'
import type { ReactNode } from 'react'

type ProvidersProps = {
	children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
	return (
		<AppProvider>
			{children}
			<Toaster position="top-right" />
		</AppProvider>
	)
}


