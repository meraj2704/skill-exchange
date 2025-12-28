import { motion } from "framer-motion";
export default function AddSkillModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-background w-full max-w-md rounded-3xl shadow-2xl p-8 border border-border"
      >
        <h2 className="text-2xl font-bold mb-6">Add New Skill</h2>
        <form className="space-y-4">
          <div>
            <label className="text-sm font-semibold mb-2 block">
              Skill Name
            </label>
            <input
              type="text"
              placeholder="e.g. Next.js, Figma, etc."
              className="w-full p-3 rounded-xl border bg-muted outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">Category</label>
            <select className="w-full p-3 rounded-xl border bg-muted outline-none">
              <option>Web Development</option>
              <option>Design</option>
              <option>Marketing</option>
              <option>Data Science</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">
              Proficiency Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["Beginner", "Intermediate", "Expert"].map((l) => (
                <button
                  key={l}
                  type="button"
                  className="py-2 text-sm rounded-lg border hover:bg-primary hover:text-white transition"
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
              className="flex-1 py-3 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg hover:opacity-90 transition"
            >
              Save Skill
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
