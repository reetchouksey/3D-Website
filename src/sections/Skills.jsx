const Skills = () => {
    return (
        <section className="w-screen h-screen flex flex-col items-end justify-center p-10 pointer-events-none">
            <h2 className="text-8xl font-bold text-gray-800 pointer-events-auto">SKILLS</h2>
            <ul className="text-4xl text-right mt-8 space-y-4 pointer-events-auto">
                <li>React / Three.js</li>
                <li>GSAP / Framer Motion</li>
                <li>WebGL / GLSL</li>
                <li>Tailwind CSS</li>
            </ul>
        </section>
    );
};

export default Skills;
