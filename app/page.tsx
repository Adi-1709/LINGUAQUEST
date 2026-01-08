'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Layout from '@/components/Layout'
import HydraBackground from '@/components/animations/HydraBackground'
import Hero3D from '@/components/animations/Hero3D'
import AnimatedCounter from '@/components/animations/AnimatedCounter'
import SpotlightCard from '@/components/ui/SpotlightCard'
import { InfiniteMarquee } from '@/components/ui/InfiniteMarquee'
import Accordion from '@/components/ui/Accordion'
import TextReveal from '@/components/animations/TextReveal'
import MagneticButton from '@/components/ui/MagneticButton'
import Logo from '@/components/ui/Logo'
import {
	FiBook,
	FiMic,
	FiUsers,
	FiZap,
	FiAward,
	FiArrowRight,
	FiStar,
	FiGlobe,
	FiShield,
	FiSmartphone,
} from 'react-icons/fi'
import { FaRocket, FaDiscord, FaTwitter, FaGithub } from 'react-icons/fa'

import { useApp } from '@/contexts/AppContext'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
	const { isAuthenticated } = useApp()
	const { scrollYProgress } = useScroll();
	const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
	const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
	const y = useTransform(scrollYProgress, [0, 0.2], [0, 50]);

	const heroRef = useRef(null)
	const titleRef = useRef(null)

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(titleRef.current,
				{ y: 100, opacity: 0 },
				{ y: 0, opacity: 1, duration: 1.5, ease: 'power4.out', delay: 0.5 }
			)

			gsap.utils.toArray('.reveal-text').forEach((el: any) => {
				gsap.fromTo(el,
					{ y: 50, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 1,
						scrollTrigger: {
							trigger: el,
							start: 'top 80%',
							toggleActions: 'play none none reverse'
						}
					}
				)
			})
		}, heroRef)

		return () => ctx.revert()
	}, [])

	const testimonials = [
		{
			quote: "LinguaQuest completely changed how I learn Spanish. The gamification makes it addictive!",
			name: "Sarah Jenkins",
			title: "Polyglot Enthusiast",
		},
		{
			quote: "The AI conversation partner is mind-blowing. It feels like talking to a real person.",
			name: "David Chen",
			title: "Software Engineer",
		},
		{
			quote: "I've tried every app out there. This is the only one that kept me consistent for 6 months.",
			name: "Elena Rodriguez",
			title: "Student",
		},
		{
			quote: "The competitive aspect with the leaderboards pushes me to do just one more lesson.",
			name: "Michael Chang",
			title: "Gamer",
		},
		{
			quote: "Beautiful interface and rock-solid pedagogy. A rare combination.",
			name: "Dr. Emily Weiss",
			title: "Linguistics Professor",
		},
	];

	const faqs = [
		{
			question: "How does the AI learning work?",
			answer: "Our AI analyzes your learning patterns, strengths, and weaknesses to create a personalized curriculum. It adapts in real-time, offering more practice where you need it and advancing quickly where you excel.",
		},
		{
			question: "Can I learn multiple languages at once?",
			answer: "Absolutely! You can switch between languages instantly and track your progress for each one separately. We currently support over 50 languages.",
		},
		{
			question: "Is there a mobile app?",
			answer: "Yes, LinguaQuest is available on both iOS and Android. Your progress syncs seamlessly across all your devices.",
		},
		{
			question: "Is it free to start?",
			answer: "Yes! You can start your journey for free. We offer a premium subscription for advanced features like unlimited AI conversations and offline mode.",
		},
	];

	return (
		<Layout>
			<div className="relative min-h-screen overflow-hidden bg-transparent selection:bg-white/20 selection:text-white" ref={heroRef}>
				<div className="fixed inset-0 z-0 pointer-events-none">
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/20 via-transparent to-transparent" />
					<div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-center opacity-[0.03] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
				</div>

				{/* Hero Section */}
				<section className="relative z-10 min-h-screen flex items-center justify-center pt-20 overflow-hidden">
					<Hero3D />

					<motion.div
						style={{ opacity, scale, y }}
						className="container mx-auto px-4 text-center relative z-20"
					>
						<div className="mb-6 flex justify-center">
							<div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium text-zinc-400 flex items-center gap-2">
								<span className="relative flex h-2 w-2">
									<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
									<span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
								</span>
								Professional Language Mastery
							</div>
						</div>

						<div ref={titleRef}>
							<h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8">
								<span className="text-white block mb-2 drop-shadow-2xl mix-blend-difference">
									LINGUA
								</span>
								<span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-200 to-zinc-600">
									QUEST
								</span>
							</h1>
						</div>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light reveal-text"
						>
							Master languages with precision. AI-driven curriculum, immersive challenges, and a sophisticated learning environment.
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.6 }}
							className="flex flex-col sm:flex-row items-center justify-center gap-6 reveal-text"
						>
							{!isAuthenticated && (
								<MagneticButton>
									<Link
										href="/auth"
										className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-zinc-200 transition-all duration-300 flex items-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
									>
										<FaRocket className="group-hover:translate-x-1 transition-transform" />
										Start Journey
									</Link>
								</MagneticButton>
							)}

							<MagneticButton>
								<Link
									href="/lessons"
									className="group px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-3 backdrop-blur-sm"
								>
									<FiBook className="group-hover:scale-110 transition-transform" />
									Explore Curriculum
								</Link>
							</MagneticButton>
						</motion.div>
					</motion.div>
				</section >

				{/* Stats Section */}
				< section className="relative z-10 py-10 border-y border-white/5 bg-black/20 backdrop-blur-sm" >
					<div className="container mx-auto px-4">
						<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
							{[
								{ number: 10000, suffix: '+', label: 'Active Learners' },
								{ number: 50, suffix: '+', label: 'Languages' },
								{ number: 98, suffix: '%', label: 'Success Rate' },
								{ number: 24, suffix: '/7', label: 'AI Support' },
							].map((stat, index) => (
								<div key={index} className="text-center group cursor-default">
									<div className="text-3xl md:text-5xl font-bold text-white mb-2 group-hover:text-zinc-400 transition-colors">
										<AnimatedCounter end={stat.number} />{stat.suffix}
									</div>
									<div className="text-sm text-zinc-500 uppercase tracking-widest font-medium">{stat.label}</div>
								</div>
							))}
						</div>
					</div>
				</section >

				{/* Text Reveal Section */}
				< div className="pt-20 pb-0" >
					<TextReveal text="Learning a new language shouldn't be boring. It should be an adventure." />
				</div >

				{/* Features Grid */}
				< section className="relative z-10 pt-10 pb-32 container mx-auto px-4" >
					<div className="text-center mb-24">
						<h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
							Supercharge Your <span className="text-zinc-400">Brain</span>
						</h2>
						<p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light">
							Our advanced features are designed to help you learn faster, remember longer, and speak with confidence.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[
							{
								icon: FiBook,
								title: 'Adaptive AI Curriculum',
								description: 'Lessons that evolve with you. Our AI analyzes your progress and adjusts the difficulty in real-time.',
								color: '#ffffff',
							},
							{
								icon: FiMic,
								title: 'Voice Recognition',
								description: 'Perfect your accent with our military-grade speech recognition technology. Get instant feedback.',
								color: '#d4d4d8',
							},
							{
								icon: FiUsers,
								title: 'Global Community',
								description: 'Connect with native speakers and fellow learners. Join clubs, compete in leagues, and make friends.',
								color: '#a1a1aa',
							},
							{
								icon: FiZap,
								title: 'Spaced Repetition',
								description: 'Never forget a word. Our smart algorithm schedules reviews at the perfect moment for long-term retention.',
								color: '#e4e4e7',
							},
							{
								icon: FiGlobe,
								title: 'Real-world Context',
								description: 'Learn from news articles, music videos, and movie clips. Understand language as it\'s actually used.',
								color: '#f4f4f5',
							},
							{
								icon: FiShield,
								title: 'Gamified Progress',
								description: 'Earn XP, unlock badges, and climb the leaderboards. Making learning addictive in the best way.',
								color: '#71717a',
							},
						].map((feature, index) => {
							const Icon = feature.icon;
							return (
								<SpotlightCard key={index} className="p-8 h-full glass-card" spotlightColor={feature.color}>
									<div className="relative z-10 h-full flex flex-col">
										<div
											className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-2xl text-white shadow-lg ring-1 ring-white/10"
											style={{ background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}40)` }}
										>
											<Icon />
										</div>
										<h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
										<p className="text-zinc-400 leading-relaxed flex-grow font-light">{feature.description}</p>
									</div>
								</SpotlightCard>
							)
						})}
					</div>
				</section >

				{/* Testimonials Marquee */}
				< section className="relative z-10 py-20 overflow-hidden bg-white/5 backdrop-blur-sm border-y border-white/5" >
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
							Loved by <span className="text-zinc-400">Millions</span>
						</h2>
					</div>
					<InfiniteMarquee items={testimonials} direction="right" speed="slow" />
					<div className="h-10" />
					<InfiniteMarquee items={testimonials} direction="left" speed="slow" />
				</section >

				{/* FAQ Section */}
				< section className="relative z-10 py-32 container mx-auto px-4" >
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
							Frequently Asked Questions
						</h2>
						<p className="text-xl text-zinc-400 font-light">Everything you need to know about LinguaQuest.</p>
					</div>
					<div className="max-w-3xl mx-auto">
						<Accordion items={faqs} />
					</div>
				</section >

				{/* Final CTA */}
				{
					!isAuthenticated && (
						<section className="relative z-10 pb-32 pt-10 container mx-auto px-4">
							<div className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-24 text-center border border-white/10">
								<div className="absolute inset-0 bg-gradient-to-br from-zinc-900/50 via-background to-black/50 backdrop-blur-xl" />
								<div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
								<div className="absolute -top-1/2 -right-1/2 w-full h-full bg-white/5 blur-[120px] rounded-full" />

								<div className="relative z-10">
									<h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
										Start Your Journey Today
									</h2>
									<p className="text-xl text-zinc-300 mb-12 max-w-2xl mx-auto font-light">
										Join the fastest growing language learning community. No credit card required for the free tier.
									</p>
									<Link href="/auth">
										<button className="px-12 py-5 bg-white text-black font-bold text-xl rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.7)]">
											Get Started for Free
										</button>
									</Link>
								</div>
							</div>
						</section>
					)
				}

				{/* Footer */}
				<footer className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-md pt-20 pb-10">
					<div className="container mx-auto px-4">
						<div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
							<div className="col-span-1 md:col-span-2">
								<div className="mb-6">
									<Logo />
								</div>
								<p className="text-zinc-400 max-w-md mb-8 font-light leading-relaxed">
									Making language learning accessible, engaging, and effective for everyone through the power of AI and gamification.
								</p>
								<div className="flex gap-4">
									<div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:scale-110 cursor-pointer transition-all">
										<FaTwitter />
									</div>
									<div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:scale-110 cursor-pointer transition-all">
										<FaGithub />
									</div>
									<div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:scale-110 cursor-pointer transition-all">
										<FaDiscord />
									</div>
								</div>
							</div>
							<div>
								<h4 className="text-lg font-bold text-white mb-6">Platform</h4>
								<ul className="space-y-4 text-zinc-400 font-light">
									<li className="hover:text-white cursor-pointer transition-colors">Courses</li>
									<li className="hover:text-white cursor-pointer transition-colors">Tutors</li>
									<li className="hover:text-white cursor-pointer transition-colors">Pricing</li>
									<li className="hover:text-white cursor-pointer transition-colors">For Schools</li>
								</ul>
							</div>
							<div>
								<h4 className="text-lg font-bold text-white mb-6">Company</h4>
								<ul className="space-y-4 text-zinc-400 font-light">
									<li className="hover:text-white cursor-pointer transition-colors">About Us</li>
									<li className="hover:text-white cursor-pointer transition-colors">Careers</li>
									<li className="hover:text-white cursor-pointer transition-colors">Blog</li>
									<li className="hover:text-white cursor-pointer transition-colors">Contact</li>
								</ul>
							</div>
						</div>
						<div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500 font-light">
							<p>© 2024 LinguaQuest. All rights reserved.</p>
							<div className="flex gap-8">
								<span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
								<span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
							</div>
						</div>
					</div>
				</footer>
			</div >
		</Layout >
	)
}
