'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type MorphingBlobProps = {
	className?: string
}

export default function MorphingBlob({ className }: MorphingBlobProps) {
	return (
		<div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
			{[0, 1].map(index => (
				<motion.div
					// eslint-disable-next-line react/no-array-index-key
					key={index}
					className="absolute rounded-full blur-3xl opacity-10"
					style={{
						width: `${400 + index * 200}px`,
						height: `${400 + index * 200}px`,
						left: `${30 + index * 40}%`,
						top: `${25 + index * 30}%`,
						background: `radial-gradient(circle, ${
							index === 0 ? 'rgba(59, 130, 246, 0.3)' : 'rgba(139, 92, 246, 0.3)'
						} 0%, transparent 70%)`,
					}}
					animate={{
						scale: [1, 1.2, 1],
					}}
					transition={{
						duration: 20 + index * 5,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				/>
			))}
		</div>
	)
}


