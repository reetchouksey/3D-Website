import { motion } from "framer-motion";

import { styles } from "../styles";
import SectionWrapper from "../hoc/SectionWrapper";
import { slideIn } from "../utils/motion";

const Contact = () => {
    return (
        <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
            <motion.div
                variants={slideIn("left", "tween", 0.2, 1)}
                className="flex-1 bg-black-100 p-8 rounded-2xl"
            >
                <p className={styles.sectionSubText}>Get in touch</p>
                <h3 className={styles.sectionHeadText}>Contact</h3>

                <div className="mt-12 flex flex-col gap-8">
                    <div className="text-white font-medium">
                        <span className="block mb-4 text-secondary text-[18px]">Share Your Requirement On This Email:</span>
                        <a
                            href="mailto:reetchouksey004@gmail.com"
                            className="text-white hover:text-[#915eff] text-[16px] sm:text-[22px] font-bold transition-colors duration-300 border-b-2 border-[#915eff]"
                            style={{ wordBreak: "break-all", overflowWrap: "break-word" }}
                        >
                            reetchouksey004@gmail.com
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SectionWrapper(Contact, "contact");
