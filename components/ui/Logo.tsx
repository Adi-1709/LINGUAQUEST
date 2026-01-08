import { FiGlobe } from 'react-icons/fi'

export default function Logo({ className = '' }: { className?: string }) {
    return (
        <div className={`flex items-center gap-2 group ${className}`}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 overflow-hidden transition-all duration-300 group-hover:bg-white/10 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <FiGlobe className="w-5 h-5 text-white/90 transition-transform duration-500 group-hover:rotate-180" />
            </div>
            <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white leading-none">
                    Lingua<span className="text-white/50">Quest</span>
                </span>
            </div>
        </div>
    )
}
