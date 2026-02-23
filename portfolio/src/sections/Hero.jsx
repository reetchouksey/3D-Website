import { motion } from "framer-motion";

import { styles } from "../styles";

const Hero = () => {
    return (
        <section className="relative w-full h-screen mx-auto">

            <nav className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}>
                <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-[#915eff] flex items-center justify-center font-bold text-white">RC</div>
                        <span className="text-white text-[18px] font-bold cursor-pointer flex">Reet Chouksey &nbsp; <span className="sm:block hidden">| 3D Portfolio</span></span>
                    </div>
                    <ul className="list-none hidden sm:flex flex-row gap-10">
                        <li className="text-secondary hover:text-white text-[18px] font-medium cursor-pointer">
                            <a href="#about">About</a>
                        </li>
                        <li className="text-secondary hover:text-white text-[18px] font-medium cursor-pointer">
                            <a href="#work">Work</a>
                        </li>
                        <li className="text-secondary hover:text-white text-[18px] font-medium cursor-pointer">
                            <a href="#contact">Contact</a>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}>


                <div>
                    <h1 className={`${styles.heroHeadText} text-white`}>
                        Hi, I'm <span className="text-[#915eff]">Reet Chouksey</span>
                    </h1>
                    <p className={`${styles.heroSubText} mt-2 text-white-100`}>
                        I develop 3D visuals, user <br className="sm:block hidden" />
                        interfaces and web applications
                    </p>
                </div>
            </div>



            {/* Scroll Indicator */}
            <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
                <a href="#about">
                    <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
                        <motion.div
                            animate={{ y: [0, 24, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                            className="w-3 h-3 rounded-full bg-secondary mb-1"
                        />
                    </div>
                </a>
            </div>
        </section>
    );
};

export default Hero;
