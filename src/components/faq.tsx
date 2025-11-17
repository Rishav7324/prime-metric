import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "@/lib/data";

export function Faq() {
  return (
    <section id="faq" className="py-20 sm:py-32">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Find answers to common questions about Prime Metric.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full mt-12">
          {faqData.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index} className="glass-card mb-4 px-6 rounded-2xl border">
              <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
