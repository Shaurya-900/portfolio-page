/**
 * Client-side readers for the public GitHub API — "the exchange".
 * No token, so visitors spend their own 60 req/hr; every call degrades
 * gracefully when the exchange rate-limits quotations.
 */

export interface Repo {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
}

export interface GhEvent {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload: {
    commits?: { message: string }[];
    action?: string;
    ref_type?: string;
    ref?: string | null;
  };
}

const API = "https://api.github.com";

async function get<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export function fetchRepos(user: string): Promise<Repo[] | null> {
  return get<Repo[]>(`/users/${user}/repos?sort=pushed&per_page=30`);
}

export function fetchEvents(user: string): Promise<GhEvent[] | null> {
  return get<GhEvent[]>(`/users/${user}/events/public?per_page=30`);
}

export function timeAgo(iso: string): string {
  const s = Math.max(1, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
  if (s < 3600) return `${Math.max(1, Math.floor(s / 60))}m ago`;
  if (s < 86_400) return `${Math.floor(s / 3600)}h ago`;
  if (s < 86_400 * 30) return `${Math.floor(s / 86_400)}d ago`;
  const months = Math.floor(s / (86_400 * 30));
  return months < 12 ? `${months}mo ago` : `${Math.floor(months / 12)}y ago`;
}

/** One-line wire brief for an event, in the ticker's clipped voice. */
export function eventBrief(e: GhEvent): string | null {
  const repo = e.repo.name.split("/")[1] ?? e.repo.name;
  const when = timeAgo(e.created_at).toUpperCase();
  switch (e.type) {
    case "PushEvent": {
      // The public events feed often omits the commit list; fall back to the branch.
      const msg = e.payload.commits?.at(-1)?.message.split("\n")[0].slice(0, 72);
      const branch = e.payload.ref?.replace("refs/heads/", "");
      const detail = msg ? `“${msg}”` : branch;
      return `${when} · PUSH · ${repo}${detail ? ` — ${detail}` : ""}`;
    }
    case "CreateEvent":
      return `${when} · NEW ${e.payload.ref_type?.toUpperCase() ?? "REF"} · ${repo}${e.payload.ref ? ` — ${e.payload.ref}` : ""}`;
    case "PullRequestEvent":
      return `${when} · PULL REQUEST ${e.payload.action?.toUpperCase() ?? ""} · ${repo}`;
    case "IssuesEvent":
      return `${when} · ISSUE ${e.payload.action?.toUpperCase() ?? ""} · ${repo}`;
    case "WatchEvent":
      return `${when} · STARRED · ${repo}`;
    case "ForkEvent":
      return `${when} · FORKED · ${repo}`;
    case "ReleaseEvent":
      return `${when} · RELEASE · ${repo}`;
    default:
      return null;
  }
}
