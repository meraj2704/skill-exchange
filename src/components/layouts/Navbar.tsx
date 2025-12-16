import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";


export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-bold text-lg">
          Skill Exchange
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/skills" className="hover:text-primary">
            Skills
          </Link>
          <Link href="/mentors" className="hover:text-primary">
            Mentors
          </Link>
          <Link href="/about" className="hover:text-primary">
            About
          </Link>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
