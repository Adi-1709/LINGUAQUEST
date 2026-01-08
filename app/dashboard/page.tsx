'use client'

import Layout from '@/components/Layout'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import ProgressBar from '@/components/ui/ProgressBar'
import Badge from '@/components/ui/Badge'
import { useApp } from '@/contexts/AppContext'
import Link from 'next/link'
import { FiBook, FiMic, FiZap, FiTrendingUp, FiDollarSign, FiArrowRight } from 'react-icons/fi'
import { FaFire, FaTrophy } from 'react-icons/fa'
import FloatingElements from '@/components/animations/FloatingElements'
import { motion } from 'framer-motion'
import type { IconType } from 'react-icons'

type Stat = {
	label: string
	value: number
	icon: IconType
	progress: number | null
}

export default function Dashboard() {
	const { xp, coins, level, streak, badges, currentLanguage, isAuthenticated } = useApp()

	if (!isAuthenticated) {
		return (
			<Layout>
				<div className="container mx-auto px-4 py-20 text-center">
					<h1 className="text-3xl font-bold mb-4 text-white">Please log in to access your dashboard</h1>
					<Link href="/auth">
						<Button>Login</Button>
					</Link>
				</div>
			</Layout>
		)
	}

	const xpProgress = xp % 1000

	const stats: Stat[] = [
		{ label: 'Level', value: level, icon: FaTrophy, progress: null },
		{ label: 'Streak', value: streak, icon: FaFire, progress: null },
		{ label: 'Coins', value: coins, icon: FiDollarSign, progress: null },
		{ label: 'Total XP', value: xp, icon: FiTrendingUp, progress: xpProgress },
	]

	return (
		<Layout>
			<div className="relative min-h-screen overflow-hidden bg-background">
				{/* Modern Animated Background - Monochrome */}
				<div className="fixed inset-0 z-0 pointer-events-none">
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/20 via-background to-background" />
					<div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-center opacity-[0.03] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
					<div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-white/5 blur-[120px]" />
					<div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-zinc-800/10 blur-[120px]" />
					<FloatingElements />
				</div>

				<div className="relative z-10 container mx-auto px-4 py-8">
					{/* Header */}
					<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
						<h1 className="text-5xl font-black mb-2 text-white">
							Dashboard
						</h1>
						<p className="text-zinc-400 text-lg">Welcome back! Continue your language learning journey.</p>
					</motion.div>

					{/* Stats Overview */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
						{stats.map((stat, index) => {
							const Icon = stat.icon
							return (
								<motion.div
									key={stat.label}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.05, duration: 0.3 }}
									whileHover={{ scale: 1.02 }}
								>
									<Card variant="dark" className="h-full glass border-white/10 hover:border-white/30 transition-colors">
										<div className="flex items-center justify-between mb-3">
											<div>
												<p className="text-zinc-400 text-xs mb-1 uppercase tracking-wide">{stat.label}</p>
												<p className="text-4xl font-black text-white">{stat.value}</p>
											</div>
											<div className={`p-4 rounded-xl bg-white/10 shadow-lg group-hover:scale-110 transition-transform`}>
												<Icon className="text-2xl text-white" />
											</div>
										</div>
										{stat.progress !== null && (
											<>
												<ProgressBar value={xpProgress} max={1000} className="mb-2" />
												<p className="text-xs text-zinc-500">{xpProgress}/1000 XP to next level</p>
											</>
										)}
									</Card>
								</motion.div>
							)
						})}
					</div>

					{/* Quick Actions */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
						<Link href="/lessons">
							<Card variant="dark" className="h-full glass border-white/10 hover:border-white/30 group cursor-pointer transition-colors">
								<div className="flex items-center gap-4">
									<div className="p-4 rounded-full bg-white/10 text-white group-hover:scale-110 transition-transform">
										<FiBook className="text-2xl" />
									</div>
									<div>
										<h3 className="text-xl font-bold text-white mb-1">Continue Learning</h3>
										<p className="text-zinc-400 text-sm">Pick up where you left off</p>
									</div>
									<FiArrowRight className="ml-auto text-zinc-500 group-hover:text-white transition-colors" />
								</div>
							</Card>
						</Link>
						<Link href="/ai-lesson">
							<Card variant="dark" className="h-full glass border-white/10 hover:border-white/30 group cursor-pointer transition-colors">
								<div className="flex items-center gap-4">
									<div className="p-4 rounded-full bg-white/10 text-white group-hover:scale-110 transition-transform">
										<FiZap className="text-2xl" />
									</div>
									<div>
										<h3 className="text-xl font-bold text-white mb-1">AI Practice</h3>
										<p className="text-zinc-400 text-sm">Generate a personalized lesson</p>
									</div>
									<FiArrowRight className="ml-auto text-zinc-500 group-hover:text-white transition-colors" />
								</div>
							</Card>
						</Link>
					</div>
				</div>
			</div>
		</Layout>
	)
}
