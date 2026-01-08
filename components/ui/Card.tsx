'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type CardVariant = 'dark' | 'light'

type CardProps = HTMLMotionProps<'div'> & {
	children: ReactNode
	className?: string
	variant?: CardVariant
	hover?: boolean
}

const variantClasses: Record<CardVariant, string> = {
	dark: 'glass text-white border border-white/10',
	light: 'bg-white/95 backdrop-blur-xl text-gray-900 border border-gray-200/50 shadow-2xl',
}

const hoverClasses: Record<CardVariant, string> = {
	dark: 'hover:shadow-[0_20px_50px_rgba(99,102,241,0.3)] hover:border-indigo-500/30 hover:scale-[1.02]',
	light: 'hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:border-indigo-300/50 hover:scale-[1.02]',
}

export default function Card({
	children,
	className,
	variant = 'dark',
	hover = true,
	initial,
	whileInView,
	transition,
	viewport,
	...rest
}: CardProps) {
	return (
		<motion.div
			initial={initial ?? { opacity: 0, y: 20 }}
			whileInView={whileInView ?? { opacity: 1, y: 0 }}
			viewport={{ once: true, ...viewport }}
			transition={transition ?? { duration: 0.2 }}
			whileHover={hover ? { y: -3 } : undefined}
			className={cn(
				'rounded-2xl p-6 transition-all duration-300 ease-out',
				hover && hoverClasses[variant],
				variantClasses[variant],
				className
			)}
			{...rest}
		>
			{children}
		</motion.div>
	)
}


