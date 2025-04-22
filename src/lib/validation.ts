import { z } from 'zod';

export const feedbackSchema = z.object({
 name: z.string().min(2, 'Name is required'),
 email: z.string().email('Invalid email'),
 role: z.string().min(1, 'Select a role'),
 suggestion: z.string().min(10, 'Suggestion must be at least 10 characters'),
});

export type FeedbackData = z.infer<typeof feedbackSchema>;