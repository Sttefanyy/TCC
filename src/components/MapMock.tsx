import { cn } from "@/lib/utils";

/**
 * Decorative stylized street-map background used across the app.
 * Not a real map — purely presentational for the front-end prototype.
 */
export function MapMock({
  className,
  children,
  route,
  heat,
}: {
  className?: string;
  children?: React.ReactNode;
  route?: boolean;
  heat?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-[oklch(0.94_0.01_250)]", className)}>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <rect width="400" height="300" fill="oklch(0.945 0.012 240)" />
        {/* blocks */}
        {Array.from({ length: 5 }).map((_, r) =>
          Array.from({ length: 6 }).map((_, c) => (
            <rect
              key={`${r}-${c}`}
              x={10 + c * 66}
              y={10 + r * 58}
              width={54}
              height={46}
              rx={4}
              fill="oklch(0.965 0.008 240)"
            />
          )),
        )}
        {/* green patch */}
        <rect x="240" y="130" width="120" height="90" rx="8" fill="oklch(0.9 0.06 150)" />
        {/* roads */}
        {[68, 134, 200, 266].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="300" stroke="oklch(0.88 0.01 240)" strokeWidth="6" />
        ))}
        {[68, 126, 184, 242].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke="oklch(0.88 0.01 240)" strokeWidth="6" />
        ))}

        {route && (
          <>
            <path
              d="M40 210 C 90 150, 150 150, 200 120 S 300 90, 350 70"
              fill="none"
              stroke="oklch(0.44 0.19 300)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <circle cx="40" cy="210" r="8" fill="oklch(0.62 0.17 150)" stroke="white" strokeWidth="3" />
          </>
        )}

        {heat && (
          <>
            <defs>
              <radialGradient id="heat" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="oklch(0.6 0.24 25 / 0.85)" />
                <stop offset="45%" stopColor="oklch(0.75 0.16 65 / 0.6)" />
                <stop offset="100%" stopColor="oklch(0.75 0.16 65 / 0)" />
              </radialGradient>
            </defs>
            <circle cx="110" cy="80" r="55" fill="url(#heat)" />
            <circle cx="290" cy="110" r="65" fill="url(#heat)" />
            <circle cx="230" cy="230" r="60" fill="url(#heat)" />
          </>
        )}
      </svg>
      {children}
    </div>
  );
}
