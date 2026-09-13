type ClipboardWriter = Pick<Clipboard, "writeText">;

export async function copyText(text: string, clipboard?: ClipboardWriter): Promise<boolean> {
  const target = clipboard ?? (typeof navigator === "undefined" ? undefined : navigator.clipboard);
  if (!target) return false;

  try {
    await target.writeText(text);
    return true;
  } catch {
    return false;
  }
}
