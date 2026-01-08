'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = HTMLMotionProps<'button'> & {
	children: ReactNode
	variant?: ButtonVariant
	size?: ButtonSize
	className?: string
}

const variantStyles: Record<ButtonVariant, string> = {
	primary: 'relative bg-white text-black shadow-lg shadow-white/10 hover:shadow-white/20 overflow-hidden group hover:bg-zinc-200',
	secondary: 'bg-zinc-800 hover:bg-zinc-700 text-white shadow-lg shadow-black/30 backdrop-blur-sm',
	success: 'bg-zinc-100 hover:bg-white text-black shadow-lg shadow-white/10',
	danger: 'bg-zinc-900 border border-white/20 hover:bg-zinc-800 text-white shadow-lg shadow-black/30',
	outline: 'border border-white/20 text-white hover:bg-white/10 hover:border-white/40 backdrop-blur-sm shadow-none',
}

const sizeStyles: Record<ButtonSize, string> = {
	sm: 'px-3 py-1.5 text-sm',
	md: 'px-4 py-2 text-base',
	lg: 'px-6 py-3 text-lg',
}

export default function Button({
	children,
	variant = 'primary',
	size = 'md',
	className,
	type,
	disabled,
	...rest
}: ButtonProps) {
	const isDisabled = Boolean(disabled)
	const interactiveAnimations = isDisabled
		? {}
		: {
			whileHover: { scale: 1.03 },
			whileTap: { scale: 0.97 },
		}

	return (
		<motion.button
			type={type ?? 'button'}
			disabled={disabled}
			{...interactiveAnimations}
			className={cn(
				'font-semibold rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
				variantStyles[variant],
				sizeStyles[size],
				isDisabled
					? 'opacity-60 cursor-not-allowed pointer-events-none'
					: 'cursor-pointer',
				variant === 'primary' && !isDisabled && 'before:absolute before:inset-0 before:bg-white/0 hover:before:bg-white/10 before:transition-colors before:duration-300',
				className
			)}
			{...rest}
		>
			<span className={variant === 'primary' ? 'relative z-10' : ''}>{children}</span>
		</motion.button>
	)
}


