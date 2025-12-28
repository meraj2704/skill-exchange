"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ModalProps {
  onClose: () => void;
  onSkillAdded: () => void; // To refresh the list on the main page
}

export default function AddSkillModal({ onClose, onSkillAdded }: ModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    skillName: "",
    category: "Web Development",
    level: "Beginner",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Get User ID from LocalStorage
      const savedUser = localStorage.getItem("user");
      const user = savedUser ? JSON.parse(savedUser) : null;

      if (!user?.id) {
        alert("Session expired. Please login again.");
        return;
      }

      // 2. Hit the API
      const response = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          ...formData,
        }),
      });

      if (!response.ok) throw new Error("Failed to add skill");

      // 3. Success Actions
      onSkillAdded(); // Refresh the parent list
      onClose();      // Close modal
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-background w-full max-w-md rounded-3xl shadow-2xl p-8 border border-border"
      >
        <h2 className="text-2xl font-bold mb-6">Add New Skill</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-semibold mb-2 block">Skill Name</label>
            <input
              required
              type="text"
              value={formData.skillName}
              onChange={(e) => setFormData({ ...formData, skillName: e.target.value })}
              placeholder="e.g. Next.js, Figma, etc."
              className="w-full p-3 rounded-xl border bg-muted outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">Category</label>
            <select 
              className="w-full p-3 rounded-xl border bg-muted outline-none"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Web Development">Web Development</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Data Science">Data Science</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">Proficiency Level</label>
            <div className="grid grid-cols-3 gap-2">
              {["Beginner", "Intermediate", "Expert"].map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setFormData({ ...formData, level: l })}
                  className={`py-2 text-sm rounded-lg border transition ${
                    formData.level === l 
                      ? "bg-primary text-white border-primary" 
                      : "hover:bg-muted"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button
              onClick={onClose}
              type="button"
              className="flex-1 py-3 font-bold rounded-xl hover:bg-muted transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !formData.skillName}
              className="flex-1 py-3 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin mx-auto" /> : "Save Skill"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}