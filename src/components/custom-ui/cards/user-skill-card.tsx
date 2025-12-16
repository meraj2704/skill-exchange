"use client";

interface UserSkillCardProps {
  skillName: string;
  category: string;
  level: string;
}

export function UserSkillCard({ skillName, category, level }: UserSkillCardProps) {
  return (
    <div className="group rounded-3xl bg-background p-5 shadow-lg border border-border hover:shadow-2xl hover:-translate-y-1 transition-transform">
      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary">{skillName}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{category} • {level}</p>
    </div>
  );
}
