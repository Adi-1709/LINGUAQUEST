'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Globe3D() {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		const timer = requestAnimationFrame(() => setMounted(true))
		return () => cancelAnimationFrame(timer)
	}, [])

	if (!mounted) {
		return (
			<div className="w-full h-full flex items-center justify-center">
				<div className="w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full animate-pulse" />
			</div>
		)
	}

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 1 }}
			className="w-full h-full flex items-center justify-center relative"
		>
			<div className="relative w-64 h-64">
				<motion.div
					animate={{
						scale: [1, 1.15, 1],
						opacity: [0.3, 0.5, 0.3],
					}}
					transition={{
						duration: 4,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
					className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
				/>

				<motion.div
					animate={{ rotate: 360 }}
					transition={{
						duration: 30,
						repeat: Infinity,
						ease: 'linear',
					}}
					className="absolute inset-2 border-2 border-blue-400/20 rounded-full"
					style={{ willChange: 'transform' }}
				/>

				<motion.div
					animate={{ rotateY: 360 }}
					transition={{
						rotateY: {
							duration: 15,
							repeat: Infinity,
							ease: 'linear',
						},
					}}
					className="absolute inset-6 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full shadow-xl"
					style={{ transformStyle: 'preserve-3d' }}
				>
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.2)_0%,_transparent_50%)] rounded-full" />
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,_rgba(255,255,255,0.15)_0%,_transparent_50%)] rounded-full" />
				</motion.div>

				{Array.from({ length: 3 }).map((_, i) => (
					<motion.div
						// eslint-disable-next-line react/no-array-index-key
						key={i}
						animate={{
							y: [0, -20, 0],
							opacity: [0.2, 0.5, 0.2],
						}}
						transition={{
							duration: 4 + i,
							repeat: Infinity,
							delay: i * 0.5,
							ease: 'easeInOut',
						}}
						className="absolute w-1.5 h-1.5 bg-white rounded-full"
						style={{
							left: `${30 + i * 20}%`,
							top: `${40 + i * 15}%`,
						}}
					/>
				))}
			</div>
		</motion.div>
	)
}


