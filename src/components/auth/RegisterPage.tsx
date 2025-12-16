"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";
import { registerSchema } from "./schema";
import { AuthCard } from "./auth-card";
import { InputField } from "../custom-ui/input/input-filed";
import z from "zod";

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log("Register data:", data);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted">
      <AuthCard title="Create an Account">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
            className="w-full rounded-2xl bg-primary px-4 py-3 text-primary-foreground font-semibold hover:opacity-90 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-muted-foreground text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium">
            Login
          </Link>
        </p>
      </AuthCard>
    </main>
  );
}
