import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  calculateWPM,
  calculateRawWPM,
  calculateAccuracy,
} from "../utils/calculator";

const IGNORED_KEYS = new Set([
  "Shift",
  "Control",
  "Alt",
  "Meta",
  "CapsLock",
  "Escape",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "Home",
  "End",
  "PageUp",
  "PageDown",
  "Insert",
  "Delete",
  "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12",
]);

/**
 * Main typing board. Owns the raw keystroke listener and character-by-
 * character diffing against the target content. Reports live progress
 * up to the parent every tick, and a final summary once complete.
 *
 * A hidden, always-focused element captures keydown events directly
 * (no debounce, no controlled <input> re-render round-trip) so keypresses
 * paint to the screen with as little latency as possible.
 */
export default function TypingArea({ content, onProgress, onComplete, isCode }) {
  const chars = useMemo(() => content.split(""), [content]);

  // typed[i] = "correct" | "incorrect"
  const [typed, setTyped] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
  const [wpmHistory, setWpmHistory] = useState([]);
  const [flash, setFlash] = useState(false);

  const containerRef = useRef(null);
  const intervalRef = useRef(null);
  const typedRef = useRef(typed);
  typedRef.current = typed;

  const currentIndex = typed.length;
  const isFinished = chars.length > 0 && currentIndex >= chars.length;

  // reset whenever the target content changes (new track/level/restart)
  useEffect(() => {
    setTyped([]);
    setStartTime(null);
    setEndTime(null);
    setTotalKeystrokes(0);
    setCorrectKeystrokes(0);
    setWpmHistory([]);
    containerRef.current?.focus();
  }, [content]);

  // live ticking stats while the run is active
  useEffect(() => {
    clearInterval(intervalRef.current);
    if (startTime && !endTime) {
      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const correct = typedRef.current.filter((t) => t === "correct").length;
        const wpm = calculateWPM(correct, elapsed);
        setWpmHistory((h) => [...h.slice(-29), wpm]);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [startTime, endTime]);

  // push live stats up to parent (for the Stats bar) whenever anything changes
  useEffect(() => {
    const elapsed = startTime ? (endTime || Date.now()) - startTime : 0;
    const correct = typed.filter((t) => t === "correct").length;
    const wpm = calculateWPM(correct, elapsed || 1);
    const accuracy = calculateAccuracy(correctKeystrokes, totalKeystrokes);
    onProgress?.({
      wpm: startTime ? wpm : 0,
      accuracy,
      elapsedMs: elapsed,
      wpmHistory,
      isActive: !!startTime && !endTime,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typed, totalKeystrokes, correctKeystrokes, wpmHistory, startTime, endTime]);

  // fire completion summary once
  useEffect(() => {
    if (isFinished && startTime && !endTime) {
      const finishAt = Date.now();
      setEndTime(finishAt);
      const elapsed = finishAt - startTime;
      const correct = typed.filter((t) => t === "correct").length;
      onComplete?.({
        wpm: calculateWPM(correct, elapsed),
        rawWpm: calculateRawWPM(totalKeystrokes, elapsed),
        accuracy: calculateAccuracy(correctKeystrokes, totalKeystrokes),
        elapsedMs: elapsed,
        totalChars: chars.length,
        mistakes: totalKeystrokes - correctKeystrokes,
      });
    }
  }, [isFinished, startTime, endTime, typed, totalKeystrokes, correctKeystrokes, chars.length, onComplete]);

  const handleKeyDown = useCallback(
    (e) => {
      if (endTime) return;
      const { key } = e;

      // Tab never shifts browser focus away from the typing area; treat it
      // as a no-op keypress (real editors auto-indent, so we don't require
      // the user to press Tab — indentation is typed as literal spaces).
      if (key === "Tab") {
        e.preventDefault();
        return;
      }

      if (IGNORED_KEYS.has(key)) return;

      if (key === "Backspace") {
        e.preventDefault();
        setTyped((prev) => prev.slice(0, -1));
        return;
      }

      // ignore modifier combos like Ctrl+R, Cmd+C, etc.
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const inputChar = key === "Enter" ? "\n" : key;
      if (inputChar.length !== 1) return;

      e.preventDefault();

      if (currentIndex >= chars.length) return;
      if (!startTime) setStartTime(Date.now());

      const expected = chars[currentIndex];
      const isMatch = inputChar === expected;

      setTyped((prev) => [...prev, isMatch ? "correct" : "incorrect"]);
      setTotalKeystrokes((c) => c + 1);
      if (isMatch) setCorrectKeystrokes((c) => c + 1);
    },
    [chars, currentIndex, startTime, endTime]
  );

  return (
    <div className="relative">
      <div
        ref={containerRef}
        tabIndex={0}
        role="textbox"
        aria-label="Typing input area"
        onKeyDown={handleKeyDown}
        onBlur={() => setFlash(true)}
        onFocus={() => setFlash(false)}
        className={`focus-ring relative rounded-lg border border-border bg-panel px-6 py-8 outline-none transition-shadow ${
          isFinished ? "opacity-60" : ""
        }`}
      >
        {flash && !isFinished && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg bg-bg/70 backdrop-blur-[1px]">
            <span className="font-mono text-sm text-subtext">
              click here or press any key to focus
            </span>
          </div>
        )}

        <pre
          className={`m-0 whitespace-pre-wrap break-words font-mono leading-relaxed ${
            isCode ? "text-lg" : "text-[1.35rem]"
          }`}
        >
          {chars.map((ch, i) => {
            const status = typed[i];
            const isCurrent = i === currentIndex;

            let colorClass = "text-muted";
            if (status === "correct") colorClass = "text-good";
            else if (status === "incorrect")
              colorClass = "text-bad bg-badbg rounded-[2px]";

            return (
              <span key={i} className="relative">
                {isCurrent && (
                  <span className="absolute -left-[1px] top-0 h-[1.35em] w-[2px] animate-caret bg-caret" />
                )}
                <span className={colorClass}>{ch === " " ? "\u00A0" : ch}</span>
              </span>
            );
          })}
          {currentIndex === chars.length && chars.length > 0 && (
            <span className="relative">
              <span className="absolute -left-[1px] top-0 h-[1.35em] w-[2px] animate-caret bg-caret" />
            </span>
          )}
        </pre>
      </div>
    </div>
  );
}
