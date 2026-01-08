'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useApp } from '@/contexts/AppContext'
import {
	FiHome,
	FiBook,
	FiMessageSquare,
	FiUser,
	FiSettings,
	FiLogOut,
	FiLogIn,
} from 'react-icons/fi'
import { FaFire, FaCoins, FaTrophy } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import Logo from './ui/Logo'

export default function Header() {
	const { isAuthenticated, coins, level, streak, logout, nativeLanguage, setNativeLanguage } = useApp()
	const [scrolled, setScrolled] = useState(false)
	const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<motion.header
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
			className="glass border-b border-white/10 sticky top-0 z-50"
			style={{
				backgroundColor: scrolled
					? 'rgba(15, 23, 42, 0.95)'
					: 'rgba(15, 23, 42, 0.8)',
			}}
		>
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					<Link href="/" className="block">
						<Logo />
					</Link>

					{isAuthenticated ? (
						<>
							<nav className="hidden md:flex items-center space-x-2">
								{[
									{ href: '/dashboard', icon: FiHome, label: 'Dashboard' },
									{ href: '/lessons', icon: FiBook, label: 'Lessons' },
									{ href: '/community', icon: FiMessageSquare, label: 'Community' },
									{ href: '/profile', icon: FiUser, label: 'Profile' },
									{ href: '/settings', icon: FiSettings, label: 'Settings' },
								].map(item => {
									const Icon = item.icon
									return (
										<Link
											key={item.href}
											href={item.href}
											className="group flex items-center space-x-1 px-4 py-2 rounded-xl hover:bg-white/5 transition-all text-sm relative overflow-hidden"
										>
											<div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
											<Icon className="relative inline mr-1.5 group-hover:scale-110 transition-transform" />
											<span className="relative">{item.label}</span>
										</Link>
									)
								})}
							</nav>

							<div className="flex items-center space-x-3">
								<div className="flex items-center space-x-2 glass-light px-4 py-2 rounded-full border border-white/10 hover:border-orange-400/50 transition-all group">
									<FaFire className="text-orange-400 group-hover:scale-110 transition-transform" />
									<span className="font-bold text-sm">{streak}</span>
								</div>
								<div className="flex items-center space-x-2 glass-light px-4 py-2 rounded-full border border-white/10 hover:border-yellow-400/50 transition-all group">
									<FaCoins className="text-yellow-400 group-hover:scale-110 transition-transform" />
									<span className="font-bold text-sm">{coins}</span>
								</div>
								<div className="flex items-center space-x-2 glass-light px-4 py-2 rounded-full border border-white/10 hover:border-purple-400/50 transition-all group">
									<FaTrophy className="text-purple-400 group-hover:scale-110 transition-transform" />
									<span className="font-bold text-sm">Lv.{level}</span>
								</div>
								{/* Language selection removed as per request - English default */}
								<div className="hidden">
									<span className="text-xl">🇺🇸</span>
									<span className="font-bold text-sm uppercase hidden sm:inline">EN</span>
								</div>
								<button
									onClick={logout}
									className="relative px-4 py-2 rounded-xl bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 transition-all border border-red-500/30 hover:border-red-400/50 cursor-pointer text-sm font-semibold overflow-hidden group"
								>
									<div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
									<FiLogOut className="relative inline mr-1.5 group-hover:rotate-12 transition-transform" />
									<span className="relative">Logout</span>
								</button>
							</div>
						</>
					) : (
						<Link href="/auth">
							<button className="relative px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all cursor-pointer overflow-hidden group">
								<div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
								<span className="relative flex items-center">
									<FiLogIn className="inline mr-1.5 group-hover:translate-x-1 transition-transform" />
									Login
								</span>
							</button>
						</Link>
					)}
				</div>
			</div>
		</motion.header>
	)
}


