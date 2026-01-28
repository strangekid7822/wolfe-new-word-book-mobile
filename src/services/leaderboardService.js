// AsyncStorage-backed leaderboard service scoped by libraryId.
// Swappable with a real backend later without touching components.
//
// Design goals:
// - Use AsyncStorage (React Native storage) instead of localStorage
// - Scope data per libraryId so each course has its own leaderboard.

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_PREFIX = 'leaderboard:';
const USER_KEY = 'leaderboard:user';

/**
 * Build storage key for a library scope.
 * @param {string} libraryId
 */
function getLibraryKey(libraryId) {
  return `${STORAGE_PREFIX}${libraryId || 'default'}`;
}

/** Load a JSON array from AsyncStorage */
async function loadArray(key) {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Save a JSON array to AsyncStorage */
async function saveArray(key, arr) {
  await AsyncStorage.setItem(key, JSON.stringify(arr));
}

/** Deterministic color for avatars based on userId */
function hashToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  const r = (hash >> 16) & 0xff;
  const g = (hash >> 8) & 0xff;
  const b = hash & 0xff;
  return `rgb(${(r % 160) + 60}, ${(g % 160) + 60}, ${(b % 160) + 60})`;
}

/** Initials from display name for avatar fallback */
function initialsFromName(name) {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Get persisted user identity or create a random one on first run */
async function getOrCreateUser() {
  try {
    const raw = await AsyncStorage.getItem(USER_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  const userId = `u_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  const name = `Learner ${Math.floor(1000 + Math.random() * 9000)}`;
  const user = { userId, name };
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

/**
 * Submit a score to the leaderboard, keeping the best score per user.
 * @param {{libraryId: string, score: number, finishedCount: number, accuracyPct: number}} params
 * @returns {Promise<{rank:number,total:number,user:object}>}
 */
async function submitScore({ libraryId, score, finishedCount, accuracyPct }) {
  const { userId, name } = await getOrCreateUser();
  const key = getLibraryKey(libraryId);
  const list = await loadArray(key);

  const now = Date.now();
  const idx = list.findIndex((e) => e.userId === userId);
  const entry = { userId, name, score, finishedCount, accuracyPct, updatedAt: now };

  if (idx >= 0) {
    // Keep the best score; if tie, keep latest.
    const prev = list[idx];
    if (score > prev.score || (score === prev.score && now > (prev.updatedAt || 0))) {
      list[idx] = { ...prev, ...entry };
    }
  } else {
    list.push(entry);
  }

  // Sort by score desc, then updatedAt desc
  list.sort((a, b) => (b.score - a.score) || ((b.updatedAt || 0) - (a.updatedAt || 0)));
  await saveArray(key, list);

  const rank = list.findIndex((e) => e.userId === userId) + 1;
  return { rank, total: list.length, user: { ...entry } };
}

/** Get the top N entries for a library (sorted by best score) */
async function getTopN(libraryId, n = 3) {
  const key = getLibraryKey(libraryId);
  const list = await loadArray(key);
  return list.slice(0, n);
}

/** Get current user's rank and total participants in the library */
async function getUserRank(libraryId) {
  const { userId } = await getOrCreateUser();
  const key = getLibraryKey(libraryId);
  const list = await loadArray(key);
  const idx = list.findIndex((e) => e.userId === userId);
  return { rank: idx >= 0 ? idx + 1 : null, total: list.length, user: idx >= 0 ? list[idx] : null };
}

/** Build an international rank line in Chinese like "你的世界排名进入前X%" */
function getIntlRankText(rank, total) {
  if (!rank || !total) return '暂无排名';
  const pct = Math.max(1, Math.ceil((rank / total) * 100));
  return `你的世界排名进入前${pct}%`;
}

export default {
  getOrCreateUser,
  submitScore,
  getTopN,
  getUserRank,
  getIntlRankText,
  hashToColor,
  initialsFromName,
};
