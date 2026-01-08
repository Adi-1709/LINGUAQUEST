'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Layout from '@/components/Layout'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import { useApp } from '@/contexts/AppContext'
import { LESSON_LIBRARY, type LessonDefinition } from '@/data/lessons'
import { VOCABULARY_LIBRARY, type VocabularyItem } from '@/data/vocabulary'
import { FiArrowLeft, FiCheck, FiX, FiPlay } from 'react-icons/fi'
import toast from 'react-hot-toast'

type Exercise = {
	id: number
	question: string
	questionType: 'english' | 'translation'
	options: string[]
	correctAnswer: number
	userAnswer: number | null
	correctTranslation: string
}

export default function LessonPage() {
	const params = useParams()
	const router = useRouter()
	const { currentLanguage, addXp, addCoins, addStreak, nativeLanguage } = useApp()
	const lessonId = params.lessonId as string

	const [lesson, setLesson] = useState<LessonDefinition | null>(null)
	const [vocabulary, setVocabulary] = useState<VocabularyItem[]>([])
	const [currentExercise, setCurrentExercise] = useState(0)
	const [exercises, setExercises] = useState<Exercise[]>([])
	const [isCompleted, setIsCompleted] = useState(false)
	const [showQuiz, setShowQuiz] = useState(false)

	useEffect(() => {
		if (!lessonId || !currentLanguage) return

		// Check if this is an AI-generated lesson
		if (lessonId.startsWith('ai-')) {
			const aiLessonData = typeof window !== 'undefined' ? localStorage.getItem(`ai_lesson_${lessonId}`) : null
			if (aiLessonData) {
				try {
					const aiLesson = JSON.parse(aiLessonData)
					// Convert AI lesson to lesson format
					setLesson({
						id: lessonId,
						title: aiLesson.title,
						level: 'Beginner' as const, // Default level for AI lessons
						xp: 100,
						topics: aiLesson.topics || [],
						description: aiLesson.description,
					})

					// Set vocabulary from AI lesson
					setVocabulary(aiLesson.vocabulary || [])

					// Set exercises from AI lesson
					if (aiLesson.exercises && aiLesson.exercises.length > 0) {
						setExercises(aiLesson.exercises.map((ex: any, idx: number) => ({
							...ex,
							id: idx + 1,
							userAnswer: null,
						})))
					}
					return
				} catch (error) {
					console.error('Error parsing AI lesson:', error)
				}
			}
		}

		// Regular lesson lookup
		const languageLessons = LESSON_LIBRARY[currentLanguage] || []
		const foundLesson = languageLessons.find(l => l.id === lessonId)

		if (!foundLesson) {
			toast.error('Lesson not found')
			router.push('/lessons')
			return
		}

		setLesson(foundLesson)

		// Get vocabulary for this lesson
		const lessonVocab = VOCABULARY_LIBRARY[currentLanguage]?.[lessonId] || []
		setVocabulary(lessonVocab)

		// Generate translation exercises from vocabulary
		if (lessonVocab.length > 0) {
			const generatedExercises: Exercise[] = []
			const vocabToUse = lessonVocab.slice(0, Math.min(8, lessonVocab.length)) // Use up to 8 items

			vocabToUse.forEach((item, idx) => {
				// Alternate between English -> Translation and Translation -> English
				const isEnglishToTranslation = idx % 2 === 0

				// Get wrong options from other vocabulary items
				const wrongOptions = lessonVocab
					.filter(v => v.english !== item.english)
					.map(v => isEnglishToTranslation ? v.translation : v.english)
					.slice(0, 3)

				// Shuffle and add correct answer
				const allOptions = [isEnglishToTranslation ? item.translation : item.english, ...wrongOptions]
				const shuffledOptions = allOptions.sort(() => Math.random() - 0.5)
				const correctIndex = shuffledOptions.indexOf(isEnglishToTranslation ? item.translation : item.english)

				generatedExercises.push({
					id: idx + 1,
					question: isEnglishToTranslation ? item.english : item.translation,
					questionType: isEnglishToTranslation ? 'english' : 'translation',
					options: shuffledOptions,
					correctAnswer: correctIndex,
					userAnswer: null,
					correctTranslation: isEnglishToTranslation ? item.translation : item.english,
				})
			})

			setExercises(generatedExercises)
		}
	}, [lessonId, currentLanguage, router])

	const handleAnswer = (exerciseIndex: number, answerIndex: number) => {
		setExercises(prev =>
			prev.map((ex, idx) => (idx === exerciseIndex ? { ...ex, userAnswer: answerIndex } : ex))
		)
	}

	const handleNext = () => {
		if (currentExercise < exercises.length - 1) {
			setCurrentExercise(currentExercise + 1)
		} else {
			// Complete lesson
			const correctAnswers = exercises.filter(
				(ex, idx) => ex.userAnswer === ex.correctAnswer
			).length
			const score = (correctAnswers / exercises.length) * 100

			if (score >= 60) {
				if (lesson) {
					addXp(lesson.xp)
					addCoins(12)
					addStreak()
					setIsCompleted(true)

					// Mark lesson as completed in localStorage
					if (typeof window !== 'undefined') {
						const saved = localStorage.getItem('linguaquest_lesson_progress')
						let progress: Record<string, string[]> = saved ? JSON.parse(saved) : {}
						if (!progress[currentLanguage]) {
							progress[currentLanguage] = []
						}
						if (!progress[currentLanguage].includes(lesson.id)) {
							progress[currentLanguage].push(lesson.id)
							localStorage.setItem('linguaquest_lesson_progress', JSON.stringify(progress))
						}
					}

					toast.success(`Lesson completed! +${lesson.xp} XP, +12 coins`)
				}
			} else {
				toast.error(`Score too low (${score}%). Please review and try again.`)
			}
		}
	}

	const handleBackToLessons = () => {
		router.push('/lessons')
	}

	if (!lesson) {
		return (
			<Layout>
				<div className="min-h-screen bg-black flex items-center justify-center">
					<Card variant="dark" className="text-center p-8 bg-zinc-900/30 border-white/10">
						<p className="text-zinc-400">Loading lesson...</p>
					</Card>
				</div>
			</Layout>
		)
	}

	const currentEx = exercises[currentExercise]
	const correctAnswers = exercises.filter(ex => ex.userAnswer === ex.correctAnswer).length
	const progress = showQuiz ? ((currentExercise + 1) / exercises.length) * 100 : 0

	// Group vocabulary by category
	const groupedVocab = vocabulary.reduce((acc, item) => {
		if (!acc[item.category]) {
			acc[item.category] = []
		}
		acc[item.category].push(item)
		return acc
	}, {} as Record<string, VocabularyItem[]>)

	return (
		<Layout>
			<div className="min-h-screen bg-black selection:bg-white/20 selection:text-white">
				{/* Background handled by Layout */}

				<div className="relative z-10 container mx-auto px-4 py-10">
					<Button
						variant="outline"
						onClick={handleBackToLessons}
						className="mb-6 border-white/10 text-zinc-400 hover:text-white hover:bg-white/5"
					>
						<FiArrowLeft className="inline mr-2" />
						Back to Lessons
					</Button>

					<div className="max-w-4xl mx-auto">
						{/* Lesson Header */}
						<Card variant="dark" className="mb-6 bg-zinc-900/30 border-white/10 backdrop-blur-md">
							<div className="flex items-start justify-between mb-4">
								<div className="flex-1">
									<div className="flex items-center gap-3 mb-3">
										<Badge
											variant="outline"
											className="capitalize border-white/20 text-zinc-300"
										>
											{lesson.level}
										</Badge>
										<Badge variant="secondary" className="bg-white/10 text-white border-white/5">
											{currentLanguage}
										</Badge>
									</div>
									<h1 className="text-3xl font-bold text-white mb-2">
										{lesson.title[nativeLanguage || 'English'] || lesson.title['English']}
									</h1>
									<p className="text-zinc-400 mb-4">
										{lesson.description[nativeLanguage || 'English'] || lesson.description['English']}
									</p>
									<div className="flex flex-wrap gap-2">
										{(lesson.topics[nativeLanguage || 'English'] || lesson.topics['English'] || []).map(topic => (
											<Badge key={topic} variant="secondary" className="bg-white/5 text-zinc-400 border-white/5">
												{topic}
											</Badge>
										))}
									</div>
								</div>
								<div className="text-right">
									<p className="text-sm text-zinc-500 mb-1 uppercase tracking-wider font-medium">Rewards</p>
									<p className="text-lg font-bold text-white">+{lesson.xp} XP</p>
									<p className="text-lg font-bold text-amber-400">+12 Coins</p>
								</div>
							</div>
							{showQuiz && (
								<>
									<ProgressBar value={currentExercise + 1} max={exercises.length} />
									<p className="text-sm text-zinc-500 mt-2">
										Exercise {currentExercise + 1} of {exercises.length}
									</p>
								</>
							)}
						</Card>

						{!showQuiz ? (
							<>
								{/* Vocabulary Learning Section */}
								{vocabulary.length > 0 ? (
									<Card variant="dark" className="mb-6 bg-zinc-900/30 border-white/10 backdrop-blur-md">
										<h2 className="text-3xl font-bold text-white mb-4">Learn These Words & Phrases</h2>
										<p className="text-zinc-400 mb-6 text-lg">
											Study the translations below. English is on the left, {currentLanguage} is on the right.
										</p>

										{Object.entries(groupedVocab).map(([category, items]) => (
											<div key={category} className="mb-6">
												<h3 className="text-xl font-bold text-zinc-200 mb-4 flex items-center gap-2">
													<span className="w-1 h-6 bg-white rounded-full"></span>
													{category}
												</h3>
												<div className="space-y-3">
													{items.map((item, idx) => (
														<div
															key={idx}
															className="group grid grid-cols-2 gap-4 p-5 bg-white/5 rounded-xl border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
														>
															<div className="text-left">
																<p className="font-bold text-white text-lg">{item.english}</p>
																<p className="text-xs text-zinc-500 uppercase tracking-wide mt-1">English</p>
															</div>
															<div className="text-right">
																<p className="font-bold text-white text-lg">{item.translation}</p>
																<p className="text-xs text-zinc-500 uppercase tracking-wide mt-1">{currentLanguage}</p>
															</div>
														</div>
													))}
												</div>
											</div>
										))}
									</Card>
								) : (
									<Card variant="dark" className="mb-6 bg-zinc-900/30 border-white/10">
										<div className="text-center py-8">
											<p className="text-zinc-400 mb-4">Vocabulary content for this lesson is coming soon!</p>
											<p className="text-sm text-zinc-500">This lesson covers: {(lesson.topics[nativeLanguage || 'English'] || lesson.topics['English'] || []).join(', ')}</p>
										</div>
									</Card>
								)}

								{vocabulary.length > 0 && exercises.length > 0 && (
									<Card variant="dark" className="bg-zinc-900/30 border-white/10 backdrop-blur-md">
										<div className="text-center py-6">
											<h3 className="text-xl font-bold text-white mb-3">Ready for the Quiz?</h3>
											<p className="text-zinc-400 mb-6">
												Test your understanding with {exercises.length} translation exercises. You need at least 60% to pass!
											</p>
											<Button
												variant="primary"
												size="lg"
												onClick={() => setShowQuiz(true)}
												className="px-8 bg-white text-black hover:bg-zinc-200"
											>
												Start Quiz
												<FiPlay className="inline ml-2" />
											</Button>
										</div>
									</Card>
								)}
							</>
						) : isCompleted ? (
							<Card variant="dark" className="text-center p-12 bg-zinc-900/30 border-white/10 backdrop-blur-md">
								<div className="text-6xl mb-4">🎉</div>
								<h2 className="text-3xl font-bold text-white mb-4">Lesson Completed!</h2>
								<p className="text-zinc-400 mb-6">
									You scored {correctAnswers} out of {exercises.length} exercises correctly.
								</p>
								<div className="flex gap-4 justify-center">
									<Button variant="primary" onClick={handleBackToLessons} className="bg-white text-black hover:bg-zinc-200">
										Back to Lessons
									</Button>
									<Button
										variant="outline"
										onClick={() => {
											setCurrentExercise(0)
											setExercises(prev => prev.map(ex => ({ ...ex, userAnswer: null })))
											setIsCompleted(false)
										}}
										className="border-white/10 text-zinc-400 hover:text-white hover:bg-white/5"
									>
										Review Again
									</Button>
								</div>
							</Card>
						) : (
							<Card variant="dark" className="bg-zinc-900/30 border-white/10 backdrop-blur-md">
								<div className="mb-6">
									<h2 className="text-2xl font-bold text-white mb-4">
										Exercise {currentExercise + 1} of {exercises.length}
									</h2>

									{/* Question Display */}
									<div className="mb-6 p-6 bg-white/5 rounded-lg border border-white/10">
										<div className="text-center">
											<p className="text-sm text-zinc-500 mb-2 uppercase tracking-wide">
												{currentEx?.questionType === 'english' ? 'English' : currentLanguage}
											</p>
											<p className="text-2xl font-bold text-white mb-4">{currentEx?.question}</p>
											<p className="text-sm text-zinc-400">
												{currentEx?.questionType === 'english'
													? `What is this in ${currentLanguage}?`
													: 'What is this in English?'}
											</p>
										</div>
									</div>

									{/* Answer Options */}
									<div className="space-y-3">
										{currentEx?.options.map((option, idx) => {
											const isSelected = currentEx.userAnswer === idx
											const isCorrect = idx === currentEx.correctAnswer
											const showResult = currentEx.userAnswer !== null

											return (
												<button
													key={idx}
													type="button"
													onClick={() => handleAnswer(currentExercise, idx)}
													disabled={showResult}
													className={`w-full text-left p-4 rounded-lg border transition-all ${showResult
														? isCorrect
															? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
															: isSelected
																? 'border-red-500/50 bg-red-500/10 text-red-400'
																: 'border-white/5 bg-white/5 text-zinc-500'
														: isSelected
															? 'border-white bg-white/10 text-white'
															: 'border-white/10 hover:border-white/30 hover:bg-white/5 text-zinc-300'
														}`}
												>
													<div className="flex items-center justify-between">
														<span className="font-medium">{option}</span>
														{showResult && isCorrect && (
															<FiCheck className="text-emerald-500 text-xl" />
														)}
														{showResult && isSelected && !isCorrect && (
															<FiX className="text-red-500 text-xl" />
														)}
													</div>
												</button>
											)
										})}
									</div>

									{/* Show correct answer if wrong */}
									{currentEx?.userAnswer !== null &&
										currentEx?.userAnswer !== currentEx?.correctAnswer && (
											<div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
												<p className="text-sm text-emerald-400/80 mb-1">Correct answer:</p>
												<p className="font-semibold text-emerald-400">{currentEx?.correctTranslation}</p>
											</div>
										)}
								</div>
								<div className="flex justify-between">
									<Button
										variant="outline"
										onClick={() => setCurrentExercise(Math.max(0, currentExercise - 1))}
										disabled={currentExercise === 0}
										className="border-white/10 text-zinc-400 hover:text-white hover:bg-white/5"
									>
										Previous
									</Button>
									<Button
										variant="primary"
										onClick={handleNext}
										disabled={currentEx?.userAnswer === null || currentEx?.userAnswer === undefined}
										className="bg-white text-black hover:bg-zinc-200"
									>
										{currentExercise === exercises.length - 1 ? 'Complete Lesson' : 'Next'}
										<FiPlay className="inline ml-2" />
									</Button>
								</div>
							</Card>
						)}
					</div>
				</div>
			</div>
		</Layout>
	)
}

