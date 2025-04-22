"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FeedbackData, feedbackSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

export default function FormContactSection() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm<FeedbackData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      suggestion: "",
    },
  });

  const onSubmit = async (data: FeedbackData) => {
    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast({
          title: "Thank you for the feedback! 🎉",
          description: "We appreciate your message and will analyze it.",
        });
        reset();
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Unexpected error occurred";
      toast({
        title: "Something went wrong",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };
  return (
    <form
      className="flex flex-col md:flex-row gap-6 w-full max-w-5xl"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card className="border border-primary flex-1">
        <CardHeader className="text-bold text-2xl">
          <CardTitle className="text-primary">Ticket Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Ex: John Doe" {...register("name")} />
            {errors.name && (
              <p className="m-0 p-0 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Ex: johndoe@email.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="m-0 p-0 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>Tell me who you are</Label>
            <Controller
              name="role"
              control={control}
              rules={{ required: "Select a role" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="LinkedIn Visitor">
                      Just Browsing from LinkedIn
                    </SelectItem>
                    <SelectItem value="Recruiter">Tech Recruiter</SelectItem>
                    <SelectItem value="Developer">Developer</SelectItem>
                    <SelectItem value="User">Potential User</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.role && (
              <p className="m-0 p-0 text-sm text-red-500">
                {errors.role.message}
              </p>
            )}
          </div>
          <div className="text-3xl flex justify-center items-center">
            <span className="text-primary">A</span>
            <span className="text-white">I</span>
            <span className="text-primary">O</span>
          </div>
        </CardContent>
      </Card>
      <Card className="border border-primary flex-1">
        <CardHeader className="text-bold text-2xl">
          <CardTitle className="text-primary">Ticket Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Label htmlFor="suggestion">Help us go from meh to wow</Label>
            <Textarea
              id="suggestion"
              rows={9}
              placeholder="Type here..."
              {...register("suggestion")}
            />
            {errors.suggestion && (
              <p className="m-0 p-0 text-sm text-red-500">
                {errors.suggestion.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary transition duration-300 dark:text-white text-background lg:px-5 lg:py-2 md:px-3 md:py-2 sm:py-2 sm:px-2 rounded-xl text-center hover:opacity-80 ms-auto"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
