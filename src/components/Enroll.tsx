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

const initial: FormState = {
  name: "",
  email: "",
  interest: "demo",
  message: "",
};

export function Enroll() {
  const reduce = useReducedMotion();
  const [form, setForm] = useState<FormState>(initial);
  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mx}% ${my}%, rgba(61, 169, 255, 0.16), transparent 42%)`;

  function onMove(e: MouseEvent<HTMLFormElement>) {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const interestLabel =
      form.interest === "beginner"
        ? "8-Day Beginner Package (₹999)"
        : form.interest === "custom"
          ? "Customised Training - 8 classes / 1 month (₹1,499)"
          : "Demo class";

    const subject = encodeURIComponent(
      form.interest === "demo"
        ? `Demo class request - ${form.name}`
        : `Package enquiry - ${form.name}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Interest: ${interestLabel}`,
        `Message: ${form.message || "(none)"}`,
      ].join("\n")
    );
    window.location.href = `mailto:harishh.music@gmail.com?subject=${subject}&body=${body}`;
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

          <button className="btn btn--primary enroll__submit" type="submit">
            {form.interest === "demo" ? "Book demo via email" : "Send enquiry"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
