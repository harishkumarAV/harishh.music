import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import "./Teach.css";

const pillars = [
  {
    title: "Learn through songs",
    text: "Sessions built around music you care about, so practice feels natural from day one.",
  },
  {
    title: "Build clean fundamentals",
    text: "Chords, timing, transitions, and technique taught with clarity you can carry forward.",
  },
  {
    title: "Leave with confidence",
    text: "Walk away able to play full pieces with steadiness, feel, and pride in your progress.",
  },
];

function TeachPanel({
  item,
  index,
}: {
  item: (typeof pillars)[number];
  index: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    reduce ? [1, 1, 1, 1] : [0.25, 1, 1, 0.35]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    reduce ? [0, 0, 0] : [60, 0, -30]
  );
  const glow = useTransform(
    scrollYProgress,
    [0.2, 0.5, 0.8],
    reduce ? [0.2, 0.2, 0.2] : [0.1, 0.55, 0.15]
  );

  return (
    <motion.article
      ref={ref}
      className={`teach__panel ${index % 2 === 1 ? "teach__panel--alt" : ""}`}
      style={{ opacity, y }}
    >
      <motion.div
        className="teach__panel-glow"
        style={{ opacity: glow }}
        aria-hidden="true"
      />
      <span className="teach__index">0{index + 1}</span>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
    </motion.article>
  );
}

export function Teach() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="teach" id="teach" ref={sectionRef}>
      {!reduce && (
        <div className="teach__progress" aria-hidden="true">
          <motion.div className="teach__progress-bar" style={{ width: progressWidth }} />
        </div>
      )}

      <div className="teach__layout">
        <div className="teach__sticky">
          <p className="section__eyebrow">How I teach</p>
          <h2 className="section__title teach__title">Clarity. Consistency. Feel.</h2>
          <p className="teach__lede">
            Online or in person. Structured enough to grow, musical enough to
            stay inspiring.
          </p>
        </div>

        <div className="teach__panels">
          {pillars.map((item, i) => (
            <TeachPanel key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
