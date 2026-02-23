import { Float, Points, PointMaterial } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as random from "maath/random/dist/maath-random.esm";
import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Hero3D = () => {
    const { viewport } = useThree();
    const isMobile = viewport.width < 5;


    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));
    const ref = useRef();

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]} position={[isMobile ? 0 : 3, isMobile ? -1 : 0, 0]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} >
                <PointMaterial
                    transparent
                    color="#f272c8"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

export default Hero3D;
