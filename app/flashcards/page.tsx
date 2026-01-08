'use client'

import { useMemo, useState, useEffect } from 'react'
import gsap from 'gsap'
import Layout from '@/components/Layout'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import { useApp } from '@/contexts/AppContext'
import { FiRotateCw, FiCheck, FiX } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { FLASHCARDS_LIBRARY, type Flashcard } from '@/data/flashcards'

type FlashcardWithProgress = Flashcard & {
	reviewed: boolean
}

const difficultyVariant: Record<Flashcard['difficulty'], 'success' | 'warning' | 'danger'> = {
	easy: 'success',
	medium: 'warning',
	hard: 'danger',
}

export default function FlashcardsPage() {
	const { currentLanguage, addXp, addCoins } = useApp()
	const [cards, setCards] = useState<FlashcardWithProgress[]>([])
	const [currentCardIndex, setCurrentCardIndex] = useState(0)
	const [isFlipped, setIsFlipped] = useState(false)

	// Load flashcards for current language
	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from('.flashcard-container', {
				y: 50,
				opacity: 0,
				duration: 1,
				ease: 'power3.out'
			})

			gsap.from('.progress-card', {
				y: -20,
				opacity: 0,
				duration: 0.8,
				delay: 0.3,
				ease: 'power2.out'
			})
		})
		return () => ctx.revert()
	}, [])

	useEffect(() => {
		if (isFlipped) {
			gsap.to('.flashcard-inner', { rotationY: 180, duration: 0.6, ease: 'power2.inOut' })
		} else {
			gsap.to('.flashcard-inner', { rotationY: 0, duration: 0.6, ease: 'power2.inOut' })
		}
	}, [isFlipped])

	const currentCard = cards[currentCardIndex] || cards[0]

	const reviewedCount = useMemo(() => cards.filter(card => card.reviewed).length, [cards])

	const handleFlip = () => {
		setIsFlipped(prev => !prev)
	}

	const handleAnswer = (correct: boolean) => {
		if (correct) {
			addXp(10)
			addCoins(2)
			toast.success('Correct! +10 XP, +2 coins')
		} else {
			toast.error('Keep practicing!')
		}

		setCards(prev =>
			prev.map((card, index) =>
				index === currentCardIndex
					? {
						...card,
						reviewed: true,
					}
					: card
			)
		)

		setIsFlipped(false)

		if (currentCardIndex < cards.length - 1) {
			setCurrentCardIndex(currentCardIndex + 1)
		} else {
			toast.success('You completed all flashcards!')
			setCurrentCardIndex(0)
		}
	}

	return (
		<Layout>
			<div className="min-h-screen bg-black selection:bg-white/20 selection:text-white">
				{/* Background handled by Layout */}

				<div className="relative z-10 container mx-auto px-4 py-10">
					<div className="max-w-3xl mx-auto text-center mb-10">
						<Badge variant="outline" className="mb-4 border-white/20 text-zinc-300">
							Flashcards - {currentLanguage}
						</Badge>
						<h1 className="text-4xl font-black text-white mb-3 tracking-tight">Build your {currentLanguage} vocabulary</h1>
						<p className="text-zinc-400 font-light">
							Surface the right words at the right time with spaced repetition and quick feedback.
						</p>
					</div>

					{cards.length > 0 && (
						<div className="progress-card">
							<Card variant="dark" className="mb-8 bg-zinc-900/30 border border-white/10 backdrop-blur-md max-w-3xl mx-auto">
								<div className="flex items-center justify-between mb-3 text-sm text-zinc-400">
									<span className="font-semibold uppercase tracking-wide">Progress</span>
									<span className="text-white">
										{reviewedCount} / {cards.length} reviewed
									</span>
								</div>
								<ProgressBar value={reviewedCount} max={cards.length} />
							</Card>
						</div>
					)}

					{cards.length > 0 ? (
						<div className="max-w-3xl mx-auto flashcard-container perspective-1000">
							<div className="relative w-full aspect-video mb-6 cursor-pointer group" onClick={handleFlip}>
								<div className="flashcard-inner w-full h-full relative preserve-3d transition-all duration-500">
									{/* Front */}
									<div className="absolute inset-0 backface-hidden">
										<Card variant="dark" className="h-full flex items-center justify-center bg-zinc-900/50 border-white/10 backdrop-blur-md group-hover:border-white/20 transition-colors">
											<div className="text-center p-8">
												<p className="text-5xl font-bold text-white mb-6">
													{currentCard.front}
												</p>
												<Badge variant="secondary" className="bg-white/5 text-zinc-400 border-white/5 capitalize">
													{currentCard.difficulty}
												</Badge>
												<p className="mt-8 text-sm text-zinc-500 font-medium uppercase tracking-widest">Click to Flip</p>
											</div>
										</Card>
									</div>

									{/* Back */}
									<div className="absolute inset-0 backface-hidden rotate-y-180">
										<Card variant="dark" className="h-full flex items-center justify-center bg-white/5 border-white/10 backdrop-blur-md">
											<div className="text-center p-8">
												<p className="text-5xl font-bold text-white mb-6">
													{currentCard.back}
												</p>
												<Badge variant="outline" className="border-white/20 text-zinc-300">
													Translation
												</Badge>
											</div>
										</Card>
									</div>
								</div>
							</div>

							<div className="flex flex-col md:flex-row gap-4">
								<Button
									variant="outline"
									onClick={() => handleAnswer(false)}
									className="flex-1 border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/50"
									size="lg"
								>
									<FiX className="inline mr-2" />
									Incorrect
								</Button>
								<Button
									variant="outline"
									onClick={() => handleAnswer(true)}
									className="flex-1 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/50"
									size="lg"
								>
									<FiCheck className="inline mr-2" />
									Correct
								</Button>
							</div>
						</div>
					) : (
						<Card variant="dark" className="text-center p-8 bg-zinc-900/30 border-white/10">
							<p className="text-zinc-400">Loading flashcards...</p>
						</Card>
					)}

					{cards.length > 0 && (
						<Card variant="dark" className="mt-10 bg-zinc-900/30 border-white/10 backdrop-blur-md">
							<div className="flex items-center justify-between mb-5">
								<h3 className="text-xl font-bold text-white">All Cards</h3>
								<Button
									variant="outline"
									size="sm"
									onClick={() => {
										const shuffled = [...cards].sort(() => Math.random() - 0.5)
										setCards(shuffled)
										setCurrentCardIndex(0)
										setIsFlipped(false)
									}}
									className="border-white/10 text-zinc-400 hover:text-white hover:bg-white/5"
								>
									Randomize
								</Button>
							</div>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
								{cards.map((card, index) => (
									<button
										key={card.id}
										type="button"
										onClick={() => {
											setCurrentCardIndex(index)
											setIsFlipped(false)
										}}
										className={`p-4 border rounded-xl text-center transition-all font-medium ${index === currentCardIndex
											? 'border-white bg-white/10 text-white'
											: card.reviewed
												? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400'
												: 'border-white/5 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
											}`}
									>
										<p>{card.front}</p>
										{card.reviewed && <span className="text-emerald-500 text-xs block mt-1">✓ Reviewed</span>}
									</button>
								))}
							</div>
						</Card>
					)}
				</div>
			</div>
		</Layout>
	)
}


