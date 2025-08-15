import AuthDesktop from "@/app/auth/_components/AuthDesktop";
import AuthMobile from "@/app/auth/_components/AuthMobile";

export default async function AuthPage() {
  return (
    <>  
      <AuthDesktop />
      <AuthMobile />
    </>
  );
}
