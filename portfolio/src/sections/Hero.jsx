import { useState, useCallback } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { menu, close } from "../assets";

const SHINE_CSS = `
@keyframes navShine {
  0%   { text-shadow: 0 0 0px #fff, 0 0 0px #915eff; color: #ffffff; }
  35%  { text-shadow: 0 0 14px #fff, 0 0 28px #c084fc, 0 0 50px #7c3aed; color: #ffffff; letter-spacing: 0.05em; }
  70%  { text-shadow: 0 0 8px #fff, 0 0 16px #a855f7; color: #e9d5ff; }
  100% { text-shadow: none; color: #aaa6c3; letter-spacing: normal; }
}
@keyframes navStarHover {
  0%   { text-shadow: none; }
  40%  { text-shadow: 0 0 8px #fff, 0 0 20px #c084fc, 0 0 38px #7c3aed, 0 0 60px #4f1d96; }
  100% { text-shadow: 0 0 6px #fff, 0 0 14px #a855f7, 0 0 28px #6d28d9; }
}
.nav-link-shine { animation: navShine 0.75s ease forwards; }
.nav-link-hover {
  color: #ffffff !important;
  animation: navStarHover 0.4s ease forwards;
  transition: letter-spacing 0.2s ease;
  letter-spacing: 0.04em;
}
`;

const Hero = () => {
    const [toggle, setToggle] = useState(false);
    const [activeNav, setActiveNav] = useState(null);
    const [shineKey, setShineKey] = useState(0);
    const [hoverNav, setHoverNav] = useState(null);

    const handleNavClick = useCallback((nav) => {
        setActiveNav(nav);
        setShineKey(k => k + 1);
    }, []);

    return (
        <>
            <style>{SHINE_CSS}</style>
            <section className="relative w-full h-screen mx-auto">

                <nav className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}>
                    <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-full bg-[#915eff] flex items-center justify-center font-bold text-white">RC</div>
                            <span
                                className={`text-[18px] font-bold cursor-pointer flex ${hoverNav === "brand" ? "nav-link-hover" : "text-white"}`}
                                onMouseEnter={() => setHoverNav("brand")}
                                onMouseLeave={() => setHoverNav(null)}
                            >
                                Reet Chouksey &nbsp; <span className="sm:block hidden">| 3D Portfolio</span>
                            </span>
                        </div>
                        <ul className="list-none hidden sm:flex flex-row gap-10">
                            {["about", "work", "contact"].map((nav) => (
                                <li key={nav} className="text-[18px] font-medium cursor-pointer">
                                    <a
                                        href={`#${nav}`}
                                        key={activeNav === nav ? `${nav}-${shineKey}` : nav}
                                        className={
                                            activeNav === nav
                                                ? "nav-link-shine"
                                                : hoverNav === nav
                                                    ? "nav-link-hover"
                                                    : "text-secondary transition-colors duration-200"
                                        }
                                        onClick={() => handleNavClick(nav)}
                                        onMouseEnter={() => setHoverNav(nav)}
                                        onMouseLeave={() => setHoverNav(null)}
                                        style={{ textDecoration: "none" }}
                                    >
                                        {nav.charAt(0).toUpperCase() + nav.slice(1)}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* Mobile Menu */}
                        <div className="sm:hidden flex flex-1 justify-end items-center">
                            <img
                                src={toggle ? close : menu}
                                alt="menu"
                                className="w-[28px] h-[28px] object-contain cursor-pointer"
                                onClick={() => setToggle(!toggle)}
                            />

                            <div className={`${!toggle ? "hidden" : "flex"} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
                                <ul className="list-none flex justify-end items-start flex-col gap-4">
                                    {["about", "work", "contact"].map((nav) => (
                                        <li
                                            key={nav}
                                            className="font-poppins font-medium cursor-pointer text-[16px] text-white"
                                            onClick={() => {
                                                setToggle(!toggle);
                                            }}
                                        >
                                            <a href={`#${nav}`}>{nav.charAt(0).toUpperCase() + nav.slice(1)}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
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
                        <p className="mt-4 text-secondary text-[16px] sm:text-[18px] max-w-lg leading-relaxed">
                            Passionate about crafting immersive digital experiences using <span className="text-[#915eff] font-semibold">React</span>, <span className="text-[#915eff] font-semibold">Three.js</span>, and modern web technologies.
                        </p>
                        <p className="mt-2 text-secondary text-[15px] sm:text-[16px] max-w-lg leading-relaxed">
                            Turning complex ideas into elegant, performant, and visually stunning products — one line of code at a time.
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
        </>
    );
};

export default Hero;
