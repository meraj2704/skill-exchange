"use client";

import { useState } from "react";
import { Plus, Search, BookOpen, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AddSkillModal from "@/src/components/dashboard/my-skils-add-modal";

export default function MySkillsPage() {
  const [isAdding, setIsAdding] = useState(false);
  
  // Mock data - eventually this comes from your MongoDB fetch
  const [skills, setSkills] = useState([
    { id: 1, name: "React Basics", category: "Web Development", level: "Advanced" },
    { id: 2, name: "UI Design", category: "Design", level: "Intermediate" },
  ]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Skills</h1>
          <p className="text-muted-foreground">Manage the skills you want to teach or showcase.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-2xl font-bold hover:opacity-90 transition"
        >
          <Plus size={20} />
          Add New Skill
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <input 
          type="text" 
          placeholder="Search your skills..." 
          className="w-full pl-12 pr-4 py-3 rounded-2xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition"
        />
      </div>

      {/* Skills Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {skills.map((skill) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={skill.id}
              className="group p-6 bg-background rounded-3xl border border-border shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                  <BookOpen size={24} />
                </div>
                <button className="text-muted-foreground hover:text-red-500 transition">
                  <Trash2 size={18} />
                </button>
              </div>
              <h3 className="text-lg font-bold">{skill.name}</h3>
              <p className="text-sm text-muted-foreground">{skill.category}</p>
              
              <div className="mt-4 flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 bg-muted rounded-full uppercase tracking-wider">
                  {skill.level}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {skills.length === 0 && (
        <div className="text-center py-20 bg-background rounded-3xl border border-dashed border-border">
          <p className="text-muted-foreground">{"You haven't added any skills yet."}</p>
        </div>
      )}

      {/* Add Skill Modal (Simple implementation) */}
      {isAdding && (
        <AddSkillModal onClose={() => setIsAdding(false)} />
      )}
    </div>
  );
}