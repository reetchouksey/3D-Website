import { OrbitControls, Environment, useScroll } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Hero3D from "./Hero3D";
import Skills3D from "./Skills3D";
import Projects3D from "./Projects3D";
import Contact3D from "./Contact3D";

const Experience = () => {
    const scroll = useScroll();
    const { viewport } = useThree();

    useFrame((state, delta) => {

        const scrollOffset = scroll.offset;

        state.camera.position.y = -scrollOffset * viewport.height * 3;
    });

    return (
        <>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />


            <group>

                <group position-y={0}>
                    <Hero3D />
                </group>


                <group position-y={-viewport.height}>
                    <Skills3D />
                </group>


                <group position-y={-viewport.height * 2}>
                    <Projects3D />
                </group>


                <group position-y={-viewport.height * 3}>
                    <Contact3D />
                </group>
            </group>

            <Environment preset="city" />

            <EffectComposer disableNormalPass>
                <Bloom luminanceThreshold={1} mipmapBlur intensity={0.5} />
            </EffectComposer>
        </>
    );
};


export default Experience;
