'use client'

import { motion } from 'framer-motion'

export default function FloatingElements() {
	return (
		<div className="absolute inset-0 overflow-hidden pointer-events-none">
			<motion.div
				animate={{
					y: [0, -15, 0],
				}}
				transition={{
					duration: 6,
					repeat: Infinity,
					ease: 'easeInOut',
				}}
				className="absolute top-20 left-10 w-20 h-20 bg-blue-500/15 rounded-full blur-2xl"
			/>
			<motion.div
				animate={{
					y: [0, -20, 0],
				}}
				transition={{
					duration: 8,
					repeat: Infinity,
					ease: 'easeInOut',
					delay: 1,
				}}
				className="absolute top-40 right-20 w-32 h-32 bg-purple-500/15 rounded-full blur-2xl"
			/>
			<motion.div
				animate={{
					y: [0, -18, 0],
				}}
				transition={{
					duration: 7,
					repeat: Infinity,
					ease: 'easeInOut',
					delay: 2,
				}}
				className="absolute bottom-20 left-1/4 w-24 h-24 bg-pink-500/15 rounded-full blur-2xl"
			/>
		</div>
	)
}


