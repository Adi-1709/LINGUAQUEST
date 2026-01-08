'use client'

import { motion } from 'framer-motion'
import { FiCpu } from 'react-icons/fi'

export default function AICard3D() {
    return (
        <div className="w-full h-full flex items-center justify-center perspective-1000">
            <motion.div
                className="relative w-16 h-20 preserve-3d"
                animate={{
                    rotateY: [0, 360],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                {/* Front */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg border border-white/20 shadow-[0_0_15px_rgba(124,58,237,0.5)] flex items-center justify-center backface-hidden">
                    <FiCpu className="text-white text-2xl" />
                </div>

                {/* Back */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg border border-white/20 shadow-[0_0_15px_rgba(124,58,237,0.5)] flex items-center justify-center backface-hidden rotate-y-180">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-white animate-pulse" />
                    </div>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full -z-10" />
            </motion.div>
        </div>
    )
}
