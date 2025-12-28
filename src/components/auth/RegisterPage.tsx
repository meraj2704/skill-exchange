"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import z from "zod";

import { registerSchema } from "./schema";
import { InputField } from "../custom-ui/input/input-filed";

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setServerError(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Registration failed");

      router.push("/login?message=Welcome to the community! Please login.");
    } catch (error: any) {
      setServerError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left Side: Visual/Branding Section (Hidden on Mobile) */}
      <section className="hidden lg:flex flex-col justify-between p-12 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-white blur-[120px]" />
        </div>

        <div className="relative z-10">
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            Skill Exchange
          </Link>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-20 text-5xl font-extrabold leading-tight"
          >
            Start your journey <br /> with real experts.
          </motion.h2>
          <ul className="mt-10 space-y-4">
            {[
              "Access to 10,000+ verified mentors",
              "Earn certificates for every skill learned",
              "Connect with a global learning community"
            ].map((text, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="flex items-center gap-3 text-lg opacity-90"
              >
                <CheckCircle2 size={20} className="text-secondary" /> {text}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20">
          <p className="italic text-lg">
            {"This platform changed how I learn. I found a mentor in 2 days and built my first React app in a week!"}
          </p>
          <p className="mt-4 font-bold">— Sarah Jenkins, Junior Developer</p>
        </div>
      </section>

      {/* Right Side: The Form */}
      <section className="flex flex-col items-center justify-center p-8 sm:p-12 lg:p-20">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
            <p className="text-muted-foreground mt-2">
              {"Join the world's largest peer-to-peer skill marketplace."}
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {serverError && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 text-sm text-red-500 bg-red-50 rounded-2xl border border-red-100 flex items-center gap-3"
              >
                <span className="h-2 w-2 rounded-full bg-red-500" />
                {serverError}
              </motion.div>
            )}

            <div className="space-y-4">
              <InputField
                label="Full Name"
                {...register("fullName")}
                error={errors.fullName?.message}
                placeholder="Enter your name"
              />
              
              <InputField
                label="Email"
                type="email"
                {...register("email")}
                error={errors.email?.message}
                placeholder="name@company.com"
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Password"
                  type="password"
                  {...register("password")}
                  error={errors.password?.message}
                  placeholder="••••••••"
                />
                <InputField
                  label="Confirm"
                  type="password"
                  {...register("confirmPassword")}
                  error={errors.confirmPassword?.message}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full group relative rounded-2xl bg-primary px-4 py-4 text-primary-foreground font-bold hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Creating account...
                </div>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Get Started <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-bold hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}