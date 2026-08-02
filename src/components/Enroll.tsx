import { useEffect, useState, type FormEvent, type MouseEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { fadeScale, fadeUp } from "../lib/motion";
import "./Enroll.css";

type FormState = {
  name: string;
  email: string;
  interest: string;
  message: string;
};

const CONTACT_EMAIL = "harishh.music@gmail.com";

const initial: FormState = {
  name: "",
  email: "",
  interest: "demo",
  message: "",
};

function isInAppBrowser() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  return /Instagram|FBAN|FBAV|FB_IAB|Line\/|LinkedInApp|Twitter|X\/|Snapchat|TikTok|Bytedance|MicroMessenger/i.test(
    ua
  );
}

export function Enroll() {
  const reduce = useReducedMotion();
  const [form, setForm] = useState<FormState>(initial);
  const [inApp, setInApp] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mx}% ${my}%, rgba(255, 255, 255, 0.12), transparent 42%)`;

  useEffect(() => {
    setInApp(isInAppBrowser());
  }, []);

  function onMove(e: MouseEvent<HTMLFormElement>) {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  function buildMail(formData: FormState) {
    const interestLabel =
      formData.interest === "beginner"
        ? "8-Day Beginner Package (₹999)"
        : formData.interest === "custom"
          ? "Customised Training - 8 classes / 1 month (₹1,499)"
          : "Demo class";

    const subjectRaw =
      formData.interest === "demo"
        ? `Demo class request - ${formData.name}`
        : `Package enquiry - ${formData.name}`;

    const bodyRaw = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Interest: ${interestLabel}`,
      `Message: ${formData.message || "(none)"}`,
    ].join("\n");

    const subject = encodeURIComponent(subjectRaw);
    const body = encodeURIComponent(bodyRaw);

    return {
      subjectRaw,
      bodyRaw,
      mailto: `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`,
      gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${subject}&body=${body}`,
    };
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setStatus(`Email me at ${CONTACT_EMAIL}`);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const mail = buildMail(form);

    // Instagram / in-app browsers block mailto — open Gmail compose instead
    if (inApp || isInAppBrowser()) {
      setStatus(
        "Opening Gmail… If it doesn’t open, copy the email below or open this site in Chrome / Safari."
      );
      window.location.assign(mail.gmail);
      return;
    }

    window.location.href = mail.mailto;
  }

  return (
    <section className="enroll section" id="demo">
      <div className="enroll__aura" aria-hidden="true" />
      <div className="section__inner">
        <motion.div
          variants={fadeUp(reduce)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="section__eyebrow">Get started</p>
          <h2 className="section__title">Ready when you are.</h2>
          <p className="section__lede">
            Reach out for a demo or package enquiry. I'll get back with
            availability.
          </p>
        </motion.div>

        <motion.form
          className="card enroll__form"
          onSubmit={onSubmit}
          onMouseMove={onMove}
          style={{ backgroundImage: reduce ? undefined : spotlight }}
          variants={fadeScale(reduce, 0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <label className="field">
            <span>Name</span>
            <input
              required
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>

          <label className="field">
            <span>Email</span>
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>

          <label className="field">
            <span>I'm interested in</span>
            <select
              name="interest"
              value={form.interest}
              onChange={(e) => setForm({ ...form, interest: e.target.value })}
            >
              <option value="demo">Demo class</option>
              <option value="beginner">8-Day Beginner Package - ₹999</option>
              <option value="custom">
                Customised Training - 8 classes / 1 month - ₹1,499
              </option>
            </select>
          </label>

          <label className="field">
            <span>Message</span>
            <textarea
              name="message"
              rows={3}
              placeholder="Anything you'd like me to know…"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </label>

          {inApp && (
            <p className="enroll__tip">
              Opened from Instagram? Tap submit to continue in Gmail, or copy{" "}
              <button
                type="button"
                className="enroll__email-btn"
                onClick={copyEmail}
              >
                {copied ? "Copied!" : CONTACT_EMAIL}
              </button>
            </p>
          )}

          {status && <p className="enroll__status">{status}</p>}

          <button className="btn btn--primary enroll__submit" type="submit">
            {form.interest === "demo" ? "Book demo via email" : "Send enquiry"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
