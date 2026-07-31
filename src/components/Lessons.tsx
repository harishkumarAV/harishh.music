import { motion, useReducedMotion } from "framer-motion";
import { fadeScale, fadeUp, stagger } from "../lib/motion";
import "./Lessons.css";

const packages = [
  {
    id: "beginner",
    name: "8-Day Beginner Package",
    price: "₹999",
    meta: "8 days · over 1 month",
    badge: "Absolute beginners",
    dark: true,
    desc: "For absolute beginners. Covers most of what a new player needs to know, and sets a clear path for what comes next.",
  },
  {
    id: "custom",
    name: "Customised Training",
    price: "₹1,499",
    meta: "Tailored to your goals",
    badge: "Flexible",
    dark: false,
    desc: "A personalised plan around the songs and skills you want — paced and shaped for you.",
  },
];

const steps = [
  {
    title: "Book a demo",
    text: "Start with a demo class — no commitment yet.",
  },
  {
    title: "See how it feels",
    text: "Meet me, ask questions, and understand the approach.",
  },
  {
    title: "Enquire to enroll",
    text: "Like it? Mail me to join the package that fits you.",
  },
];

export function Lessons() {
  const reduce = useReducedMotion();

  return (
    <section className="lessons section" id="packages">
      <div className="section__inner">
        <motion.div
          variants={fadeUp(reduce)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <p className="section__eyebrow">Packages</p>
          <h2 className="section__title">Two ways to learn.</h2>
          <p className="section__lede">
            Pick the path that fits you. Book a demo first — then enroll when
            you’re ready.
          </p>
        </motion.div>

        <motion.ul
          className="pricing"
          variants={stagger(reduce, 0.14)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {packages.map((pkg) => (
            <motion.li
              key={pkg.id}
              className={`card pricing__card ${pkg.dark ? "card--dark" : ""}`}
              variants={fadeScale(reduce)}
              whileHover={reduce ? undefined : { y: -8, scale: 1.02 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="pricing__badge">{pkg.badge}</span>
              <h3 className="pricing__name">{pkg.name}</h3>
              <p className="pricing__price">
                {pkg.price}
                <span className="pricing__meta">{pkg.meta}</span>
              </p>
              <p className="pricing__desc">{pkg.desc}</p>
              <a className={`btn ${pkg.dark ? "btn--primary" : "btn--outline"} pricing__cta`} href="#demo">
                Enquire by mail
              </a>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className="demo-path"
          id="how"
          variants={fadeUp(reduce, 0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="demo-path__title">Start with a demo class</h3>
          <p className="demo-path__lede">
            Attend a demo, get a feel for the lessons, then enroll in a package.
          </p>
          <ol className="demo-path__steps">
            {steps.map((step, i) => (
              <li key={step.title}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <a className="btn btn--primary" href="#demo">
            Book a demo class
          </a>
        </motion.div>
      </div>
    </section>
  );
}
