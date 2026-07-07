import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Centers the mobile app UI inside a phone frame on larger screens,
 * and fills the viewport on small screens.
 */
export function PhoneShell({
  children,
  footer,
  className,
}: {
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <div className="flex min-h-screen justify-center bg-gradient-to-b from-secondary to-background md:items-center md:py-8">
      <div
        className={cn(
          "relative flex w-full max-w-[420px] flex-col overflow-hidden bg-background md:h-[860px] md:rounded-[2.5rem] md:border-[10px] md:border-foreground/90 md:shadow-float",
          "min-h-screen md:min-h-0",
          className,
        )}
      >
        <StatusBar />
        <div className="flex flex-1 flex-col overflow-y-auto">{children}</div>
        {footer}
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pb-1 pt-3 text-xs font-semibold text-foreground">
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <span className="h-2.5 w-4 rounded-sm bg-foreground/80" />
        <span className="h-2.5 w-3 rounded-sm bg-foreground/60" />
        <span className="h-2.5 w-6 rounded-sm bg-foreground/80" />
      </div>
    </div>
  );
}
