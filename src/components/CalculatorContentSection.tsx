import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type ContentSectionProps = {
  aboutContent: string;
  useCases?: { title: string; description: string }[];
  tips?: { title: string; description: string }[];
  examples?: { title: string; description: string; steps: string[] }[];
  faqs?: { question: string; answer: string }[];
};

const CalculatorContentSection = ({ aboutContent, useCases, tips, examples, faqs }: ContentSectionProps) => {
  return (
    <div className="max-w-4xl mx-auto mt-20 space-y-16">
      <section>
        <h2 className="text-2xl font-bold font-headline mb-4">About this Tool</h2>
        <p className="text-muted-foreground leading-relaxed">{aboutContent}</p>
      </section>

      {useCases && useCases.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold font-headline mb-4">Common Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((item) => (
              <div key={item.title} className="glass-card p-6 rounded-lg">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-muted-foreground mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {tips && tips.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold font-headline mb-4">Pro Tips</h2>
          <ul className="space-y-4">
            {tips.map((item) => (
              <li key={item.title} className="flex items-start">
                <div className="bg-primary/10 text-accent font-bold rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center mr-4 mt-1">
                  !
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {examples && examples.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold font-headline mb-4">Examples</h2>
          <div className="space-y-6">
            {examples.map((item) => (
              <div key={item.title} className="glass-card p-6 rounded-lg">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-muted-foreground mt-2 mb-4">{item.description}</p>
                <ol className="list-decimal list-inside space-y-2">
                  {item.steps.map((step, index) => (
                    <li key={index} className="text-muted-foreground">
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
        <section>
          <h2 className="text-2xl font-bold font-headline mb-4">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item, index) => (
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
        </section>
      )}
    </div>
  );
};

export default CalculatorContentSection;
