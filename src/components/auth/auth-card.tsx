"use client";

import { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
}

export function AuthCard({ children, title, subtitle, icon }: AuthCardProps) {
  return (
    <div className="relative mx-auto max-w-md rounded-3xl bg-background p-10 shadow-2xl border border-border
                    before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:bg-gradient-to-br
                    before:from-primary/10 before:to-secondary/10 hover:before:from-primary/20 hover:before:to-secondary/20
                    transition-all duration-300">
      {icon && <div className="flex justify-center mb-4">{icon}</div>}

      <h2 className="text-3xl font-extrabold text-center text-foreground">{title}</h2>

      {subtitle && (
        <p className="mt-2 text-center text-sm text-muted-foreground">{subtitle}</p>
      )}

      <div className="mt-8 flex flex-col gap-5">{children}</div>
    </div>
  );
}
