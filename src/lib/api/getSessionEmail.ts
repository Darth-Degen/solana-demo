// Minimal session check (replace with real auth)
export const getSessionEmail = (cookieHeader?: string | null): string | null => {
  if (!cookieHeader) return null;
  // very fake demo: look for session-token=...
  return /session-token=/.test(cookieHeader) ? "jane@test.com" : null;
};