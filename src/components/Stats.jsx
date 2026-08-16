import { formatTime } from "../utils/calculator";

/**
 * Renders the live WPM / accuracy / timer readout, plus a small
 * sparkline of WPM samples collected during the run. This is the
 * "signature" visual element of the platform: a quiet EKG-style
 * pulse that reflects the rhythm of the person's own typing.
 */
export default function Stats({ wpm, accuracy, elapsedMs, wpmHistory, isActive }) {
  return (
    <div className="flex items-end justify-between gap-6 rounded-lg border border-border bg-panel px-6 py-4">
      <div className="flex gap-10">
        <Metric label="wpm" value={wpm} accentColor className="min-w-[4.5rem]" />
        <Metric label="accuracy" value={`${accuracy}%`} className="min-w-[5.5rem]" />
        <Metric label="time" value={formatTime(elapsedMs)} className="min-w-[3.5rem]" />
      </div>

      <Sparkline data={wpmHistory} isActive={isActive} />
    </div>
  );
}

function Metric({ label, value, accentColor, className = "" }) {
  return (
    <div className={className}>
      <div
        className={`font-mono text-3xl font-bold tabular-nums leading-none ${
          accentColor ? "text-accent" : "text-text"
        }`}
      >
        {value}
      </div>
      <div className="mt-1.5 font-mono text-[11px] uppercase tracking-widest text-subtext">
        {label}
      </div>
    </div>
  );
}

function Sparkline({ data, isActive }) {
  const width = 160;
  const height = 44;
  const max = Math.max(1, ...data, 40);

  const points =
    data.length > 1
      ? data
          .map((v, i) => {
            const x = (i / (data.length - 1)) * width;
            const y = height - (v / max) * height;
            return `${x.toFixed(1)},${y.toFixed(1)}`;
          })
          .join(" ")
      : "";

  return (
    <div className="hidden sm:block">
      <svg width={width} height={height} className="overflow-visible">
        {data.length > 1 ? (
          <polyline
            points={points}
            fill="none"
            stroke={isActive ? "#e2b714" : "#57575f"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-colors duration-300"
          />
        ) : (
          <line
            x1="0"
            y1={height - 2}
            x2={width}
            y2={height - 2}
            stroke="#2c2c31"
            strokeWidth="2"
            strokeDasharray="2 4"
          />
        )}
      </svg>
      <div className="mt-1 text-right font-mono text-[10px] uppercase tracking-widest text-subtext">
        pace
      </div>
    </div>
  );
}
