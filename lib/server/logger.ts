type LogLevel = "info" | "warn" | "error";

export function serverLog(level: LogLevel, message: string, context?: object) {
  const stamp = new Date().toISOString();
  const suffix = context ? ` ${JSON.stringify(context)}` : "";
  const line = `[server][${stamp}] ${message}${suffix}`;

  if (level === "error") {
    console.error(line);
    return;
  }

  if (level === "warn") {
    console.warn(line);
    return;
  }

  console.info(line);
}
