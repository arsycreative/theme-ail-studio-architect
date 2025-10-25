export default function RootLoading() {
  return (
    <div className="fixed inset-0 z-[999] bg-background text-foreground grid place-items-center">
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-xs uppercase tracking-[0.6em] text-muted-foreground">
            Architecture • Interiors • Living
          </span>
          <span className="text-3xl font-semibold tracking-wide">
            AIL Studio
          </span>
        </div>
        <div
          className="h-14 w-14 rounded-full border border-border/60 border-t-primary animate-spin"
          aria-hidden="true"
        />
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
}
