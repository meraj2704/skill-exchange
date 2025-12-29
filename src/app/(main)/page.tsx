"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Star, 
  Search, 
  Award, 
  MessageSquare 
} from "lucide-react";

export default function LandingPage() {
  const [data, setData] = useState({ userCount: 0, topMentors: [], totalExchanges: 0 });
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetch("/api/landing-stats")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const steps = [
    { title: "Find Expertise", desc: "Search through thousands of verified skills from React to Pottery.", icon: <Search className="w-6 h-6" /> },
    { title: "Connect & Chat", desc: "Send a request and start a conversation with your potential mentor.", icon: <MessageSquare className="w-6 h-6" /> },
    { title: "Exchange & Grow", desc: "Complete sessions, earn points, and build your digital credibility.", icon: <Zap className="w-6 h-6" /> }
  ];

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-8"
          >
            <Users className="w-4 h-4" />
            <span>Join {data.userCount}+ Experts & Learners</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1]"
          >
            Skills are the <br />
            <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
              New Currency.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground"
          >
            {"Don't "}just watch videos. Learn directly from real people. 
            Trade your expertise for the knowledge {"you've"} always wanted.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link href="/skills" className="group rounded-2xl bg-primary px-10 py-5 text-primary-foreground font-bold shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-2">
              Explore Skills <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/offer-skill" className="rounded-2xl border border-border bg-background px-10 py-5 font-bold hover:bg-muted transition-all text-center">
              Become a Mentor
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="border-y border-border bg-muted/30">
        <div className="container mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-4xl font-bold">{data.userCount}+</p>
            <p className="text-sm text-muted-foreground uppercase tracking-widest mt-1">Active Users</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold">{data.totalExchanges}+</p>
            <p className="text-sm text-muted-foreground uppercase tracking-widest mt-1">Skill Exchanges</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold">98%</p>
            <p className="text-sm text-muted-foreground uppercase tracking-widest mt-1">Success Rate</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold">FREE</p>
            <p className="text-sm text-muted-foreground uppercase tracking-widest mt-1">Always Peer-to-Peer</p>
          </div>
        </div>
      </section>

      {/* 3. BENTO GRID FEATURES */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Built for Real Learning</h2>
          <p className="text-muted-foreground mt-4">Everything you need to grow your career without the tuition debt.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 p-8 border border-primary/10">
            <ShieldCheck className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-2xl font-bold mb-3">Verified Credibility</h3>
            <p className="text-muted-foreground text-lg max-w-md">
              Every mentor undergoes a peer-review process. When you learn here, you get real-world 
              experience backed by community endorsements.
            </p>
          </div>
          <div className="rounded-3xl bg-muted p-8 border border-border">
            <Award className="w-12 h-12 text-secondary mb-6" />
            <h3 className="text-2xl font-bold mb-3">Skill NFT Badges</h3>
            <p className="text-muted-foreground">
              Complete sessions to earn unique digital certificates you can share on LinkedIn.
            </p>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE "HOW IT WORKS" */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-8">Ready in 3 Steps</h2>
            <div className="space-y-4">
              {steps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full flex items-start gap-6 p-6 rounded-2xl transition-all text-left border ${activeTab === idx ? 'bg-background border-primary shadow-lg scale-[1.02]' : 'border-transparent hover:bg-muted'}`}
                >
                  <div className={`p-3 rounded-xl ${activeTab === idx ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{step.title}</h4>
                    <p className="text-muted-foreground text-sm mt-1">{step.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 relative w-full aspect-square md:aspect-video lg:aspect-square bg-primary/5 rounded-3xl border border-primary/10 flex items-center justify-center p-12 overflow-hidden">
             <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-center"
                >
                  <div className="text-9xl mb-4 opacity-20 font-black text-primary">0{activeTab + 1}</div>
                  <h3 className="text-3xl font-bold text-primary">{steps[activeTab].title}</h3>
                </motion.div>
             </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 5. MENTOR SPOTLIGHT */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="text-left">
            <h2 className="text-3xl font-bold tracking-tight">Active Mentors</h2>
            <p className="text-muted-foreground">Connect with these experts right now</p>
          </div>
          <Link href="/mentors" className="group flex items-center gap-2 text-primary font-semibold">
            Explore All Mentors <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {data.topMentors.length > 0 ? (
            data.topMentors.map((mentor: any) => (
              <motion.div
                whileHover={{ y: -8 }}
                key={mentor._id}
                className="group relative rounded-3xl border border-border bg-card p-1 shadow-sm transition-all hover:shadow-2xl hover:border-primary/50"
              >
                <div className="p-7">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">
                      {mentor?.fullName[0] || ''}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{mentor.name}</h3>
                      <div className="flex items-center text-yellow-500 text-xs">
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <span className="ml-1 text-muted-foreground font-medium">5.0</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {mentor.skills?.slice(0, 2).map((s: any) => (
                      <span key={s.id} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-muted text-muted-foreground">
                        {s.name}
                      </span>
                    ))}
                  </div>
                  <Link href={`/profile/${mentor._id}`} className="block text-center w-full py-3 rounded-xl bg-muted group-hover:bg-primary group-hover:text-primary-foreground transition-colors font-bold text-sm">
                    View Portfolio
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            [1, 2, 3].map((i) => (
              <div key={i} className="h-64 animate-pulse rounded-3xl bg-muted" />
            ))
          )}
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-24 container mx-auto px-6">
        <div className="rounded-[3rem] bg-foreground text-background p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -mr-32 -mt-32" />
          <h2 className="text-4xl md:text-6xl font-black mb-8">Ready to swap skills?</h2>
          <p className="text-background/70 text-lg mb-12 max-w-xl mx-auto">
            Join the community where everyone is a student and everyone is a teacher. 
            Free forever, powered by people.
          </p>
          <Link href="/register" className="inline-block rounded-2xl bg-primary px-12 py-6 text-primary-foreground font-bold text-xl hover:scale-105 transition-transform">
            Create Your Profile
          </Link>
        </div>
      </section>
    </main>
  );
}