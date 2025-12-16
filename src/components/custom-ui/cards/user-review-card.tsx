"use client";

interface UserReviewCardProps {
  reviewer: string;
  comment: string;
  rating: number;
}

export function UserReviewCard({ reviewer, comment, rating }: UserReviewCardProps) {
  return (
    <div className="rounded-2xl bg-background p-5 shadow-sm border border-border">
      <p className="text-slate-700">“{comment}”</p>
      <p className="mt-3 text-sm font-semibold text-foreground">— {reviewer}, ⭐ {rating.toFixed(1)}</p>
    </div>
  );
}
