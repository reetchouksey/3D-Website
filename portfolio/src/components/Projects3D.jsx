import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

const Projects3D = () => {
    const group = useRef();

    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y += 0.005;
        }
    });

    return (
        <group ref={group} position={[0, 0, 0]}>

            <mesh position={[-2.5, 0, 1.5]} rotation={[0, 0.5, 0]}>
                <boxGeometry args={[2.5, 1.8, 0.1]} />
                <meshStandardMaterial color="#ffaa00" />
            </mesh>

            <mesh position={[2.5, 0, 1.5]} rotation={[0, -0.5, 0]}>
                <boxGeometry args={[2.5, 1.8, 0.1]} />
                <meshStandardMaterial color="#00aaff" />
            </mesh>

            <mesh position={[0, 0, -2.5]}>
                <boxGeometry args={[2.5, 1.8, 0.1]} />
                <meshStandardMaterial color="#ff00aa" />
            </mesh>
        </group>
    );
};
export default Projects3D;
