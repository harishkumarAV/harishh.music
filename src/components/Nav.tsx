import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./Nav.css";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#teach", label: "Teaching" },
  { href: "#packages", label: "Packages" },
  { href: "#demo", label: "Demo" },
];

export function Nav() {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`nav ${scrolled ? "nav--scrolled" : ""}`}
      initial={reduce ? false : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="nav__inner">
        <a className="nav__brand" href="#top" aria-label="harishh.music home">
          <span className="nav__eq" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className="nav__brand-text">harishh.music</span>
        </a>
        <nav className="nav__links" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="nav__cta" href="#demo">
          Demo
        </a>
      </div>
    </motion.header>
  );
}
