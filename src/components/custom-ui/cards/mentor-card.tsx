"use client";

import Link from "next/link";

interface MentorCardProps {
  name: string;
  rating: number;
  certifications: string[];
  slug: string;
}

export function MentorCard({
  name,
  rating,
  certifications,
  slug,
}: MentorCardProps) {
  return (
    <Link
      href={`/profile/${slug}`}
      className="group block rounded-2xl bg-background p-5 shadow-lg border border-border hover:shadow-2xl transition"
    >
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-slate-200" />
        <div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground">
            ⭐ {rating.toFixed(1)}
          </p>
          <p className="text-sm text-slate-500">{certifications.join(", ")}</p>
        </div>
      </div>
    </Link>
  );
}
