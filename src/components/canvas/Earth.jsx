import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";

import { Points, PointMaterial } from "@react-three/drei";

const Earth = (props) => {
    // Custom points for Earth sphere
    const [sphere] = React.useState(() => {
        const points = new Float32Array(3000);
        for (let i = 0; i < 3000; i++) {
            const phi = Math.acos(-1 + (2 * i) / 3000);
            const theta = Math.sqrt(3000 * Math.PI) * phi;
            points[i * 3] = 1.2 * Math.cos(theta) * Math.sin(phi);
            points[i * 3 + 1] = 1.2 * Math.sin(theta) * Math.sin(phi);
            points[i * 3 + 2] = 1.2 * Math.cos(phi);
        }
        return points;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#915eff"
                    size={0.02}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const EarthCanvas = () => {
    return (
        <Canvas
            shadows
            frameloop='demand'
            dpr={[1, 2]}
            gl={{ preserveDrawingBuffer: true }}
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [-4, 3, 6],
            }}
        >
            <Suspense fallback={null}>
                <OrbitControls
                    autoRotate
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <Earth />

                <Preload all />
            </Suspense>
        </Canvas>
    );
};

export default EarthCanvas;
