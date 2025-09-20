export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="container flex h-16 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} ResumeAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
