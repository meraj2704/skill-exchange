import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "ইমেইল সঠিক নয়" }),
    password: z.string().min(6, { message: "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে" }),
});

export const registerSchema = z.object({
    fullName: z.string().min(2, { message: "পূর্ণ নাম প্রয়োজন" }),
    email: z.string().email({ message: "ইমেইল সঠিক নয়" }),
    password: z.string().min(6, { message: "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে" }),
    confirmPassword: z.string().min(6, { message: "পাসওয়ার্ড নিশ্চিত করতে হবে" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "পাসওয়ার্ড মিলছে না",
    path: ["confirmPassword"],
});
