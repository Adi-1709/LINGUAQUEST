'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type ShimmerEffectProps = {
	children: ReactNode
	className?: string
}

export default function ShimmerEffect({ children, className }: ShimmerEffectProps) {
	return (
		<div className={cn('relative overflow-hidden', className)}>
			{children}
			<motion.div
				className="absolute inset-0 -z-10"
				animate={{
					background: [
						'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
						'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
						'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
					],
					backgroundPosition: ['-200% 0', '200% 0', '-200% 0'],
				}}
				transition={{
					duration: 3,
					repeat: Infinity,
					ease: 'linear',
				}}
				style={{
					backgroundSize: '200% 100%',
				}}
			/>
		</div>
	)
}


