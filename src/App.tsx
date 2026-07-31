import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Teach } from "./components/Teach";
import { Lessons } from "./components/Lessons";
import { Enroll } from "./components/Enroll";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Teach />
        <Lessons />
        <Enroll />
      </main>
      <Footer />
    </>
  );
}
