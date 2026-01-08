'use client'

import { useState, useEffect, type FormEvent } from 'react'
import gsap from 'gsap'
import { useRouter } from 'next/navigation'
import Layout from '@/components/Layout'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { useApp } from '@/contexts/AppContext'
import toast from 'react-hot-toast'

type AuthFormState = {
	email: string
	password: string
	username: string
	name: string
	contactNumber: string
}

export default function AuthPage() {
	const [isLogin, setIsLogin] = useState(true)
	const [formData, setFormData] = useState<AuthFormState>({
		email: '',
		password: '',
		username: '',
		name: '',
		contactNumber: '',
	})
	const router = useRouter()
	const { login } = useApp()

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (isLogin) {
			// Simulate login
			const user = {
				id: '1',
				email: formData.email,
				username: formData.email.split('@')[0],
				xp: 500,
				coins: 150,
				level: 1,
				streak: 3,
				badges: [],
				currentLanguage: 'Spanish',
			}
			login(user)
			toast.success('Welcome back!')
			// Small delay to ensure state update and toast visibility
			setTimeout(() => {
				router.push('/dashboard')
			}, 500)
		} else {
			// Simulate signup
			const user = {
				id: Date.now().toString(),
				email: formData.email,
				username: formData.username || formData.email.split('@')[0],
				name: formData.name,
				contactNumber: formData.contactNumber,
				xp: 0,
				coins: 100,
				level: 1,
				streak: 0,
				badges: [],
				currentLanguage: 'Spanish',
			}
			login(user)
			toast.success('Account created successfully!')
			setTimeout(() => {
				router.push('/dashboard')
			}, 500)
		}
	}

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from('.auth-card', {
				y: 30,
				opacity: 0,
				duration: 1,
				ease: 'power3.out'
			})
		})
		return () => ctx.revert()
	}, [])

	return (
		<Layout>
			<div className="min-h-screen flex items-center justify-center bg-black selection:bg-white/20 selection:text-white py-16 px-4">
				{/* Background handled by Layout */}

				<div className="auth-card w-full max-w-md relative z-10">
					<Card
						variant="dark"
						className="w-full bg-zinc-900/30 backdrop-blur-xl text-white shadow-2xl border border-white/10"
					>
						<div className="text-center mb-8">
							<h1 className="text-3xl font-bold text-white mb-2">
								{isLogin ? 'Welcome Back!' : 'Create Account'}
							</h1>
							<p className="text-zinc-400 font-light">
								{isLogin ? 'Sign in to continue your language journey' : 'Start your language learning adventure'}
							</p>
						</div>

						<form onSubmit={handleSubmit} className="space-y-4">
							{!isLogin && (
								<>
									<div>
										<label className="block text-sm font-medium text-zinc-400 mb-1" htmlFor="name">
											Full Name
										</label>
										<input
											id="name"
											type="text"
											required={!isLogin}
											value={formData.name}
											onChange={e => setFormData({ ...formData, name: e.target.value })}
											className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:border-transparent transition text-white placeholder:text-zinc-600 outline-none"
											placeholder="John Doe"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-zinc-400 mb-1" htmlFor="contactNumber">
											Contact Number
										</label>
										<input
											id="contactNumber"
											type="tel"
											required={!isLogin}
											value={formData.contactNumber}
											onChange={e => setFormData({ ...formData, contactNumber: e.target.value })}
											className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:border-transparent transition text-white placeholder:text-zinc-600 outline-none"
											placeholder="+1 234 567 8900"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-zinc-400 mb-1" htmlFor="username">
											Username
										</label>
										<input
											id="username"
											type="text"
											required={!isLogin}
											value={formData.username}
											onChange={e => setFormData({ ...formData, username: e.target.value })}
											className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:border-transparent transition text-white placeholder:text-zinc-600 outline-none"
											placeholder="Choose a username"
										/>
									</div>
								</>
							)}
							<div>
								<label className="block text-sm font-medium text-zinc-400 mb-1" htmlFor="email">
									Email
								</label>
								<input
									id="email"
									type="email"
									required
									value={formData.email}
									onChange={e => setFormData({ ...formData, email: e.target.value })}
									className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:border-transparent transition text-white placeholder:text-zinc-600 outline-none"
									placeholder="your@email.com"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-zinc-400 mb-1" htmlFor="password">
									Password
								</label>
								<input
									id="password"
									type="password"
									required
									value={formData.password}
									onChange={e => setFormData({ ...formData, password: e.target.value })}
									className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:border-transparent transition text-white placeholder:text-zinc-600 outline-none"
									placeholder="••••••••"
								/>
							</div>
							<Button type="submit" className="w-full bg-white text-black hover:bg-zinc-200 font-bold" size="lg">
								{isLogin ? 'Sign In' : 'Sign Up'}
							</Button>
						</form>

						<div className="mt-6 text-center">
							<button
								onClick={() => setIsLogin(!isLogin)}
								className="text-zinc-400 hover:text-white font-medium transition"
								type="button"
							>
								{isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
							</button>
						</div>
					</Card>
				</div>
			</div>
		</Layout>
	)
}


