"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";

export default function ButtonSignOut() {
 const router = useRouter();
 const handleSignOut = async() => {
  await authClient.signOut({
   fetchOptions: {
    onSuccess: () => {
     router.replace("/");
    }
   }
  });
 }
 return (
  <Button className="text-white bg-red-700 hover:bg-red-600" onClick={handleSignOut}>
   <LogOutIcon className="text-white" />
   Logout
  </Button>
 )
};
