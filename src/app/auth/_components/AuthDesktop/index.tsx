import AuthForm from "../auth-form";

export default function AuthDesktop() {
  return (
    <div className="hidden md:flex h-screen w-full justify-between">
      <div className="flex-1 flex justify-center items-center">
        <div className="flex flex-col gap-10">
          <span className="2xl:text-7xl xl:text-6xl lg:text-5xl md:text-4xl font-bold 2xl:me-28 xl:me-16 lg:me-12 md:me-8">👋 Welcome to</span>
          <span className="2xl:text-9xl xl:text-8xl lg:text-7xl md:text-6xl font-bold 2xl:ms-40 xl:ms-20 lg:ms-16 md:ms-8">
            <span className="text-primary">All</span>-in-
            <span className="text-primary">One</span>!
          </span>
          <span className="2xl:text-2xl xl:text-xl lg:text-lg md:text-base font-medium 2xl:ms-16 xl:ms-12 lg:ms-8 md:ms-4">
            Your <span className="text-primary">Personal Organization</span> App
          </span>
        </div>
      </div>
      <div className="w-1/3 h-full flex justify-center items-center bg-[#0b0b0c] xl:py-14 xl:px-8 py-2 px-1 shadow-2xl shadow-primary/30">
        <AuthForm />
      </div>
    </div>
  );
}
