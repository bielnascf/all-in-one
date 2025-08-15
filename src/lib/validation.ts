import { z } from 'zod';

export const feedbackSchema = z.object({
 name: z.string().min(2, 'Name is required'),
 email: z.string().email('Invalid email'),
 role: z.string().min(1, 'Select a role'),
 suggestion: z.string().min(10, 'Suggestion must be at least 10 characters'),
});

export const signUpSchema = z.object({
 username: z.string().min(2, "Username is required"),
 email: z.string().email("Invalid email"),
 password: z.string().min(8, "Password must be at least 8 characters"),
 confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters"),
})
.refine((data) => data.password === data.confirmPassword, {
 message: "Passwords do not match",
 path: ["confirmPassword"],
})

export const loginSchema = z.object({
 email: z.string().email("Invalid email"),
 password: z.string().min(8, "Password must be at least 8 characters"),
})

export type SignUpData = z.infer<typeof signUpSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type FeedbackData = z.infer<typeof feedbackSchema>;