import { useState, type FormEvent, type MouseEvent } from "react";
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

type SubmitState = "idle" | "sending" | "sent" | "error";

const CONTACT_EMAIL = "harishh.music@gmail.com";

const initial: FormState = {
  name: "",
  email: "",
  interest: "demo",
  message: "",
};

function interestLabel(value: string) {
  if (value === "beginner") return "8-Day Beginner Package (₹999)";
  if (value === "custom") {
    return "Customised Training - 8 classes / 1 month (₹1,499)";
  }
  return "Demo class";
}

/** Netlify returns a thank-you page when Forms actually handled the POST. */
function wasHandledByNetlifyForms(status: number, body: string) {
  if (status < 200 || status >= 400) return false;
  // SPA index / static detection page = Forms did NOT process this request
  if (body.includes('id="root"')) return false;
  if (body.includes("Form detection")) return false;
  // Real Netlify thank-you / empty accepted response
  if (/thank you for your submission/i.test(body)) return true;
  if (body.trim().length < 500 && !body.includes("<form")) return true;
  return /thank you/i.test(body);
}

export function Enroll() {
  const reduce = useReducedMotion();
  const [form, setForm] = useState<FormState>(initial);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [copied, setCopied] = useState(false);
  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mx}% ${my}%, rgba(255, 255, 255, 0.12), transparent 42%)`;

  function onMove(e: MouseEvent<HTMLFormElement>) {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitState("sending");

    const interest = interestLabel(form.interest);
    const isLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (isLocal) {
      const subject = encodeURIComponent(
        form.interest === "demo"
          ? `Demo class request - ${form.name}`
          : `Package enquiry - ${form.name}`
      );
      const body = encodeURIComponent(
        [
          `Name: ${form.name}`,
          `Email: ${form.email}`,
          `Interest: ${interest}`,
          `Message: ${form.message || "(none)"}`,
        ].join("\n")
      );
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      setSubmitState("idle");
      return;
    }

    const formData = new FormData(e.currentTarget);
    formData.set("form-name", "enquiry");
    formData.set("bot-field", "");
    formData.set("interest", interest);
    formData.set("message", form.message || "(none)");

    const encoded = new URLSearchParams();
    formData.forEach((value, key) => {
      if (typeof value === "string") encoded.append(key, value);
    });

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encoded.toString(),
      });
      const text = await res.text();

      if (!wasHandledByNetlifyForms(res.status, text)) {
        throw new Error("Netlify Forms did not accept this submission");
      }

      setSubmitState("sent");
      setForm(initial);
    } catch {
      setSubmitState("error");
    }
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
          name="enquiry"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={onSubmit}
          onMouseMove={onMove}
          style={{ backgroundImage: reduce ? undefined : spotlight }}
          variants={fadeScale(reduce, 0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <input type="hidden" name="form-name" value="enquiry" />
          <p className="enroll__honeypot" aria-hidden="true">
            <label>
              Don’t fill this out: <input name="bot-field" tabIndex={-1} />
            </label>
          </p>

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

          {submitState === "sent" && (
            <p className="enroll__status enroll__status--ok" role="status">
              Sent. I’ll get back to you soon.
            </p>
          )}

          {submitState === "error" && (
            <p className="enroll__status enroll__status--err" role="alert">
              Couldn’t send from here. Email{" "}
              <button
                type="button"
                className="enroll__email-btn"
                onClick={copyEmail}
              >
                {copied ? "Copied!" : CONTACT_EMAIL}
              </button>
            </p>
          )}

          <button
            className="btn btn--primary enroll__submit"
            type="submit"
            disabled={submitState === "sending"}
          >
            {submitState === "sending"
              ? "Sending…"
              : form.interest === "demo"
                ? "Book a demo"
                : "Send enquiry"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
