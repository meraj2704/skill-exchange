"use client";

import { useState } from "react";
import { User, Mail, Shield, Camera, Save, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);

  // Lazy initialization: No useEffect needed, avoids cascading renders
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        return {
          id: parsed.id || "",
          fullName: parsed.name || "",
          email: parsed.email || "",
          bio: parsed.bio || "",
          location: parsed.location || "",
        };
      }
    }
    return { id: "", fullName: "", email: "", bio: "", location: "" };
  });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const result = await response.json();

      if (response.ok) {
        // Update LocalStorage so the Navbar/Sidebar update too
        const updatedLocalStorage = { 
            ...JSON.parse(localStorage.getItem("user") || "{}"), 
            name: user.fullName,
            bio: user.bio,
            location: user.location
        };
        localStorage.setItem("user", JSON.stringify(updatedLocalStorage));
        alert("Profile updated successfully!");
      } else {
        alert(result.message || "Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your public identity and account details.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left: Avatar Card */}
        <section className="lg:col-span-1 flex flex-col items-center p-8 bg-background border border-border rounded-3xl h-fit shadow-sm">
          <div className="relative group">
            <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center text-primary text-4xl font-bold border-4 border-background shadow-xl">
              {user.fullName.charAt(0).toUpperCase()}
            </div>
            <button className="absolute bottom-1 right-1 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition active:scale-95">
              <Camera size={16} />
            </button>
          </div>
          <h3 className="mt-4 font-bold text-lg">{user.fullName}</h3>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </section>

        {/* Right: Forms */}
        <div className="lg:col-span-2 space-y-6">
          <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-background border border-border rounded-3xl shadow-sm"
          >
            <div className="flex items-center gap-2 mb-6 text-primary font-bold">
              <User size={20} />
              <h2 className="text-foreground">Personal Information</h2>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Full Name</label>
                  <input 
                    type="text" 
                    value={user.fullName}
                    onChange={(e) => setUser({...user, fullName: e.target.value})}
                    className="w-full p-3 rounded-xl border bg-muted focus:ring-2 focus:ring-primary/20 outline-none transition"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Location</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Dhaka, Bangladesh"
                    value={user.location}
                    onChange={(e) => setUser({...user, location: e.target.value})}
                    className="w-full p-3 rounded-xl border bg-muted focus:ring-2 focus:ring-primary/20 outline-none transition"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Professional Bio</label>
                <textarea 
                  rows={4}
                  value={user.bio}
                  onChange={(e) => setUser({...user, bio: e.target.value})}
                  placeholder="Share your expertise and what you're looking to learn..."
                  className="w-full p-3 rounded-xl border bg-muted focus:ring-2 focus:ring-primary/20 outline-none transition resize-none"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-2xl font-bold hover:opacity-90 transition disabled:opacity-50 shadow-lg shadow-primary/20"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                  Save Changes
                </button>
              </div>
            </form>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 bg-background border border-border rounded-3xl shadow-sm"
          >
            <div className="flex items-center gap-2 mb-6 text-primary font-bold">
              <Shield size={20} />
              <h2 className="text-foreground">Security & Account</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-2xl border border-border">
                <div>
                  <p className="text-sm font-bold">Email Address</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <button className="text-xs font-bold text-primary hover:underline">Change</button>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-2xl border border-border">
                <div>
                  <p className="text-sm font-bold">Password</p>
                  <p className="text-xs text-muted-foreground">••••••••••••</p>
                </div>
                <button className="text-xs font-bold text-primary hover:underline">Reset</button>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}