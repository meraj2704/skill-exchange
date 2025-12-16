"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <main className="bg-gradient-to-br from-background via-background to-muted text-foreground overflow-hidden">
      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-6 py-28 text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,var(--primary)_20%,transparent_60%)] opacity-20" />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold tracking-tight sm:text-6xl"
        >
          Learn & Teach Skills from{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Real People
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
        >
          Exchange knowledge, earn credibility, and grow together through real
          skill-based learning.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            href="/skills"
            className="rounded-2xl bg-primary px-8 py-4 text-primary-foreground font-semibold shadow-lg hover:opacity-90 transition"
          >
            Find a Skill
          </Link>
          <Link
            href="/offer-skill"
            className="rounded-2xl border border-border px-8 py-4 font-semibold hover:bg-muted transition"
          >
            Offer a Skill
          </Link>
        </motion.div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-background/70 backdrop-blur border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-14 grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
          {[
            ["⭐ 4.8/5", "Average Mentor Rating"],
            ["🎓 Verified", "Skill Certifications"],
            ["👥 10k+", "Active Users"],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-2xl bg-background p-6 shadow-sm">
              <p className="text-3xl font-bold">{title}</p>
              <p className="mt-1 text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="text-3xl font-bold text-center">How It Works</h2>
        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {[
            { step: "01", title: "Discover Skills", desc: "Find real people by skills, level, and reviews." },
            { step: "02", title: "Request & Learn", desc: "Send requests and learn through guided sessions." },
            { step: "03", title: "Get Certified", desc: "Pass tests, earn certificates, and build trust." },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-3xl bg-background p-10 shadow-sm hover:shadow-lg transition"
            >
              <span className="text-sm font-bold text-primary">
                STEP {item.step}
              </span>
              <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Skill Exchange */}
      <section className="bg-muted">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <h2 className="text-3xl font-bold text-center">
            Why Skill Exchange?
          </h2>
          <div className="mt-16 grid gap-10 sm:grid-cols-3">
            {[
              { title: "Verified Skills", desc: "Every skill can be tested and verified through assessments." },
              { title: "Real Reviews", desc: "Only learners who completed sessions can leave reviews." },
              { title: "Smart Matching", desc: "Find the right mentor based on skill, level, and goals." },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl bg-background p-10 shadow-sm"
              >
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentor Spotlight */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="text-3xl font-bold text-center">Top Mentors</h2>
        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {["Web Development Expert", "UI/UX Mentor", "Data Analyst"].map(
            (title, i) => (
              <div
                key={i}
                className="rounded-3xl bg-background p-8 shadow-sm hover:shadow-lg transition"
              >
                <div className="h-16 w-16 rounded-full bg-muted mb-4" />
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  ⭐ 4.{7 + i} • Certified
                </p>
                <Link
                  href="#"
                  className="mt-4 inline-block text-primary font-medium"
                >
                  View Profile →
                </Link>
              </div>
            )
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h2 className="text-3xl font-bold">What Learners Say</h2>
          <p className="mt-4 text-muted-foreground">
            Real feedback from our community
          </p>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {[
              "This platform helped me learn real-world skills with confidence.",
              "The certification and reviews make mentors truly trustworthy.",
            ].map((quote, i) => (
              <div
                key={i}
                className="rounded-3xl bg-background p-10 shadow-sm text-left"
              >
                <p>“{quote}”</p>
                <p className="mt-4 text-sm font-semibold">— Verified Learner</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-6 py-28 text-center">
        <h2 className="text-4xl font-extrabold">
          Start Learning or Teaching Today
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Join a community where skills matter more than degrees.
        </p>
        <div className="mt-10">
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-primary to-secondary px-10 py-4 text-primary-foreground font-semibold shadow-xl hover:opacity-90 transition"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-10 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Skill Exchange Platform. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
