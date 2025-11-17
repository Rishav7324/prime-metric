
"use server";

import { summarizeContent, type SummarizeContentInput, type SummarizeContentOutput } from "@/ai/flows/content-summarization";
import { z } from "zod";

const SummarizeSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL." }),
  simplificationLevel: z.enum(['simple', 'moderate', 'complex']),
});

export type SummarizerState = {
  message: string | null;
  errors: {
    url?: string[];
    simplificationLevel?: string[];
  } | null;
  summary: string | null;
}

export async function handleSummarize(prevState: SummarizerState, formData: FormData): Promise<SummarizerState> {
  try {
    const validatedFields = SummarizeSchema.safeParse({
      url: formData.get('url'),
      simplificationLevel: formData.get('simplificationLevel'),
    });

    if (!validatedFields.success) {
      return {
        message: 'Invalid input.',
        errors: validatedFields.error.flatten().fieldErrors,
        summary: null,
      };
    }

    const result: SummarizeContentOutput = await summarizeContent(validatedFields.data as SummarizeContentInput);

    return {
      message: 'Success',
      errors: null,
      summary: result.summary,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An error occurred while summarizing the content. Please try again.',
      errors: null,
      summary: null,
    };
  }
}
