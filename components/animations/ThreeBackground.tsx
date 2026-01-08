'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function StarField(props: any) {
    const ref = useRef<any>()

    const sphere = useMemo(() => {
        const count = 6000
        const temp = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            const r = 1.2 * Math.cbrt(Math.random())
            const theta = Math.random() * 2 * Math.PI
            const phi = Math.acos(2 * Math.random() - 1)
            const x = r * Math.sin(phi) * Math.cos(theta)
            const y = r * Math.sin(phi) * Math.sin(theta)
            const z = r * Math.cos(phi)
            temp[i * 3] = x
            temp[i * 3 + 1] = y
            temp[i * 3 + 2] = z
        }
        return temp
    }, [])

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 15
            ref.current.rotation.y -= delta / 20
        }
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>
        </group>
    )
}

export default function ThreeBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none bg-black">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <StarField />
            </Canvas>
        </div>
    )
}
