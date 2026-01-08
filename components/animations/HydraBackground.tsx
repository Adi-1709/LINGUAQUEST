'use client'

import { useEffect, useRef } from 'react'

export default function HydraBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        let hydra: any = null

        const initHydra = async () => {
            if (typeof window !== 'undefined' && canvasRef.current) {
                const Hydra = (await import('hydra-synth')).default

                hydra = new Hydra({
                    canvas: canvasRef.current,
                    detectAudio: false,
                    enableStreamCapture: false,
                    width: window.innerWidth,
                    height: window.innerHeight,
                })

                // Professional Monochrome/Tech Effect
                // @ts-ignore
                const { osc, o0, mouse } = window as any

                osc(20, 0.01, 1.1)
                    .kaleid(5)
                    .color(0.5, 0.5, 0.5)
                    .rotate(0, 0.1)
                    .modulate(o0, () => mouse.x * 0.0003)
                    .scale(1.01)
                    .saturate(0) // Keep it monochrome
                    .brightness(-0.1)
                    .contrast(1.2)
                    .out(o0)

                const handleResize = () => {
                    hydra.setResolution(window.innerWidth, window.innerHeight)
                }

                window.addEventListener('resize', handleResize)

                return () => {
                    window.removeEventListener('resize', handleResize)
                    if (hydra) {
                        hydra.hush()
                    }
                }
            }
        }

        initHydra()

        return () => {
            if (hydra) {
                hydra.hush()
            }
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full opacity-20 pointer-events-none z-0 mix-blend-screen"
            style={{ filter: 'grayscale(100%)' }}
        />
    )
}
