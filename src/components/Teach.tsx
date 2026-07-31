import { motion, useReducedMotion } from "framer-motion";
import { fadeScale, fadeUp, stagger } from "../lib/motion";
import "./Teach.css";

const pillars = [
  {
    title: "Song-first learning",
    text: "Start with music you already love — the covers and tracks that made you pick up a guitar.",
  },
  {
    title: "Real technique",
    text: "Chords, strumming, fingerstyle, timing, and transitions — taught clearly so your hands catch up with your ear.",
  },
  {
    title: "Your sound",
    text: "Not generic drills. Leave each session closer to playing a full song with confidence and feel.",
  },
];

export function Teach() {
  const reduce = useReducedMotion();

  return (
    <section className="teach section" id="teach">
      <div className="section__inner">
        <motion.div
          variants={fadeUp(reduce)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <p className="section__eyebrow">How I teach</p>
          <h2 className="section__title">Designed around feel.</h2>
          <p className="section__lede">
            Online or in person — structured enough to grow, loose enough to
            stay musical.
          </p>
        </motion.div>

        <motion.ul
          className="teach__cards"
          variants={stagger(reduce, 0.14)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {pillars.map((item, i) => (
            <motion.li
              key={item.title}
              className={`card teach__card ${i === 1 ? "card--dark" : ""}`}
              variants={fadeScale(reduce)}
              whileHover={reduce ? undefined : { y: -8, scale: 1.025 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="teach__index">0{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
