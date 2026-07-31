import { motion, useReducedMotion } from "framer-motion";
import { appleEase, fadeUp } from "../lib/motion";
import "./Hero.css";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__layout">
        <div className="hero__copy">
          <motion.p
            className="hero__brand"
            variants={fadeUp(reduce)}
            initial="hidden"
            animate="show"
          >
            harishh.music
          </motion.p>

          <motion.h1
            className="hero__title"
            variants={fadeUp(reduce, 0.1)}
            initial="hidden"
            animate="show"
          >
            Learn guitar.
            <br />
            Play what moves you.
          </motion.h1>

          <motion.p
            className="hero__lede"
            variants={fadeUp(reduce, 0.18)}
            initial="hidden"
            animate="show"
          >
            Private lessons built around real songs, clear technique, and steady
            progress.
          </motion.p>

          <motion.div
            className="hero__actions"
            variants={fadeUp(reduce, 0.28)}
            initial="hidden"
            animate="show"
          >
            <motion.a
              className="btn btn--primary"
              href="#demo"
              whileHover={reduce ? undefined : { scale: 1.04 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.25, ease: appleEase }}
            >
              Book a demo class
            </motion.a>
            <a
              className="btn btn--secondary"
              href="https://www.instagram.com/harishh.music/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch on Instagram →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
