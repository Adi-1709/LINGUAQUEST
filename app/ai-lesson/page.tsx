'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '@/components/Layout'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useApp } from '@/contexts/AppContext'
import { FiArrowLeft, FiLoader, FiZap } from 'react-icons/fi'
import toast from 'react-hot-toast'
import type { LessonRequest } from '@/lib/ai-agent'

export default function AILessonPage() {
	const router = useRouter()
	const { currentLanguage } = useApp()
	const [loading, setLoading] = useState(false)

	// Lesson Request
	const [lessonRequest, setLessonRequest] = useState<LessonRequest>({
		language: currentLanguage,
		level: 'Beginner',
		topics: [],
		userGoals: '',
		recentMissedTopics: [],
		preferredPace: 'medium',
	})

	const handleGenerate = async () => {
		setLoading(true)
		try {
			const response = await fetch('/api/ai/generate-lesson', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					lessonRequest,
				}),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || 'Failed to generate lesson')
			}

			// Save generated lesson to localStorage and navigate to it
			const lessonId = `ai-${Date.now()}`
			localStorage.setItem(`ai_lesson_${lessonId}`, JSON.stringify(data.lesson))

			toast.success('AI lesson generated successfully!')
			router.push(`/lessons/${lessonId}`)
		} catch (error: any) {
			console.error('Generation error:', error)
			toast.error(error.message || 'Failed to generate lesson. Please check your API key and try again.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<Layout>
			<div className="relative min-h-screen overflow-hidden bg-background">
				{/* Modern Animated Background - Monochrome */}
				<div className="fixed inset-0 z-0 pointer-events-none">
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/20 via-background to-background" />
					<div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-center opacity-[0.03] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
				</div>

				<div className="relative z-10 container mx-auto px-4 py-10">
					<Button
						variant="outline"
						onClick={() => router.push('/lessons')}
						className="mb-6 glass-light border-white/10 text-white hover:border-white/30"
					>
						<FiArrowLeft className="inline mr-2" />
						Back to Lessons
					</Button>

					<div className="max-w-3xl mx-auto">
						<Card variant="dark" className="mb-6 glass border-white/10">
							<div className="flex items-center gap-3 mb-4">
								<div className="p-3 rounded-xl bg-white/10 border border-white/5">
									<FiZap className="text-2xl text-white" />
								</div>
								<div>
									<h1 className="text-3xl font-black text-white">
										AI-Powered Lesson Generator
									</h1>
									<p className="text-zinc-400">Powered by Google Gemini AI - Create personalized lessons tailored to your needs</p>
								</div>
							</div>
						</Card>

						{/* Lesson Configuration */}
						<Card variant="dark" className="mb-6 glass border-white/10">
							<h2 className="text-xl font-bold text-white mb-4">Lesson Preferences</h2>

							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-zinc-400 mb-2">
										Language
									</label>
									<input
										type="text"
										value={lessonRequest.language}
										onChange={e => setLessonRequest({ ...lessonRequest, language: e.target.value })}
										className="w-full px-4 py-2 rounded-xl glass-light border border-white/10 text-white placeholder-zinc-500 bg-transparent focus:outline-none focus:border-white/30 transition-colors"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-zinc-400 mb-2">
										Level
									</label>
									<select
										value={lessonRequest.level}
										onChange={e =>
											setLessonRequest({
												...lessonRequest,
												level: e.target.value as LessonRequest['level'],
											})
										}
										className="w-full px-4 py-2 rounded-xl glass-light border border-white/10 text-white bg-transparent focus:outline-none focus:border-white/30 transition-colors"
									>
										<option value="Beginner" className="bg-zinc-900 text-white">Beginner</option>
										<option value="Intermediate" className="bg-zinc-900 text-white">Intermediate</option>
										<option value="Advanced" className="bg-zinc-900 text-white">Advanced</option>
									</select>
								</div>

								<div>
									<label className="block text-sm font-medium text-zinc-400 mb-2">
										Your Learning Goals (Optional)
									</label>
									<textarea
										value={lessonRequest.userGoals || ''}
										onChange={e => setLessonRequest({ ...lessonRequest, userGoals: e.target.value })}
										placeholder="e.g., I want to learn business vocabulary for meetings"
										rows={3}
										className="w-full px-4 py-2 rounded-xl glass-light border border-white/10 text-white placeholder-zinc-500 bg-transparent focus:outline-none focus:border-white/30 resize-none transition-colors"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-zinc-400 mb-2">
										Preferred Pace
									</label>
									<select
										value={lessonRequest.preferredPace}
										onChange={e =>
											setLessonRequest({
												...lessonRequest,
												preferredPace: e.target.value as LessonRequest['preferredPace'],
											})
										}
										className="w-full px-4 py-2 rounded-xl glass-light border border-white/10 text-white bg-transparent focus:outline-none focus:border-white/30 transition-colors"
									>
										<option value="slow" className="bg-zinc-900 text-white">Slow - More detailed explanations</option>
										<option value="medium" className="bg-zinc-900 text-white">Medium - Balanced pace</option>
										<option value="fast" className="bg-zinc-900 text-white">Fast - Quick and concise</option>
									</select>
								</div>
							</div>
						</Card>

						{/* Generate Button */}
						<Button
							variant="primary"
							onClick={handleGenerate}
							disabled={loading}
							className="w-full bg-white text-black hover:bg-zinc-200 border-none"
							size="lg"
						>
							{loading ? (
								<>
									<FiLoader className="inline mr-2 animate-spin" />
									Generating with AI...
								</>
							) : (
								<>
									<FiZap className="inline mr-2" />
									Generate AI Lesson
								</>
							)}
						</Button>
					</div>
				</div>
			</div>
		</Layout>
	)
}
