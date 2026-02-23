
import BallCanvas from "../components/canvas/Ball";
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
    //   mongodb,
    git,
    figma,
    docker,
    //   meta,
    //   starbucks,
    //   tesla,
    //   shopify,
    //   carrent,
    //   jobit,
    //   tripguide,
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

const Tech = () => {
    return (
        <div className="flex flex-wrap justify-center gap-10">
            {technologies.map((technology) => (
                <div className="w-28 h-28" key={technology.name}>
                    <BallCanvas icon={technology.icon} />
                    <p className="text-center text-secondary text-sm mt-2">{technology.name}</p>
                </div>
            ))}
        </div>
    );
};

export default SectionWrapperHOC(Tech, "");
