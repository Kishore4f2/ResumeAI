import { Sparkles } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/10 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary shadow-inner-strong">
            <Sparkles className="h-5 w-5" style={{ filter: 'drop-shadow(0 0 8px hsl(var(--primary)))' }} />
          </div>
          <span className="text-xl font-bold font-headline tracking-wider">ResumeAI</span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
