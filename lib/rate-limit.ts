// Best-effort rate limit: in memory, per server instance. Serverless instances
// are recycled and run in parallel, so this slows down abuse but doesn't stop it.
export function createRateLimiter(max: number, windowMs: number) {
  const hits = new Map<string, number[]>();

  return function isLimited(key: string, now = Date.now()): boolean {
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    const limited = recent.length >= max;
    if (!limited) recent.push(now);
    hits.set(key, recent);
    if (hits.size > 1000) {
      for (const [k, times] of hits) if (times.every((t) => now - t >= windowMs)) hits.delete(k);
    }
    return limited;
  };
}
