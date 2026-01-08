'use client'

import { useState, useEffect, type ChangeEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
import Layout from '@/components/Layout'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { FiMessageCircle, FiSend, FiHeart, FiShare2 } from 'react-icons/fi'
import { useApp } from '@/contexts/AppContext'
import toast from 'react-hot-toast'

type CommunityPost = {
	id: number
	username: string
	avatar: string
	content: string
	likes: number
	comments: number
	time: string
	language: string
}

export default function CommunityPage() {
	const { user } = useApp()
	const [newPost, setNewPost] = useState('')
	const [posts] = useState<CommunityPost[]>([
		{
			id: 1,
			username: 'LanguageMaster',
			avatar: '👑',
			content:
				'Just completed my 100th lesson! The streak feature really keeps me motivated. What are your favorite features?',
			likes: 24,
			comments: 5,
			time: '2h ago',
			language: 'Spanish',
		},
		{
			id: 2,
			username: 'PolyglotPro',
			avatar: '🥇',
			content: 'The AI conversation practice is amazing! My pronunciation has improved so much. Has anyone else tried it?',
			likes: 18,
			comments: 8,
			time: '5h ago',
			language: 'French',
		},
		{
			id: 3,
			username: 'WordWizard',
			avatar: '🥈',
			content: 'Daily challenge completed! Earned 200 XP and a new badge. The gamification makes learning so fun! 🎉',
			likes: 32,
			comments: 12,
			time: '1d ago',
			language: 'German',
		},
	])

	const handlePost = () => {
		if (newPost.trim()) {
			toast.success('Post shared!')
			setNewPost('')
		}
	}

	const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setNewPost(event.target.value)
	}

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from('.feed-post', {
				y: 50,
				opacity: 0,
				duration: 0.8,
				stagger: 0.2,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: '.feed-container',
					start: 'top 80%',
				}
			})

			gsap.from('.sidebar-card', {
				x: 50,
				opacity: 0,
				duration: 0.8,
				stagger: 0.2,
				ease: 'power3.out',
				delay: 0.5
			})
		})
		return () => ctx.revert()
	}, [])

	return (
		<Layout>
			<div className="min-h-screen bg-black selection:bg-white/20 selection:text-white">
				{/* Background handled by Layout */}

				<div className="relative z-10 container mx-auto px-4 py-10">
					<div className="max-w-3xl">
						<h1 className="text-4xl font-black mb-2 text-white tracking-tight">
							Community Hub
						</h1>
						<p className="text-zinc-400 mb-10 font-light">
							Share milestones, ask for help, and connect with fellow learners from around the globe.
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						<div className="lg:col-span-2 space-y-6 feed-container">
							<div className="feed-post">
								<Card variant="dark" className="bg-zinc-900/30 border-white/10 backdrop-blur-md">
									<div className="flex items-start gap-4">
										<div className="text-3xl grayscale opacity-80">{(user?.username as string)?.charAt(0)?.toUpperCase() || '😊'}</div>
										<div className="flex-1">
											<textarea
												value={newPost}
												onChange={handleInputChange}
												placeholder="What's on your mind?"
												className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:border-transparent resize-none text-white placeholder:text-zinc-600 transition-all"
												rows={3}
											/>
											<div className="flex flex-wrap items-center justify-between mt-4 gap-3">
												<Badge variant="outline" className="border-white/10 text-zinc-400">
													Spanish
												</Badge>
												<Button onClick={handlePost} disabled={!newPost.trim()} className="flex items-center gap-2 bg-white text-black hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed">
													<FiSend /> Post
												</Button>
											</div>
										</div>
									</div>
								</Card>
							</div>

							{posts.map(post => (
								<div key={post.id} className="feed-post">
									<Card
										variant="dark"
										className="bg-zinc-900/20 border-white/5 hover:bg-zinc-900/40 transition-all duration-300"
									>
										<div className="flex items-start space-x-4">
											<div className="text-4xl grayscale opacity-80">{post.avatar}</div>
											<div className="flex-1">
												<div className="flex items-center justify-between mb-3">
													<div>
														<p className="font-bold text-white">{post.username}</p>
														<p className="text-sm text-zinc-500">
															{post.time} • Learning {post.language}
														</p>
													</div>
													<Badge variant="secondary" className="bg-white/5 text-zinc-400 border-white/5">
														{post.language}
													</Badge>
												</div>
												<p className="text-zinc-300 mb-4 leading-relaxed font-light">{post.content}</p>
												<div className="flex items-center space-x-6 text-sm text-zinc-500">
													<button
														className="flex items-center space-x-2 hover:text-white transition font-medium group"
														type="button"
													>
														<FiHeart className="group-hover:scale-110 transition-transform" />
														<span>{post.likes}</span>
													</button>
													<button
														className="flex items-center space-x-2 hover:text-white transition font-medium group"
														type="button"
													>
														<FiMessageCircle className="group-hover:scale-110 transition-transform" />
														<span>{post.comments}</span>
													</button>
													<button
														className="flex items-center space-x-2 hover:text-white transition font-medium group"
														type="button"
													>
														<FiShare2 className="group-hover:scale-110 transition-transform" />
														<span>Share</span>
													</button>
												</div>
											</div>
										</div>
									</Card>
								</div>
							))}
						</div>

						<div className="space-y-6">
							<div className="sidebar-card">
								<Card variant="dark" className="bg-zinc-900/30 border-white/10 backdrop-blur-md">
									<h3 className="text-xl font-bold mb-4 text-white">Online Now</h3>
									<div className="space-y-3">
										{['👑', '🥇', '🥈', '⭐', '🔥'].map((avatar, index) => (
											<div key={avatar} className="flex items-center space-x-3 group cursor-pointer">
												<div className="text-2xl grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all">{avatar}</div>
												<div className="flex-1">
													<p className="font-semibold text-zinc-300 group-hover:text-white transition-colors">User{index + 1}</p>
													<p className="text-xs text-zinc-500">Learning now</p>
												</div>
												<div className="w-2 h-2 bg-emerald-500/50 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
											</div>
										))}
									</div>
								</Card>
							</div>

							<div className="sidebar-card">
								<Card variant="dark" className="bg-zinc-900/30 border-white/10 backdrop-blur-md">
									<h3 className="text-xl font-bold mb-4 text-white">Language Groups</h3>
									<div className="space-y-2">
										{['Spanish', 'French', 'German', 'Italian', 'Portuguese'].map(language => (
											<button
												key={language}
												type="button"
												className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-zinc-300 border border-transparent hover:border-white/5 group"
											>
												<div className="flex justify-between items-center">
													<p className="font-semibold group-hover:text-white transition-colors">{language}</p>
													<span className="text-xs text-zinc-500">1.2k</span>
												</div>
											</button>
										))}
									</div>
								</Card>
							</div>

							<div className="sidebar-card">
								<Card variant="dark" className="bg-gradient-to-br from-zinc-900 to-black border border-white/10">
									<h3 className="text-xl font-bold mb-4 text-white">Quick Chat</h3>
									<p className="text-zinc-400 text-sm mb-4 font-light">
										Connect with peers and practice conversation in real time.
									</p>
									<Button variant="outline" className="w-full border-white/20 text-white hover:bg-white hover:text-black transition-all">
										Open Chat
									</Button>
								</Card>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}


