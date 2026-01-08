'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type AnimatedGradientProps = HTMLMotionProps<'div'> & {
	children: ReactNode
	className?: string
}

export default function AnimatedGradient({ children, className, ...rest }: AnimatedGradientProps) {
	return (
		<motion.div
			className={cn('relative overflow-hidden', className)}
			animate={{
				background: [
					'linear-gradient(45deg, #3b82f6, #8b5cf6)',
					'linear-gradient(90deg, #8b5cf6, #ec4899)',
					'linear-gradient(135deg, #ec4899, #f59e0b)',
					'linear-gradient(180deg, #f59e0b, #3b82f6)',
					'linear-gradient(45deg, #3b82f6, #8b5cf6)',
				],
			}}
			transition={{
				duration: 10,
				repeat: Infinity,
				ease: 'linear',
			}}
			{...rest}
		>
			{children}
		</motion.div>
	)
}


