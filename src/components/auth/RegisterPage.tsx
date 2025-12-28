"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import z from "zod";

import { registerSchema } from "./schema";
import { AuthCard } from "./auth-card";
import { InputField } from "../custom-ui/input/input-filed";

// Infer the type from our schema
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

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      // Success! Redirect to login
      router.push("/login?message=Account created successfully");
    } catch (error: any) {
      setServerError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted px-4">
      <AuthCard title="Create an Account">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          
          {/* Server-side Error Message */}
          {serverError && (
            <div className="p-3 text-sm text-red-500 bg-red-100 rounded-xl border border-red-200">
              {serverError}
            </div>
          )}

          <InputField
            label="Full Name"
            type="text"
            placeholder="John Doe"
            {...register("fullName")}
            error={errors.fullName?.message}
          />
          
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
          
          <InputField
            label="Confirm Password"
            type="password"
            placeholder="********"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 rounded-2xl bg-primary px-4 py-3 text-primary-foreground font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Creating Account...
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="text-sm text-muted-foreground text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Login
          </Link>
        </p>
      </AuthCard>
    </main>
  );
}