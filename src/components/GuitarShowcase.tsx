import { Suspense, useEffect, useRef } from "react";
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
    title: "Play what you love",
    text: "Scroll through the instrument. Lessons start from songs that already mean something to you.",
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
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 4]} intensity={1.25} color="#ffffff" />
      <directionalLight position={[-3.5, 2, 2.5]} intensity={0.55} color="#f0f0f0" />
      <spotLight
        position={[0.8, 3.5, 4.5]}
        intensity={18}
        color="#ffffff"
        angle={0.75}
        penumbra={1}
        distance={18}
      />
      <spotLight
        position={[-2, 2.5, 3.5]}
        intensity={10}
        color="#f5f5f5"
        angle={0.8}
        penumbra={1}
        distance={16}
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
        opacity={0.28}
        scale={14}
        blur={3.4}
        far={5}
        color="#000000"
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
  const stickyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const sticky = stickyRef.current;
    if (!sticky || reduce) return;

    const onMove = (e: PointerEvent) => {
      const rect = sticky.getBoundingClientRect();
      sticky.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      sticky.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce]);

  return (
    <section className="showcase" id="experience" ref={ref}>
      <div className="showcase__sticky" ref={stickyRef}>
        <div className="showcase__glow showcase__glow--mid" aria-hidden="true" />
        {!reduce && (
          <div className="showcase__glow showcase__glow--cursor" aria-hidden="true" />
        )}

        <div className="showcase__canvas" aria-hidden={!reduce}>
          <Suspense fallback={<div className="showcase__fallback" />}>
            <Canvas
              dpr={[1, 1.5]}
              camera={{ position: [1.2, 0.2, 5.4], fov: 36 }}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
                failIfMajorPerformanceCaveat: false,
              }}
              onCreated={({ gl }) => {
                gl.setClearColor(0x000000, 0);
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
