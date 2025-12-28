"use client";

import { useState, useEffect } from "react";
import {
  Search,
  BookOpen,
  User,
  Star,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link"; // Added Link

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    async function fetchExploreSkills() {
      setLoading(true);
      try {
        const res = await fetch(`/api/skills/all?category=${category}`);
        const data = await res.json();
        setSkills(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchExploreSkills();
  }, [category]);

  const filteredSkills = skills.filter((s: any) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-background pb-20">
      <section className="bg-primary/5 py-16 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            What do you want to <span className="text-primary">learn</span>{" "}
            today?
          </motion.h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse thousands of skills shared by experts in our community.
            Connect, exchange, and grow together.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 -mt-8">
        <div className="bg-background border border-border p-2 rounded-3xl shadow-xl flex flex-col md:flex-row gap-2">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={20}
            />
            <input
              type="text"
              placeholder="Search skills (e.g. Next.js, UI Design...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-muted/50 focus:bg-background outline-none transition"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-6 py-4 rounded-2xl bg-muted/50 font-semibold outline-none cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Web Development">Web Development</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Data Science">Data Science</option>
          </select>
        </div>

        <div className="mt-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <Loader2 className="animate-spin text-primary mb-4" size={40} />
              <p>Finding the best skills for you...</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill: any, i: number) => (
                  <Link key={i} href={`/skills/${skill.id}`} className="block">
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ y: -5 }}
                      className="group bg-background border border-border rounded-3xl p-6 hover:border-primary/50 hover:shadow-2xl transition-all cursor-pointer h-full flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div className="p-3 bg-primary/10 text-primary rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors">
                            <BookOpen size={24} />
                          </div>
                          <div className="flex items-center gap-1 text-sm font-bold text-orange-500">
                            <Star size={16} fill="currentColor" />{" "}
                            {skill.rating || 4.8}
                          </div>
                        </div>

                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                          {skill.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-1">
                          {skill.category}
                        </p>
                      </div>

                      <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center border border-border overflow-hidden">
                            <User size={14} className="text-muted-foreground" />
                          </div>
                          <span className="text-xs font-bold text-foreground truncate max-w-[100px]">
                            {skill.mentorName}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                          View Details <ArrowRight size={14} />
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </AnimatePresence>
            </div>
          )}

          {!loading && filteredSkills.length === 0 && (
            <div className="text-center py-20 bg-muted/20 rounded-[3rem] border border-dashed border-border">
              <p className="text-xl text-muted-foreground font-medium">
                No skills found.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-4 text-primary font-bold hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
