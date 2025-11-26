import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { financialCalculators, healthCalculators, mathCalculators, otherCalculators, imageTools, developerTools } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ToolCard = ({ tool }: { tool: (typeof financialCalculators)[0] }) => {
  const placeholder = tool.imageId ? PlaceHolderImages.find(p => p.id === tool.imageId) : null;
  const toolName = tool.name;

  return (
    <Link href={tool.path} className="group block">
      <div className="glass-card p-0 overflow-hidden transition-all duration-300 group-hover:border-accent group-hover:shadow-2xl group-hover:shadow-accent/10 rounded-2xl h-full flex flex-col">
        {placeholder && (
          <div className="overflow-hidden">
            <Image
              src={placeholder.imageUrl}
              alt={placeholder.description}
              width={600}
              height={400}
              data-ai-hint={placeholder.imageHint}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <tool.icon className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold font-headline">{toolName}</h3>
          </div>
          <p className="mt-3 text-muted-foreground flex-grow">{tool.description}</p>
          <div className="mt-4 flex items-center text-sm font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
            Use tool <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export function Tools() {
  const toolCategories = [
    { value: 'financial', label: 'Financial', tools: financialCalculators.slice(0,6) },
    { value: 'health', label: 'Health', tools: healthCalculators.slice(0,6) },
    { value: 'math', label: 'Math', tools: mathCalculators.slice(0,6) },
    { value: 'image', label: 'Image', tools: imageTools.slice(0,6) },
    { value: 'developer', label: 'Developer', tools: developerTools.slice(0,6) },
    { value: 'other', label: 'Other', tools: otherCalculators.slice(0,6) },
  ];

  return (
    <section id="tools" className="py-20 sm:py-32">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold">Comprehensive Tool Suite</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From complex financial modeling to simple everyday calculations, we have a tool for every need.
          </p>
        </div>
        <Tabs defaultValue="financial" className="mt-12">
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-3 md:grid-cols-6 mb-8">
              {toolCategories.map(cat => (
                <TabsTrigger key={cat.value} value={cat.value}>{cat.label}</TabsTrigger>
              ))}
            </TabsList>
          </div>
          {toolCategories.map(cat => (
            <TabsContent key={cat.value} value={cat.value} className="mt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cat.tools.map((tool) => (
                  <ToolCard key={tool.name} tool={tool} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Link href={`/${cat.value}-calculators`}>
                  <Button variant="outline">
                    View All {cat.label} Tools <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}