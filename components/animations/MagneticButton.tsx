'use client'

import { motion, useMotionValue, useSpring, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import type { ReactNode, MouseEvent } from 'react'

type MagneticButtonProps = React.ComponentProps<typeof motion.div> & {
	children: ReactNode
	className?: string
}

export default function MagneticButton({ children, className, style, ...rest }: MagneticButtonProps) {
	const ref = useRef<HTMLDivElement | null>(null)

	const x: MotionValue<number> = useMotionValue(0)
	const y: MotionValue<number> = useMotionValue(0)

	const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 })
	const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 })

	const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
		if (!ref.current) return

		const rect = ref.current.getBoundingClientRect()
		const centerX = rect.left + rect.width / 2
		const centerY = rect.top + rect.height / 2

		const distanceX = event.clientX - centerX
		const distanceY = event.clientY - centerY

		x.set(distanceX * 0.2)
		y.set(distanceY * 0.2)
	}

	const handleMouseLeave = () => {
		x.set(0)
		y.set(0)
	}

	return (
		<motion.div
			ref={ref}
			className={className}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={{
				x: mouseXSpring,
				y: mouseYSpring,
				display: 'inline-block',
				...style,
			}}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			{...rest}
		>
			{children}
		</motion.div>
	)
}


