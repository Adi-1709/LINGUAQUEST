'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

import ThreeBackground from './animations/ThreeBackground'

type LayoutProps = {
	children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
	return (
		<div className="flex flex-col min-h-screen relative overflow-hidden bg-black selection:bg-white/20 selection:text-white">
			<ThreeBackground />
			<Header />
			<motion.main
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="flex-grow"
			>
				{children}
			</motion.main>
			<Footer />
		</div>
	)
}


