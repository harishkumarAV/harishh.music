import { useRef, type MouseEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { fadeUp, stagger } from "../lib/motion";
import "./Lessons.css";

const packages = [
  {
    id: "beginner",
    name: "8-Day Beginner Package",
    price: "₹999",
    meta: "8 classes · 4 weeks · weekends",
    badge: "Absolute beginners",
    dark: true,
    desc: "For absolute beginners. Covers most of what a new player needs to know, and sets a clear path for what comes next.",
    syllabus: true,
  },
  {
    id: "custom",
    name: "Customised Training",
    price: "₹1,499",
    meta: "8 classes · over 1 month",
    badge: "Flexible",
    dark: false,
    desc: "A personalised plan around the songs and skills you want. Eight classes over one month, paced and shaped for you.",
    syllabus: false,
  },
];

const steps = [
  {
    title: "Book a demo",
    text: "Start with a demo class. No commitment yet.",
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

function TiltCard({
  pkg,
  index,
}: {
  pkg: (typeof packages)[number];
  index: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLLIElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const rotateX = useSpring(useTransform(my, [0, 100], [8, -8]), {
    stiffness: 180,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [0, 100], [-10, 10]), {
    stiffness: 180,
    damping: 18,
  });
  const glare = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, rgba(110, 193, 255, 0.22), transparent 45%)`;

  function onMove(e: MouseEvent) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  function onLeave() {
    mx.set(50);
    my.set(50);
  }

  return (
    <motion.li
      ref={ref}
      className={`card pricing__card ${pkg.dark ? "card--dark" : ""}`}
      style={
        reduce
          ? undefined
          : {
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              backgroundImage: glare,
            }
      }
      initial={reduce ? false : { opacity: 0, y: 48, rotateX: 12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.8,
        delay: reduce ? 0 : index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <span className="pricing__badge">{pkg.badge}</span>
      <h3 className="pricing__name">{pkg.name}</h3>
      <p className="pricing__price">
        {pkg.price}
        <span className="pricing__meta">{pkg.meta}</span>
      </p>
      <p className="pricing__desc">{pkg.desc}</p>
      <div className="pricing__actions">
        {pkg.syllabus && (
          <a
            className="btn btn--outline pricing__cta"
            href="/beginner-guitar-syllabus.pdf"
            download="harishh-beginner-guitar-syllabus.pdf"
          >
            Download syllabus
          </a>
        )}
        <a
          className={`btn ${pkg.dark ? "btn--primary" : "btn--outline"} pricing__cta`}
          href="#demo"
        >
          Enquire by mail
        </a>
      </div>
    </motion.li>
  );
}

export function Lessons() {
  const reduce = useReducedMotion();
  const pathRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pathRef,
    offset: ["start 0.85", "end 0.4"],
  });
  const line = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
          <h2 className="section__title">Choose your path. Start with a demo.</h2>
          <p className="section__lede">
            Two clear options. Begin with a demo, then enrol when it feels right.
          </p>
        </motion.div>

        <ul className="pricing" style={{ perspective: 1200 }}>
          {packages.map((pkg, i) => (
            <TiltCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </ul>

        <motion.div
          className="demo-path"
          id="how"
          ref={pathRef}
          variants={fadeUp(reduce, 0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="demo-path__title">Start with a demo class</h3>
          <p className="demo-path__lede">
            Attend a demo, get a feel for the lessons, then enroll in a package.
          </p>

          <div className="demo-path__rail" aria-hidden="true">
            <motion.div className="demo-path__rail-fill" style={{ width: line }} />
          </div>

          <motion.ol
            className="demo-path__steps"
            variants={stagger(reduce, 0.14)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            {steps.map((step, i) => (
              <motion.li
                key={step.title}
                variants={{
                  hidden: reduce
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 24, scale: 0.96 },
                  show: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.text}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
          <a className="btn btn--primary" href="#demo">
            Book a demo class
          </a>
        </motion.div>
      </div>
    </section>
  );
}
