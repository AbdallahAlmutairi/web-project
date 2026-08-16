// Pure functions for turning raw keystroke data into WPM / accuracy metrics.
// Kept framework-agnostic so they're easy to unit test in isolation.

/**
 * Standard WPM formula: (correct characters / 5) / minutes elapsed.
 * Dividing by 5 is the conventional "average word length" used by
 * most typing-test tools (Monkeytype, 10fastfingers, etc).
 */
export function calculateWPM(correctChars, elapsedMs) {
  if (elapsedMs <= 0) return 0;
  const minutes = elapsedMs / 60000;
  const words = correctChars / 5;
  return Math.max(0, Math.round(words / minutes));
}

/**
 * "Raw" WPM counts every character typed (correct + incorrect),
 * useful for showing a secondary, less forgiving speed metric.
 */
export function calculateRawWPM(totalTypedChars, elapsedMs) {
  if (elapsedMs <= 0) return 0;
  const minutes = elapsedMs / 60000;
  const words = totalTypedChars / 5;
  return Math.max(0, Math.round(words / minutes));
}

/**
 * Accuracy = correct keystrokes / total keystrokes, as a whole percentage.
 * Total keystrokes should include corrected mistakes if you want the
 * classic "harsh" accuracy score (i.e. mistakes still count even if fixed).
 */
export function calculateAccuracy(correctKeystrokes, totalKeystrokes) {
  if (totalKeystrokes <= 0) return 100;
  const pct = (correctKeystrokes / totalKeystrokes) * 100;
  return Math.max(0, Math.min(100, Math.round(pct * 10) / 10));
}

/**
 * Consistency score (0-100) based on the coefficient of variation of
 * a rolling WPM sample array. Lower variance -> higher consistency.
 */
export function calculateConsistency(wpmSamples) {
  if (!wpmSamples || wpmSamples.length < 2) return 100;
  const mean = wpmSamples.reduce((a, b) => a + b, 0) / wpmSamples.length;
  if (mean === 0) return 100;
  const variance =
    wpmSamples.reduce((sum, v) => sum + (v - mean) ** 2, 0) / wpmSamples.length;
  const stdDev = Math.sqrt(variance);
  const cv = stdDev / mean; // coefficient of variation
  const score = Math.max(0, 100 - cv * 100);
  return Math.round(score);
}

/**
 * Formats elapsed milliseconds as m:ss for the on-screen timer.
 */
export function formatTime(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
