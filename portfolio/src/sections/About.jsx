import React, { useRef } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import SectionWrapper from "../hoc/SectionWrapper";

const services = [
    { title: "Web Developer", icon: "🌐" },
    { title: "React Native Developer", icon: "📱" },
    { title: "Backend Developer", icon: "💾" },
    { title: "Content Creator", icon: "🎥" },
];

const ServiceCard = ({ index, title, icon }) => {
    return (
        <div className="w-[300px] h-[400px] flex-shrink-0 snap-center perspective-1000">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full green-pink-gradient p-[1px] rounded-[20px] shadow-card transform-style-3d transition-transform duration-500 hover:scale-105"
            >
                <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] h-full flex justify-evenly items-center flex-col">
                    <div className="text-6xl">{icon}</div>
                    <h3 className="text-white text-[24px] font-bold text-center">
                        {title}
                    </h3>
                </div>
            </motion.div>
        </div>
    );
};

const About = () => {
    const scrollRef = useRef(null);

    return (
        <>
            <motion.div variants={textVariant()}>
                <p className={styles.sectionSubText}>Introduction</p>
                <h2 className={styles.sectionHeadText}>Overview</h2>
            </motion.div>

            <motion.p
                variants={fadeIn("", "", 0.1, 1)}
                className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
            >
                I'm a skilled software developer with experience in TypeScript and
                JavaScript, and expertise in frameworks like React, Node.js, and
                Three.js. I'm a quick learner and collaborate closely with clients to
                create efficient, scalable, and user-friendly solutions that solve
                real-world problems. Let's work together to bring your ideas to life!
            </motion.p>

            {/* 3D Scroll Container */}
            <div
                ref={scrollRef}
                className="mt-20 flex flex-nowrap overflow-x-auto gap-10 py-10 px-10 snap-x snap-mandatory hide-scrollbar perspective-container"
                style={{ perspective: '1000px' }}
            >
                {services.map((service, index) => (
                    <div key={service.title} className="flex-shrink-0 snap-center">
                        <ServiceCard index={index} {...service} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default SectionWrapper(About, "about");