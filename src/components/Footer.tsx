import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__brand">harishh.music</p>
        <p className="footer__tag">
          Learn guitar. Keep the music personal.
        </p>
        <div className="footer__links">
          <a
            href="https://www.instagram.com/harishh.music/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a href="#demo">Book a demo</a>
          <a href="mailto:avhk2003@gmail.com">Mail</a>
        </div>
        <p className="footer__copy">
          Copyright © {new Date().getFullYear()} harishh.music. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
