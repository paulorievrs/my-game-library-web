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
