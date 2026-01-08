'use client'

import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type GlowIntensity = 'low' | 'medium' | 'high'
type GlowColor = 'blue' | 'purple' | 'pink' | 'green' | 'orange'

type GlowEffectProps = {
	children: ReactNode
	intensity?: GlowIntensity
	color?: GlowColor
	className?: string
}

const intensityClasses: Record<GlowIntensity, string> = {
	low: 'shadow-lg',
	medium: 'shadow-2xl',
	high: 'shadow-[0_0_50px]',
}

const colorClasses: Record<GlowColor, string> = {
	blue: 'shadow-blue-500/50',
	purple: 'shadow-purple-500/50',
	pink: 'shadow-pink-500/50',
	green: 'shadow-green-500/50',
	orange: 'shadow-orange-500/50',
}

export default function GlowEffect({
	children,
	intensity = 'medium',
	color = 'blue',
	className,
}: GlowEffectProps) {
	return (
		<div className={cn('relative', className)}>
			<div className={cn(intensityClasses[intensity], colorClasses[color], 'transition-all duration-300')}>
				{children}
			</div>
		</div>
	)
}


