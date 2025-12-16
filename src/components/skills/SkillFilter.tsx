"use client";

import { ChangeEvent } from "react";

interface SkillFilterProps {
  search: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  category: string;
  onCategoryChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export function SkillFilter({
  search,
  onSearchChange,
  category,
  onCategoryChange,
}: SkillFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <input
        type="text"
        placeholder="Search skills..."
        value={search}
        onChange={onSearchChange}
        className="flex-1 rounded-xl border border-border px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none transition"
      />
      <select
        value={category}
        onChange={onCategoryChange}
        className="rounded-xl border border-border px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none transition"
      >
        <option value="">All Categories</option>
        <option value="Web Development">Web Development</option>
        <option value="UI/UX">UI/UX</option>
        <option value="Data Science">Data Science</option>
        <option value="Marketing">Marketing</option>
      </select>
    </div>
  );
}
