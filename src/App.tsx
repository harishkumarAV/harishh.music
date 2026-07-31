import { lazy, Suspense } from "react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Ambient } from "./components/Ambient";
import { Marquee } from "./components/Marquee";
import { About } from "./components/About";
import { Teach } from "./components/Teach";
import { Lessons } from "./components/Lessons";
import { Enroll } from "./components/Enroll";
import { Footer } from "./components/Footer";

const GuitarShowcase = lazy(() =>
  import("./components/GuitarShowcase").then((m) => ({
    default: m.GuitarShowcase,
  }))
);

export default function App() {
  return (
    <>
      <Ambient />
      <Nav />
      <main>
        <Hero />
        <Suspense
          fallback={<div className="showcase-fallback" aria-hidden="true" />}
        >
          <GuitarShowcase />
        </Suspense>
        <Marquee />
        <About />
        <Marquee />
        <Teach />
        <Lessons />
        <Enroll />
      </main>
      <Footer />
    </>
  );
}
