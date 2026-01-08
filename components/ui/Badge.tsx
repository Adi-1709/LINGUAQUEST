'use client'

import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'secondary' | 'outline'

type BadgeProps = {
	children: ReactNode
	variant?: BadgeVariant
	className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
	default: 'bg-zinc-800 text-zinc-300 border border-zinc-700',
	primary: 'bg-white text-black border border-white',
	success: 'bg-zinc-900 text-white border border-white/20',
	warning: 'bg-zinc-900 text-white border border-white/20',
	danger: 'bg-zinc-900 text-white border border-white/20',
	secondary: 'bg-zinc-800 text-zinc-400 border border-zinc-700',
	outline: 'bg-transparent border border-zinc-700 text-zinc-300',
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
	return (
		<span
			className={cn(
				'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
				variantStyles[variant],
				className
			)}
		>
			{children}
		</span>
	)
}


