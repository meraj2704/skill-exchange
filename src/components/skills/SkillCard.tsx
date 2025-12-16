"use client";

import Link from "next/link";

interface SkillCardProps {
  name: string;
  category: string;
  rating: number;
  mentors: number;
  slug: string;
}

export function SkillCard({
  name,
  category,
  rating,
  mentors,
  slug,
}: SkillCardProps) {
  return (
    <Link
      href={`/skills/${slug}`}
      className="group block rounded-3xl bg-background p-6 shadow-lg border border-border hover:shadow-2xl hover:-translate-y-1 transition-transform"
    >
      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary">
        {name}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{category}</p>
      <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
        <span>⭐ {rating.toFixed(1)}</span>
        <span>👥 {mentors} Mentors</span>
      </div>
    </Link>
  );
}
