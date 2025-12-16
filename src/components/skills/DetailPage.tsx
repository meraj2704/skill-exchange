"use client";

import { useState } from "react";
import { MentorCard } from "../custom-ui/cards/mentor-card";
import { ReviewCard } from "../custom-ui/cards/review-card";


interface Mentor {
  name: string;
  rating: number;
  certifications: string[];
  slug: string;
}

interface Review {
  reviewer: string;
  comment: string;
  rating: number;
}

const mentorsData: Mentor[] = [
  { name: "Alice Johnson", rating: 4.9, certifications: ["React", "UI/UX"], slug: "alice-johnson" },
  { name: "Bob Smith", rating: 4.8, certifications: ["React", "Node.js"], slug: "bob-smith" },
];

const reviewsData: Review[] = [
  { reviewer: "John Doe", comment: "Learned React easily!", rating: 5 },
  { reviewer: "Jane Smith", comment: "Excellent mentor with clear explanations.", rating: 4.8 },
];

export default function SkillDetailPage() {
  const [requestSent, setRequestSent] = useState(false);

  return (
    <main className="mx-auto max-w-7xl px-6 py-14">
      {/* Skill Header */}
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold text-foreground">React Basics</h1>
        <p className="mt-2 text-slate-500">Category: Web Development</p>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
          Learn the fundamentals of React, build interactive UIs, and grow your web development skills.
        </p>

        <button
          onClick={() => setRequestSent(true)}
          disabled={requestSent}
          className={`mt-6 rounded-2xl px-8 py-4 font-semibold shadow-lg transition ${
            requestSent
              ? "bg-slate-300 text-slate-700 cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:opacity-90"
          }`}
        >
          {requestSent ? "Request Sent" : "Request to Learn"}
        </button>
      </section>

      {/* Mentors */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-foreground mb-6">Available Mentors</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mentorsData.map((mentor) => (
            <MentorCard key={mentor.slug} {...mentor} />
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">Learner Reviews</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {reviewsData.map((review, idx) => (
            <ReviewCard key={idx} {...review} />
          ))}
        </div>
      </section>
    </main>
  );
}
