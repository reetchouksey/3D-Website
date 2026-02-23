import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import SectionWrapper from "../hoc/SectionWrapper";

const StarRating = ({ rating, onRate }) => (
    <div style={{ display: "flex", gap: "12px" }}>
        {[1, 2, 3, 4, 5].map((star) => (
            <button
                key={star}
                type="button"
                onClick={() => onRate(star)}
                style={{
                    fontSize: "2.5rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: rating >= star ? "#facc15" : "#4b5563",
                    transition: "transform 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.3)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            >
                ★
            </button>
        ))}
    </div>
);

const ReviewCard = ({ name, rating, comment, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        style={{
            background: "#100d25",
            padding: "24px",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.07)",
            flex: "1",
            minWidth: "260px",
            maxWidth: "380px",
        }}
    >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <h4 style={{ color: "#fff", fontWeight: "700", fontSize: "1rem" }}>{name}</h4>
            <span style={{ color: "#facc15", fontSize: "1rem", letterSpacing: "2px" }}>
                {"★".repeat(rating)}{"☆".repeat(5 - rating)}
            </span>
        </div>
        <p style={{ color: "#aaa6c3", fontSize: "0.9rem", fontStyle: "italic", lineHeight: "1.6" }}>
            "{comment}"
        </p>
    </motion.div>
);

const FeedbackSection = () => {
    const defaultFeedbacks = [
        { name: "John Doe", rating: 5, comment: "Amazing portfolio! The 3D effects are incredibly smooth." },
        { name: "Anna Smith", rating: 4, comment: "I really like the tech stack section. Great work overall!" },
        { name: "Rahul Mehta", rating: 5, comment: "One of the best developer portfolios I have ever seen!" },
    ];

    const [form, setForm] = useState({ rating: 0, comment: "", name: "" });
    const [userFeedbacks, setUserFeedbacks] = useState(() => {
        try {
            const saved = localStorage.getItem("portfolio_feedbacks");
            return saved ? JSON.parse(saved) : defaultFeedbacks;
        } catch {
            return defaultFeedbacks;
        }
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleRating = (value) => setForm({ ...form, rating: value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            const newFeedback = { name: form.name || "Anonymous", rating: form.rating, comment: form.comment };
            const updated = [newFeedback, ...userFeedbacks];
            setUserFeedbacks(updated);
            try { localStorage.setItem("portfolio_feedbacks", JSON.stringify(updated)); } catch { }
            setLoading(false);
            setSubmitted(true);
            setForm({ rating: 0, comment: "", name: "" });
        }, 1200);
    };

    const inputStyle = {
        background: "#151030",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "10px",
        padding: "12px 20px",
        color: "#fff",
        outline: "none",
        width: "100%",
        boxSizing: "border-box",
        fontFamily: "inherit",
        fontSize: "1rem",
    };

    return (
        <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
            {/* Form Card */}
            <div style={{
                background: "#100d25",
                padding: "40px",
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 25px 80px rgba(0,0,0,0.4)",
            }}>
                <p className={styles.sectionSubText}>Share your thoughts</p>
                <h2 className={styles.sectionHeadText} style={{ marginBottom: "32px" }}>User Feedback</h2>

                {submitted ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            textAlign: "center",
                            padding: "48px",
                            background: "#151030",
                            borderRadius: "16px",
                            border: "1px solid rgba(145,94,255,0.4)",
                        }}
                    >
                        <div style={{ fontSize: "3.5rem", marginBottom: "16px" }}>🎉</div>
                        <h3 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "700" }}>Thank you!</h3>
                        <p style={{ color: "#aaa6c3", marginTop: "8px" }}>Your review has been added to the wall below.</p>
                        <button
                            onClick={() => setSubmitted(false)}
                            style={{
                                marginTop: "24px",
                                background: "#915eff",
                                color: "#fff",
                                border: "none",
                                borderRadius: "12px",
                                padding: "10px 32px",
                                fontWeight: "700",
                                cursor: "pointer",
                                fontSize: "1rem",
                            }}
                        >
                            Submit Another
                        </button>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label style={{ color: "#fff", fontWeight: "600" }}>Your Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="What's your name?"
                                style={inputStyle}
                            />
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label style={{ color: "#fff", fontWeight: "600" }}>Rating</label>
                            <StarRating rating={form.rating} onRate={handleRating} />
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label style={{ color: "#fff", fontWeight: "600" }}>Your Feedback</label>
                            <textarea
                                name="comment"
                                rows={3}
                                value={form.comment}
                                onChange={handleChange}
                                placeholder="Tell us what you think about the design, 3D effects, or anything else..."
                                style={{ ...inputStyle, resize: "none" }}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || form.rating === 0}
                            style={{
                                background: form.rating === 0 || loading ? "#555" : "#915eff",
                                color: "#fff",
                                border: "none",
                                borderRadius: "12px",
                                padding: "13px 36px",
                                fontWeight: "700",
                                cursor: form.rating === 0 || loading ? "not-allowed" : "pointer",
                                fontSize: "1rem",
                                alignSelf: "flex-start",
                                transition: "background 0.3s",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                            }}
                        >
                            {loading ? "Posting..." : "Post Feedback 🚀"}
                        </button>
                    </form>
                )}
            </div>

            {/* Reviews Wall */}
            <div>
                <h3 style={{ color: "#fff", fontWeight: "700", fontSize: "1.4rem", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
                    Recent Reviews
                    <span style={{ background: "#151030", color: "#aaa6c3", borderRadius: "999px", padding: "2px 14px", fontSize: "0.85rem", fontWeight: "400" }}>
                        {userFeedbacks.length}
                    </span>
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "center" }}>
                    {userFeedbacks.map((fb, index) => (
                        <ReviewCard key={`${fb.name}-${index}`} {...fb} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SectionWrapper(FeedbackSection, "user-feedback");
