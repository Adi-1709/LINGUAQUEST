'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type GlassCardProps = HTMLMotionProps<'div'> & {
	children: ReactNode
	className?: string
	delay?: number
}

export default function GlassCard({
	children,
	className,
	delay = 0,
	initial,
	whileInView,
	transition,
	viewport,
	...rest
}: GlassCardProps) {
	return (
		<motion.div
			initial={initial ?? { opacity: 0, y: 20 }}
			whileInView={whileInView ?? { opacity: 1, y: 0 }}
			viewport={{ once: true, ...viewport }}
			transition={transition ?? { duration: 0.3, delay }}
			className={cn(
				'backdrop-blur-xl bg-gray-900/50 border border-gray-800/50 rounded-xl shadow-lg hover:bg-gray-800/60 transition-all duration-200',
				className
			)}
			{...rest}
		>
			{children}
		</motion.div>
	)
}


