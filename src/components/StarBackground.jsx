import { useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════
   SHOOTING STARS BACKGROUND
   – Meteors streak diagonally across the screen
   – Each has a bright glowing head + long fading tail
   – Spawns 1 meteor every 2–5 seconds
   – Pure Canvas 2D, works on all devices
════════════════════════════════════════════════════════════ */

const TWO_PI = Math.PI * 2;
function rand(a, b) { return a + Math.random() * (b - a); }
function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

const COLORS = ["#ffffff", "#c8dcff", "#bf8bff", "#ffe9a0", "#93c5fd"];

function mkMeteor(W, H) {
    // Always travel top-right → bottom-left (diagonal feel)
    const angle = rand(30, 50) * (Math.PI / 180); // 30°-50° downward
    const speed = rand(8, 18);
    const tailLen = rand(120, 280);

    // Spawn from top or left edge, randomised
    const fromTop = Math.random() > 0.35;
    const x = fromTop ? rand(W * 0.1, W) : 0;
    const y = fromTop ? rand(0, H * 0.4) : rand(0, H * 0.5);

    return {
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        tailLen,
        color: pick(COLORS),
        life: 1,
        decay: rand(0.006, 0.014),
        width: rand(1.5, 3.0),
    };
}

const StarBackground = () => {
    const canvasRef = useRef(null);
    const S = useRef({ meteors: [], raf: null, nextSpawn: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const st = S.current;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Spawn first one quickly
        st.nextSpawn = performance.now() + 800;

        const draw = (ts) => {
            const W = canvas.width, H = canvas.height;
            ctx.clearRect(0, 0, W, H);

            /* ── Spawn new meteor ── */
            if (ts >= st.nextSpawn) {
                st.meteors.push(mkMeteor(W, H));
                st.nextSpawn = ts + rand(2000, 5000);
            }

            /* ── Draw meteors ── */
            st.meteors = st.meteors.filter((m) => {
                m.x += m.vx;
                m.y += m.vy;
                m.life -= m.decay;
                if (m.life <= 0 || m.x > W + 100 || m.y > H + 100) return false;

                // Tail gradient (head → transparent)
                const tailX = m.x - m.vx * (m.tailLen / (Math.hypot(m.vx, m.vy) || 1));
                const tailY = m.y - m.vy * (m.tailLen / (Math.hypot(m.vx, m.vy) || 1));

                const grd = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
                grd.addColorStop(0, `rgba(255,255,255,${m.life * 0.95})`);
                grd.addColorStop(0.15, m.color + Math.round(m.life * 0xcc).toString(16).padStart(2, "0"));
                grd.addColorStop(0.6, m.color + Math.round(m.life * 0x40).toString(16).padStart(2, "0"));
                grd.addColorStop(1, "rgba(255,255,255,0)");

                ctx.save();
                // Glow
                ctx.shadowColor = m.color;
                ctx.shadowBlur = 12;
                ctx.strokeStyle = grd;
                ctx.lineWidth = m.width * m.life;
                ctx.lineCap = "round";
                ctx.globalAlpha = m.life;
                ctx.beginPath();
                ctx.moveTo(m.x, m.y);
                ctx.lineTo(tailX, tailY);
                ctx.stroke();

                // Bright glowing head dot
                const headGrd = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.width * 3);
                headGrd.addColorStop(0, `rgba(255,255,255,${m.life})`);
                headGrd.addColorStop(0.4, m.color + Math.round(m.life * 0xaa).toString(16).padStart(2, "0"));
                headGrd.addColorStop(1, "rgba(255,255,255,0)");
                ctx.fillStyle = headGrd;
                ctx.shadowBlur = 20;
                ctx.beginPath();
                ctx.arc(m.x, m.y, m.width * 3, 0, TWO_PI);
                ctx.fill();

                ctx.restore();
                return true;
            });

            st.raf = requestAnimationFrame(draw);
        };

        st.raf = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(st.raf);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0, left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: -1,
                display: "block",
                pointerEvents: "none",
            }}
        />
    );
};

export default StarBackground;
