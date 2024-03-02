export function convertTimeToSeconds(timeString: string): number {
  const [timeValue, timeUnit] = timeString.split(" ");
  const timeInMinutes = Number(timeValue);

  switch (timeUnit) {
    case "minutes":
      return timeInMinutes * 60;
    case "hours":
      return timeInMinutes * 60 * 60;
    case "days":
      return timeInMinutes * 24 * 60 * 60;
    case "months":
      return timeInMinutes * 30 * 24 * 60 * 60; // Assuming 30 days in a month
    default:
      throw new Error(`Invalid time unit: ${timeUnit}`);
  }
}

export function convertSecondsToReadable(seconds?: number): string {
  if (!seconds) return "0 seconds";
  const days = Math.floor(seconds / (24 * 60 * 60));
  seconds %= 24 * 60 * 60;
  const hours = Math.floor(seconds / (60 * 60));
  seconds %= 60 * 60;
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  const parts = [];
  if (days > 0) {
    parts.push(`${days} day${days > 1 ? "s" : ""}`);
  }
  if (hours > 0) {
    parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  }
  if (minutes > 0) {
    parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
  }
  if (seconds > 0) {
    parts.push(`${seconds} second${seconds > 1 ? "s" : ""}`);
  }

  return parts.join(", ");
}
