import { BookOpen, Code2 } from "lucide-react";
import { languageLabels } from "../data/snippets";

const LEVELS = [
  { id: "beginner", label: "beginner" },
  { id: "intermediate", label: "intermediate" },
  { id: "advanced", label: "advanced" },
];

const LANGUAGES = Object.keys(languageLabels).map((id) => ({
  id,
  label: languageLabels[id],
}));

/**
 * Top-level track tabs (English / Developer) plus the relevant
 * secondary selector: difficulty level for English, language for code.
 */
export default function TrackSelector({
  track,
  onTrackChange,
  level,
  onLevelChange,
  language,
  onLanguageChange,
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-1 rounded-lg border border-border bg-panel p-1">
        <TrackTab
          active={track === "english"}
          onClick={() => onTrackChange("english")}
          icon={<BookOpen size={15} />}
          label="English"
        />
        <TrackTab
          active={track === "code"}
          onClick={() => onTrackChange("code")}
          icon={<Code2 size={15} />}
          label="Developer"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-1.5">
        {track === "english"
          ? LEVELS.map((l) => (
              <PillButton
                key={l.id}
                active={level === l.id}
                onClick={() => onLevelChange(l.id)}
                label={l.label}
              />
            ))
          : LANGUAGES.map((l) => (
              <PillButton
                key={l.id}
                active={language === l.id}
                onClick={() => onLanguageChange(l.id)}
                label={l.label}
              />
            ))}
      </div>
    </div>
  );
}

function TrackTab({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`focus-ring flex items-center gap-2 rounded-md px-4 py-2 font-mono text-sm transition-colors ${
        active ? "bg-panelmuted text-accent" : "text-subtext hover:text-text"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function PillButton({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`focus-ring rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
        active
          ? "border-accent/40 bg-accent/10 text-accent"
          : "border-border text-subtext hover:border-muted hover:text-text"
      }`}
    >
      {label}
    </button>
  );
}
