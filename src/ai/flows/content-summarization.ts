'use server';

/**
 * @fileOverview Content summarization flow using Genkit.
 *
 * - summarizeContent - A function that summarizes content from a given URL.
 * - SummarizeContentInput - The input type for the summarizeContent function, which includes the content URL and simplification level.
 * - SummarizeContentOutput - The return type for the summarizeContent function, which includes the summarized content.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeContentInputSchema = z.object({
  url: z.string().url().describe('The URL of the content to summarize.'),
  simplificationLevel: z
    .enum(['simple', 'moderate', 'complex'])
    .default('moderate')
    .describe(
      'The level of simplification desired in the summary.  Simple is for a very general audience, moderate is for an educated audience, and complex preserves all of the original article.'
    ),
});
export type SummarizeContentInput = z.infer<typeof SummarizeContentInputSchema>;

const SummarizeContentOutputSchema = z.object({
  summary: z.string().describe('The summarized content.'),
});
export type SummarizeContentOutput = z.infer<typeof SummarizeContentOutputSchema>;

export async function summarizeContent(input: SummarizeContentInput): Promise<SummarizeContentOutput> {
  return summarizeContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeContentPrompt',
  input: {schema: SummarizeContentInputSchema},
  output: {schema: SummarizeContentOutputSchema},
  prompt: `You are an expert content summarizer.  You will take content from the URL provided, and summarize it.  The user will specify the level of simplification desired, and you must honor it.

URL: {{{url}}}
Simplification Level: {{{simplificationLevel}}}

Summary:`,    
});

const summarizeContentFlow = ai.defineFlow(
  {
    name: 'summarizeContentFlow',
    inputSchema: SummarizeContentInputSchema,
    outputSchema: SummarizeContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
