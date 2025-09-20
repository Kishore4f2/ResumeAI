// This file is machine-generated - do not edit!

'use server';

/**
 * @fileOverview Generates an ATS-optimized profile summary for B.Tech ECE graduate fresher resumes based on a job description.
 *
 * - generateAtsProfileSummary - A function that generates the profile summary.
 * - GenerateAtsProfileSummaryInput - The input type for the generateAtsProfileSummary function.
 * - GenerateAtsProfileSummaryOutput - The return type for the generateAtsProfileSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAtsProfileSummaryInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The job description to generate a profile summary from.'),
});
export type GenerateAtsProfileSummaryInput = z.infer<
  typeof GenerateAtsProfileSummaryInputSchema
>;

const GenerateAtsProfileSummaryOutputSchema = z.object({
  profileSummary: z.string().describe(
      `A profile summary paragraph of about 7 lines, tailored for B.Tech ECE graduate fresher resumes and optimized for ATS.`
    ),
  atsScore: z.number().describe('An estimated ATS score for the summary, from 0 to 100.'),
});
export type GenerateAtsProfileSummaryOutput = z.infer<
  typeof GenerateAtsProfileSummaryOutputSchema
>;

export async function generateAtsProfileSummary(
  input: GenerateAtsProfileSummaryInput
): Promise<GenerateAtsProfileSummaryOutput> {
  return generateAtsProfileSummaryFlow(input);
}

const profileSummaryPrompt = ai.definePrompt({
  name: 'profileSummaryPrompt',
  input: {schema: GenerateAtsProfileSummaryInputSchema},
  output: {schema: GenerateAtsProfileSummaryOutputSchema},
  prompt: `You are an AI resume expert. Generate a concise profile summary in a single paragraph of about 7 lines, specifically for a B.Tech ECE graduate fresher, based on the following job description. Also, provide an estimated ATS score between 0 and 100 for the generated summary. Do not use bullet points. Do not include any location information. Optimize the summary for Applicant Tracking Systems (ATS).

Job Description: {{{jobDescription}}}

`,
});

const generateAtsProfileSummaryFlow = ai.defineFlow(
  {
    name: 'generateAtsProfileSummaryFlow',
    inputSchema: GenerateAtsProfileSummaryInputSchema,
    outputSchema: GenerateAtsProfileSummaryOutputSchema,
  },
  async input => {
    let output = (await profileSummaryPrompt(input)).output!;
    return output;
  }
);
