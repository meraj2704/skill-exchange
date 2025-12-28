"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Search, BookOpen, Trash2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AddSkillModal from "@/src/components/dashboard/my-skils-add-modal";

interface Skill {
  id: string;
  skillName: string;
  category: string;
  level: string;
}

export default function MySkillsPage() {
  const [isAdding, setIsAdding] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchSkills = useCallback(async () => {
    try {
      const savedUser = localStorage.getItem("user");
      if (!savedUser) return;
      const user = JSON.parse(savedUser);

      const response = await fetch(`/api/skills?userId=${user.id}`);
      const data = await response.json();

      if (response.ok) {
        setSkills(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const handleDelete = async (skillId: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    try {
      const savedUser = localStorage.getItem("user");
      if (!savedUser) return;
      const user = JSON.parse(savedUser);

      const response = await fetch("/api/skills", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          skillId: skillId,
        }),
      });

      if (response.ok) {
        setSkills((prev) => prev.filter((s) => s.id !== skillId));
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while deleting the skill.");
    }
  };

  const filteredSkills = skills.filter((skill) =>
    skill.skillName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Skills</h1>
          <p className="text-muted-foreground">
            Manage the skills you want to teach or showcase.
          </p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-2xl font-bold hover:opacity-90 transition shadow-lg shadow-primary/20"
        >
          <Plus size={20} />
          Add New Skill
        </button>
      </div>

      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={18}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search your skills..."
          className="w-full pl-12 pr-4 py-3 rounded-2xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition"
        />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="animate-spin text-primary mb-4" size={40} />
          <p className="text-muted-foreground">Loading your skills...</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={skill.id}
                className="group p-6 bg-background rounded-3xl border border-border shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                    <BookOpen size={24} />
                  </div>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="text-muted-foreground hover:text-red-500 transition-colors p-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <h3 className="text-lg font-bold">{skill.skillName}</h3>
                <p className="text-sm text-muted-foreground">
                  {skill.category}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${
                      skill.level === "Expert"
                        ? "bg-green-100 text-green-700"
                        : skill.level === "Intermediate"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {skill.level}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {!loading && filteredSkills.length === 0 && (
        <div className="text-center py-20 bg-background rounded-3xl border border-dashed border-border">
          <p className="text-muted-foreground">
            {searchQuery
              ? "No matching skills found."
              : "You haven't added any skills yet."}
          </p>
        </div>
      )}

      {isAdding && (
        <AddSkillModal
          onClose={() => setIsAdding(false)}
          onSkillAdded={() => {
            fetchSkills();
            setIsAdding(false);
          }}
        />
      )}
    </div>
  );
}