'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type Badge = { id: string;[key: string]: unknown }

type User = {
	id?: string
	name?: string
	email?: string
	xp?: number
	coins?: number
	level?: number
	streak?: number
	badges?: Badge[]
	currentLanguage?: string
	nativeLanguage?: string
	// Allow extra fields without losing type safety
	[key: string]: unknown
} | null

type AppContextValue = {
	user: User
	xp: number
	coins: number
	level: number
	streak: number
	badges: Badge[]
	currentLanguage: string
	nativeLanguage: string
	isAuthenticated: boolean
	setCurrentLanguage: (lang: string) => void
	setNativeLanguage: (lang: string) => void
	addXp: (amount: number) => void
	addCoins: (amount: number) => void
	spendCoins: (amount: number) => boolean
	addStreak: () => void
	resetStreak: () => void
	addBadge: (badge: Badge) => void
	login: (userData: NonNullable<User>) => void
	logout: () => void
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User>(null)
	const [xp, setXp] = useState<number>(0)
	const [coins, setCoins] = useState<number>(100)
	const [level, setLevel] = useState<number>(1)
	const [streak, setStreak] = useState<number>(0)
	const [badges, setBadges] = useState<Badge[]>([])
	const [currentLanguage, setCurrentLanguage] = useState<string>('Spanish')
	const [nativeLanguage, setNativeLanguage] = useState<string>('English')
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

	// Load user data from localStorage on mount
	useEffect(() => {
		const savedUser = typeof window !== 'undefined' ? localStorage.getItem('linguaquest_user') : null
		if (savedUser) {
			const userData = JSON.parse(savedUser) as NonNullable<User>
			setUser(userData)
			setXp(userData.xp || 0)
			setCoins(userData.coins || 100)
			setLevel(userData.level || 1)
			setStreak(userData.streak || 0)
			setBadges((userData.badges as Badge[]) || [])
			setCurrentLanguage((userData.currentLanguage as string) || 'Spanish')
			setNativeLanguage('English') // Enforce English as default
			setIsAuthenticated(true)
		}
	}, [])

	// Save user data to localStorage whenever it changes
	useEffect(() => {
		if (user) {
			const userData = {
				...user,
				xp,
				coins,
				level,
				streak,
				badges,
				currentLanguage,
				nativeLanguage: 'English', // Always save as English
			}
			localStorage.setItem('linguaquest_user', JSON.stringify(userData))
		}
	}, [user, xp, coins, level, streak, badges, currentLanguage])

	const addXp = (amount: number) => {
		const newXp = xp + amount
		setXp(newXp)
		// Level up calculation (every 1000 XP = 1 level)
		const newLevel = Math.floor(newXp / 1000) + 1
		if (newLevel > level) {
			setLevel(newLevel)
			setCoins(coins + 50) // Bonus coins on level up
		}
	}

	const addCoins = (amount: number) => {
		setCoins(coins + amount)
	}

	const spendCoins = (amount: number) => {
		if (coins >= amount) {
			setCoins(coins - amount)
			return true
		}
		return false
	}

	const addStreak = () => {
		setStreak(streak + 1)
	}

	const resetStreak = () => {
		setStreak(0)
	}

	const addBadge = (badge: Badge) => {
		if (!badges.find(b => b.id === badge.id)) {
			setBadges([...badges, badge])
		}
	}

	const login = (userData: NonNullable<User>) => {
		setUser(userData)
		setIsAuthenticated(true)
		setXp(userData.xp || 0)
		setCoins(userData.coins || 100)
		setLevel(userData.level || 1)
		setStreak(userData.streak || 0)
		setBadges((userData.badges as Badge[]) || [])
		setCurrentLanguage((userData.currentLanguage as string) || 'Spanish')
		setNativeLanguage((userData.nativeLanguage as string) || 'English')
	}

	const logout = () => {
		setUser(null)
		setIsAuthenticated(false)
		localStorage.removeItem('linguaquest_user')
	}

	const value: AppContextValue = {
		user,
		xp,
		coins,
		level,
		streak,
		badges,
		currentLanguage,
		nativeLanguage,
		isAuthenticated,
		setCurrentLanguage,
		setNativeLanguage,
		addXp,
		addCoins,
		spendCoins,
		addStreak,
		resetStreak,
		addBadge,
		login,
		logout,
	}

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
	const context = useContext(AppContext)
	if (!context) {
		throw new Error('useApp must be used within AppProvider')
	}
	return context
}


