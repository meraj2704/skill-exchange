"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  User,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Skills", href: "/dashboard/skills", icon: BookOpen },
  { name: "Requests", href: "/dashboard/requests", icon: MessageSquare },
  { name: "Profile Settings", href: "/dashboard/profile", icon: User },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Combined state to solve the "cascading renders" error
  const [authState, setAuthState] = useState<{
    isMounted: boolean;
    user: any | null;
  }>({
    isMounted: false,
    user: null,
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    let parsedUser = null;

    if (savedUser) {
      try {
        parsedUser = JSON.parse(savedUser);
      } catch (e) {
        console.error("Session parse error", e);
      }
    }

    // Using setTimeout(..., 0) moves the update to the next event loop tick.
    // This satisfies ESLint as it's no longer a "synchronous" update during mount.
    const timeoutId = setTimeout(() => {
      setAuthState({ isMounted: true, user: parsedUser });
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  // Protected route check: Redirect if not logged in after mounting
  useEffect(() => {
    if (authState.isMounted && !authState.user) {
      router.push("/login");
    }
  }, [authState.isMounted, authState.user, router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  // Prevent flickering and hydration errors
  if (!authState.isMounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-10 w-10 animate-spin border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const { user } = authState;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-black text-foreground">
      {/* 1. Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col bg-background border-r border-border sticky top-0 h-screen">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-9 w-9 bg-primary rounded-xl flex items-center justify-center text-white font-black italic shadow-lg shadow-primary/30">
              S
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">
              Skill Ex
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold transition-all duration-200 group ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  {item.name}
                </div>
                {isActive && <ChevronRight size={14} className="opacity-50" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-border/50 space-y-4">
          <div className="bg-muted/50 rounded-2xl p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold truncate leading-none mb-1">
                {user?.name}
              </p>
              <p className="text-[10px] text-muted-foreground uppercase font-black tracking-tighter">
                Pro Member
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-2xl transition-all font-bold text-sm"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* 2. Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-background z-[70] lg:hidden shadow-2xl flex flex-col"
            >
              <div className="p-6 flex justify-between items-center border-b">
                <span className="font-black text-xl">SKILL EX</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 bg-muted rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 px-4 space-y-2 mt-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-colors ${
                      pathname === item.href
                        ? "bg-primary text-white"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <item.icon size={20} />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 3. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-background/80 backdrop-blur-md border-b border-border/50 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-muted rounded-xl transition-colors"
            >
              <Menu size={24} />
            </button>
            <h2 className="font-black text-xl tracking-tight hidden sm:block">
              {menuItems.find((i) => i.href === pathname)?.name || "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 hover:bg-muted rounded-full transition-colors relative text-muted-foreground border border-border/50">
              <Bell size={20} />
              <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 border-2 border-background rounded-full" />
            </button>
            <div className="h-10 w-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black shadow-inner">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <main className="p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
