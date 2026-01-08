'use client'

import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

const pageVariants: Variants = {
	initial: {
		opacity: 0,
		scale: 0.98,
		y: 20,
	},
	enter: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: {
			duration: 0.4,
			ease: [0.22, 1, 0.36, 1],
		},
	},
	exit: {
		opacity: 0,
		scale: 1.02,
		y: -20,
		transition: {
			duration: 0.3,
			ease: [0.22, 1, 0.36, 1],
		},
	},
}

type PageTransitionProps = {
	children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
	const pathname = usePathname()

	return (
		<AnimatePresence mode="wait">
			<motion.div key={pathname} initial="initial" animate="enter" exit="exit" variants={pageVariants} className="w-full">
				{children}
			</motion.div>
		</AnimatePresence>
	)
}


