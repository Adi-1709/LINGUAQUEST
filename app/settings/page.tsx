'use client'

import { useState, useEffect, type ChangeEvent } from 'react'
import gsap from 'gsap'
import Layout from '@/components/Layout'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useApp } from '@/contexts/AppContext'
import { FiSave, FiSun, FiVolume2, FiBell } from 'react-icons/fi'
import toast from 'react-hot-toast'

type ThemeOption = 'light' | 'dark' | 'auto'

type SettingsState = {
	theme: ThemeOption
	notifications: boolean
	sound: boolean
	emailUpdates: boolean
	language: string
}

const languages = ['Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Japanese', 'Chinese', 'Korean']

export default function SettingsPage() {
	const { currentLanguage, setCurrentLanguage, user, isAuthenticated } = useApp()
	const [settings, setSettings] = useState<SettingsState>({
		theme: 'auto',
		notifications: true,
		sound: true,
		emailUpdates: true,
		language: currentLanguage,
	})

	const updateSetting = <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
		setSettings(prev => ({ ...prev, [key]: value }))
	}

	const handleSave = () => {
		setCurrentLanguage(settings.language)
		toast.success('Settings saved!')
	}

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from('.settings-card', {
				y: 30,
				opacity: 0,
				duration: 0.8,
				stagger: 0.15,
				ease: 'power3.out',
				delay: 0.2
			})
		})
		return () => ctx.revert()
	}, [])

	if (!isAuthenticated) {
		return (
			<Layout>
				<div className="container mx-auto px-4 py-20 text-center">
					<h1 className="text-3xl font-bold mb-4 text-white">Please log in to access settings</h1>
				</div>
			</Layout>
		)
	}

	return (
		<Layout>
			<div className="min-h-screen bg-black selection:bg-white/20 selection:text-white">
				{/* Background handled by Layout */}

				<div className="relative z-10 container mx-auto px-4 py-10">
					<div className="max-w-3xl">
						<h1 className="text-4xl font-black mb-2 text-white tracking-tight">
							Account Settings
						</h1>
						<p className="text-zinc-400 mb-10 font-light">Tune LinguaQuest to match your learning style and preferences.</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						<div className="lg:col-span-2 space-y-6">
							<div className="settings-card">
								<Card variant="dark" className="bg-zinc-900/30 border-white/10 backdrop-blur-md">
									<h2 className="text-2xl font-bold mb-4 text-white">Learning Language</h2>
									<div className="flex flex-col gap-4">
										<label className="block text-sm font-medium text-zinc-400" htmlFor="language-select">
											Select your primary language
										</label>
										<select
											id="language-select"
											value={settings.language}
											onChange={(event: ChangeEvent<HTMLSelectElement>) => updateSetting('language', event.target.value)}
											className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:border-transparent text-white transition-all outline-none"
										>
											{languages.map(language => (
												<option key={language} value={language} className="bg-zinc-900 text-white">
													{language}
												</option>
											))}
										</select>
									</div>
								</Card>
							</div>

							<div className="settings-card">
								<Card variant="dark" className="bg-zinc-900/30 border-white/10 backdrop-blur-md">
									<h2 className="text-2xl font-bold mb-4 text-white">Appearance</h2>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<FiSun className="text-zinc-400" />
											<div>
												<p className="font-semibold text-white">Theme</p>
												<p className="text-sm text-zinc-500">Choose your preferred interface style</p>
											</div>
										</div>
										<select
											value={settings.theme}
											onChange={(event: ChangeEvent<HTMLSelectElement>) =>
												updateSetting('theme', event.target.value as ThemeOption)
											}
											className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 text-white outline-none"
										>
											<option value="light" className="bg-zinc-900">Light</option>
											<option value="dark" className="bg-zinc-900">Dark</option>
											<option value="auto" className="bg-zinc-900">Auto</option>
										</select>
									</div>
								</Card>
							</div>

							<div className="settings-card">
								<Card variant="dark" className="bg-zinc-900/30 border-white/10 backdrop-blur-md">
									<h2 className="text-2xl font-bold mb-4 text-white">Notifications</h2>
									<div className="space-y-4">
										<PreferenceToggle
											icon={<FiBell className="text-zinc-400" />}
											title="Push Notifications"
											description="Daily challenges, streak reminders, and leaderboard updates."
											checked={settings.notifications}
											onChange={checked => updateSetting('notifications', checked)}
										/>
										<PreferenceToggle
											icon={<FiVolume2 className="text-zinc-400" />}
											title="Sound Effects"
											description="Play celebratory sounds after achievements."
											checked={settings.sound}
											onChange={checked => updateSetting('sound', checked)}
										/>
										<PreferenceToggle
											icon={null}
											title="Email Updates"
											description="Receive weekly progress digests and new feature announcements."
											checked={settings.emailUpdates}
											onChange={checked => updateSetting('emailUpdates', checked)}
										/>
									</div>
								</Card>
							</div>

							<div className="settings-card">
								<Card variant="dark" className="bg-zinc-900/30 border-white/10 backdrop-blur-md">
									<h2 className="text-2xl font-bold mb-4 text-white">Account</h2>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-sm font-medium text-zinc-400 mb-1" htmlFor="email">
												Email
											</label>
											<input
												id="email"
												type="email"
												value={(user?.email as string) || ''}
												readOnly
												className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-zinc-500 cursor-not-allowed"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-zinc-400 mb-1" htmlFor="username">
												Username
											</label>
											<input
												id="username"
												type="text"
												value={(user?.username as string) || ''}
												readOnly
												className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-zinc-500 cursor-not-allowed"
											/>
										</div>
									</div>
								</Card>
							</div>

							<div className="settings-card">
								<Button onClick={handleSave} size="lg" className="w-full bg-white text-black hover:bg-zinc-200 font-bold">
									<FiSave className="inline mr-2" />
									Save Settings
								</Button>
							</div>
						</div>

						<div className="space-y-6">
							<div className="settings-card">
								<Card variant="dark" className="bg-zinc-900/30 border-white/10 backdrop-blur-md">
									<h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
									<div className="space-y-3">
										{['Change Password', 'Privacy Settings', 'Data & Storage', 'Help & Support'].map(link => (
											<Button key={link} variant="outline" className="w-full justify-start border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 hover:border-white/20">
												{link}
											</Button>
										))}
									</div>
								</Card>
							</div>

							<div className="settings-card">
								<Card variant="dark" className="bg-red-500/5 border border-red-500/20 shadow-lg">
									<h3 className="text-xl font-bold mb-4 text-red-400">Danger Zone</h3>
									<p className="text-sm text-red-400/80 mb-3 font-light">
										Deleting your account will permanently remove your progress and badges.
									</p>
									<Button variant="danger" className="w-full bg-red-500/10 text-red-400 border border-red-500/50 hover:bg-red-500 hover:text-white transition-all">
										Delete Account
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

type PreferenceToggleProps = {
	icon: JSX.Element | null
	title: string
	description: string
	checked: boolean
	onChange: (checked: boolean) => void
}

function PreferenceToggle({ icon, title, description, checked, onChange }: PreferenceToggleProps) {
	return (
		<div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
			<div className="flex items-center gap-3">
				{icon && <div>{icon}</div>}
				<div>
					<p className="font-semibold text-white">{title}</p>
					<p className="text-sm text-zinc-500">{description}</p>
				</div>
			</div>
			<label className="relative inline-flex items-center cursor-pointer">
				<input
					type="checkbox"
					checked={checked}
					onChange={event => onChange(event.target.checked)}
					className="sr-only peer"
				/>
				<div className="relative w-12 h-6 bg-zinc-800 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-white/20 rounded-full peer peer-checked:bg-white transition-colors border border-white/10">
					<span className="absolute top-[2px] left-[2px] h-5 w-5 rounded-full bg-zinc-400 shadow transition-transform peer-checked:translate-x-6 peer-checked:bg-black" />
				</div>
			</label>
		</div>
	)
}


