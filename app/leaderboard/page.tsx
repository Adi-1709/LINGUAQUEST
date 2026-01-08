'use client'

import Layout from '@/components/Layout'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { FiTrendingUp, FiAward } from 'react-icons/fi'
import { FaTrophy } from 'react-icons/fa'

type Leader = {
	rank: number
	username: string
	xp: number
	level: number
	streak: number
	avatar: string
}

type WeeklyLeader = {
	rank: number
	username: string
	xp: number
	avatar: string
}

const leaders: Leader[] = [
	{ rank: 1, username: 'LanguageMaster', xp: 15000, level: 15, streak: 45, avatar: '👑' },
	{ rank: 2, username: 'PolyglotPro', xp: 14200, level: 14, streak: 38, avatar: '🥇' },
	{ rank: 3, username: 'WordWizard', xp: 13800, level: 14, streak: 42, avatar: '🥈' },
	{ rank: 4, username: 'LinguistLuna', xp: 12500, level: 13, streak: 35, avatar: '🥉' },
	{ rank: 5, username: 'TalkativeTina', xp: 11800, level: 12, streak: 30, avatar: '⭐' },
	{ rank: 6, username: 'BilingualBob', xp: 11200, level: 12, streak: 28, avatar: '⭐' },
	{ rank: 7, username: 'VocabVic', xp: 10800, level: 11, streak: 25, avatar: '⭐' },
	{ rank: 8, username: 'GrammarGuru', xp: 10200, level: 11, streak: 22, avatar: '⭐' },
]

const weeklyLeaders: WeeklyLeader[] = [
	{ rank: 1, username: 'LanguageMaster', xp: 2500, avatar: '👑' },
	{ rank: 2, username: 'PolyglotPro', xp: 2300, avatar: '🥇' },
	{ rank: 3, username: 'WordWizard', xp: 2100, avatar: '🥈' },
]

export default function LeaderboardPage() {
	return (
		<Layout>
			<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
				<div className="container mx-auto px-4 py-10">
					<div className="max-w-3xl mb-10">
						<h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
							Global Leaderboard
						</h1>
						<p className="text-gray-300">
							Compete with learners worldwide and earn exclusive rewards for staying on top.
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						<div className="lg:col-span-2 space-y-6">
							<Card variant="dark" className="bg-slate-900/80 border border-slate-800/70">
								<div className="flex items-center justify-between mb-6">
									<h2 className="text-2xl font-bold text-white">Global Rankings</h2>
									<Badge variant="primary" className="bg-blue-500/20 text-blue-100 border border-blue-500/30">
										All Time
									</Badge>
								</div>
								<div className="space-y-4">
									{leaders.map(leader => (
										<div
											key={leader.rank}
											className={`flex items-center justify-between p-4 rounded-xl border transition ${
												leader.rank <= 3
													? 'bg-gradient-to-r from-amber-500/10 via-amber-400/10 to-amber-500/5 border-amber-400/40'
													: 'bg-slate-900/70 border-slate-800/70 hover:border-blue-500/40'
											}`}
										>
											<div className="flex items-center gap-4">
												<div className="text-3xl font-bold text-slate-500 w-10 flex justify-center">
													{leader.rank <= 3 ? (
														<FaTrophy
															className={
																leader.rank === 1
																	? 'text-yellow-400'
																	: leader.rank === 2
																	? 'text-gray-300'
																	: 'text-amber-500'
															}
														/>
													) : (
														`#${leader.rank}`
													)}
												</div>
												<div className="text-3xl">{leader.avatar}</div>
												<div>
													<p className="font-bold text-lg text-white">{leader.username}</p>
													<p className="text-sm text-gray-400">
														Level {leader.level} • 🔥 {leader.streak} day streak
													</p>
												</div>
											</div>
											<div className="text-right">
												<p className="font-bold text-lg text-blue-300">
													{leader.xp.toLocaleString()} XP
												</p>
												<p className="text-sm text-gray-500">Streak {leader.streak}</p>
											</div>
										</div>
									))}
								</div>
							</Card>
						</div>

						<div className="space-y-6">
							<Card variant="dark" className="bg-slate-900/80 border border-slate-800/70">
								<div className="flex items-center gap-2 mb-4">
									<FiTrendingUp className="text-blue-400" />
									<h3 className="text-xl font-bold text-white">Weekly Top 3</h3>
								</div>
								<div className="space-y-3">
									{weeklyLeaders.map(leader => (
										<div key={leader.rank} className="flex items-center justify-between p-3 bg-slate-900/60 rounded-lg">
											<div className="flex items-center gap-3">
												<span className="text-2xl">{leader.avatar}</span>
												<div>
													<p className="font-semibold text-white/90">{leader.username}</p>
													<p className="text-sm text-gray-400">{leader.xp} XP</p>
												</div>
											</div>
											<Badge variant="primary" className="bg-blue-500/20 text-blue-100 border-0">
												#{leader.rank}
											</Badge>
										</div>
									))}
								</div>
							</Card>

							<Card variant="dark" className="bg-slate-900/80 border border-slate-800/70 text-center">
								<h3 className="text-xl font-bold mb-4 text-white">Your Ranking</h3>
								<div className="py-6">
									<div className="text-6xl font-black text-slate-500 mb-3">#42</div>
									<p className="text-gray-400 mb-4">Keep pushing! You&apos;re {`\u00A0`}close to the top 40.</p>
									<Badge variant="warning" className="bg-amber-500/20 text-amber-200 border border-amber-400/40">
										1,250 XP behind #41
									</Badge>
								</div>
							</Card>

							<Card variant="light" className="bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-lg">
								<div className="flex items-center space-x-2 mb-4 text-blue-700">
									<FiAward className="text-yellow-500" />
									<h3 className="text-xl font-bold">Weekly Rewards</h3>
								</div>
								<ul className="space-y-3 text-sm text-gray-700">
									<li className="flex justify-between">
										<span>🥇 1st Place</span>
										<span className="font-semibold text-blue-600">500 Coins</span>
									</li>
									<li className="flex justify-between">
										<span>🥈 2nd Place</span>
										<span className="font-semibold text-blue-600">300 Coins</span>
									</li>
									<li className="flex justify-between">
										<span>🥉 3rd Place</span>
										<span className="font-semibold text-blue-600">200 Coins</span>
									</li>
									<li className="flex justify-between">
										<span>Top 10</span>
										<span className="font-semibold text-blue-600">100 Coins</span>
									</li>
								</ul>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}


