import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { fadeUp } from "../lib/motion";
import "./About.css";

export function About() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, -80]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.7, 1],
    reduce ? [1, 1, 1, 1] : [0.15, 0.55, 0.55, 0.2]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduce ? [1, 1, 1] : [0.92, 1, 1.04]
  );

  return (
    <section className="about section" id="about" ref={ref}>
      <motion.div
        className="about__year"
        style={{ y, opacity, scale }}
        aria-hidden="true"
      >
        15
      </motion.div>

      <div className="section__inner about__inner">
        <motion.div
          className="about__intro"
          variants={fadeUp(reduce)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="section__eyebrow">About me</p>
          <h2 className="section__title">I'm Harish.</h2>
          <p className="section__lede about__lede">
            Guitar has been part of my life since I was eight, nearly fifteen
            years of practice, performances, and a little singing along the way.
            I'm a software developer by profession. Teaching guitar is how I
            share the craft I love.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
