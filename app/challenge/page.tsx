'use client'

import { useEffect, useMemo, useState } from 'react'
import Layout from '@/components/Layout'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import { useApp } from '@/contexts/AppContext'
import { FiZap, FiCheckCircle, FiClock } from 'react-icons/fi'
import toast from 'react-hot-toast'
import Confetti from 'react-confetti'

type ChallengeReward = {
	xp: number
	coins: number
	badge: { id: string; name: string }
}

type DailyChallenge = {
	title: string
	description: string
	rewards: ChallengeReward
	progress: number
	target: number
}

export default function ChallengePage() {
	const { addXp, addCoins, addBadge } = useApp()
	const [completed, setCompleted] = useState(false)
	const [showConfetti, setShowConfetti] = useState(false)
	const [timeLeft, setTimeLeft] = useState(86400) // 24 hours in seconds

	const dailyChallenge: DailyChallenge = useMemo(
		() => ({
			title: 'Daily Challenge: Complete 5 Lessons',
			description: 'Complete any 5 lessons today to earn bonus rewards!',
			rewards: {
				xp: 200,
				coins: 50,
				badge: { id: 'daily-1', name: 'Daily Warrior' },
			},
			progress: 3,
			target: 5,
		}),
		[]
	)

	useEffect(() => {
		if (completed || timeLeft <= 0) return

		const interval = window.setInterval(() => {
			setTimeLeft(prev => (prev > 0 ? prev - 1 : 0))
		}, 1000)

		return () => {
			window.clearInterval(interval)
		}
	}, [completed, timeLeft])

	const handleComplete = () => {
		if (!completed && dailyChallenge.progress >= dailyChallenge.target) {
			addXp(dailyChallenge.rewards.xp)
			addCoins(dailyChallenge.rewards.coins)
			addBadge(dailyChallenge.rewards.badge)
			setCompleted(true)
			setShowConfetti(true)
			toast.success('Daily challenge completed! 🎉')
			setTimeout(() => setShowConfetti(false), 5000)
		}
	}

	const hours = Math.floor(timeLeft / 3600)
	const minutes = Math.floor((timeLeft % 3600) / 60)

	return (
		<Layout>
			{showConfetti && <Confetti />}
			<div className="container mx-auto px-4 py-10">
				<div className="max-w-3xl mx-auto text-center mb-10">
					<Badge variant="primary" className="mb-4 inline-flex items-center gap-2 bg-blue-500/10 text-white border border-blue-500/30">
						<FiZap className="text-blue-300" /> Daily Missions
					</Badge>
					<h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
						Conquer Today&apos;s Challenge
					</h1>
					<p className="text-gray-300 max-w-2xl mx-auto">
						Stay motivated with curated challenges that boost your progress, unlock exclusive rewards, and keep your streak alive.
					</p>
				</div>

				<Card
					variant="light"
					className="mb-10 bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 border-0 shadow-[0_20px_60px_-20px_rgba(251,191,36,0.6)]"
				>
					<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-4">
						<div className="text-left">
							<div className="flex items-center space-x-2 mb-3">
								<div className="p-3 rounded-lg bg-amber-100 text-amber-600">
									<FiZap className="text-2xl" />
								</div>
								<h2 className="text-2xl font-bold text-amber-700">{dailyChallenge.title}</h2>
							</div>
							<p className="text-amber-600/80">{dailyChallenge.description}</p>
						</div>
						{completed && <FiCheckCircle className="text-green-500 text-3xl shrink-0" />}
					</div>

					<div className="mb-6">
						<div className="flex items-center justify-between mb-2 text-sm font-semibold text-amber-700">
							<span>Progress</span>
							<span>
								{dailyChallenge.progress} / {dailyChallenge.target}
							</span>
						</div>
						<ProgressBar value={dailyChallenge.progress} max={dailyChallenge.target} indicatorClassName="bg-gradient-to-r from-amber-400 to-orange-500" />
					</div>

					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<div>
							<p className="text-sm text-amber-600/80 mb-2 font-semibold uppercase tracking-wide">Rewards</p>
							<div className="flex items-center flex-wrap gap-3">
								<Badge variant="primary" className="bg-blue-100 text-blue-800">
									+{dailyChallenge.rewards.xp} XP
								</Badge>
								<Badge variant="warning" className="bg-yellow-100 text-yellow-700">
									+{dailyChallenge.rewards.coins} Coins
								</Badge>
								<Badge variant="success" className="bg-emerald-100 text-emerald-700">
									{dailyChallenge.rewards.badge.name}
								</Badge>
							</div>
						</div>
						<Button
							variant={completed ? 'secondary' : 'primary'}
							onClick={handleComplete}
							disabled={completed || dailyChallenge.progress < dailyChallenge.target}
							className="min-w-[180px]"
						>
							{completed ? 'Completed' : 'Claim Rewards'}
						</Button>
					</div>

					<div className="mt-6 flex items-center text-sm text-amber-600/80">
						<FiClock className="mr-2" />
						<span>
							Time remaining: {hours}h {minutes}m
						</span>
					</div>
				</Card>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
					<Card variant="dark" className="bg-gray-900/70 border border-gray-800/60">
						<h3 className="text-xl font-bold mb-3 text-white">Weekly Quest: Streak Master</h3>
						<p className="text-gray-400 mb-4">Maintain a 7-day streak</p>
						<ProgressBar value={4} max={7} className="mb-4" />
						<div className="flex items-center justify-between text-sm text-gray-400">
							<span>4 / 7 days</span>
							<Badge variant="primary" className="bg-blue-500/20 text-blue-200 border border-blue-500/30">
								+500 XP, +100 Coins
							</Badge>
						</div>
					</Card>

					<Card variant="dark" className="bg-gray-900/70 border border-gray-800/60">
						<h3 className="text-xl font-bold mb-3 text-white">Weekly Quest: Vocabulary Master</h3>
						<p className="text-gray-400 mb-4">Review 100 flashcards</p>
						<ProgressBar value={67} max={100} className="mb-4" />
						<div className="flex items-center justify-between text-sm text-gray-400">
							<span>67 / 100 cards</span>
							<Badge variant="primary" className="bg-blue-500/20 text-blue-200 border border-blue-500/30">
								+300 XP, +75 Coins
							</Badge>
						</div>
					</Card>
				</div>

				<Card variant="dark" className="bg-gray-900/80 border border-gray-800/60">
					<h2 className="text-2xl font-bold mb-6 text-white">Mini Games</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{[
							{
								title: 'Word Puzzle',
								description: 'Solve word puzzles to earn XP',
								border: 'border-blue-500/40 hover:border-blue-400/70',
							},
							{
								title: 'Sentence Building',
								description: 'Build sentences from words',
								border: 'border-purple-500/40 hover:border-purple-400/70',
							},
							{
								title: 'Pronunciation Battle',
								description: 'Compete in pronunciation challenges',
								border: 'border-emerald-500/40 hover:border-emerald-400/70',
							},
						].map(game => (
							<div
								key={game.title}
								className={`p-6 rounded-xl border bg-gray-900/60 transition-all duration-200 group ${game.border}`}
							>
								<h3 className="font-bold text-lg mb-2 text-white">{game.title}</h3>
								<p className="text-gray-400 text-sm mb-4">{game.description}</p>
								<Button variant="outline" size="sm" className="group-hover:bg-blue-500 group-hover:text-white">
									Play
								</Button>
							</div>
						))}
					</div>
				</Card>
			</div>
		</Layout>
	)
}


