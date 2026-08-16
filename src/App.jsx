import { useState, useCallback, useMemo, useEffect } from "react";
import { Keyboard, RefreshCw } from "lucide-react";
import TrackSelector from "./components/TrackSelector";
import TypingArea from "./components/TypingArea";
import Stats from "./components/Stats";
import { getRandomSentence } from "./data/sentences";
import { getRandomSnippet, languageLabels } from "./data/snippets";

export default function App() {
  const [track, setTrack] = useState("english"); // "english" | "code"
  const [level, setLevel] = useState("beginner");
  const [language, setLanguage] = useState("javascript");
  const [seed, setSeed] = useState(0);

  const [live, setLive] = useState({
    wpm: 0,
    accuracy: 100,
    elapsedMs: 0,
    wpmHistory: [],
    isActive: false,
  });
  const [result, setResult] = useState(null);

  const content = useMemo(() => {
    return track === "english"
      ? getRandomSentence(level)
      : getRandomSnippet(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track, level, language, seed]);

  const handleProgress = useCallback((stats) => {
    setLive(stats);
  }, []);

  const handleComplete = useCallback((stats) => {
    setResult(stats);
  }, []);

  const newTest = () => {
    setResult(null);
    setSeed((s) => s + 1);
  };

  // reset the run whenever the track/level/language changes
  useEffect(() => {
    setResult(null);
  }, [track, level, language]);

  // global shortcut: Tab (without modifiers) starts a fresh test
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        newTest();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-4 py-10 sm:px-6">
        <Header />

        <div className="mt-10">
          <TrackSelector
            track={track}
            onTrackChange={(t) => {
              setTrack(t);
              setResult(null);
            }}
            level={level}
            onLevelChange={setLevel}
            language={language}
            onLanguageChange={setLanguage}
          />
        </div>

        <div className="mt-8">
          <Stats
            wpm={live.wpm}
            accuracy={live.accuracy}
            elapsedMs={live.elapsedMs}
            wpmHistory={live.wpmHistory}
            isActive={live.isActive}
          />
        </div>

        <div className="mt-6 flex-1">
          {result ? (
            <ResultPanel result={result} onRetry={newTest} />
          ) : (
            <TypingArea
              key={`${track}-${level}-${language}-${seed}`}
              content={content}
              isCode={track === "code"}
              onProgress={handleProgress}
              onComplete={handleComplete}
            />
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={newTest}
            className="focus-ring flex items-center gap-2 rounded-md px-3 py-1.5 font-mono text-xs text-subtext transition-colors hover:text-accent"
          >
            <RefreshCw size={13} />
            new test <span className="text-muted">— tab</span>
          </button>
        </div>

        <Footer track={track} level={level} language={language} />
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <Keyboard size={22} className="text-accent" />
        <span className="font-mono text-lg font-bold tracking-tight text-text">
          keystrack
        </span>
      </div>
      <p className="hidden font-mono text-xs text-subtext sm:block">
        a minimal typing speed platform
      </p>
    </header>
  );
}

function Footer({ track, level, language }) {
  const modeLabel =
    track === "english" ? `english · ${level}` : `code · ${languageLabels[language]}`;
  return (
    <footer className="mt-auto pt-10 text-center font-mono text-[11px] text-muted">
      currently practicing {modeLabel}
    </footer>
  );
}

function ResultPanel({ result, onRetry }) {
  return (
    <div className="animate-popIn rounded-lg border border-border bg-panel px-8 py-10 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-subtext">
        test complete
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-x-12 gap-y-6">
        <ResultMetric label="wpm" value={result.wpm} accent />
        <ResultMetric label="raw wpm" value={result.rawWpm} />
        <ResultMetric label="accuracy" value={`${result.accuracy}%`} />
        <ResultMetric label="mistakes" value={result.mistakes} />
      </div>
      <button
        onClick={onRetry}
        className="focus-ring mt-8 rounded-md border border-accent/40 bg-accent/10 px-5 py-2 font-mono text-sm text-accent transition-colors hover:bg-accent/20"
      >
        try again
      </button>
    </div>
  );
}

function ResultMetric({ label, value, accent }) {
  return (
    <div>
      <div
        className={`font-mono text-4xl font-bold tabular-nums ${
          accent ? "text-accent" : "text-text"
        }`}
      >
        {value}
      </div>
      <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-subtext">
        {label}
      </div>
    </div>
  );
}
