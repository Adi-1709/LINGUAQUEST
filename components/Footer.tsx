'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiGithub, FiTwitter, FiInstagram, FiMail } from 'react-icons/fi'
import Logo from './ui/Logo'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    const socialLinks = [
        { icon: FiGithub, href: 'https://github.com', label: 'GitHub' },
        { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
        { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
        { icon: FiMail, href: 'mailto:contact@linguaquest.com', label: 'Email' },
    ]

    const footerLinks = [
        { label: 'About', href: '/about' },
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
        { label: 'Contact', href: '/contact' },
    ]

    return (
        <footer className="relative border-t border-white/10 bg-black/50 backdrop-blur-xl mt-auto">
            {/* Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="md:col-span-2 space-y-4">
                        <Logo />
                        <p className="text-white/50 text-sm max-w-sm">
                            Master new languages through immersive quests, real-time feedback, and a supportive community. Your journey to fluency starts here.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {footerLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-white/50 hover:text-white transition-colors text-sm flex items-center group"
                                    >
                                        <span className="w-0 group-hover:w-2 h-px bg-indigo-500 mr-0 group-hover:mr-2 transition-all duration-300" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Connect</h3>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => {
                                const Icon = social.icon
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-300 group"
                                        aria-label={social.label}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/30">
                    <p>© {currentYear} LinguaQuest. All rights reserved.</p>
                    <p className="flex gap-4">
                        <span>Made with ❤️ by LinguaQuest Team</span>
                    </p>
                </div>
            </div>
        </footer>
    )
}
