import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "@/lib/data";

export function Faq() {
  return (
    <section id="faq" className="py-10 sm:py-14 bg-white">
      <div className="mx-auto max-w-2xl px-4">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-black">FAQs</h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600">
            Quick answers about Prime Metric.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full mt-6">
          {faqData.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index} className="bg-white border border-neutral-200 mb-2 px-4 rounded-xl">
              <AccordionTrigger className="text-sm sm:text-base font-semibold text-left text-black hover:no-underline py-3">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-neutral-600 pb-3">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
