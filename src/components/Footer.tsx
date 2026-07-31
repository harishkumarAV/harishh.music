import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__brand">harishh.music</p>
        <p className="footer__tag">
          Guitar lessons & song covers — taught with feel.
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
          <a href="mailto:hello@harishh.music">Email</a>
        </div>
        <p className="footer__copy">
          Copyright © {new Date().getFullYear()} harishh.music. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
