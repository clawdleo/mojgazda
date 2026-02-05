interface GazdaScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

function getScoreColor(score: number): string {
  if (score >= 8.0) return "#22c55e";
  if (score >= 6.0) return "#f59e0b";
  if (score >= 4.0) return "#f97316";
  if (score >= 2.0) return "#ef4444";
  return "#991b1b";
}

function getScoreLabel(score: number): string {
  if (score >= 8.0) return "Odličan";
  if (score >= 6.0) return "Solidan";
  if (score >= 4.0) return "Prosječan";
  if (score >= 2.0) return "Loš";
  return "Katastrofa";
}

const sizes = {
  sm: { ring: "w-14 h-14", inner: "w-11 h-11", text: "text-lg" },
  md: { ring: "w-20 h-20", inner: "w-16 h-16", text: "text-2xl" },
  lg: { ring: "w-28 h-28", inner: "w-22 h-22", text: "text-4xl" },
};

export function GazdaScore({ score, size = "md", showLabel = false }: GazdaScoreProps) {
  const color = getScoreColor(score);
  const label = getScoreLabel(score);
  const s = sizes[size];
  const pct = (score / 10) * 100;

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`relative flex items-center justify-center ${s.ring} rounded-full`}
        style={{
          background: `conic-gradient(${color} ${pct}%, #e5e7eb ${pct}%)`,
        }}
        title={`GAZDA Score: ${score}/10 - ${label}`}
      >
        <div
          className={`absolute ${s.inner} bg-white dark:bg-gray-800 rounded-full`}
        />
        <span
          className={`relative z-10 ${s.text} font-bold`}
          style={{ color }}
        >
          {score.toFixed(1)}
        </span>
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          {label}
        </span>
      )}
    </div>
  );
}
