export default function formatTime(seconds) {
  if (seconds == null || seconds === Infinity || Number.isNaN(seconds)) return "NO TIME";

  const total = Number(seconds);
  if (!Number.isFinite(total) || total <= 0) return "NO TIME";
  const hours = Math.floor(total / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = (total % 60).toFixed(3);

  if (hours > 0) {
    return `${hours}:${String(mins).padStart(2, "0")}:${secs.padStart(6, "0")}`;
  }
  if (mins > 0) {
    return `${mins}:${secs.padStart(6, "0")}`;
  }
  return secs;
}