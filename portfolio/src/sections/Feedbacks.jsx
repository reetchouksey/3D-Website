import { motion } from "framer-motion";
import { styles } from "../styles";
import SectionWrapper from "../hoc/SectionWrapper";
import { fadeIn, textVariant } from "../utils/motion";

const testimonials = [
    {
        testimonial:
            "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
        name: "Sara Lee",
        designation: "CFO",
        company: "Acme Co",
        image: "https://randomuser.me/api/portraits/women/4.jpg",
        email: "sara@acme.co"
    },
    {
        testimonial:
            "I've never met a web developer who truly cares about their clients' success like Rick does.",
        name: "Chris Brown",
        designation: "COO",
        company: "DEF Corp",
        image: "https://randomuser.me/api/portraits/men/5.jpg",
        email: "chris@def.corp"
    },
    {
        testimonial:
            "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
        name: "Lisa Wang",
        designation: "CTO",
        company: "456 Enterprises",
        image: "https://randomuser.me/api/portraits/women/6.jpg",
        email: "lisa@456.enterprises"
    },
    {
        testimonial:
            "Rick's attention to detail and creative vision brought our project to a level we never imagined.",
        name: "Jessica Tan",
        designation: "Product Manager",
        company: "Innovate AI",
        image: "https://randomuser.me/api/portraits/women/7.jpg",
        email: "jessica@innovate.ai"
    },
    {
        testimonial:
            "The 3D elements Rick integrated are a game changer. Our user engagement has skyrocketed!",
        name: "Michael Chen",
        designation: "Marketing Director",
        company: "Future Tech",
        image: "https://randomuser.me/api/portraits/men/8.jpg",
        email: "michael@future.tech"
    },
    {
        testimonial:
            "Professional, responsive, and incredibly talented. Rick is the go-to developer for modern web apps.",
        name: "Sophia Martinez",
        designation: "CEO",
        company: "Pixel Perfect",
        image: "https://randomuser.me/api/portraits/women/9.jpg",
        email: "sophia@pixel.perfect"
    },
];

const FeedbackCard = ({ index, testimonial, name, designation, company, image, email }) => (
    <div
        className="bg-black-200/50 backdrop-blur-md p-6 rounded-3xl flex-1 min-w-[250px] border border-white/10"
    >
        {/* Replaced Quote with Name */}
        <p className="text-white font-bold text-[24px]">{name}</p>

        <div className="mt-1">
            <p className="text-white tracking-wider text-[18px] mt-3">{testimonial}</p>

            <div className="mt-7 flex justify-between items-center gap-1">
                <div className="flex-1 flex flex-col">
                    {/* Replaced Name with Email */}
                    <p className="text-white font-medium text-[14px]">
                        <span className="blue-text-gradient">@</span> {email}
                    </p>
                    <p className="mt-1 text-secondary text-[12px]">
                        {designation} of {company}
                    </p>
                </div>

                <img
                    src={image}
                    alt={`feedback-by-${name}`}
                    className="w-10 h-10 rounded-full object-cover"
                />
            </div>
        </div>
    </div>
);

const Feedbacks = () => {
    return (
        <div className="mt-12 bg-black-100">
            <div
                className={`${styles.padding} bg-tertiary min-h-[300px]`}
            >
                <motion.div variants={textVariant()}>
                    <p className={styles.sectionSubText}>What others say</p>
                    <h2 className={styles.sectionHeadText}>Testimonials</h2>
                </motion.div>
            </div>
            <div className={`-mt-20 pb-14 flex flex-row flex-wrap justify-center gap-10 px-6 sm:px-16`}>
                {testimonials.map((testimonial, index) => (
                    <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
                ))}
            </div>
        </div>
    );
};

export default SectionWrapper(Feedbacks, "feedbacks", "w-full mx-auto", false);
