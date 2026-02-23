import { motion } from "framer-motion";

const SectionWrapper = (Component, idName) =>
    function HOC() {
        return (
            <motion.section
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="max-w-7xl mx-auto relative z-0 py-16 px-6"
            >
                <span className="hash-span" id={idName}>
                    &nbsp;
                </span>
                <Component />
            </motion.section>
        );
    };

export default SectionWrapper;
