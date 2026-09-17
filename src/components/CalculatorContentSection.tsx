import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpfulVotes } from "@/components/HelpfulVotes";

type ContentSectionProps = {
  aboutContent: string;
  pagePath?: string;
  useCases?: { title: string; description: string }[];
  tips?: { title: string; description: string }[];
  examples?: { title: string; description: string; steps: string[] }[];
  faqs?: { question: string; answer: string }[];
};

const CalculatorContentSection = ({ aboutContent, pagePath, useCases, tips, examples, faqs }: ContentSectionProps) => {
  const faqJsonLd = faqs && faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer },
    })),
  } : null;

  const howToJsonLd = tips && tips.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to use this calculator",
    "step": tips.map((item, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": item.title,
      "text": item.description,
    })),
  } : null;

  const toc: { id: string; label: string }[] = [{ id: "about", label: "About" }];
  if (useCases && useCases.length > 0) toc.push({ id: "use-cases", label: "Use Cases" });
  if (tips && tips.length > 0) toc.push({ id: "pro-tips", label: "Pro Tips" });
  if (examples && examples.length > 0) toc.push({ id: "examples", label: "Examples" });
  if (faqs && faqs.length > 0) toc.push({ id: "faqs", label: "FAQs" });

  return (
    <div className="max-w-3xl mx-auto mt-8 space-y-6">
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
      {howToJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      )}
      {/* On this page - jump links */}
      <nav aria-label="On this page" className="bg-white border border-neutral-200 rounded-xl px-4 py-2.5">
        <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">On this page</p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          {toc.map((t) => (
            <li key={t.id}>
              <a href={`#${t.id}`} className="text-[13px] font-medium text-[#c25136] hover:underline">{t.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <section id="about" className="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-5 scroll-mt-24">
        <h2 className="text-base sm:text-lg font-bold text-black mb-2">About this Tool</h2>
        <p className="text-sm text-neutral-600 leading-relaxed">{aboutContent}</p>
      </section>

      {useCases && useCases.length > 0 && (
        <section id="use-cases" className="scroll-mt-24">
          <h2 className="text-base sm:text-lg font-bold text-black mb-3">Common Use Cases</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {useCases.map((item) => (
              <div key={item.title} className="bg-white border border-neutral-200 p-4 rounded-xl">
                <h3 className="font-semibold text-sm text-black">{item.title}</h3>
                <p className="text-[13px] text-neutral-600 mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {tips && tips.length > 0 && (
        <section id="pro-tips" className="bg-[#FFF8F6] border border-[#F2765E]/20 rounded-2xl p-4 sm:p-5 scroll-mt-24">
          <h2 className="text-base sm:text-lg font-bold text-black mb-3">Pro Tips</h2>
          <ul className="space-y-3">
            {tips.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <div className="bg-[#F2765E] text-white text-xs font-bold rounded-full w-6 h-6 shrink-0 flex items-center justify-center mt-0.5">
                  !
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-black">{item.title}</h3>
                  <p className="text-[13px] text-neutral-600">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {examples && examples.length > 0 && (
        <section id="examples" className="scroll-mt-24">
          <h2 className="text-base sm:text-lg font-bold text-black mb-3">Examples</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {examples.map((item) => (
              <div key={item.title} className="bg-white border border-neutral-200 p-4 rounded-xl">
                <h3 className="font-semibold text-sm text-black">{item.title}</h3>
                <p className="text-[13px] text-neutral-600 mt-1 mb-2">{item.description}</p>
                <ol className="list-decimal list-inside space-y-1">
                  {item.steps.map((step, index) => (
                    <li key={index} className="text-[13px] text-neutral-600">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>
      )}

      {faqs && faqs.length > 0 && (
        <section id="faqs" className="scroll-mt-24">
          <h2 className="text-base sm:text-lg font-bold text-black mb-3">FAQs</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index} className="bg-white border border-neutral-200 mb-2 px-4 rounded-xl">
                <AccordionTrigger className="text-sm font-semibold text-left text-black hover:no-underline py-3">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-[13px] text-neutral-600 pb-3">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}

      <HelpfulVotes pagePath={pagePath} />
    </div>
  );
};

export default CalculatorContentSection;
