"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import z from "zod";

import { loginSchema } from "./schema";
import { AuthCard } from "./auth-card";
import { InputField } from "../custom-ui/input/input-filed";

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const successMessage = searchParams.get("message"); // Catch message from Register redirect

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setServerError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      // --- NEW LOGIC START ---
      // 1. Store the user data in LocalStorage
      localStorage.setItem("user", JSON.stringify(result.user));

      // 2. Redirect to the Dashboard
      router.push("/dashboard");
      // --- NEW LOGIC END ---
    } catch (error: any) {
      setServerError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted px-4">
      <AuthCard title="Login to Skill Exchange">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Success Message from Registration */}
          {successMessage && (
            <div className="p-3 text-sm text-green-600 bg-green-100 rounded-xl border border-green-200">
              {successMessage}
            </div>
          )}

          {/* Error Message from Server */}
          {serverError && (
            <div className="p-3 text-sm text-red-500 bg-red-100 rounded-xl border border-red-200">
              {serverError}
            </div>
          )}

          <InputField
            label="Email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            error={errors.email?.message}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="********"
            {...register("password")}
            error={errors.password?.message}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 rounded-2xl bg-primary px-4 py-3 text-primary-foreground font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Signing in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-sm text-muted-foreground text-center mt-6">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-primary font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </AuthCard>
    </main>
  );
}
