'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type SpinnerSize = 'sm' | 'md' | 'lg'

type LoadingSpinnerProps = {
	size?: SpinnerSize
	className?: string
}

const sizeClasses: Record<SpinnerSize, string> = {
	sm: 'w-6 h-6',
	md: 'w-12 h-12',
	lg: 'w-16 h-16',
}

export default function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
	const spinnerSize = sizeClasses[size] ?? sizeClasses.md

	return (
		<div className={cn('flex items-center justify-center', className)}>
			<motion.div
				className={cn(
					spinnerSize,
					'border-4 border-blue-500/20 border-t-blue-500 rounded-full'
				)}
				animate={{ rotate: 360 }}
				transition={{
					duration: 1,
					repeat: Infinity,
					ease: 'linear',
				}}
			/>
		</div>
	)
}


