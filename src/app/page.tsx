import { Hero } from "@/components/hero";
import { Tools } from "@/components/tools";
import { Faq } from "@/components/faq";
import { Summarizer } from "@/components/summarizer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Tools />
      <Summarizer />
      <Faq />
    </main>
  );
}
