'use client'

import { useEffect, useMemo, useState, type MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
import Layout from '@/components/Layout'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import AICard3D from '@/components/ui/AICard3D'
import { useApp } from '@/contexts/AppContext'
import { FiCheckCircle, FiLock, FiPlay } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { LESSON_LIBRARY, type LessonDefinition, type LessonLevel } from '@/data/lessons'

const levelVariant: Record<LessonLevel, 'success' | 'warning' | 'danger'> = {
	Beginner: 'success',
	Intermediate: 'warning',
	Advanced: 'danger',
}

type LessonWithProgress = LessonDefinition & {
	completed: boolean
	locked: boolean
}

export default function LessonsPage() {
	const router = useRouter()
	const { currentLanguage, setCurrentLanguage, addXp, addCoins, addStreak, nativeLanguage } = useApp()

	const availableLanguages = useMemo(() => Object.keys(LESSON_LIBRARY), [])
	const initialLanguage = availableLanguages.includes(currentLanguage) ? currentLanguage : availableLanguages[0]

	const [activeLanguage, setActiveLanguage] = useState(initialLanguage)
	const [progress, setProgress] = useState<Record<string, string[]>>(() => {
		// Load from localStorage if available
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('linguaquest_lesson_progress')
			if (saved) {
				try {
					return JSON.parse(saved)
				} catch {
					// If parsing fails, return default
				}
			}
		}
		return Object.fromEntries(availableLanguages.map(language => [language, []]))
	})

	// Save progress to localStorage whenever it changes
	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('linguaquest_lesson_progress', JSON.stringify(progress))
		}
	}, [progress])

	useEffect(() => {
		if (!progress[activeLanguage]) {
			setProgress(prev => ({ ...prev, [activeLanguage]: [] }))
		}
		setCurrentLanguage(activeLanguage)
	}, [activeLanguage, progress, setCurrentLanguage])

	const lessons: LessonWithProgress[] = useMemo(() => {
		const baseLessons = LESSON_LIBRARY[activeLanguage] ?? []
		const completedSet = new Set(progress[activeLanguage] ?? [])

		return baseLessons.map(lesson => {
			const completed = completedSet.has(lesson.id)
			const locked = lesson.unlockAfter ? !completedSet.has(lesson.unlockAfter) : false
			return { ...lesson, completed, locked }
		})
	}, [activeLanguage, progress])

	const completedLessons = lessons.filter(lesson => lesson.completed).length
	const totalXp = lessons.reduce((sum, lesson) => sum + lesson.xp, 0)
	const earnedXp = lessons.filter(lesson => lesson.completed).reduce((sum, lesson) => sum + lesson.xp, 0)

	const handleSelectLanguage = (language: string) => {
		setActiveLanguage(language)
	}

	const handleStartLesson = (lesson: LessonWithProgress) => {
		if (lesson.locked) {
			toast.error('Complete previous lessons to unlock this one!')
			return
		}
		// Navigate to lesson page
		router.push(`/lessons/${lesson.id}`)
	}

	const handleCompleteLesson = (event: MouseEvent<HTMLButtonElement>, lesson: LessonWithProgress) => {
		event.stopPropagation()
		if (lesson.locked || lesson.completed) return

		addXp(lesson.xp)
		addCoins(12)
		addStreak()
		toast.success(`Lesson completed! +${lesson.xp} XP, +12 coins`)

		setProgress(prev => {
			const current = prev[activeLanguage] ?? []
			if (current.includes(lesson.id)) return prev
			return {
				...prev,
				[activeLanguage]: [...current, lesson.id],
			}
		})
	}

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from('.lesson-card', {
				y: 50,
				opacity: 0,
				duration: 0.8,
				stagger: 0.1,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: '.lesson-grid',
					start: 'top 80%',
				}
			})

			gsap.from('.header-animate', {
				y: 30,
				opacity: 0,
				duration: 1,
				stagger: 0.2,
				ease: 'power2.out'
			})
		})
		return () => ctx.revert()
	}, [lessons]) // Re-run when lessons change

	return (
		<Layout>
			<div className="relative min-h-screen overflow-hidden bg-black selection:bg-white/20 selection:text-white">
				{/* Modern Animated Background handled by Layout */}

				<div className="relative z-10 container mx-auto px-4 py-10">
					<div className="max-w-3xl">
						<div className="flex flex-wrap items-center gap-4 mb-6 header-animate">
							<h1 className="text-5xl font-black text-white tracking-tight">
								Lesson Paths
							</h1>
							<Badge variant="outline" className="border-white/20 text-zinc-300">
								{activeLanguage}
							</Badge>
						</div>
						<p className="text-zinc-400 mb-6 text-lg font-light header-animate">
							Dive into curated lesson tracks for every language. Unlock new missions as you complete the previous ones.
						</p>
						<div className="flex flex-wrap gap-2 mb-10 header-animate">
							{availableLanguages.map(language => {
								const isActive = language === activeLanguage
								return (
									<Button
										key={language}
										variant={isActive ? 'primary' : 'outline'}
										size="sm"
										onClick={() => handleSelectLanguage(language)}
										className={isActive ? 'bg-white text-black hover:bg-zinc-200' : 'border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white'}
									>
										{language}
									</Button>
								)
							})}
						</div>
					</div>

					<div className="header-animate">
						<Card variant="dark" className="mb-8 bg-zinc-900/30 border-white/10 backdrop-blur-md">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<div className="relative overflow-hidden rounded-xl p-4 bg-white/5 border border-white/5">
									<p className="text-sm text-zinc-400 mb-1 uppercase tracking-wide font-medium">Lessons Completed</p>
									<p className="text-3xl font-bold text-white">
										{completedLessons} <span className="text-zinc-600">/ {lessons.length}</span>
									</p>
								</div>
								<div className="relative overflow-hidden rounded-xl p-4 bg-white/5 border border-white/5">
									<p className="text-sm text-zinc-400 mb-1 uppercase tracking-wide font-medium">XP Earned</p>
									<p className="text-3xl font-bold text-white">
										{earnedXp} <span className="text-zinc-600">/ {totalXp}</span>
									</p>
								</div>
								<div className="relative overflow-hidden rounded-xl p-4 bg-white/5 border border-white/5">
									<p className="text-sm text-zinc-400 mb-2 uppercase tracking-wide font-medium">Course Progress</p>
									<ProgressBar value={completedLessons} max={lessons.length} />
								</div>
							</div>
						</Card>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lesson-grid">
						{lessons.map((lesson, index) => (
							<div key={lesson.id} className="lesson-card">
								<Card variant="dark" className="relative h-full border border-white/10 bg-zinc-900/20 hover:bg-zinc-900/40 transition-all duration-300 group">
									{lesson.locked && (
										<div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] rounded-2xl flex items-center justify-center z-10 border border-white/5">
											<div className="text-center p-6">
												<div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
													<FiLock className="text-xl text-zinc-400" />
												</div>
												<p className="text-sm text-zinc-400 font-medium">Locked</p>
											</div>
										</div>
									)}
									<div className="flex items-start justify-between mb-4">
										<div>
											<h3 className="text-xl font-bold text-white mb-2 group-hover:text-zinc-200 transition-colors">{lesson.title[nativeLanguage] || lesson.title['English']}</h3>
											<div className="flex flex-wrap gap-2 mb-3">
												<Badge variant="outline" className="border-white/10 text-zinc-400 text-xs">
													{lesson.level}
												</Badge>
												{((lesson.topics[nativeLanguage] || lesson.topics['English']) ?? []).map(topic => (
													<Badge key={topic} variant="secondary" className="bg-white/5 text-zinc-300 text-xs hover:bg-white/10">
														{topic}
													</Badge>
												))}
											</div>
											<p className="text-sm text-zinc-400 leading-relaxed mb-4">{lesson.description[nativeLanguage] || lesson.description['English']}</p>
											{lesson.locked && lesson.unlockAfter && (
												<p className="mt-2 text-xs font-medium text-zinc-500 flex items-center gap-1">
													<FiLock className="inline" />
													Unlocks after {
														(LESSON_LIBRARY[activeLanguage]?.find(base => base.id === lesson.unlockAfter)?.title[nativeLanguage]
															|| LESSON_LIBRARY[activeLanguage]?.find(base => base.id === lesson.unlockAfter)?.title['English'])
														?? 'previous mission'
													}
												</p>
											)}
										</div>
										{lesson.completed && <FiCheckCircle className="text-white text-2xl opacity-50" />}
									</div>

									<div className="mt-auto">
										<div className="flex items-center gap-4 text-xs font-medium text-zinc-500 mb-4 uppercase tracking-wider">
											<span>+{lesson.xp} XP</span>
											<span>+12 Coins</span>
										</div>
										<div className="flex gap-2">
											<Button
												variant={lesson.completed ? 'secondary' : 'primary'}
												onClick={() => handleStartLesson(lesson)}
												className={`flex-1 ${lesson.completed ? 'bg-white/5 text-zinc-400 hover:bg-white/10' : 'bg-white text-black hover:bg-zinc-200'}`}
												disabled={lesson.locked}
											>
												<FiPlay className="inline mr-1" />
												{lesson.completed ? 'Review' : 'Start'}
											</Button>
											<Button
												variant="outline"
												onClick={event => handleCompleteLesson(event, lesson)}
												className="px-4 border-white/10 text-zinc-400 hover:text-white hover:bg-white/5"
												disabled={lesson.locked || lesson.completed}
											>
												{lesson.completed ? 'Done' : 'Mark'}
											</Button>
										</div>
									</div>
								</Card>
							</div>
						))}
					</div>

					<div className="mt-12 header-animate">
						<Card variant="dark" className="bg-gradient-to-r from-zinc-900 to-black border border-white/10 relative overflow-hidden group">
							<div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
							<div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

							<div className="relative z-10 flex items-start gap-6 p-2">
								<div className="w-24 h-24 rounded-xl bg-white/5 border border-white/10 shadow-inner overflow-hidden">
									<AICard3D />
								</div>
								<div className="flex-1">
									<h2 className="text-2xl font-bold mb-2 text-white">
										AI-Powered Custom Lesson
									</h2>
									<p className="text-zinc-400 mb-6 font-light max-w-2xl">
										Generate a personalized lesson tailored to your goals, recently missed topics, and preferred pace using AI.
									</p>
									<Button
										variant="outline"
										onClick={() => router.push('/ai-lesson')}
										className="border-white/20 text-white hover:bg-white hover:text-black transition-all"
									>
										Generate AI Lesson
									</Button>
								</div>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</Layout>
	)
}



