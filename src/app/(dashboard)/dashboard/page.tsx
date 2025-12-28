"use client";

import { motion } from "framer-motion";

export default function DashboardPage() {
  const stats = [
    { label: "Active Skills", value: "5", color: "bg-blue-500" },
    { label: "Pending Requests", value: "3", color: "bg-orange-500" },
    { label: "Completed Sessions", value: "12", color: "bg-green-500" },
    { label: "Mentor Rating", value: "4.9", color: "bg-purple-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Good Morning, Alice! 👋</h1>
        <p className="text-muted-foreground">{"Here is what's happening with your skills today."}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label}
            className="p-6 bg-background rounded-3xl border border-border shadow-sm"
          >
            <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Activity */}
        <section className="bg-background p-6 rounded-3xl border border-border">
          <h3 className="text-lg font-bold mb-4">Recent Skill Requests</h3>
          <div className="space-y-4">
            {[1, 2].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-muted/50 rounded-2xl">
                <div>
                  <p className="font-semibold">John Doe wants to learn React Basics</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <button className="text-sm font-bold text-primary">View</button>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Tips */}
        <section className="bg-primary text-primary-foreground p-6 rounded-3xl shadow-lg">
          <h3 className="text-lg font-bold mb-2">Pro Tip! 💡</h3>
          <p className="opacity-90">
            Profiles with a detailed bio and Verified skills get 3x more requests. 
            Update your profile to stand out.
          </p>
          <button className="mt-4 bg-background text-primary px-4 py-2 rounded-xl text-sm font-bold transition hover:bg-opacity-90">
            Edit Profile
          </button>
        </section>
      </div>
    </div>
  );
}