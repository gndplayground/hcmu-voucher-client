export function summarize(text: string, n: number): string {
  if (text.length <= n) {
    return text;
  }
  const summary = text.substring(0, n).trim();
  return summary + "...";
}
