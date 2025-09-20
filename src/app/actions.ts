
'use server';

import {
  generateAtsProfileSummary,
  GenerateAtsProfileSummaryOutput,
} from '@/ai/flows/generate-ats-profile-summary';
import { z } from 'zod';

const FormSchema = z.object({
  jobDescription: z.string().min(50, {
    message: 'Job description must be at least 50 characters long.',
  }),
});

export type State = {
  errors?: {
    jobDescription?: string[];
  };
  message?: string | null;
  data?: GenerateAtsProfileSummaryOutput | null;
};

export async function createSummary(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = FormSchema.safeParse({
    jobDescription: formData.get('jobDescription'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid input. Failed to generate summary.',
    };
  }

  try {
    const result = await generateAtsProfileSummary({
      jobDescription: validatedFields.data.jobDescription,
    });
    return { data: result, message: 'Success' };
  } catch (e) {
    console.error(e);
    return {
      message: 'AI Error: Failed to generate summary. Please try again.',
    };
  }
}
