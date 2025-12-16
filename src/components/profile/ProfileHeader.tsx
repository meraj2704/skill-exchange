"use client";

import { ReactNode } from "react";

interface ProfileHeaderProps {
  avatar?: ReactNode;
  name: string;
  role: "Mentor" | "Learner";
  rating: number;
}

export function ProfileHeader({
  avatar,
  name,
  role,
  rating,
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center mb-12">
      {avatar ? (
        <div className="w-28 h-28 rounded-full overflow-hidden mb-4">
          {avatar}
        </div>
      ) : (
        <div className="w-28 h-28 rounded-full bg-slate-200 mb-4" />
      )}
      <h1 className="text-3xl font-bold text-foreground">{name}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{role}</p>
      <p className="mt-2 text-slate-500">⭐ {rating.toFixed(1)}</p>
    </div>
  );
}
