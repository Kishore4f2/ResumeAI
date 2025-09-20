import { Sparkles } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center gap-2">
           <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">ResumeAI</span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
