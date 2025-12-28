"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  BadgeCheck, Users, Star, MessageCircle, Loader2, 
  ArrowLeft, MapPin, Globe, Award, Lock, 
  CheckCircle2, Clock, Calendar, ShieldCheck, Zap
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SkillDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isRequesting, setIsRequesting] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

useEffect(() => {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;
  if (user) setCurrentUser(user);

  async function fetchDetailsAndStatus() {
    if (!id) return;
    try {
      const res = await fetch(`/api/skills/${id}`);
      const json = await res.json();
      if (res.ok) setData(json);

      // If logged in, check if request already exists
      if (user) {
        // You can create a small API for this or just check via a query param
        const statusRes = await fetch(`/api/requests/check?skillId=${id}&learnerId=${user.id}`);
        const statusJson = await statusRes.json();
        if (statusJson.exists) setRequestSent(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  fetchDetailsAndStatus();
}, [id]);

  // Inside your SkillDetailPage component...

const handleRequest = async () => {
  if (!currentUser) {
    router.push("/login");
    return;
  }

  setIsRequesting(true);

  try {
    const response = await fetch("/api/requests/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        skillId: id, // from useParams
        skillName: data.skillName,
        mentorId: data.mentorId,
        mentorName: data.mentorName,
        learnerId: currentUser.id, // Ensure your localStorage user object has 'id'
        learnerName: currentUser.name,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      setRequestSent(true);
      // Optional: show a success toast here
    } else if (response.status === 409) {
      alert("You have already sent a request for this skill!");
      setRequestSent(true); // Disable button since it's already sent
    } else {
      alert(result.message || "Something went wrong");
    }
  } catch (error) {
    console.error("Request failed", error);
    alert("Failed to send request. Please try again.");
  } finally {
    setIsRequesting(false);
  }
};

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  if (!data) return <div className="text-center py-20 font-bold">Skill not found</div>;

  const isOwner = currentUser?.id === data.mentorId;
  const isLoggedIn = !!currentUser;

  // DUMMY DATA FOR ATTRACTION
  const learningPoints = [
    "Core industry standards and best practices",
    "Real-world project implementation and workflows",
    "Advanced troubleshooting and optimization techniques",
    "How to build a professional portfolio in this niche"
  ];

  const curriculum = [
    { title: "Foundations & Setup", duration: "45 mins" },
    { title: "Intermediate Deep Dive", duration: "60 mins" },
    { title: "Live Q&A and Project Review", duration: "30 mins" }
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 pb-24">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-all group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Explore
        </button>
        <div className="flex gap-4">
           <span className="flex items-center gap-1 text-xs font-bold text-muted-foreground"><ShieldCheck size={14}/> Verified Mentor</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          
          {/* Skill Hero Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="bg-primary/5 border border-primary/10 rounded-[3rem] p-8 md:p-14 relative overflow-hidden"
          >
            <div className="relative z-10">
              <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                {data.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-foreground mt-6 leading-tight">
                {data.skillName}
              </h1>
              <div className="flex flex-wrap gap-6 mt-8">
                <div className="flex items-center gap-2 text-sm font-bold bg-background/50 px-3 py-1.5 rounded-xl border border-primary/10">
                  <Star size={16} className="fill-orange-500 text-orange-500" /> 4.9 (120+ reviews)
                </div>
                <div className="flex items-center gap-2 text-sm font-bold bg-background/50 px-3 py-1.5 rounded-xl border border-primary/10 uppercase">
                  <Zap size={16} className="text-primary" /> {data.level}
                </div>
              </div>
            </div>
            <div className="absolute top-[-20%] right-[-10%] w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50" />
          </motion.section>

          {/* What you'll learn */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black flex items-center gap-3">What you will learn</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {learningPoints.map((point, i) => (
                <div key={i} className="flex gap-3 items-start p-4 bg-muted/30 rounded-2xl border border-transparent hover:border-primary/20 transition-all">
                  <CheckCircle2 className="text-primary shrink-0" size={20} />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{point}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Mentor Profile */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black flex items-center gap-3">Meet your Mentor</h2>
            <div className="bg-background border border-border p-8 rounded-[2.5rem] flex flex-col md:flex-row gap-8 shadow-sm">
               <div className="h-24 w-24 rounded-3xl bg-primary/10 flex items-center justify-center text-primary text-4xl font-black shrink-0">
                 {data.mentorName?.charAt(0)}
               </div>
               <div className="space-y-4">
                 <div>
                   <h3 className="text-2xl font-bold">{data.mentorName}</h3>
                   <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                     <MapPin size={16} /> {data.mentorLocation || "Remote"} • <Globe size={16} /> Speaks English, Spanish
                   </div>
                 </div>
                 <p className="text-muted-foreground leading-relaxed italic">
                   {data.mentorBio || `I've spent over 8 years mastering ${data.skillName}. My goal is to help you skip the common mistakes and reach expert status faster.`}
                 </p>
                 <div className="flex gap-3">
                    <span className="text-xs font-bold bg-muted px-3 py-1 rounded-lg">Top 1% Mentor</span>
                    <span className="text-xs font-bold bg-muted px-3 py-1 rounded-lg">Quick Responder</span>
                 </div>
               </div>
            </div>
          </section>

          {/* Session Curriculum */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black flex items-center gap-3">Session Breakdown</h2>
            <div className="space-y-3">
              {curriculum.map((item, i) => (
                <div key={i} className="flex justify-between items-center p-5 bg-background border border-border rounded-2xl hover:bg-muted/20 transition-all">
                  <div className="flex items-center gap-4">
                    <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-black text-primary">{i+1}</span>
                    <span className="font-bold text-foreground">{item.title}</span>
                  </div>
                  <span className="text-xs font-bold text-muted-foreground flex items-center gap-1"><Clock size={12}/> {item.duration}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Action Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-6">
            <div className="bg-background border-2 border-primary/10 p-8 rounded-[2.5rem] shadow-2xl shadow-primary/5 space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Reserve a Session</h3>
                <p className="text-muted-foreground text-sm">Select this skill to request a 1-on-1 exchange with {data.mentorName}.</p>
              </div>

              <div className="space-y-4 py-4 border-y border-border">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-muted-foreground flex items-center gap-2"><Calendar size={16}/> Response Time</span>
                  <span>Under 24h</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-muted-foreground flex items-center gap-2"><Globe size={16}/> Language</span>
                  <span>English</span>
                </div>
              </div>
              
              {!isLoggedIn ? (
                <Link href="/login" className="w-full py-5 bg-foreground text-background rounded-2xl font-black flex items-center justify-center gap-2 hover:opacity-90 transition-all">
                  <Lock size={18} /> Login to Request
                </Link>
              ) : isOwner ? (
                <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-2xl border border-orange-100 dark:border-orange-900/30 text-center">
                  <p className="text-xs font-bold text-orange-600 dark:text-orange-400">You are the mentor for this skill.</p>
                </div>
              ) : (
                <button
                  onClick={handleRequest}
                  disabled={requestSent || isRequesting}
                  className={`w-full py-5 rounded-2xl font-black text-lg shadow-lg transition-all active:scale-95 ${
                    requestSent 
                    ? "bg-green-100 text-green-700 cursor-default" 
                    : "bg-primary text-primary-foreground hover:shadow-primary/20"
                  }`}
                >
                  {isRequesting ? <Loader2 className="animate-spin mx-auto" /> : requestSent ? "✓ Request Sent" : "Request to Learn"}
                </button>
              )}

              <p className="text-[10px] text-center text-muted-foreground uppercase font-black tracking-widest">
                100% Free Skill Exchange
              </p>
            </div>
            
            {/* Trust Badge */}
            <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10">
              <h4 className="text-sm font-black flex items-center gap-2 mb-2"><Award className="text-primary" size={16}/> Skill Exchange Guarantee</h4>
              <p className="text-[11px] text-muted-foreground">Every session is verified by our community to ensure quality knowledge transfer.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}