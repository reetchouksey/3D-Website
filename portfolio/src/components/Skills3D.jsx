import { Float, Box, Sphere } from "@react-three/drei";

const Skills3D = () => {
    return (
        <group position={[-2, 0, 0]}>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>

                <Box position={[-1, 1, 0]} args={[1, 1, 1]}>
                    <meshStandardMaterial color="#eec0c6" />
                </Box>
                <Sphere position={[1, -1, 0]} args={[0.5, 32, 32]}>
                    <meshStandardMaterial color="hotpink" />
                </Sphere>
                <mesh position={[2, 1, -1]}>
                    <icosahedronGeometry args={[0.8, 0]} />
                    <meshStandardMaterial color="lightblue" />
                </mesh>
            </Float>
        </group>
    );
};

export default Skills3D;
