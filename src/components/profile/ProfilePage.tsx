"use client";

import { UserReviewCard } from "../custom-ui/cards/user-review-card";
import { UserSkillCard } from "../custom-ui/cards/user-skill-card";
import { ProfileHeader } from "./ProfileHeader";

const skillsData = [
  { skillName: "React Basics", category: "Web Development", level: "Beginner" },
  { skillName: "UI/UX Design", category: "Design", level: "Intermediate" },
  { skillName: "Data Analysis", category: "Data Science", level: "Beginner" },
];

const reviewsData = [
  {
    reviewer: "John Doe",
    comment: "Amazing mentor, very clear explanations.",
    rating: 5,
  },
  {
    reviewer: "Jane Smith",
    comment: "Learnt a lot in a short time!",
    rating: 4.8,
  },
];

export default function UserProfilePage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-14">
      {/* Profile Header */}
      <ProfileHeader name="Alice Johnson" role="Mentor" rating={4.9} />

      {/* Skills Section */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Skills Offered
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillsData.map((skill, idx) => (
            <UserSkillCard key={idx} {...skill} />
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Learner Reviews
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {reviewsData.map((review, idx) => (
            <UserReviewCard key={idx} {...review} />
          ))}
        </div>
      </section>
    </main>
  );
}
