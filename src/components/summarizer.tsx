"use client";

import { useFormState, useFormStatus } from "react-dom";
import { handleSummarize, type SummarizerState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Wand2 } from "lucide-react";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full gradient-button h-12 text-base">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
      Summarize Content
    </Button>
  );
}

export function Summarizer() {
  const { toast } = useToast();
  const initialState: SummarizerState = { message: null, errors: null, summary: null };
  const [state, dispatch] = useFormState(handleSummarize, initialState);

  useEffect(() => {
    if (state.message && state.message !== 'Success') {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <section id="summarizer" className="py-20 sm:py-32 bg-primary/5">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div className="max-w-md">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold">AI Content Summarizer</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Paste a link to an article or tutorial and our AI will provide a concise summary, highlighting the key information. Choose the level of simplification you need.
          </p>
          <form action={dispatch} className="mt-8 space-y-4">
            <div>
              <Input
                name="url"
                type="url"
                placeholder="https://example.com/article"
                required
                className="h-12 text-base"
              />
              {state.errors?.url && <p className="text-sm text-destructive mt-1">{state.errors.url[0]}</p>}
            </div>
            <div>
              <Select name="simplificationLevel" defaultValue="moderate">
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select simplification level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="simple">Simple</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="complex">Complex</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <SubmitButton />
          </form>
        </div>
        <div className="min-h-[400px]">
          <Card className="glass-card h-full rounded-2xl">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
              <CardDescription>Your AI-generated summary will appear here.</CardDescription>
            </CardHeader>
            <CardContent>
              {state.summary ? (
                <p className="text-muted-foreground whitespace-pre-wrap">{state.summary}</p>
              ) : (
                 <div className="flex items-center justify-center h-48 text-muted-foreground">
                    <p>Waiting for content to summarize...</p>
                 </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
