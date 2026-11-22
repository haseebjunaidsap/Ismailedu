/* =====================================================================
   Profiles, per-child progress, stats, mistakes, daily data, and cloud sync.
   Everything is kept in localStorage; on claude.ai it is also saved to the
   viewer's private space so progress follows the child to other devices.
   ===================================================================== */
const LS = {
  get(k, d) { try { const v = localStorage.getItem("pip." + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem("pip." + k, JSON.stringify(v)); return true; } catch (e) { return false; } },
  del(k) { try { localStorage.removeItem("pip." + k); } catch (e) { } },
};
const AVATARS = ["🦊", "🐼", "🦁", "🐸", "🐙", "🦄", "🐯", "🐨", "🐵", "🐧", "🦖", "🐝", "🦋", "🐬", "🚀", "⚽"];
const MAX_MISTAKES = 30, MAX_MISTAKE_BYTES = 6000;
const dayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const parseDay = k => { const [y, m, d] = k.split("-").map(Number); return new Date(y, m - 1, d); };
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
function weekKey(d = new Date()) { const m = addDays(d, -((d.getDay() + 6) % 7)); return dayKey(m); } /* Monday of that week */
const newId = () => "k" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

function blankP() { return { progress: {}, stickers: [], bestpts: {}, stats: {}, mistakes: [], days: {}, daily: {}, prizes: [], seen: {}, lastAge: null, updatedAt: 0, mU: 0, eggTotal: 0, pets: [] }; }
function fixP(p) { const b = blankP(); p = Object.assign(b, p || {}); for (const k of ["progress", "bestpts", "stats", "days", "daily", "seen"]) if (!p[k] || typeof p[k] !== "object" || Array.isArray(p[k])) p[k] = {}; for (const k of ["stickers", "mistakes", "prizes", "pets"]) if (!Array.isArray(p[k])) p[k] = []; if (!(p.eggTotal >= 0)) p.eggTotal = 0; return p; }

/* ---- profiles list (with migration from the single-player version) ---- */
let profiles = LS.get("profiles", null);
if (!Array.isArray(profiles) || !profiles.length) {
  const first = { id: newId(), name: "", avatar: "🦊", age: null, diff: "auto", a11y: {}, u: Date.now() };
  const old = fixP({ progress: LS.get("progress", {}), stickers: LS.get("stickers", []), bestpts: LS.get("bestpts", {}) });
  old.updatedAt = Date.now();
  profiles = [first]; LS.set("profiles", profiles); LS.set("p." + first.id, old); LS.set("current", first.id);
}
const liveProfiles = () => profiles.filter(p => !p.del);
let curPid = LS.get("current", null);
if (!liveProfiles().some(p => p.id === curPid)) curPid = liveProfiles()[0].id;
const curProfile = () => profiles.find(p => p.id === curPid) || liveProfiles()[0];
const profileName = p => (p && p.name) || "Player " + (liveProfiles().indexOf(p) + 1);
function saveProfiles() { LS.set("profiles", profiles); markDirty("state"); }
function loadP(pid) { return fixP(LS.get("p." + pid, null)); }
let P = loadP(curPid);
function saveP(skipStamp) { if (!skipStamp) P.updatedAt = Date.now(); trimMistakes(P); if (!LS.set("p." + curPid, P)) { P.mistakes = P.mistakes.slice(-10); LS.set("p." + curPid, P); } markDirty(curPid); }

/* ---- parent settings (shared by all children on this device) ---- */
let parent = Object.assign({ pin: "", lock: false, screen: 0, u: 0 }, LS.get("parent", {}));
function saveParent() { parent.u = Date.now(); LS.set("parent", parent); markDirty("state"); }

/* ---- stats ---- */
function today() { const k = dayKey(); return P.days[k] || (P.days[k] = { s: 0, q: 0, c: 0 }); }
function recordAnswer(q, ok, t) {
  const d = today(); d.q++; if (ok) d.c++;
  const src = q._src || (t && !t.special ? { age: t.age, subj: t.subj, id: t.id } : null);
  if (src) markSeen(`${src.age}-${src.subj}-${src.id}`, q);
  if (src) { const k = `${src.age}-${src.subj}-${src.id}`, s = P.stats[k] || (P.stats[k] = { n: 0, q: 0, c: 0, h: [], t: 0 }); s.q++; if (ok) s.c++; s.t = Date.now(); }
  const key = mistakeKey(q);
  if (!ok) addMistake(q, src);
  else if (t && t.special === "review") { P.mistakes = P.mistakes.filter(m => m.key !== key); P.mU = Date.now(); }
  saveP();
}
function recordQuiz(t, score, n) {
  if (t.special) return;
  const k = `${t.age}-${t.subj}-${t.id}`, s = P.stats[k] || (P.stats[k] = { n: 0, q: 0, c: 0, h: [], t: 0 });
  s.n++; s.h = [...(s.h || []), Math.round(score / Math.max(1, n) * 100)].slice(-5); s.t = Date.now();
  saveP();
}
/* ---- questions already seen (per child, per topic) so a repeat visit gets fresh ones ---- */
const SEEN_CAP = 120;
const stripTags = v => String(v || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
function coreKey(q) {
  const svg = /<svg/.test((q.vis || "") + q.ans + (q.opts || []).join(""));
  return stripTags(q.say || q.q) + "|" + (q.kind && q.kind !== "count" && q.kind !== "type" ? q.kind + ":" + (q.key || q.ans) : svg ? (q.key != null ? "k:" + q.key : (q.vis || "") + "|" + q.ans) : stripTags(q.ans) + "|" + stripTags(q.vis));
}
function qHash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36); }
const seenKey = q => q._h || (q._h = qHash(coreKey(q._orig ? Object.assign({}, q, q._orig, { kind: undefined }) : q)));
function markSeen(pk, q) { const a = P.seen[pk] || (P.seen[pk] = []), h = seenKey(q), i = a.indexOf(h); if (i >= 0) a.splice(i, 1); a.push(h); if (a.length > SEEN_CAP) a.splice(0, a.length - SEEN_CAP); }
function mistakeKey(q) { return String(q.key != null ? q.key : q.q + "|" + q.ans).slice(0, 300); }
function addMistake(q, src) {
  const item = {}; for (const k of ["q", "say", "vis", "opts", "ans", "why", "big", "extra", "sayAns", "kind", "items", "bins", "correct", "count", "emo", "unit"]) if (q[k] != null) item[k] = q[k];
  if (q._orig) { Object.assign(item, q._orig); delete item.kind; } /* store the plain multiple-choice version */
  item.key = mistakeKey(q); item._src = src; item.at = Date.now();
  if (JSON.stringify(item).length > MAX_MISTAKE_BYTES) return;
  P.mistakes = P.mistakes.filter(m => m.key !== item.key); P.mistakes.push(item); P.mU = Date.now();
}
function trimMistakes(p) { if (p.mistakes.length > MAX_MISTAKES) p.mistakes = p.mistakes.slice(-MAX_MISTAKES); }

/* ---- daily streaks ---- */
function dailyStreak(p = P) {
  let d = new Date(), n = 0;
  if (!p.daily[dayKey(d)]) d = addDays(d, -1);
  while (p.daily[dayKey(d)]) { n++; d = addDays(d, -1); }
  return n;
}
function daysThisWeek(p = P) { const m = parseDay(weekKey()); let n = 0; for (let i = 0; i < 7; i++) if (p.daily[dayKey(addDays(m, i))]) n++; return n; }
function minutesToday(p = P) { const d = p.days[dayKey()]; return d ? Math.floor(d.s / 60) : 0; }

/* ---- active time (counts only while the page is visible and someone tapped in the last 90 s) ---- */
let lastInteract = Date.now();
["pointerdown", "keydown", "touchstart"].forEach(ev => document.addEventListener(ev, () => { lastInteract = Date.now(); }, { capture: true, passive: true }));
setInterval(() => {
  if (document.visibilityState !== "visible" || Date.now() - lastInteract > 90000) return;
  today().s += 15; saveP(true); if (typeof checkScreenTime === "function") checkScreenTime();
}, 15000);

