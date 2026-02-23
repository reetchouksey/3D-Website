import React from "react";
import { motion } from "framer-motion";


import { styles } from "../styles";

import SectionWrapper from "../hoc/SectionWrapper";
import { textVariant, fadeIn } from "../utils/motion";

const experiences = [
    {
        title: "React.js Developer",
        company_name: "Starbucks",
        icon: "☕",
        iconBg: "#383E56",
        date: "March 2020 - April 2021",
        points: [
            "Developing and maintaining web applications using React.js and other related technologies.",
            "Collaborating with cross-functional teams including designers, product managers, and other developers.",
            "Implementing responsive design and ensuring cross-browser compatibility.",
        ],
    },
    {
        title: "React Native Developer",
        company_name: "Tesla",
        icon: "🚗",
        iconBg: "#E6DEDD",
        date: "Jan 2021 - Feb 2022",
        points: [
            "Developing and maintaining web applications using React.js and other related technologies.",
            "Collaborating with cross-functional teams including designers, product managers, and other developers.",
            "Implementing responsive design and ensuring cross-browser compatibility.",
        ],
    },
    {
        title: "Web Developer",
        company_name: "Shopify",
        icon: "🛍️",
        iconBg: "#383E56",
        date: "Jan 2022 - Jan 2023",
        points: [
            "Developing and maintaining web applications using React.js and other related technologies.",
            "Collaborating with cross-functional teams including designers, product managers, and other developers.",
            "Implementing responsive design and ensuring cross-browser compatibility.",
        ],
    },
    {
        title: "Full Stack Developer",
        company_name: "Meta",
        icon: "♾️",
        iconBg: "#E6DEDD",
        date: "Jan 2023 - Present",
        points: [
            "Developing and maintaining web applications using React.js and other related technologies.",
            "Collaborating with cross-functional teams including designers, product managers, and other developers.",
            "Implementing responsive design and ensuring cross-browser compatibility.",
        ],
    },
];

const ExperienceCard = ({ experience, index }) => {
    const [isFlipped, setIsFlipped] = React.useState(false);

    return (
        <div
            className="w-full max-w-4xl mx-auto relative z-10 perspective-1000"
            style={{ perspective: "1000px" }}
        >
            <motion.div
                variants={fadeIn("up", "spring", index * 0.5, 0.75)}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.8 }}
                className="w-full relative preserve-3d cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <div
                    className="flex flex-col md:flex-row gap-4 bg-transparent backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-colors duration-300 backface-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <div className="hidden md:flex flex-col items-center w-16 md:w-24 flex-shrink-0">
                        <div className="w-0.5 h-full bg-slate-700 relative">
                            <div className="absolute top-0 w-3 h-3 rounded-full bg-secondary -left-[5px]" />
                            <div
                                className="absolute top-8 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center border-4 border-[#1d1836]"
                                style={{ background: experience.iconBg }}
                            >
                                <div className="text-xl">{experience.icon}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 relative w-full md:w-[calc(100%-100px)]">
                        {/* Arrow */}
                        <div className="hidden md:block absolute top-10 -left-9 w-6 h-6 bg-transparent rotate-45 border-l border-b border-white/10" />

                        <div className="flex flex-col justify-center min-h-[150px]">
                            <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
                            <p className="text-secondary text-[16px] font-semibold" style={{ margin: 0 }}>
                                {experience.company_name}
                            </p>
                            <p className="text-gray-400 text-[14px] mt-1">{experience.date}</p>
                            <p className="mt-4 text-secondary text-[14px]">Click to see details...</p>
                        </div>
                    </div>
                </div>

                <div
                    className="absolute inset-0 bg-[#1d1836]/40 backdrop-blur-md p-8 rounded-2xl border border-white/10 flex flex-col justify-center backface-hidden"
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)"
                    }}
                >
                    <h4 className="text-white text-[18px] font-bold mb-4 text-center">Responsibilities & Achievements</h4>
                    <ul className="list-disc ml-5 space-y-2 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                        {experience.points.map((point, index) => (
                            <li
                                key={`experience-point-${index}`}
                                className="text-white-100 text-[14px] pl-1 tracking-wider"
                            >
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </div>
    );
};

const Experience = () => {
    return (
        <>
            <motion.div variants={textVariant()}>
                <p className={styles.sectionSubText}>What I have done so far</p>
                <h2 className={styles.sectionHeadText}>Work Experience</h2>
            </motion.div>

            <div className="mt-20 flex flex-col relative gap-8">

                <div className="absolute left-4 md:left-12 top-0 bottom-0 w-0.5 bg-slate-700 md:hidden" />

                {experiences.map((experience, index) => (
                    <ExperienceCard key={`experience-${index}`} experience={experience} index={index} />
                ))}
            </div>
        </>
    );
};

export default SectionWrapper(Experience, "work");
