import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  const canvasRef = useRef(null);

  // Animated noise/grain background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animFrame;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const drawNoise = () => {
      const w = canvas.width;
      const h = canvas.height;
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 12; // very subtle
      }
      ctx.putImageData(imageData, 0, 0);
      animFrame = requestAnimationFrame(drawNoise);
    };
    drawNoise();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  // Stagger variants
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
  };

  const numVariant = {
    hidden: { opacity: 0, scale: 0.88 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <>
      <style>{`
        .nf-page {
          position: relative;
          min-height: 82vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background-color: #fafafa;
          padding: 4rem 1.5rem;
        }

        /* Grain canvas */
        .nf-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        /* Decorative large 404 ghost */
        .nf-ghost-number {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: "Montserrat", sans-serif;
          font-size: clamp(180px, 28vw, 360px);
          font-weight: 800;
          letter-spacing: -0.06em;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(0, 0, 0, 0.06);
          user-select: none;
          white-space: nowrap;
          z-index: 0;
          line-height: 1;
        }

        /* Card */
        .nf-card {
          position: relative;
          z-index: 1;
          max-width: 560px;
          width: 100%;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          padding: 3.5rem 3rem;
          text-align: center;
          box-shadow:
            0 2px 4px rgba(0,0,0,0.03),
            0 12px 40px rgba(0,0,0,0.06);
        }

        /* Pill badge */
        .nf-badge {
          display: inline-block;
          font-family: "Cairo", sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #ffffff;
          background-color: #010101;
          padding: 0.35rem 1rem;
          margin-bottom: 1.75rem;
        }

        /* Big 404 number inside card */
        .nf-number {
          font-family: "Montserrat", sans-serif;
          font-size: clamp(3.5rem, 10vw, 6.5rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          color: #010101;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        /* Divider line */
        .nf-divider {
          width: 40px;
          height: 2px;
          background: #010101;
          margin: 1.25rem auto;
        }

        /* Heading */
        .nf-heading {
          font-family: "Montserrat", sans-serif;
          font-size: clamp(1.25rem, 3vw, 1.6rem);
          font-weight: 500;
          letter-spacing: -0.01em;
          color: #010101;
          margin-bottom: 0.75rem;
        }

        /* Body text */
        .nf-text {
          font-family: "Cairo", sans-serif;
          font-size: 1rem;
          color: #666666;
          line-height: 1.7;
          margin-bottom: 2.25rem;
        }

        /* Actions */
        .nf-actions {
          display: flex;
          gap: 0.875rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* Primary CTA */
        .nf-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: #010101;
          color: #ffffff;
          border: 1.5px solid #010101;
          padding: 0.875rem 2rem;
          font-family: "Cairo", sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .nf-btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          transform: translateX(-100%);
          transition: transform 0.5s;
        }

        .nf-btn-primary:hover::before {
          transform: translateX(100%);
        }

        .nf-btn-primary:hover {
          background-color: #2a2a2a;
          border-color: #2a2a2a;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          text-decoration: none;
        }

        /* Outline CTA */
        .nf-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: transparent;
          color: #010101;
          border: 1.5px solid #010101;
          padding: 0.875rem 2rem;
          font-family: "Cairo", sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nf-btn-outline:hover {
          background-color: #010101;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          text-decoration: none;
        }

        /* Decorative dots */
        .nf-dots {
          display: flex;
          justify-content: center;
          gap: 0.4rem;
          margin-top: 2.5rem;
        }

        .nf-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #e5e5e5;
        }

        .nf-dot:nth-child(2) { background-color: #a0a0a0; }

        /* Responsive */
        @media (max-width: 576px) {
          .nf-card {
            padding: 2.5rem 1.5rem;
          }

          .nf-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .nf-btn-primary,
          .nf-btn-outline {
            justify-content: center;
          }
        }
      `}</style>

      <div className="nf-page">
        {/* Grain overlay */}
        <canvas ref={canvasRef} className="nf-canvas" aria-hidden="true" />

        {/* Ghost background number */}
        <span className="nf-ghost-number" aria-hidden="true">404</span>

        {/* Main card */}
        <motion.div
          className="nf-card"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp}>
            <span className="nf-badge">Error 404</span>
          </motion.div>

          <motion.div className="nf-number" variants={numVariant}>
            404
          </motion.div>

          <motion.div className="nf-divider" variants={fadeUp} />

          <motion.h1 className="nf-heading" variants={fadeUp}>
            Page Not Found
          </motion.h1>

          <motion.p className="nf-text" variants={fadeUp}>
            The page you're looking for doesn't exist or has been moved.
            <br />
            Let's get you back to something beautiful.
          </motion.p>

          <motion.div className="nf-actions" variants={fadeUp}>
            <Link to="/shop" className="nf-btn-primary">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              Continue Shopping
            </Link>

            <Link to="/" className="nf-btn-outline">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Go Home
            </Link>
          </motion.div>

          <motion.div className="nf-dots" variants={fadeUp} aria-hidden="true">
            <span className="nf-dot" />
            <span className="nf-dot" />
            <span className="nf-dot" />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default NotFound;