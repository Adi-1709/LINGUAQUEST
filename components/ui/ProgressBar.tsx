'use client'

import { cn } from '@/lib/utils'

type ProgressBarProps = {
	value: number
	max?: number
	className?: string
	indicatorClassName?: string
}

export default function ProgressBar({
	value,
	max = 100,
	className,
	indicatorClassName,
}: ProgressBarProps) {
	const normalizedMax = max <= 0 ? 100 : max
	const percentage = Math.max(0, Math.min((value / normalizedMax) * 100, 100))

	return (
		<div className={cn('w-full bg-gray-200/60 dark:bg-gray-800/60 rounded-full h-2.5 overflow-hidden', className)}>
			<div
				className={cn('bg-white h-2.5 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.5)]', indicatorClassName)}
				style={{ width: `${percentage}%` }}
			/>
		</div>
	)
}


