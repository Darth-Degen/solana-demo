const hits = new Map<string, { count: number; ts: number }>();

export const rateLimit = (key: string, max = 30, windowMs = 60_000) => {
  const now = Date.now();
  const cur = hits.get(key);
  if (!cur || now - cur.ts > windowMs) {
    hits.set(key, { count: 1, ts: now });
    return { allowed: true, remaining: max - 1 };
  }
  if (cur.count >= max) return { allowed: false, remaining: 0 };
  cur.count += 1;
  return { allowed: true, remaining: max - cur.count };
};
