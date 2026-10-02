import type { H3Event } from "h3";

const buckets = new Map<string, Window>();

export function rateLimit(
  event: H3Event,
  name: string,
  limit: number,
  windowMs: number,
  { global = false } = {},
) {
  const ip = global
    ? "*"
    : getRequestIP(event, { xForwardedFor: true }) ?? "unknown";
  const key = `${name}:${ip}`;
  const now = Date.now();

  let win = buckets.get(key);
  if (!win || win.resetAt <= now) {
    win = { count: 0, resetAt: now + windowMs };
    buckets.set(key, win);
  }
  win.count++;

  if (buckets.size > 10_000) {
    for (const [k, w] of buckets) if (w.resetAt <= now) buckets.delete(k);
  }

  if (win.count > limit) {
    setResponseHeader(
      event,
      "Retry-After",
      Math.ceil((win.resetAt - now) / 1000),
    );
    throw createError({
      statusCode: 429,
      statusMessage: "Too many questions. Please try again in a little while.",
    });
  }
}
