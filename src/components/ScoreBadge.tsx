import { cn } from "@/lib/utils";

export function ScoreBadge({ score, className }: { score: number; className?: string }) {
  const tone =
    score >= 75 ? "bg-success text-success-foreground" : score >= 55 ? "bg-warning text-warning-foreground" : "bg-danger text-danger-foreground";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold tabular-nums",
        tone,
        className,
      )}
    >
      {score}/100
    </span>
  );
}
