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
];

const FeedbackCard = ({ index, testimonial, name, designation, company, image, email }) => (
    <div
        className="bg-black-200/50 backdrop-blur-md p-10 rounded-3xl xs:w-[320px] w-full border border-white/10 margin-left-10"
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
        <div className="mt-12 bg-black-100 rounded-[20px]">
            <div
                className={`${styles.padding} bg-tertiary rounded-2xl min-h-[300px]`}
            >
                <motion.div variants={textVariant()}>
                    <p className={styles.sectionSubText}>What others say</p>
                    <h2 className={styles.sectionHeadText}>Testimonials</h2>
                </motion.div>
            </div>
            <div className={`${styles.paddingX} -mt-20 pb-14 flex flex-col gap-7`}>
                {testimonials.map((testimonial, index) => (
                    <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
                ))}
            </div>
        </div>
    );
};

export default SectionWrapper(Feedbacks, "");
