import type { LeaderboardEntry } from '../types';

const KEY = 'mathgame_leaderboard_v1';

export function loadLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as LeaderboardEntry[];
  } catch {
    return [];
  }
}

export function saveEntry(entry: LeaderboardEntry): void {
  const entries = loadLeaderboard();
  entries.push(entry);
  // Keep top 50 by score
  entries.sort((a, b) => b.score - a.score);
  localStorage.setItem(KEY, JSON.stringify(entries.slice(0, 50)));
}

export function clearLeaderboard(): void {
  localStorage.removeItem(KEY);
}

export function topTen(): LeaderboardEntry[] {
  return loadLeaderboard()
    .sort((a, b) => b.score / b.total - a.score / a.total || b.score - a.score)
    .slice(0, 10);
}
