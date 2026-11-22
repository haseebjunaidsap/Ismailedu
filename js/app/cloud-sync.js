/* =====================================================================
   Cloud sync (claude.ai only): each viewer's own private documents
     data/users/<id>/state      → children list, settings, parent settings
     data/users/<id>/p-<child>  → that child's progress
   Merging keeps the best of both sides (most stars, all stickers, longest
   history), so playing on two devices never loses anything.
   ===================================================================== */
const SYNC = { db: null, uid: null, status: "local", last: 0, dirty: new Set(), timer: null, busy: false, err: "" };
function markDirty(what) { if (!SYNC.db) return; SYNC.dirty.add(what); if (!SYNC.timer) SYNC.timer = setTimeout(() => { SYNC.timer = null; pushDirty(); }, SYNC.delay || 4000); }
function mergeMax(a = {}, b = {}) { const o = Object.assign({}, a); for (const k in b) o[k] = Math.max(+o[k] || 0, +b[k] || 0); return o; }
function mergeP(a, b) {
  a = fixP(a); b = fixP(b); const o = blankP();
  o.progress = mergeMax(a.progress, b.progress); o.bestpts = mergeMax(a.bestpts, b.bestpts);
  o.stickers = [...new Set([...a.stickers, ...b.stickers])];
  o.stats = Object.assign({}, a.stats); for (const k in b.stats) { const x = o.stats[k], y = b.stats[k]; if (!x || (y.q || 0) > (x.q || 0) || ((y.q || 0) === (x.q || 0) && (y.t || 0) > (x.t || 0))) o.stats[k] = y; }
  o.days = Object.assign({}, a.days); for (const k in b.days) { const x = o.days[k] || {}, y = b.days[k] || {}; o.days[k] = { s: Math.max(x.s || 0, y.s || 0), q: Math.max(x.q || 0, y.q || 0), c: Math.max(x.c || 0, y.c || 0) }; }
  o.daily = Object.assign({}, a.daily); for (const k in b.daily) { if (!o.daily[k] || (b.daily[k].sc || 0) > (o.daily[k].sc || 0)) o.daily[k] = b.daily[k]; }
  const pw = new Map(); [...a.prizes, ...b.prizes].forEach(z => { if (z && z.wk && !pw.has(z.wk)) pw.set(z.wk, z); }); o.prizes = [...pw.values()];
  o.seen = Object.assign({}, a.seen); for (const k in b.seen) o.seen[k] = [...new Set([...(o.seen[k] || []), ...(b.seen[k] || [])])].slice(-SEEN_CAP);
  const newerM = (b.mU || 0) > (a.mU || 0) ? b : a; o.mistakes = newerM.mistakes.slice(-MAX_MISTAKES); o.mU = Math.max(a.mU || 0, b.mU || 0);
  o.lastAge = ((b.updatedAt || 0) > (a.updatedAt || 0) ? b.lastAge : a.lastAge) || a.lastAge || b.lastAge;
  o.updatedAt = Math.max(a.updatedAt || 0, b.updatedAt || 0);
  o.eggTotal = Math.max(a.eggTotal || 0, b.eggTotal || 0); o.pets = [...new Set([...(a.pets || []), ...(b.pets || [])])];
  return o;
}
/* v26: one child = one name. Children with the same name are joined into one (the same choice on every device). */
const sameName = (a, b) => String(a || "").trim().toLowerCase() === String(b || "").trim().toLowerCase();
const nameSlug = n => String(n || "").trim().toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 30);
const findKidByName = (n, except) => liveProfiles().find(p => p.id !== except && p.name && sameName(p.name, n));
function absorbKid(from, into) {
  const a = from.id === curPid ? P : loadP(from.id), b = into.id === curPid ? P : loadP(into.id), m = mergeP(b, a);
  LS.set("p." + into.id, m); if (into.id === curPid) { P = m; bindP(); }
  from.del = true; from.u = Date.now(); LS.del("p." + from.id);
  if (from.id === curPid) { curPid = into.id; LS.set("current", curPid); P = loadP(curPid); bindP(); }
  if (!into.age && from.age) into.age = from.age;
  into.u = Date.now(); markDirty(into.id);
}
function mergeSameNames() {
  let changed = false; const groups = {};
  for (const p of liveProfiles()) if (p.name) { const k = p.name.trim().toLowerCase(); (groups[k] = groups[k] || []).push(p); }
  for (const g of Object.values(groups)) if (g.length > 1) { g.sort((x, y) => x.id < y.id ? -1 : 1); for (const p of g.slice(1)) absorbKid(p, g[0]); changed = true; }
  if (changed) LS.set("profiles", profiles);
  return changed;
}
function mergeProfiles(a, b) {
  const m = new Map(); a.forEach(p => m.set(p.id, p));
  (b || []).forEach(p => { const x = m.get(p.id); if (!x || (p.u || 0) > (x.u || 0)) m.set(p.id, p); });
  return [...m.values()];
}
function userDoc(name) { return SYNC.db.doc(`data/users/${SYNC.uid}/${name}`); }
let syncListen = false;
async function initSync() {
  if (!syncListen) { syncListen = true; document.addEventListener("visibilitychange", () => { if (!SYNC.db) return; if (document.visibilityState === "visible" && SYNC.status === "on" && Date.now() - SYNC.last > 60000) pullAll(false); else if (document.visibilityState === "hidden") pushDirty(); }); }
  try {
    const gh = typeof ghCfg === "function" && ghCfg();
    if (gh) { startGhSync(gh); await pullAll(true); if (SYNC.status === "syncing") { SYNC.status = "on"; SYNC.last = Date.now(); } syncBadge(); return; }
    if (!window.claude || typeof window.claude.use !== "function") return;
    const [db, user] = await Promise.all([window.claude.use("db"), window.claude.use("user")]);
    if (!db || !user) return;
    const uid = await user.id(); if (!uid) return;
    SYNC.db = db; SYNC.uid = String(uid); SYNC.kind = "claude"; SYNC.delay = 4000; SYNC.status = "syncing"; syncBadge();
    await pullAll(true);
    if (SYNC.status === "syncing") { SYNC.status = "on"; SYNC.last = Date.now(); } syncBadge();
  } catch (e) { SYNC.status = SYNC.db ? "error" : "local"; SYNC.err = e && (e.code || e.message) || ""; syncBadge(); }
}
async function pullAll(first) {
  if (!SYNC.db || SYNC.busy) return; SYNC.busy = true;
  try {
    const st = await userDoc("state").get(), rs = st.exists ? st.data() : null;
    let changedLocal = false, pushState = !rs;
    if (rs) {
      /* a brand-new device starts with one empty player; drop it in favor of the saved children */
      const live = liveProfiles();
      if (live.length === 1 && !live[0].name && (rs.profiles || []).some(p => !p.del && p.id !== live[0].id)) {
        const d = live[0].id === curPid ? P : loadP(live[0].id);
        if (!Object.keys(d.progress).length && !d.stickers.length && !Object.keys(d.stats).length) { profiles = profiles.filter(p => p.id !== live[0].id); LS.del("p." + live[0].id); }
      }
      const mp = mergeProfiles(profiles, rs.profiles);
      if (JSON.stringify(mp) !== JSON.stringify(profiles)) { profiles = mp; LS.set("profiles", profiles); changedLocal = true; }
      if (mergeSameNames()) { changedLocal = true; pushState = true; }
      if (JSON.stringify(profiles) !== JSON.stringify(rs.profiles)) pushState = true;
      if (rs.settings && (rs.settings._u || 0) > (settings._u || 0)) { Object.assign(settings, rs.settings); LS.set("settings", settings); changedLocal = true; }
      else if ((settings._u || 0) > ((rs.settings && rs.settings._u) || 0)) pushState = true;
      if (rs.parent && (rs.parent.u || 0) > (parent.u || 0)) { parent = Object.assign(parent, rs.parent); LS.set("parent", parent); changedLocal = true; }
      else if ((parent.u || 0) > ((rs.parent && rs.parent.u) || 0)) pushState = true;
    }
    if (pushState) SYNC.dirty.add("state");
    for (const p of profiles) {
      if (p.del) continue;
      const snap = await userDoc("p-" + p.id).get(), remote = snap.exists ? fixP(snap.data()) : null;
      const local = p.id === curPid ? P : loadP(p.id), merged = remote ? mergeP(local, remote) : local;
      if (JSON.stringify(merged) !== JSON.stringify(fixP(local))) { if (p.id === curPid) { P = merged; bindP(); } LS.set("p." + p.id, merged); changedLocal = true; }
      if (!remote || JSON.stringify(merged) !== JSON.stringify(remote)) SYNC.dirty.add(p.id);
    }
    if (!liveProfiles().some(p => p.id === curPid)) { curPid = liveProfiles()[0].id; LS.set("current", curPid); P = loadP(curPid); bindP(); changedLocal = true; }
    SYNC.last = Date.now();
    SYNC.busy = false;
    await pushDirty();
    if (changedLocal && typeof onSyncedChange === "function") onSyncedChange();
  } catch (e) { SYNC.busy = false; SYNC.status = e && e.code === "auth" ? "gh-auth" : "error"; if (SYNC.status === "gh-auth") SYNC.db = null; SYNC.err = e && (e.code || e.message) || ""; syncBadge(); }
}
async function pushDirty() {
  if (!SYNC.db || SYNC.busy || !SYNC.dirty.size) return;
  SYNC.busy = true; clearTimeout(SYNC.timer); SYNC.timer = null;
  const todo = [...SYNC.dirty]; SYNC.dirty.clear();
  try {
    for (const w of todo) {
      if (w === "state") await userDoc("state").set({ v: 1, profiles, settings: Object.assign({}, settings), parent: Object.assign({}, parent), at: Date.now() });
      else { const data = w === curPid ? P : loadP(w); let body = JSON.parse(JSON.stringify(data)); if (JSON.stringify(body).length > 240000) for (const k in body.seen) body.seen[k] = body.seen[k].slice(-40);
        if (JSON.stringify(body).length > 240000) body.mistakes = body.mistakes.slice(-8); await userDoc("p-" + w).set(body); }
    }
    SYNC.status = "on"; SYNC.last = Date.now(); SYNC.err = ""; SYNC.conflicts = 0;
  } catch (e) {
    todo.forEach(w => SYNC.dirty.add(w));
    const code = e && e.code;
    if (code === "auth") { SYNC.status = "gh-auth"; SYNC.db = null; }
    else if (code === "conflict" && (SYNC.conflicts = (SYNC.conflicts || 0) + 1) <= 3) { SYNC.busy = false; SYNC.status = "syncing"; setTimeout(() => pullAll(false), 1500); return; }
    else if (code === "revoked" || code === "not_granted" || code === "invalid_argument") { SYNC.status = "readonly"; SYNC.db = null; }
    else { SYNC.status = "error"; clearTimeout(SYNC.timer); SYNC.timer = setTimeout(() => { SYNC.timer = null; pushDirty(); }, 30000); }
    SYNC.err = code || "";
  }
  SYNC.busy = false; syncBadge();
}
function syncBadge() { if (typeof paintSync === "function") paintSync(); }

