"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "../theme-toggle";
import { LayoutDashboard, User, LogOut, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [authState, setAuthState] = useState<{
    mounted: boolean;
    user: any | null;
  }>({
    mounted: false,
    user: null,
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    let parsedUser = null;

    if (savedUser) {
      try {
        parsedUser = JSON.parse(savedUser);
      } catch (e) {
        console.error("Failed to parse user", e);
      }
    }

    /**
     * Scheduling the update for the next frame solves the "synchronous" warning.
     * This ensures the state update is handled as an asynchronous event following 
     * the mounting of the component.
     */
    const timeoutId = setTimeout(() => {
      setAuthState({
        mounted: true,
        user: parsedUser,
      });
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [pathname]); // pathname added to re-check user state on navigation

  const handleLogout = () => {
    localStorage.removeItem("user");
    setAuthState((prev) => ({ ...prev, user: null }));
    setIsDropdownOpen(false);
    router.push("/");
  };

  const { mounted, user } = authState;

  // We return a placeholder or null during server-side rendering to avoid hydration errors
  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md h-[73px]">
        {/* Simple skeleton or empty div matching height to prevent layout shift */}
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        <div className="flex items-center gap-10">
          <Link href="/" className="font-black text-2xl tracking-tighter text-primary">
            SKILL<span className="text-foreground">EX</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <Link 
              href="/skills" 
              className={`transition-colors ${pathname === '/skills' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
            >
              Explore Skills
            </Link>
            <Link 
              href="/mentors" 
              className={`transition-colors ${pathname === '/mentors' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
            >
              Mentors
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          <div className="h-6 w-[1px] bg-border mx-2 hidden sm:block" />

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-muted transition-all border border-transparent hover:border-border"
              >
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-bold leading-none">{user.name}</p>
                  <p className="text-[10px] text-muted-foreground">Pro Member</p>
                </div>
                <ChevronDown size={14} className={`text-muted-foreground transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl border border-border bg-background p-2 shadow-2xl z-20 animate-in fade-in zoom-in-95 duration-200">
                    <Link 
                      href="/dashboard" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl hover:bg-muted transition-colors"
                    >
                      <LayoutDashboard size={18} className="text-primary" /> Dashboard
                    </Link>
                    <Link 
                      href="/dashboard/profile" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl hover:bg-muted transition-colors"
                    >
                      <User size={18} className="text-primary" /> Profile Settings
                    </Link>
                    <hr className="my-2 border-border" />
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link 
                href="/login" 
                className="hidden sm:block px-4 py-2 text-sm font-bold hover:text-primary transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/register" 
                className="rounded-2xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}