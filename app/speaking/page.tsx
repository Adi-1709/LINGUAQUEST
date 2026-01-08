'use client'

import { useEffect, useRef, useState } from 'react'
import Layout from '@/components/Layout'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import ProgressBar from '@/components/ui/ProgressBar'
import { useApp } from '@/contexts/AppContext'
import { FiMic, FiMicOff, FiVolume2 } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { SPEAKING_SENTENCES } from '@/data/speaking'

export default function SpeakingPage() {
	const { currentLanguage, addXp, addCoins } = useApp()
	const [isRecording, setIsRecording] = useState(false)
	const [score, setScore] = useState<number | null>(null)
	const practiceSentences = SPEAKING_SENTENCES[currentLanguage] || SPEAKING_SENTENCES.Spanish
	const [practiceText, setPracticeText] = useState(practiceSentences[0] || '')
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)
	const toastRef = useRef<string | null>(null)

	// Update practice text when language changes
	useEffect(() => {
		const sentences = SPEAKING_SENTENCES[currentLanguage] || SPEAKING_SENTENCES.Spanish
		if (sentences.length > 0) {
			setPracticeText(sentences[0])
		}
	}, [currentLanguage])

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
			if (toastRef.current) {
				toast.dismiss(toastRef.current)
			}
		}
	}, [])

	const handleStartRecording = () => {
		setIsRecording(true)
		toastRef.current = toast.loading('Recording... Speak now!')

		timeoutRef.current = setTimeout(() => {
			setIsRecording(false)
			if (toastRef.current) toast.dismiss(toastRef.current)

			const newScore = Math.floor(Math.random() * 40) + 60
			setScore(newScore)

			if (newScore > 80) {
				addXp(50)
				addCoins(5)
				toast.success(`Great pronunciation! Score: ${newScore}%`)
			} else if (newScore > 60) {
				addXp(30)
				toast.success(`Good job! Score: ${newScore}%`)
			} else {
				toast.error(`Keep practicing! Score: ${newScore}%`)
			}
		}, 3000)
	}

	const handleStopRecording = () => {
		setIsRecording(false)
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
			timeoutRef.current = null
		}
		if (toastRef.current) {
			toast.dismiss(toastRef.current)
			toastRef.current = null
		}
	}

	return (
		<Layout>
			<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
				<div className="container mx-auto px-4 py-10">
					<div className="max-w-3xl">
						<h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
							Speaking Practice
						</h1>
						<p className="text-gray-300 mb-10">
							Sharpen your {currentLanguage} pronunciation with instant AI feedback and guided drills.
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						<div className="lg:col-span-2 space-y-6">
							<Card variant="light" className="shadow-xl border border-gray-200/80">
								<h2 className="text-2xl font-bold mb-4 text-gray-900">Practice Sentence</h2>
								<div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl mb-6">
									<p className="text-2xl text-center font-semibold text-gray-900 mb-5">{practiceText}</p>
									<Button
										variant="outline"
										className="mx-auto block border-blue-500 text-blue-600 hover:bg-blue-100"
										onClick={() => toast.success('Playing native pronunciation...')}
									>
										<FiVolume2 className="inline mr-2" />
										Listen
									</Button>
								</div>

								{score !== null && (
									<div className="mb-6">
										<div className="flex items-center justify-between mb-2">
											<span className="font-semibold text-gray-600">Pronunciation Score</span>
											<span className="text-3xl font-black text-blue-500">{score}%</span>
										</div>
										<ProgressBar value={score} max={100} />
									</div>
								)}

								<div className="flex gap-4">
									<Button
										variant={isRecording ? 'danger' : 'primary'}
										size="lg"
										onClick={isRecording ? handleStopRecording : handleStartRecording}
										className="flex-1"
									>
										{isRecording ? (
											<>
												<FiMicOff className="inline mr-2" />
												Stop Recording
											</>
										) : (
											<>
												<FiMic className="inline mr-2" />
												Start Recording
											</>
										)}
									</Button>
								</div>
							</Card>

							<Card variant="light" className="shadow-lg border border-gray-200/80">
								<h3 className="text-xl font-bold mb-4 text-gray-900">Practice Sentences</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
									{practiceSentences.map(sentence => (
										<button
											key={sentence}
											type="button"
											onClick={() => {
												setPracticeText(sentence)
												setScore(null)
											}}
											className={`text-left p-4 rounded-lg transition font-medium ${
												practiceText === sentence
													? 'bg-blue-500/10 border border-blue-500 text-blue-600'
													: 'bg-gray-50 hover:bg-blue-50 border border-gray-200 text-gray-700'
											}`}
										>
											{sentence}
										</button>
									))}
								</div>
							</Card>
						</div>

						<div className="space-y-6">
							<Card variant="dark" className="bg-slate-900/70 border border-slate-800/70">
								<h3 className="text-xl font-bold mb-3 text-white">AI Conversation</h3>
								<p className="text-gray-400 text-sm mb-5">
									Practice live conversation with an AI tutor who adapts to your level in real time.
								</p>
								<Button variant="outline" className="w-full border-blue-500 text-blue-300 hover:bg-blue-500/10">
									Start Conversation
								</Button>
							</Card>

							<Card variant="dark" className="bg-slate-900/70 border border-slate-800/70">
								<h3 className="text-xl font-bold mb-4 text-white">Tips for Clear Pronunciation</h3>
								<ul className="space-y-2 text-sm text-gray-400">
									<li>• Warm up by listening to the sentence twice.</li>
									<li>• Speak slowly and exaggerate tricky sounds.</li>
									<li>• Focus on intonation and natural pauses.</li>
									<li>• Repeat recordings and aim to beat your best score.</li>
								</ul>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}


