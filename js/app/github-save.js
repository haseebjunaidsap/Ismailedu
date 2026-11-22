/* =====================================================================
   Optional: save progress to a private GitHub repository.
   A grown-up pastes a repo name and a GitHub token in the Parent dashboard.
   The token is kept ONLY in this browser (localStorage), never in the page
   or the repo. Progress is stored as JSON files, e.g. pip-data/state.json
   and pip-data/p-<child>.json, using the same merge as claude.ai cloud save.
   ===================================================================== */
const GH_API = "https://api.github.com";
const ghCfg = () => LS.get("gh", null);
const b64e = s => btoa(unescape(encodeURIComponent(s)));
const b64d = s => decodeURIComponent(escape(atob(String(s || "").replace(/\s/g, ""))));
function ghHeaders(token) { return { Accept: "application/vnd.github+json", Authorization: `Bearer ${token}`, "X-GitHub-Api-Version": "2022-11-28" }; }
function ghFail(r) {
  if (r.status === 401) return { code: "auth", status: 401 };
  if (r.status === 403 || r.status === 429) return { code: r.headers.get("x-ratelimit-remaining") === "0" || r.status === 429 ? "unavailable" : "auth", status: r.status };
  if (r.status === 409 || r.status === 422) return { code: "conflict", status: r.status };
  return { code: "unavailable", status: r.status };
}
/* A tiny adapter with the same doc(path).get()/set() shape the sync engine already uses */
function ghAdapter(cfg) {
  const H = ghHeaders(cfg.token), shas = {};
  /* v26: a child's progress goes in kid-<name>.json (older saves used p-<id>.json, still read as a fallback) */
  const legacyOf = path => `${cfg.dir}/${path.split("/").pop()}.json`;
  const fileOf = path => { const n = path.split("/").pop(); if (n.startsWith("p-")) { const k = profiles.find(x => x.id === n.slice(2)), s = k && nameSlug(k.name); if (s) return `${cfg.dir}/kid-${s}.json`; } return legacyOf(path); };
  const url = f => `${GH_API}/repos/${cfg.repo}/contents/${f.split("/").map(encodeURIComponent).join("/")}`;
  return {
    kind: "gh",
    doc(path) {
      const f = fileOf(path), name = path.split("/").pop();
      return {
        async get() {
          const r = await fetch(`${url(f)}?ref=${encodeURIComponent(cfg.branch)}&t=${Date.now()}`, { headers: H, cache: "no-store" });
          if (r.status === 404) {
            delete shas[f];
            const old = legacyOf(path);
            if (old !== f) { const r2 = await fetch(`${url(old)}?ref=${encodeURIComponent(cfg.branch)}&t=${Date.now()}`, { headers: H, cache: "no-store" }); if (r2.ok) { const j2 = await r2.json(); const d2 = JSON.parse(b64d(j2.content)); return { exists: true, data: () => d2 }; } if (r2.status !== 404) throw ghFail(r2); }
            return { exists: false, data: () => undefined };
          }
          if (!r.ok) throw ghFail(r);
          const j = await r.json(); shas[f] = j.sha;
          const d = JSON.parse(b64d(j.content)); return { exists: true, data: () => d };
        },
        async set(data) {
          const kid = name.startsWith("p-") && profiles.find(x => x.id === name.slice(2)), label = kid && kid.name ? kid.name : name;
          const body = { message: `Pip's Learning Park: save ${label}`, content: b64e(JSON.stringify(data)), branch: cfg.branch };
          if (shas[f]) body.sha = shas[f];
          const r = await fetch(url(f), { method: "PUT", headers: Object.assign({ "Content-Type": "application/json" }, H), body: JSON.stringify(body) });
          if (!r.ok) throw ghFail(r);
          const j = await r.json(); shas[f] = j.content && j.content.sha;
        },
      };
    },
  };
}
/* Check the repo and token, then start syncing */
async function ghConnect(repo, token, dir) {
  repo = String(repo || "").trim().replace(/^https?:\/\/github\.com\//i, "").replace(/\.git$/, "").replace(/\/+$/, "");
  token = String(token || "").trim(); dir = String(dir || "pip-data").trim().replace(/^\/+|\/+$/g, "") || "pip-data";
  if (!/^[\w.-]+\/[\w.-]+$/.test(repo)) throw new Error("Type the repository as owner/name, for example jane/pip-progress.");
  if (!token) throw new Error("Paste a GitHub token.");
  let r;
  try { r = await fetch(`${GH_API}/repos/${repo}`, { headers: ghHeaders(token), cache: "no-store" }); } catch (e) { throw new Error("Couldn't reach GitHub. Check the internet connection."); }
  if (r.status === 401) throw new Error("GitHub didn't accept that token. It may be mistyped or expired.");
  if (r.status === 404) throw new Error("GitHub can't find that repository with this token. Check the name, and that the token was given access to it.");
  if (!r.ok) throw new Error(`GitHub said no (error ${r.status}). Try again in a minute.`);
  const info = await r.json();
  if (!info.permissions || !info.permissions.push) throw new Error("This token can read the repository but can't save to it. Give it Contents: Read and write.");
  const cfg = { repo: info.full_name, token, dir, branch: info.default_branch || "main", private: !!info.private, at: Date.now() };
  LS.set("gh", cfg);
  startGhSync(cfg);
  await pullAll(true);
  if (SYNC.status === "syncing") { SYNC.status = "on"; SYNC.last = Date.now(); }
  syncBadge();
  return cfg;
}
function startGhSync(cfg) { SYNC.db = ghAdapter(cfg); SYNC.uid = "gh"; SYNC.kind = "gh"; SYNC.delay = 45000; SYNC.status = "syncing"; SYNC.err = ""; syncBadge(); }
function ghDisconnect() { LS.del("gh"); SYNC.db = null; SYNC.kind = null; SYNC.status = "local"; SYNC.dirty.clear(); clearTimeout(SYNC.timer); syncBadge(); initSync(); }

/* ---------- backup file (no account needed) ---------- */
function backupData() {
  const data = {}; for (const p of profiles) if (!p.del) data[p.id] = p.id === curPid ? P : loadP(p.id);
  return { app: "pips-learning-park", v: 1, at: new Date().toISOString(), profiles, settings: Object.assign({}, settings), parent: Object.assign({}, parent), data };
}
async function downloadBackup() {
  const name = `pip-backup-${dayKey()}.json`, text = JSON.stringify(backupData(), null, 1);
  /* inside claude.ai the page must ask the viewer before saving a file */
  const dl = window.claude && typeof window.claude.use === "function" ? await window.claude.use("downloads").catch(() => null) : null;
  if (dl) {
    try { await dl.save({ filename: name, data: text }); return "saved"; }
    catch (e) { return e && e.code === "declined" ? "declined" : "failed"; }
  }
  const blob = new Blob([text], { type: "application/json" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  return "saved";
}
function restoreBackup(text) {
  const b = JSON.parse(text);
  if (!b || b.app !== "pips-learning-park" || !Array.isArray(b.profiles) || !b.data) throw new Error("That file isn't a Pip's Learning Park backup.");
  const live = liveProfiles();
  if (live.length === 1 && !live[0].name && b.profiles.some(p => !p.del && p.id !== live[0].id)) {
    const d = live[0].id === curPid ? P : loadP(live[0].id);
    if (!Object.keys(d.progress).length && !d.stickers.length && !Object.keys(d.stats).length) { profiles = profiles.filter(p => p.id !== live[0].id); LS.del("p." + live[0].id); }
  }
  profiles = mergeProfiles(profiles, b.profiles); LS.set("profiles", profiles);
  if (!liveProfiles().some(p => p.id === curPid)) { curPid = liveProfiles()[0].id; LS.set("current", curPid); P = loadP(curPid); bindP(); }
  for (const [pid, d] of Object.entries(b.data)) { if (!profiles.some(p => p.id === pid && !p.del)) continue; const merged = mergeP(pid === curPid ? P : loadP(pid), d); LS.set("p." + pid, merged); if (pid === curPid) { P = merged; bindP(); } markDirty(pid); }
  if (b.parent && (b.parent.u || 0) > (parent.u || 0)) { parent = Object.assign(parent, b.parent); LS.set("parent", parent); }
  markDirty("state");
  return Object.keys(b.data).length;
}

