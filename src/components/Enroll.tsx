import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const interestLabel =
      form.interest === "beginner"
        ? "8-Day Beginner Package (₹999)"
        : form.interest === "custom"
          ? "Customised Training (₹1,499)"
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
    window.location.href = `mailto:hello@harishh.music?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section className="enroll section" id="demo">
      <div className="section__inner">
        <motion.div
          variants={fadeUp(reduce)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="section__eyebrow">Get started</p>
          <h2 className="section__title">Book a demo. Or enquire.</h2>
          <p className="section__lede">
            Attend a demo class first, see how it fits, then enroll in a package
            by mailing me. I’ll reply with availability.
          </p>
        </motion.div>

        <motion.form
          className="card enroll__form"
          onSubmit={onSubmit}
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
            <span>I’m interested in</span>
            <select
              name="interest"
              value={form.interest}
              onChange={(e) => setForm({ ...form, interest: e.target.value })}
            >
              <option value="demo">Demo class</option>
              <option value="beginner">8-Day Beginner Package - ₹999</option>
              <option value="custom">Customised Training - ₹1,499</option>
            </select>
          </label>

          <label className="field">
            <span>Message</span>
            <textarea
              name="message"
              rows={3}
              placeholder="Anything you’d like me to know…"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </label>

          <button className="btn btn--primary enroll__submit" type="submit">
            {form.interest === "demo" ? "Book demo via email" : "Send enquiry"}
          </button>

          {sent && (
            <p className="enroll__note" role="status">
              Opening your email app. If nothing opens, message @harishh.music
              on Instagram.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
