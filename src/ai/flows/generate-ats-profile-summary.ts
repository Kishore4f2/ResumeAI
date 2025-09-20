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
  profileSummary: z
    .string()
    .describe(
      `A profile summary paragraph of about 7 lines, tailored for B.Tech ECE graduate fresher resumes and optimized for ATS.`
    ),
  atsScore: z.number().describe('The estimated ATS score of the profile summary.'),
});
export type GenerateAtsProfileSummaryOutput = z.infer<
  typeof GenerateAtsProfileSummaryOutputSchema
>;

export async function generateAtsProfileSummary(
  input: GenerateAtsProfileSummaryInput
): Promise<GenerateAtsProfileSummaryOutput> {
  return generateAtsProfileSummaryFlow(input);
}

const estimateAtsScore = ai.defineTool({
  name: 'estimateAtsScore',
  description: 'Estimates the ATS score of a given text.',
  inputSchema: z.object({
    text: z.string().describe('The text to estimate the ATS score for.'),
  }),
  outputSchema: z.number().describe('The estimated ATS score (0-100).'),
},
async (input) => {
  // Placeholder implementation - replace with actual ATS scoring logic
  // In a real application, this would involve analyzing the text for keyword density,
  // formatting, and other factors that affect ATS performance.
  // For now, we'll just return a random score between 60 and 90.
  return Math.floor(Math.random() * (90 - 60 + 1) + 60);
});

const profileSummaryPrompt = ai.definePrompt({
  name: 'profileSummaryPrompt',
  tools: [estimateAtsScore],
  input: {schema: GenerateAtsProfileSummaryInputSchema},
  output: {schema: GenerateAtsProfileSummaryOutputSchema},
  prompt: `You are an AI resume expert. Generate a concise profile summary in a single paragraph of about 7 lines, specifically for a B.Tech ECE graduate fresher, based on the following job description. Do not use bullet points. Do not include any location information. Optimize the summary for Applicant Tracking Systems (ATS) with a score of 70% or higher. Use the estimateAtsScore tool to validate the ATS score and improve the summary if needed.

Job Description: {{{jobDescription}}}

Profile Summary:`,
});

const generateAtsProfileSummaryFlow = ai.defineFlow(
  {
    name: 'generateAtsProfileSummaryFlow',
    inputSchema: GenerateAtsProfileSummaryInputSchema,
    outputSchema: GenerateAtsProfileSummaryOutputSchema,
  },
  async input => {
    let output = (await profileSummaryPrompt(input)).output!;
    let atsScore = await estimateAtsScore({text: output.profileSummary});

    // Attempt to improve ATS score if it's below 70
    if (atsScore < 70) {
      // This part can be improved with a more sophisticated approach, e.g., re-generating
      // the summary with a modified prompt that emphasizes ATS optimization.
      output.profileSummary = `(ATS score improvement needed) ${output.profileSummary}`;
      atsScore = await estimateAtsScore({text: output.profileSummary});
    }

    output.atsScore = atsScore;
    return output;
  }
);
