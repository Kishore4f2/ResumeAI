'use client';

import { useEffect, useRef, useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Check, Copy, Sparkles, Loader2 } from 'lucide-react';
import { createSummary, type State } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

function SubmitButton({ hasResult }: { hasResult: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      size="lg"
      className="w-full sm:w-auto"
    >
      {pending ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : (
        <Sparkles className="mr-2 h-5 w-5" />
      )}
      {pending
        ? hasResult
          ? 'Regenerating...'
          : 'Generating...'
        : hasResult
        ? 'Regenerate'
        : 'Generate Summary'}
    </Button>
  );
}

function ResultCard({
  result,
}: {
  result: string;
}) {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setIsCopied(true);
    toast({
      title: 'Copied to Clipboard!',
      description: 'The profile summary has been copied.',
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Card className="w-full animate-in fade-in-50 duration-500">
      <CardHeader>
        <CardTitle>Your AI-Generated Profile Summary</CardTitle>
        <CardDescription>
          Your ATS-optimized profile summary.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="whitespace-pre-wrap rounded-md border bg-muted/50 p-4 text-sm leading-relaxed">
          {result}
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" onClick={handleCopy} className="w-full">
          {isCopied ? (
            <Check className="mr-2 h-4 w-4" />
          ) : (
            <Copy className="mr-2 h-4 w-4" />
          )}
          {isCopied ? 'Copied!' : 'Copy to Clipboard'}
        </Button>
      </CardFooter>
    </Card>
  );
}

function ResultSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader>
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-20 w-full" />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}

export function ClientPage() {
  const initialState: State = { message: null, errors: {}, data: null };
  const [state, dispatch] = useActionState(createSummary, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const [result, setResult] = useState<State['data']>(null);
  const [isFirstGeneration, setIsFirstGeneration] = useState(true);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (state.message === 'Success' && state.data) {
      setResult(state.data);
      if (isFirstGeneration) {
        setIsFirstGeneration(false);
      }
      // Do not reset the form to keep the job description
      // formRef.current?.reset(); 
    } else if (state.message && state.message !== 'Success') {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: state.message,
      });
    }
  }, [state, isFirstGeneration, toast]);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <div className="flex flex-col items-center gap-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Generate Your ATS-Optimized Resume Summary
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Paste a job description below and let our AI create a powerful,
            professional profile summary tailored for freshers.
          </p>
        </div>

        <form
          ref={formRef}
          action={(formData) => {
            dispatch(formData);
          }}
          className="w-full space-y-6"
        >
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
              <CardDescription>
                Paste the full job description here. More text gives the AI
                better context.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full gap-2">
                <Label htmlFor="jobDescription" className="sr-only">
                  Job Description
                </Label>
                <Textarea
                  id="jobDescription"
                  name="jobDescription"
                  placeholder="e.g., We are looking for a software engineer with experience in..."
                  rows={10}
                  required
                  className="text-base"
                />
                {state.errors?.jobDescription && (
                  <p className="text-sm font-medium text-destructive">
                    {state.errors.jobDescription[0]}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
              <SubmitButton hasResult={!!result} />
              <p className="text-xs text-muted-foreground">
                By generating, you agree to our Terms of Service.
              </p>
            </CardFooter>
          </Card>
        </form>

        <div className="w-full">
          {pending && isFirstGeneration && <ResultSkeleton />}
          {!isFirstGeneration && result && <ResultCard result={result} />}
        </div>
      </div>
    </div>
  );
}
