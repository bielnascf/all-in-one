/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { IoIosReturnLeft } from "react-icons/io";
import { ImSpinner8 } from "react-icons/im";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { LoginData, loginSchema, SignUpData, signUpSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { authClient } from '../../../lib/auth-client';
import { sign } from "crypto";

type TabValue = "login" | "signup";

export default function AuthForm() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tab, setTab] = useState<TabValue>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);

  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signUpForm = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onLoginSubmit = async (formData: LoginData) => {
    const {} = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
    }, {
      onRequest: () => {
        toast({
          title: "⏳ Logging in...",
          description: "Please wait while we log you in.",
          duration: 2000,
        });
      },
      onSuccess: () => {
        toast({
          title: "✔️ Login successful!",
          description: "Welcome back! Redirecting to your dashboard.",
          duration: 2000,
        });
        router.replace("/dashboard");
      },
      onError: (ctx) => {
        toast({
          title: "❌ Login failed",
          description: ctx.error.message || "An error occurred while logging in. Please try again.",
          duration: 4000,
          variant: "destructive",
        });
      }
    })
  };

  const onSignUpSubmit = async (formData: SignUpData) => {
    const {} = await authClient.signUp.email({
      name: formData.username,
      email: formData.email,
      password: formData.password,
    }, {
      onRequest: () => {
        toast({
          title: "⏳ Creating account...",
          description: "Please wait while we create your account.",
          duration: 2000,
        })
      },
      onSuccess: () => {
        toast({
          title: "✔️ Account created!",
          description: "Your account has been successfully created. Redirecting to your dashboard.",
          duration: 2000,
        })
        router.replace("/dashboard");
      },
      onError: (ctx) => {
        toast({
          title: "❌ Sign Up failed",
          description: ctx.error.message || "An error occurred while creating your account. Please try again.",
          duration: 4000,
          variant: "destructive",
        });
      }
    }) 
  };

  const handleSignInWithGoogle = async () => {
    setIsGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard"
      });
    } catch (error) {
      toast({
        title: "❌ Google login failed",
        description: "An error occurred while trying to login with Google. Please try again.",
        duration: 4000,
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSignInWithGithub = async () => {
    setIsGithubLoading(true);
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard"
      });
    } catch (error) {
      toast({
        title: "❌ GitHub login failed",
        description: "An error occurred while trying to login with GitHub. Please try again.",
        duration: 4000,
        variant: "destructive",
      });
    } finally {
      setIsGithubLoading(false);
    }
  };

  useEffect(() => {
    const paramTab = searchParams.get("tab");
    const validTab = paramTab === "signup" ? "signup" : "login";
    setTab(validTab);

    if (!paramTab || paramTab !== validTab) {
      router.replace(`/auth?tab=${validTab}`);
    }
  }, [searchParams, router]);

  const handleTabChange = (value: string) => {
    if (value === "login" || value === "signup") {
      setTab(value);
      router.push(`/auth?tab=${value}`);
    }
  };

  return (
    <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="flex justify-around items-center xl:h-14 h-10">
        <TabsTrigger value="login" className="w-full h-full transition-all delay-200">
          Login
        </TabsTrigger>
        <TabsTrigger value="signup" className="w-full h-full transition-all delay-200">
          Sign Up
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
          <Card className="border-none bg-transparent">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription className="border-b border-b-primary pb-6">
                Enter your credentials or continue with github or google account
                to login to your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-col gap-3 w-full pb-4">
                <Button 
                  type="button"
                  className="bg-[#1c1c1e] text-white p-5 hover:bg-[#1c1c1e] hover:opacity-80 transition-all duration-300"
                  disabled={isGoogleLoading || isGithubLoading}
                  onClick={handleSignInWithGoogle}
                >
                  {isGoogleLoading ? (
                    <ImSpinner8 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <FcGoogle className="w-4 h-4 mr-2" />
                  )}
                  {isGoogleLoading ? "Connecting to Google..." : "Continue with Google"}
                </Button>
                <Button 
                  type="button"
                  className="bg-[#1c1c1e] text-white p-5 hover:bg-[#1c1c1e] hover:opacity-80 transition-all duration-300"
                  disabled={isGoogleLoading || isGithubLoading}
                  onClick={handleSignInWithGithub}
                >
                  {isGithubLoading ? (
                    <ImSpinner8 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <FaGithub className="w-4 h-4 mr-2" />
                  )}
                  {isGithubLoading ? "Connecting to GitHub..." : "Continue with Github"}
                </Button>
              </div>
              <div className="text-center text-sm text-gray-400 flex items-center gap-2 justify-center px-5">
                <div className="w-full border-b bg-[#5c5c5c3f] h-0.5"></div>
                <span className="text-[#5c5c5caf]">Or</span>
                <div className="w-full border-b bg-[#5c5c5c3f] h-0.5"></div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  className="bg-[#1c1c1e] text-white p-5 focus-visible:ring-primary"
                  type="email"
                  id="login-email"
                  placeholder="Type your email here."
                  {...loginForm.register("email")}
                />
                {loginForm.formState.errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {loginForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="login-password">Password</Label>
                <div className="relative">
                  <Input
                    className="bg-[#1c1c1e] text-white p-5 focus-visible:ring-primary pr-12"
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Type your password here."
                    {...loginForm.register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <IoEyeOffOutline className="w-5 h-5" />
                    ) : (
                      <IoEyeOutline className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {loginForm.formState.errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {loginForm.formState.errors.password.message}
                  </p>
                )}
                <div className="flex justify-end">
                  <Link href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit"
                disabled={loginForm.formState.isSubmitting}
                className="w-full p-6 text-xl text-white hover:opacity-80 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {loginForm.formState.isSubmitting ? <ImSpinner8 className="animate-spin"/> : ""}
                {loginForm.formState.isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </TabsContent>
      <TabsContent value="signup">
        <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}>
          <Card className="border-none bg-transparent">
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription className="border-b border-b-primary pb-6">
                Create an account to get started at All-in-One!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-col gap-3 w-full pb-4">
                <Button 
                  type="button"
                  className="bg-[#1c1c1e] text-white p-5 hover:bg-[#1c1c1e] hover:opacity-80 transition-all duration-300"
                  disabled={isGoogleLoading || isGithubLoading}
                  onClick={handleSignInWithGoogle}
                >
                  {isGoogleLoading ? (
                    <ImSpinner8 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <FcGoogle className="w-4 h-4 mr-2" />
                  )}
                  {isGoogleLoading ? "Connecting to Google..." : "Continue with Google"}
                </Button>
                <Button 
                  type="button"
                  className="bg-[#1c1c1e] text-white p-5 hover:bg-[#1c1c1e] hover:opacity-80 transition-all duration-300"
                  disabled={isGoogleLoading || isGithubLoading}
                  onClick={handleSignInWithGithub}
                >
                  {isGithubLoading ? (
                    <ImSpinner8 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <FaGithub className="w-4 h-4 mr-2" />
                  )}
                  {isGithubLoading ? "Connecting to GitHub..." : "Continue with Github"}
                </Button>
              </div>
              <div className="text-center text-sm text-gray-400 flex items-center gap-2 justify-center px-5">
                <div className="w-full border-b bg-[#5c5c5c3f] h-0.5"></div>
                <span className="text-[#5c5c5caf]">Or</span>
                <div className="w-full border-b bg-[#5c5c5c3f] h-0.5"></div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="signup-username">Username</Label>
                <Input
                  className="bg-[#1c1c1e] text-white p-5 focus-visible:ring-primary"
                  type="text"
                  id="signup-username"
                  placeholder="Type your username here."
                  {...signUpForm.register("username")}
                />
                {signUpForm.formState.errors.username && (
                  <p className="text-sm text-red-500 mt-1">
                    {signUpForm.formState.errors.username.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  className="bg-[#1c1c1e] text-white p-5 focus-visible:ring-primary"
                  type="email"
                  id="signup-email"
                  placeholder="Type your email here."
                  {...signUpForm.register("email")}
                />
                {signUpForm.formState.errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {signUpForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Input
                    className="bg-[#1c1c1e] text-white p-5 focus-visible:ring-primary pr-12"
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Type your password here."
                    {...signUpForm.register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <IoEyeOffOutline className="w-5 h-5" />
                    ) : (
                      <IoEyeOutline className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {signUpForm.formState.errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {signUpForm.formState.errors.password.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="signup-confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    className="bg-[#1c1c1e] text-white p-5 focus-visible:ring-primary pr-12"
                    id="signup-confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password here."
                    {...signUpForm.register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? (
                      <IoEyeOffOutline className="w-5 h-5" />
                    ) : (
                      <IoEyeOutline className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {signUpForm.formState.errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">
                    {signUpForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit"
                disabled={signUpForm.formState.isSubmitting}
                className="w-full p-6 text-xl text-white hover:opacity-80 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {signUpForm.formState.isSubmitting ? <ImSpinner8 className="animate-spin"/> : ""}
                {signUpForm.formState.isSubmitting ? "Creating account..." : "Sign Up"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </TabsContent>
      <div className="flex items-center gap-2 justify-center">
        <Link
          href="/"
          className="text-zinc-400 flex items-center gap-2 hover:text-white transition-all duration-300"
        >
          <IoIosReturnLeft className="w-6 h-6" />
          Back to home
        </Link>
      </div>
    </Tabs>
  );
}
