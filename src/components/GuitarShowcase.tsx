import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ScrollDrivenGuitar } from "./GuitarModel";
import "./GuitarShowcase.css";

const beats = [
  {
    title: "Feel every phrase",
    text: "Scroll to explore the instrument. Lessons shaped around music that already lives in you.",
  },
  {
    title: "Eight days. Real progress.",
    text: "A focused beginner path over one month, covering what you need and where to go next.",
  },
  {
    title: "Your plan. Your pace.",
    text: "Customised training when you want coaching shaped around your goals and sound.",
  },
];

function ShowcaseScene({
  scrollProgress,
  reduce,
}: {
  scrollProgress: MotionValue<number>;
  reduce: boolean;
}) {
  const latest = useRef(0);
  useMotionValueEvent(scrollProgress, "change", (v) => {
    latest.current = v;
  });

  return (
    <>
      <color attach="background" args={["#03070c"]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 3]} intensity={1.5} color="#fff5ea" />
      <directionalLight position={[-3, 2, -1]} intensity={0.5} color="#4db8ff" />
      <pointLight position={[2, 2, 3]} intensity={24} color="#4db8ff" distance={14} />
      <spotLight
        position={[-3, 4, 2]}
        intensity={14}
        color="#7c5cff"
        angle={0.5}
        penumbra={0.65}
      />
      <Float
        speed={reduce ? 0 : 1.1}
        rotationIntensity={reduce ? 0 : 0.12}
        floatIntensity={reduce ? 0 : 0.25}
      >
        <ScrollDrivenGuitar
          getScroll={() => latest.current}
          reduceMotion={reduce}
        />
      </Float>
      <ContactShadows
        position={[0, -2.05, 0]}
        opacity={0.5}
        scale={14}
        blur={2.6}
        far={5}
      />
    </>
  );
}

function ShowcaseBeat({
  index,
  total,
  progress,
  title,
  text,
  reduce,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  title: string;
  text: string;
  reduce: boolean;
}) {
  const start = index / total;
  const midIn = start + 0.1;
  const midOut = (index + 1) / total - 0.08;
  const end = (index + 1) / total;
  const opacity = useTransform(
    progress,
    [start, midIn, midOut, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(progress, [start, midIn, midOut, end], [40, 0, 0, -30]);

  if (reduce) {
    return (
      <div className="showcase__beat showcase__beat--static">
        <p className="showcase__kicker">0{index + 1}</p>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    );
  }

  return (
    <motion.div className="showcase__beat" style={{ opacity, y }}>
      <p className="showcase__kicker">0{index + 1}</p>
      <h3>{title}</h3>
      <p>{text}</p>
    </motion.div>
  );
}

export function GuitarShowcase() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section className="showcase" id="experience" ref={ref}>
      <div className="showcase__sticky">
        <div className="showcase__canvas" aria-hidden={!reduce}>
          <Suspense fallback={<div className="showcase__fallback" />}>
            <Canvas
              dpr={[1, 1.5]}
              camera={{ position: [1.2, 0.2, 5.4], fov: 36 }}
              gl={{
                antialias: true,
                alpha: false,
                powerPreference: "high-performance",
                failIfMajorPerformanceCaveat: false,
              }}
            >
              <ShowcaseScene scrollProgress={smooth} reduce={!!reduce} />
            </Canvas>
          </Suspense>
        </div>

        <div className="showcase__veil" aria-hidden="true" />

        <div className="showcase__copy">
          {beats.map((beat, i) => (
            <ShowcaseBeat
              key={beat.title}
              index={i}
              total={beats.length}
              progress={smooth}
              title={beat.title}
              text={beat.text}
              reduce={!!reduce}
            />
          ))}
        </div>

        <p className="showcase__hint">Scroll to explore</p>
      </div>
    </section>
  );
}
