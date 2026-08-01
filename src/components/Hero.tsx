import { motion, useReducedMotion } from "framer-motion";
import { appleEase, fadeUp } from "../lib/motion";
import "./Hero.css";

const highlights = [
  { value: "8", label: "Classes / month" },
  { value: "1:1", label: "Personal coaching" },
  { value: "4", label: "Week roadmap" },
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__glow hero__glow--a" aria-hidden="true" />
      <div className="hero__glow hero__glow--b" aria-hidden="true" />
      <div className="hero__rings" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="hero__notes" aria-hidden="true">
        <span className="hero__dot hero__dot--1" />
        <span className="hero__dot hero__dot--2" />
        <span className="hero__dot hero__dot--3" />
        <span className="hero__dot hero__dot--4" />
        <span className="hero__symbol hero__symbol--1">♪</span>
        <span className="hero__symbol hero__symbol--2">♫</span>
        <span className="hero__symbol hero__symbol--3">♩</span>
        <span className="hero__symbol hero__symbol--4">♬</span>
        <span className="hero__symbol hero__symbol--5">♪</span>
        <span className="hero__symbol hero__symbol--6">𝄞</span>
      </div>

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
            Fall in love with guitar.
            <br />
            Start as a beginner.
          </motion.h1>

          <motion.p
            className="hero__lede"
            variants={fadeUp(reduce, 0.18)}
            initial="hidden"
            animate="show"
          >
            A beginner-friendly path with personal coaching, clear technique, and
            music that feels like you.
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

          <motion.ul
            className="hero__highlights"
            variants={fadeUp(reduce, 0.38)}
            initial="hidden"
            animate="show"
          >
            {highlights.map((item) => (
              <li key={item.label} className="hero__chip">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>

      <a className="hero__scroll" href="#experience">
        <span>Scroll</span>
        <i aria-hidden="true" />
      </a>
    </section>
  );
}
