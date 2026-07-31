import { motion, useReducedMotion } from "framer-motion";
import { fadeUp } from "../lib/motion";
import "./About.css";

export function About() {
  const reduce = useReducedMotion();

  return (
    <section className="about section" id="about">
      <div className="section__inner">
        <motion.div
          className="about__intro"
          variants={fadeUp(reduce)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <p className="section__eyebrow">About me</p>
          <h2 className="section__title">Hey, I'm Harish.</h2>
          <p className="section__lede about__lede">
            I've been into guitar since I was eight. That's about fifteen years
            of playing. I've performed at events and programmes, and I sing a
            little as well. Right now I'm passionate about teaching anyone who's
            curious about the instrument.
          </p>
          <p className="about__note">
            By profession I'm a software developer. Guitar is my hobby, and
            teaching is how I want to pass that love on.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
