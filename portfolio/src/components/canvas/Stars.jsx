import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";

const Stars = (props) => {
    const ref = useRef();

    const [sphere] = useState(() => {
        const points = new Float32Array(5000);
        for (let i = 0; i < 5000; i++) {
            // Using Gaussian distribution for sphere volume
            const u = Math.random();
            const v = Math.random();
            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);
            const r = 1.2 * Math.cbrt(Math.random());

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            // Check for NaN and fallback
            points[i] = isNaN(x) ? 0 : x;
            points[i + 1] = isNaN(y) ? 0 : y;
            points[i + 2] = isNaN(z) ? 0 : z;
        }
        return points;
    });

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color='#f272c8'
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const StarsCanvas = () => {
    return (
        <div className="w-full h-auto absolute inset-0">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Suspense fallback={null}>
                    <Stars />
                </Suspense>
                <Preload all />
            </Canvas>
        </div>
    );
};

export default StarsCanvas;
