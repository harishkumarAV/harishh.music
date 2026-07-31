import { motion, useReducedMotion } from "framer-motion";
import { fadeScale, fadeUp, stagger } from "../lib/motion";
import "./About.css";

const highlights = [
  {
    title: "Since age 8",
    text: "Guitar has been part of my life for around 15 years — practice, stages, and everything in between.",
  },
  {
    title: "Live & on mic",
    text: "I’ve played at events and programmes, and I sing a little too — music isn’t just chords for me.",
  },
  {
    title: "Dev by day",
    text: "I’m a software developer. Teaching guitar is my passion hobby — sharing what I’ve learned with people who want to play.",
  },
];

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
          <h2 className="section__title">Hey, I’m Harish.</h2>
          <p className="section__lede about__lede">
            I’ve been into guitar since I was eight — that’s about fifteen years
            of playing. I’ve performed at events and programmes, and I sing a
            little as well. Right now I’m passionate about teaching anyone who’s
            curious about the instrument.
          </p>
          <p className="about__note">
            By profession I’m a software developer. Guitar is my hobby — and
            teaching is how I want to pass that love on.
          </p>
        </motion.div>

        <motion.ul
          className="about__cards"
          variants={stagger(reduce, 0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {highlights.map((item) => (
            <motion.li
              key={item.title}
              className="card about__card"
              variants={fadeScale(reduce)}
              whileHover={reduce ? undefined : { y: -6, scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
