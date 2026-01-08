'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

type AnimatedCounterProps = {
	end: number
	duration?: number
	prefix?: string
	suffix?: string
}

export default function AnimatedCounter({ end, duration = 2, prefix = '', suffix = '' }: AnimatedCounterProps) {
	const { ref, inView } = useInView({ triggerOnce: true })
	const [displayValue, setDisplayValue] = useState(0)

	useEffect(() => {
		if (!inView) return

		let startTime: number | null = null
		let animationFrame: number | null = null

		const animate = (currentTime: number) => {
			if (startTime === null) startTime = currentTime
			const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

			const easeOutQuart = 1 - Math.pow(1 - progress, 4)
			const currentValue = Math.floor(easeOutQuart * end)

			setDisplayValue(currentValue)

			if (progress < 1) {
				animationFrame = requestAnimationFrame(animate)
			} else {
				setDisplayValue(end)
			}
		}

		animationFrame = requestAnimationFrame(animate)

		return () => {
			if (animationFrame) {
				cancelAnimationFrame(animationFrame)
			}
		}
	}, [inView, end, duration])

	return (
		<span ref={ref}>
			{prefix}
			{displayValue.toLocaleString()}
			{suffix}
		</span>
	)
}


