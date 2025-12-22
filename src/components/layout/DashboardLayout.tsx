"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, BookOpen, Mail, Award, Settings, LogOut } from "lucide-react";
import { cn } from "@/src/lib/utils";


const sidebarItems = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "My Skills", href: "/dashboard/skills", icon: BookOpen },
  { label: "Requests", href: "/dashboard/requests", icon: Mail },
  { label: "Certificates", href: "/dashboard/certificates", icon: Award },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col border-r border-border bg-background p-6">
        <h2 className="text-xl font-bold text-primary mb-8">Skill Exchange</h2>

        <nav className="flex flex-col gap-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-6">
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-500/10 transition">
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background px-6">
          <p className="text-sm text-muted-foreground">Welcome back 👋</p>
          <div className="h-9 w-9 rounded-full bg-muted" />
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
