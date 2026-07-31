import { useReducedMotion } from "framer-motion";
import "./Marquee.css";

const items = [
  "practice",
  "feel",
  "perform",
  "chords",
  "rhythm",
  "songs you love",
  "fingerstyle",
  "confidence",
];

export function Marquee() {
  const reduce = useReducedMotion();
  const row = [...items, ...items];

  return (
    <div className={`marquee ${reduce ? "marquee--static" : ""}`} aria-hidden="true">
      <div className="marquee__track">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="marquee__item">
            {item}
            <span className="marquee__dot" />
          </span>
        ))}
      </div>
    </div>
  );
}
