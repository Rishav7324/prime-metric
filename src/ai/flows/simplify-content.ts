// src/ai/flows/simplify-content.ts
'use server';
/**
 * @fileOverview A content simplification AI agent.
 *
 * - simplifyContent - A function that handles the content simplification process.
 * - SimplifyContentInput - The input type for the simplifyContent function.
 * - SimplifyContentOutput - The return type for the simplifyContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimplifyContentInputSchema = z.object({
  content: z.string().describe('The content to be simplified.'),
  simplificationLevel: z
    .string()
    .describe(
      'The degree of simplification.  Can be one of: very simple, simple, moderately simple.'
    ),
});
export type SimplifyContentInput = z.infer<typeof SimplifyContentInputSchema>;

const SimplifyContentOutputSchema = z.object({
  simplifiedContent: z.string().describe('The simplified content.'),
});
export type SimplifyContentOutput = z.infer<typeof SimplifyContentOutputSchema>;

export async function simplifyContent(input: SimplifyContentInput): Promise<SimplifyContentOutput> {
  return simplifyContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simplifyContentPrompt',
  input: {schema: SimplifyContentInputSchema},
  output: {schema: SimplifyContentOutputSchema},
  prompt: `You are an expert content simplifier.  You will simplify the content to the degree requested by the user.

Content: {{{content}}}

Simplification Level: {{{simplificationLevel}}}`,
});

const simplifyContentFlow = ai.defineFlow(
  {
    name: 'simplifyContentFlow',
    inputSchema: SimplifyContentInputSchema,
    outputSchema: SimplifyContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
