"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, MessageSquare, User, LogOut } from "lucide-react"; // yarn add lucide-react

const menuItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Skills", href: "/dashboard/skills", icon: BookOpen },
  { name: "Requests", href: "/dashboard/requests", icon: MessageSquare },
  { name: "Profile Settings", href: "/dashboard/profile", icon: User },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-background border-r border-border">
        <div className="p-6">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Skill Exchange
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
                  isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header (Mobile view) */}
        <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6 md:px-10">
          <h2 className="font-semibold text-lg">Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-slate-200" /> {/* Avatar Placeholder */}
          </div>
        </header>

        <main className="p-6 md:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}