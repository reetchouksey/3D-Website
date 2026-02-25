import { useState, useEffect } from "react";
import SectionWrapperHOC from "../hoc/SectionWrapper";

import {
    html,
    css,
    javascript,
    typescript,
    reactjs,
    redux,
    tailwind,
    nodejs,
    git,
    figma,
    docker,
    threejs,
} from "../assets";

const technologies = [
    { name: "HTML 5", icon: html },
    { name: "CSS 3", icon: css },
    { name: "JavaScript", icon: javascript },
    { name: "TypeScript", icon: typescript },
    { name: "React JS", icon: reactjs },
    { name: "Redux Toolkit", icon: redux },
    { name: "Tailwind CSS", icon: tailwind },
    { name: "Node JS", icon: nodejs },
    { name: "Three JS", icon: threejs },
    { name: "git", icon: git },
    { name: "figma", icon: figma },
    { name: "docker", icon: docker },
];

const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || "");

const Tech = () => {
    const [mobile, setMobile] = useState(true); // default to mobile-safe
    const [BallCanvas, setBallCanvas] = useState(null);

    useEffect(() => {
        const m = isMobile();
        setMobile(m);
        if (!m) {
            import("../components/canvas/Ball").then((mod) => {
                setBallCanvas(() => mod.default);
            });
        }
    }, []);

    return (
        <div className="flex flex-row flex-wrap justify-center gap-10 pb-10 sm:pb-0">
            {technologies.map((technology) => (
                <div className="w-28 h-28 flex-shrink-0 flex flex-col items-center justify-center" key={technology.name}>
                    {!mobile && BallCanvas ? (
                        <BallCanvas icon={technology.icon} />
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-tertiary flex items-center justify-center p-3 border border-white/10">
                            <img src={technology.icon} alt={technology.name} className="w-full h-full object-contain" />
                        </div>
                    )}
                    <p className="text-center text-secondary text-sm mt-2">{technology.name}</p>
                </div>
            ))}
        </div>
    );
};

export default SectionWrapperHOC(Tech, "");
