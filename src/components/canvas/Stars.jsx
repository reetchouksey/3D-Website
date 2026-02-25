import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import * as THREE from "three";

/* ─────────────────────────────────────────────
   GLSL shaders — per-star twinkle + soft glow
───────────────────────────────────────────── */
const vertexShader = `
  attribute float aSize;
  attribute float aPhase;
  uniform float uTime;
  varying float vAlpha;

  void main() {
    float twinkle = 0.5 + 0.5 * sin(uTime * 1.8 + aPhase * 6.2831);
    vAlpha = twinkle;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * twinkle * (350.0 / -mvPosition.z);
    gl_Position  = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying float vAlpha;
  uniform vec3 uColor;

  void main() {
    vec2  uv   = gl_PointCoord - 0.5;
    float d    = length(uv);
    if (d > 0.5) discard;

    float glow = smoothstep(0.5, 0.0, d);        // soft corona
    float core = smoothstep(0.10, 0.0, d);        // hard bright core

    gl_FragColor = vec4(uColor, (glow * 0.55 + core * 0.45) * vAlpha);
  }
`;

/* ─────────────────────────────────────────────
   Full-screen star cloud (box distribution so
   stars fill every corner of the viewport)
───────────────────────────────────────────── */
function StarCloud({ count, color, sizeRange, depth, rotSpeed }) {
    const mesh = useRef();
    const matRef = useRef();

    const { positions, sizes, phases } = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const sz = new Float32Array(count);
        const ph = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            // BOX distribution — fills the entire visible sky uniformly
            pos[i * 3] = (Math.random() - 0.5) * depth[0]; // x
            pos[i * 3 + 1] = (Math.random() - 0.5) * depth[1]; // y
            pos[i * 3 + 2] = (Math.random() - 0.5) * depth[2]; // z

            sz[i] = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);
            ph[i] = Math.random();
        }
        return { positions: pos, sizes: sz, phases: ph };
    }, [count, depth, sizeRange]);

    const geometry = useMemo(() => {
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        g.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
        g.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
        return g;
    }, [positions, sizes, phases]);

    const material = useMemo(() => {
        const m = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uColor: { value: new THREE.Color(color) },
            },
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });
        matRef.current = m;
        return m;
    }, [color]);

    useFrame(({ clock }) => {
        if (matRef.current) matRef.current.uniforms.uTime.value = clock.elapsedTime;
        if (mesh.current) {
            mesh.current.rotation.y += rotSpeed[0];
            mesh.current.rotation.x += rotSpeed[1];
        }
    });

    return <points ref={mesh} geometry={geometry} material={material} />;
}

/* ─────────────────────────────────────────────
   Scene
───────────────────────────────────────────── */
function Starfield() {
    return (
        <>
            {/* Small distant stars — fills entire background */}
            <StarCloud
                count={4500}
                color="#ffffff"
                sizeRange={[0.6, 1.6]}
                depth={[20, 20, 20]}
                rotSpeed={[0.00007, 0.00004]}
            />
            {/* Cool blue-white mid stars */}
            <StarCloud
                count={1500}
                color="#c8dcff"
                sizeRange={[0.9, 2.2]}
                depth={[18, 18, 18]}
                rotSpeed={[-0.00010, 0.00006]}
            />
            {/* Warm gold accent stars */}
            <StarCloud
                count={500}
                color="#ffe9a0"
                sizeRange={[1.5, 3.5]}
                depth={[15, 15, 15]}
                rotSpeed={[0.00012, -0.00008]}
            />
            {/* Purple theme accent stars */}
            <StarCloud
                count={300}
                color="#c084fc"
                sizeRange={[1.2, 3.0]}
                depth={[16, 16, 16]}
                rotSpeed={[-0.00008, 0.00010]}
            />
            {/* Rare big sparkle stars */}
            <StarCloud
                count={60}
                color="#ffffff"
                sizeRange={[4.0, 8.0]}
                depth={[14, 14, 14]}
                rotSpeed={[0.00005, 0.00005]}
            />
        </>
    );
}

/* ─────────────────────────────────────────────
   Canvas — full viewport, camera inside the box
───────────────────────────────────────────── */
const StarsCanvas = () => (
    <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <Canvas
            camera={{ position: [0, 0, 1], fov: 60, near: 0.1, far: 50 }}
            gl={{ antialias: false, alpha: true }}
            style={{ width: "100%", height: "100%" }}
        >
            <Starfield />
            <Preload all />
        </Canvas>
    </div>
);

export default StarsCanvas;
