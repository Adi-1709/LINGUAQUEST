'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface TextRevealProps {
	text: string;
	className?: string;
}

const TextReveal: React.FC<TextRevealProps> = ({ text, className = "" }) => {
	const targetRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ["start end", "end start"],
	});

	const words = text.split(" ");

	return (
		<div ref={targetRef} className={`relative z-0 h-[40vh] ${className}`}>
			<div className="sticky top-0 flex h-[20vh] items-center justify-center bg-transparent">
				<p className="flex flex-wrap p-5 text-2xl font-bold text-white/20 md:text-4xl lg:text-5xl xl:text-6xl max-w-5xl mx-auto text-center leading-tight">
					{words.map((word, i) => {
						const start = (i / words.length) * 0.5; // Finish at 50% of scroll
						const end = start + (1 / words.length) * 0.5;
						return (
							<Word key={i} progress={scrollYProgress} range={[start, end]}>
								{word}
							</Word>
						);
					})}
				</p>
			</div>
		</div>
	);
};

interface WordProps {
	children: React.ReactNode;
	progress: any;
	range: [number, number];
}

const Word: React.FC<WordProps> = ({ children, progress, range }) => {
	const opacity = useTransform(progress, range, [0, 1]);
	return (
		<span className="relative mx-1 lg:mx-2.5">
			<span className="absolute opacity-30">{children}</span>
			<motion.span style={{ opacity: opacity }} className="text-white">
				{children}
			</motion.span>
		</span>
	);
};

export default TextReveal;
