import FormContactSection from "./components/FormContactSection";

export default function Index() {
  return (
    <main className="min-h-screen pt-44 pb-16 md:pb-5 px-4 flex flex-col items-center justify-start gap-20">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-5xl lg:text-7xl leading-tight">
          Have <strong>feedback</strong> or an <strong>idea</strong>? <br />
          Let’s talk!
        </h1>
      </div>
      <FormContactSection />
    </main>
  );
}
