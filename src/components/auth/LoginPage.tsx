"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";
import { loginSchema } from "./schema";
import { AuthCard } from "./auth-card";
import { InputField } from "../custom-ui/input/input-filed";
import z from "zod";

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login data:", data);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted">
      <AuthCard title="Login to Skill Exchange">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
            className="w-full rounded-2xl bg-primary px-4 py-3 text-primary-foreground font-semibold hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-muted-foreground text-center mt-4">
          Don’t have an account?{" "}
          <Link href="/register" className="text-primary font-medium">
            Register
          </Link>
        </p>
      </AuthCard>
    </main>
  );
}
