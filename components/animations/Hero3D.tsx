'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars, Trail } from '@react-three/drei'
import * as THREE from 'three'

function FloatingShape({ position, color, speed }: { position: [number, number, number], color: string, speed: number }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01 * speed
            meshRef.current.rotation.y += 0.015 * speed
            // Subtle floating movement handled by Float component, but we can add more specific logic here if needed
        }
    })

    return (
        <Float speed={speed} rotationIntensity={1} floatIntensity={2}>
            <mesh ref={meshRef} position={position}>
                <icosahedronGeometry args={[1, 0]} />
                <meshStandardMaterial
                    color={color}
                    wireframe
                    transparent
                    opacity={0.3}
                    roughness={0}
                    metalness={1}
                />
            </mesh>
        </Float>
    )
}

function Scene() {
    const shapes = useMemo(() => {
        return Array.from({ length: 15 }).map((_, i) => ({
            position: [
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            ] as [number, number, number],
            color: i % 2 === 0 ? '#ffffff' : '#a1a1aa', // White and Zinc
            speed: Math.random() * 2 + 1
        }))
    }, [])

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            {shapes.map((shape, i) => (
                <FloatingShape key={i} {...shape} />
            ))}
        </>
    )
}

export default function Hero3D() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
                <Scene />
            </Canvas>
        </div>
    )
}
