'use client'

import Layout from '@/components/Layout'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import { useApp } from '@/contexts/AppContext'
import { FiEdit, FiDollarSign, FiTrendingUp } from 'react-icons/fi'
import { FaTrophy, FaFire } from 'react-icons/fa'

type Achievement = {
	id: number
	name: string
	description: string
	unlocked: boolean
}

export default function ProfilePage() {
	const { user, xp, coins, level, streak, badges, currentLanguage, isAuthenticated } = useApp()

	if (!isAuthenticated) {
		return (
			<Layout>
				<div className="container mx-auto px-4 py-20 text-center">
					<h1 className="text-3xl font-bold mb-4 text-white">Please log in to view your profile</h1>
				</div>
			</Layout>
		)
	}

	const xpProgress = xp % 1000

	const achievements: Achievement[] = [
		{ id: 1, name: 'First Steps', description: 'Complete your first lesson', unlocked: true },
		{ id: 2, name: 'Streak Master', description: 'Maintain a 7-day streak', unlocked: streak >= 7 },
		{ id: 3, name: 'Vocabulary King', description: 'Review 100 flashcards', unlocked: false },
		{ id: 4, name: 'Level Up', description: 'Reach level 5', unlocked: level >= 5 },
		{ id: 5, name: 'Social Butterfly', description: 'Make 10 community posts', unlocked: false },
		{ id: 6, name: 'Perfectionist', description: 'Get 100% on 10 lessons', unlocked: false },
	]

	return (
		<Layout>
			<div className="min-h-screen bg-background">
				<div className="container mx-auto px-4 py-8">
					{/* Profile Header */}
					<Card className="mb-8 bg-zinc-900/50 border-white/10 backdrop-blur-sm">
						<div className="flex items-center space-x-6">
							<div className="text-6xl grayscale opacity-80">😊</div>
							<div className="flex-1">
								<div className="flex items-center space-x-4 mb-2">
									<h1 className="text-3xl font-bold text-white">{(user?.username as string) || 'User'}</h1>
									<Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
										<FiEdit className="inline mr-1" />
										Edit
									</Button>
								</div>
								<p className="text-zinc-400 mb-4">{(user?.email as string) || 'No email provided'}</p>
								<div className="flex items-center space-x-4">
									<Badge variant="primary" className="bg-white/10 text-white border-white/20">
										Learning {currentLanguage}
									</Badge>
									<Badge variant="success" className="bg-white/10 text-white border-white/20">
										Level {level}
									</Badge>
								</div>
							</div>
						</div>
					</Card>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Stats */}
						<div className="lg:col-span-2 space-y-6">
							{/* Progress */}
							<Card variant="dark" className="border-white/10 bg-zinc-900/30">
								<h2 className="text-2xl font-bold mb-4 text-white">Progress</h2>
								<div className="space-y-4">
									<div>
										<div className="flex items-center justify-between mb-2">
											<span className="font-semibold text-white">Level {level}</span>
											<span className="text-sm text-zinc-400">{xpProgress} / 1000 XP</span>
										</div>
										<ProgressBar value={xpProgress} max={1000} />
									</div>
									<div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
										<div className="text-center">
											<FaTrophy className="text-3xl text-zinc-400 mx-auto mb-2" />
											<p className="text-2xl font-bold text-white">{level}</p>
											<p className="text-sm text-zinc-500">Level</p>
										</div>
										<div className="text-center">
											<FaFire className="text-3xl text-zinc-400 mx-auto mb-2" />
											<p className="text-2xl font-bold text-white">{streak}</p>
											<p className="text-sm text-zinc-500">Day Streak</p>
										</div>
										<div className="text-center">
											<FiDollarSign className="text-3xl text-zinc-400 mx-auto mb-2" />
											<p className="text-2xl font-bold text-white">{coins}</p>
											<p className="text-sm text-zinc-500">Coins</p>
										</div>
									</div>
								</div>
							</Card>

							{/* Recent Activity */}
							<Card variant="dark" className="border-white/10 bg-zinc-900/30">
								<h2 className="text-2xl font-bold mb-4 text-white">Recent Activity</h2>
								<div className="space-y-4">
									{[1, 2, 3].map((_, i) => (
										<div key={i} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5">
											<div className="flex items-center space-x-4">
												<div className="p-2 rounded-full bg-white/10 text-white">
													<FiTrendingUp />
												</div>
												<div>
													<p className="font-semibold text-white">Completed Lesson {i + 1}</p>
													<p className="text-sm text-zinc-500">2 hours ago</p>
												</div>
											</div>
											<span className="font-bold text-white">+50 XP</span>
										</div>
									))}
								</div>
							</Card>
						</div>

						{/* Achievements */}
						<div className="space-y-6">
							<Card variant="dark" className="border-white/10 bg-zinc-900/30">
								<h2 className="text-2xl font-bold mb-4 text-white">Achievements</h2>
								<div className="space-y-4">
									{achievements.map((achievement) => (
										<div
											key={achievement.id}
											className={`p-4 rounded-lg border ${achievement.unlocked
													? 'bg-white/10 border-white/20'
													: 'bg-zinc-900/50 border-white/5 opacity-50'
												}`}
										>
											<div className="flex items-center justify-between mb-2">
												<h3 className="font-bold text-white">{achievement.name}</h3>
												{achievement.unlocked && <FaTrophy className="text-white" />}
											</div>
											<p className="text-sm text-zinc-400">{achievement.description}</p>
										</div>
									))}
								</div>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}
