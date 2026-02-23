import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { MeshDistortMaterial } from "@react-three/drei";

const Contact3D = () => {
    const meshRef = useRef();
    const [hovered, setHover] = useState(false);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.012;
        }
    });

    return (
        <mesh
            ref={meshRef}
            scale={hovered ? 1.2 : 1}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <icosahedronGeometry args={[1.5, 0]} />
            <MeshDistortMaterial
                color={hovered ? "#eec0c6" : "#7d4150"}
                speed={5}
                distort={0.5}
                wireframe={!hovered}
            />
        </mesh>
    );
};
export default Contact3D;
