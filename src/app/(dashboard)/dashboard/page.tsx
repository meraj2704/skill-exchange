"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Zap, Clock, CheckCircle, Star, 
  ArrowRight, Sparkles, LayoutGrid, Loader2,
  TrendingUp, Award
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user.id) return;

      try {
        const res = await fetch(`/api/dashboard?userId=${user.id}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={40} />
    </div>
  );

  const stats = [
    { label: "Active Skills", value: data?.stats.activeSkills, icon: <LayoutGrid size={20}/>, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Pending Requests", value: data?.stats.pending, icon: <Clock size={20}/>, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Completed", value: data?.stats.completed, icon: <CheckCircle size={20}/>, color: "text-green-500", bg: "bg-green-50" },
    { label: "Avg Rating", value: data?.stats.rating, icon: <Star size={20}/>, color: "text-purple-500", bg: "bg-purple-50" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      {/* Welcome Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
            Hey, {data?.userName.split(' ')[0]}! <motion.span animate={{ rotate: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 2 }}>👋</motion.span>
          </h1>
          <p className="text-muted-foreground mt-2 text-lg font-medium">
            Ready to share some knowledge today?
          </p>
        </div>
        <Link href="/skills" className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-transform active:scale-95">
          <Sparkles size={18} /> Explore New Skills
        </Link>
      </header>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label}
            className="p-6 bg-background rounded-[2.5rem] border border-border shadow-sm group hover:border-primary/50 transition-all"
          >
            <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <p className="text-sm text-muted-foreground font-bold uppercase tracking-wider">{stat.label}</p>
            <p className="text-4xl font-black mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Activity (Spans 2 columns) */}
        <section className="lg:col-span-2 bg-background p-8 rounded-[3rem] border border-border">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2"><TrendingUp size={20} className="text-primary"/> Recent Activity</h3>
            <Link href="/dashboard/requests" className="text-sm font-bold text-primary hover:underline">View All</Link>
          </div>
          
          <div className="space-y-4">
            {data?.recentActivity?.length > 0 ? data.recentActivity.map((req: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-5 bg-muted/30 rounded-3xl border border-transparent hover:border-border transition-all group">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black">
                    {req.learnerName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Request from {req.learnerName}</p>
                    <p className="text-sm text-muted-foreground">Wants to learn <span className="text-primary font-semibold">{req.skillName}</span></p>
                  </div>
                </div>
                <Link href="/dashboard/requests" className="p-3 bg-background rounded-xl border border-border opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={18} />
                </Link>
              </div>
            )) : (
              <p className="text-center py-10 text-muted-foreground font-medium">No recent requests.</p>
            )}
          </div>
        </section>

        {/* Quick Tips & Rating Section */}
        <div className="space-y-8">
          <section className="bg-primary text-primary-foreground p-8 rounded-[3rem] shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-xl font-black mb-3">Boost your Profile! 🚀</h3>
              <p className="opacity-90 text-sm leading-relaxed">
                Mentors with high-quality descriptions receive 3x more requests. Make sure your bio is up to date!
              </p>
              <button className="mt-6 bg-background text-primary px-6 py-3 rounded-2xl text-sm font-black transition-all hover:shadow-lg active:scale-95">
                Update Bio
              </button>
            </div>
            <Zap className="absolute right-[-20px] bottom-[-20px] size-32 opacity-10 group-hover:scale-125 transition-transform duration-500" />
          </section>

          <section className="bg-muted/30 border border-border p-8 rounded-[3rem]">
             <h4 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-4">Achievement</h4>
             <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                  <Award size={24} />
                </div>
                <div>
                  <p className="font-bold">Fast Responder</p>
                  <p className="text-xs text-muted-foreground">You respond in under 2 hours!</p>
                </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
}