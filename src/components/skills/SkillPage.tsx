"use client";

import { useState } from "react";
import { SkillFilter } from "./SkillFilter";
import { SkillCard } from "./SkillCard";


interface Skill {
  name: string;
  category: string;
  rating: number;
  mentors: number;
  slug: string;
}

const skillsData: Skill[] = [
  {
    name: "React Basics",
    category: "Web Development",
    rating: 4.8,
    mentors: 12,
    slug: "react-basics",
  },
  {
    name: "UI/UX Design",
    category: "UI/UX",
    rating: 4.7,
    mentors: 8,
    slug: "ui-ux-design",
  },
  {
    name: "Data Analysis",
    category: "Data Science",
    rating: 4.9,
    mentors: 5,
    slug: "data-analysis",
  },
  {
    name: "Digital Marketing",
    category: "Marketing",
    rating: 4.6,
    mentors: 10,
    slug: "digital-marketing",
  },
];

export default function SkillsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filteredSkills = skillsData.filter(
    (skill) =>
      skill.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || skill.category === category)
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-14">
      <h1 className="text-3xl font-bold text-foreground mb-6 text-center">
        Explore Skills
      </h1>

      <SkillFilter
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        category={category}
        onCategoryChange={(e) => setCategory(e.target.value)}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill) => (
            <SkillCard key={skill.slug} {...skill} />
          ))
        ) : (
          <p className="text-center text-slate-500 col-span-full">
            No skills found.
          </p>
        )}
      </div>
    </main>
  );
}
