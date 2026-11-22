/* =====================================================================
   Pip's Learning Park — profiles, parent dashboard, parent code, screen
   time, daily challenge, story time, accessibility and grade mapping.
   ===================================================================== */
const PAGE_NAMES = { kids: "Who's learning?", parent: "Parent dashboard", daily: "Daily Challenge", review: "Practice my mistakes", stories: "Story Time", story: "Story" };
const PRIZES = ["🥇", "🏅", "🎖️", "🦸", "🧙", "🐲", "🦄", "🌋", "🛡️", "🗿", "🎡", "🏯", "🚒", "🛰️", "🦚", "🐋"];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const ss = { get(k) { try { return sessionStorage.getItem("pip." + k); } catch (e) { return null; } }, set(k, v) { try { sessionStorage.setItem("pip." + k, v); } catch (e) { } } };

/* ---------------- grade / Common Core mapping (approximate) ---------------- */
const GRADE = { 6: 1, 7: 2, 8: 3, 9: 4 };
const MATH_DOM = { count: "NBT", add10: "OA", sub10: "OA", shapes: "G", compare: "NBT", oclock: "MD", patterns: "OA", doubles: "OA", numwords: "NBT", bonds: "OA", ordinal: "NBT", tally: "MD", cubes: "MD", place: "NBT", add100: "NBT", sub100: "NBT", halfhour: "MD", money: "MD", skip: "NBT", evenodd: "OA", missing: "OA", measure: "MD", symbols: "NBT", solids: "G", add3: "NBT", pictograph: "MD", mult: "OA", div: "OA", fractions: "NF", rounding: "NBT", perimeter: "MD", time5: "MD", place1000: "2.NBT", graphs: "MD", wordprob: "OA", comparefrac: "NF", dollars: "2.MD", missingfactor: "OA", estimate: "OA", mult2: "NBT", divrem: "NBT", equivfrac: "NF", decimals: "NF", area: "MD", angles: "MD", factors: "OA", elapsed: "MD", bignums: "NBT", numpatterns: "OA", convert: "MD", fracof: "NF", mixednum: "NF", volume: "5.MD", tengroups: "NBT", equalparts: "G", arrays: "OA", shares: "G", add1000: "NBT", fracline: "NF", addfrac: "NF", roundbig: "NBT", wordstory: "OA", lineplot: "MD", equations: "OA", multistep: "OA", linegraph: "MD", solveletter: "OA" };
const MATH_NAME = { OA: "Operations & Algebraic Thinking", NBT: "Number & Operations in Base Ten", NF: "Number & Operations: Fractions", MD: "Measurement & Data", G: "Geometry" };
const ENG_DOM = { sounds: "RF", vowels: "RF", rhyme: "RF", sight: "RF", case: "L", endsound: "RF", colors: "L", picsent: "RF", wordfam: "RF", actionwords: "L", qwords: "L", abcnext: "RF", digraphs: "RF", magice: "RF", nounverb: "L", plurals: "L", opposites: "L", punct: "L", blends: "RF", vteams: "RF", syllables: "RF", sentences: "L", bossyr: "RF", ing: "RF", silent: "RF", adjectives: "L", synonyms: "L", compound: "L", prefixes: "RF", past: "L", reading8: "RL", abc: "L", pronouns: "L", capitals: "L", comparing: "L", factopinion: "RI", possessive: "L", storyparts: "RL", homophones: "L", suffixes: "RF", figurative: "L", adverbs: "L", contractions: "L", reading9: "RI", context: "L", idioms: "L", prepositions: "L", causeeffect: "RI", partsofspeech: "L", roots: "L", linking: "L", wordgroups: "L", wordorder: "L", irregplural: "L", reflexive: "L", agree: "L", quotes: "L", pov: "RL", fragments: "L" };
const ENG_NAME = { RF: "Reading: Foundational Skills", L: "Language", RL: "Reading: Literature", RI: "Reading: Informational Text" };
const SEL_DOM = { feelings: "SA", bigfeelings: "SA", growth: "SA", calmdown: "SM", patience: "SM", selfcontrol: "SM", directions: "SM", organized: "SM", kindunkind: "SOC", empathy: "SOC", differences: "SOC", respect: "SOC", animals: "SOC", careforthings: "SOC", magicwords: "RS", sharing: "RS", goodfriend: "RS", listening: "RS", sorry: "RS", goodsport: "RS", teamwork: "RS", conflict: "RS", greetings: "RS", upstander: "RS", leadership: "RS", guest: "RS", outabout: "RS", table: "RS", classroom: "RS", helping: "RS", choices: "RDM", honesty: "RDM", peerpressure: "RDM", money: "RDM", askhelp: "RDM", truth: "RDM", problemsize: "SM", goals: "SM", neighbor: "SOC" };
const SEL_NAME = { SA: "Self-awareness", SM: "Self-management", SOC: "Social awareness", RS: "Relationship skills", RDM: "Responsible decision-making", SAFE: "Health & safety" };
function gradeOf(t) {
  const g = GRADE[t.age];
  if (t.subj === "math") { const d = MATH_DOM[t.id] || "OA", full = /\./.test(d) ? d : `${g}.${d}`, dom = full.split(".")[1]; return { g, code: full, name: `CCSS Math ${full}: ${MATH_NAME[dom]}${full[0] !== String(g) ? " (from another grade)" : ""}` }; }
  if (t.subj === "english") { const d = ENG_DOM[t.id] || "L"; return { g, code: `${d}.${g}`, name: `CCSS ELA ${d}.${g}: ${ENG_NAME[d]}` }; }
  if (t.subj === "science") return { g, code: t.std || "NGSS", name: t.stdName || "Next Generation Science Standards" };
  if (t.subj === "social") return { g, code: (t.std || "C3").replace("C3 ", ""), name: t.stdName || "C3 Framework for Social Studies" };
  if (t.subj === "logic") return { g, code: "Reasoning", name: "Thinking skills: supports the CCSS Mathematical Practices (reason, look for patterns and structure)" };
  const d = SEL_DOM[t.id] || "SAFE"; return { g, code: d === "SAFE" ? "Safety" : "SEL", name: d === "SAFE" ? "Health & safety" : `Social-emotional learning (CASEL): ${SEL_NAME[d]}` };
}
const stdChip = t => { const s = gradeOf(t); return `<span class="std" title="${attr(s.name)} (approximate)">Gr ${s.g} · ${s.code}</span>`; };

/* ---------------- who's playing ---------------- */
function paintWho() { const b = $("who-btn"), p = curProfile(); if (!b || !p) return; b.textContent = p.avatar; b.setAttribute("aria-label", `${profileName(p)}: switch child`); b.title = profileName(p); }
function switchProfile(pid) {
  if (!profiles.some(p => p.id === pid && !p.del)) return;
  stopAll(); curPid = pid; LS.set("current", pid); P = loadP(pid); bindP(); applyA11y(); ss.set("picked", "1");
  const p = curProfile(); sfx("sticker"); toast(`${p.avatar} Hi, ${profileName(p)}!`);
  go(P.lastAge || p.age ? `age-${P.lastAge || p.age}-english` : "");
}
let editKid = null;
function kidsPage() {
  const kids = liveProfiles();
  const card = p => { const d = p.id === curPid ? P : loadP(p.id), st = Object.values(d.progress).reduce((a, b) => a + b, 0), sk = dailyStreak(d);
    return `<div class="kid-card${p.id === curPid ? " cur" : ""}"><button class="kid-main" data-who="${p.id}"><span class="kid-av">${p.avatar}</span><b>${esc(profileName(p))}</b><small>★ ${st} · 🏅 ${d.stickers.length}${sk ? ` · 🔥 ${sk}` : ""}${p.age ? ` · grade ${GRADE[p.age]}` : ""}</small></button><button class="kid-edit" data-act="kid-edit" data-pid="${p.id}" aria-label="Edit ${attr(profileName(p))}">✏️</button></div>`; };
  app.innerHTML = `<div class="age-head"><div><div class="eyebrow">Tap your picture</div><h1>Who's learning?</h1></div></div>
    <div class="kid-grid">${kids.map(card).join("")}${kids.length < 8 ? `<button class="kid-card add" data-act="kid-add"><span class="kid-av">➕</span><b>Add a child</b><small>Each child gets their own stars, stickers and progress</small></button>` : ""}</div>
    <div id="kid-form"></div>
    <p class="grownups">Grown-ups: see each child's progress in the <button data-go="parent">Parent dashboard</button>.</p>`;
  if (editKid) kidForm(editKid);
}
function kidForm(pid) {
  editKid = pid; const isNew = pid === "new", p = isNew ? { name: "", avatar: pick(AVATARS), age: null } : profiles.find(x => x.id === pid);
  if (!p) return;
  $("kid-form").innerHTML = `<section class="deep kid-edit-box" aria-label="${isNew ? "Add a child" : "Edit child"}">
    <h3>${isNew ? "Add a child" : `Edit ${esc(profileName(p))}`}</h3>
    <label class="fl">Name<input id="kid-name" maxlength="20" autocomplete="off" value="${attr(p.name || "")}" placeholder="First name or nickname"></label>
    <div class="pron-pick" data-name="kid-name"></div>
    <div class="fl">Picture<div class="av-grid" role="radiogroup">${AVATARS.map(a => `<button class="av${a === p.avatar ? " on" : ""}" data-av="${a}" role="radio" aria-checked="${a === p.avatar}">${a}</button>`).join("")}</div></div>
    <div class="fl">Grade<div class="age-switch">${[6, 7, 8, 9].map(a => `<button class="age-chip c${a}" data-act="kid-age" data-age="${a}" aria-current="${p.age === a}" aria-label="Grade ${GRADE[a]}">${GRADE[a]}</button>`).join("")}</div></div>
    <div class="btn-row"><button class="btn btn-go" data-act="kid-save">💾 Save</button><button class="btn" data-act="kid-cancel">Cancel</button></div></section>`;
  KF = { avatar: p.avatar, age: p.age };
  { const bx = document.querySelector('.pron-pick[data-name="kid-name"]'); if (bx && p.name) pronPickPaint(bx, p.name, p.namePron === "-" ? "" : namePronFor(p)); }
  $("kid-form").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "nearest" });
  $("kid-name").focus();
}
let KF = null;
function kidSave() {
  const name = ($("kid-name").value || "").trim().replace(/\s+/g, " ").slice(0, 20);
  if (!name) { toast("Type a name first"); $("kid-name").focus(); return; }
  if (findKidByName(name, editKid === "new" ? null : editKid)) { toast(`There's already a child named ${name}`); $("kid-name").focus(); return; }
  const ppSel = v37PronValue(document.querySelector('.pron-pick[data-name="kid-name"]'), name);
  if (editKid === "new") { const p = { id: newId(), name, avatar: KF.avatar, age: KF.age, diff: "auto", a11y: {}, u: Date.now() }; if (ppSel !== undefined) p.namePron = ppSel; profiles.push(p); saveProfiles(); LS.set("p." + p.id, Object.assign(blankP(), { lastAge: KF.age, updatedAt: Date.now() })); markDirty(p.id); editKid = null; switchProfile(p.id); return; }
  const p = profiles.find(x => x.id === editKid); if (!p) return;
  Object.assign(p, { name, avatar: KF.avatar, age: KF.age, u: Date.now() }); if (ppSel !== undefined) p.namePron = ppSel; saveProfiles(); markDirty(p.id); NAME_AUD = null; editKid = null; toast("Saved ✔"); paintWho(); render(curHash);
}

/* ---------------- parent code ---------------- */
let PIN_OK = 0, PIN = null;
const parentOK = () => !parent.pin || Date.now() - PIN_OK < 10 * 60 * 1000;
function guardParent(fn, label) { if (parent.lock && parent.pin && !parentOK()) askPin(fn, null, label); else fn(); }
function pageAllowed(page) {
  if (page !== "parent") return true;
  if (!parent.pin) { app.innerHTML = `<div class="quiz-intro"><div class="pip-talk">${PIP}<div class="bubble">Grown-ups: make a 4-digit parent code to open the dashboard.</div></div></div>`; askPin(() => render(curHash), () => go(""), "the parent dashboard", "set"); return false; }
  if (!parentOK()) { app.innerHTML = `<div class="quiz-intro"><div class="pip-talk">${PIP}<div class="bubble">This part is for grown-ups. 🔒</div></div></div>`; askPin(() => render(curHash), () => go(""), "the parent dashboard"); return false; }
  return true;
}
function askPin(onOK, onCancel, label = "", mode = "check") {
  closePin(); hush();
  PIN = { onOK, onCancel, mode, val: "", first: null, label };
  const d = document.createElement("div"); d.className = "overlay pin-ov"; d.id = "pinpad";
  document.body.appendChild(d); paintPin();
}
function paintPin(msg) {
  const d = $("pinpad"); if (!d || !PIN) return;
  const titles = { check: `Grown-ups only 🔒`, set: "Make a parent code", confirm: "Type the code again", forgot: "Forgot the code?" };
  const sub = PIN.mode === "check" ? `Type the parent code to open ${PIN.label || "this"}.` : PIN.mode === "set" ? "Pick 4 numbers that grown-ups will remember. Kids won't be able to change settings or open the dashboard without it." : PIN.mode === "confirm" ? "Just to be sure." : `Solve this to make a new code: <b>${PIN.a} × ${PIN.b}</b> = ?`;
  const len = PIN.mode === "forgot" ? 4 : 4;
  d.innerHTML = `<div class="panel pin-panel" role="dialog" aria-modal="true" aria-label="${titles[PIN.mode]}">
    <h2>${titles[PIN.mode]}</h2><p class="sub">${sub}</p>
    ${PIN.mode === "forgot" ? `<div class="kp-show pin-forgot">${PIN.val || "&nbsp;"}</div>` : `<div class="pin-dots" aria-live="polite">${range(0, len - 1).map(i => `<i class="${i < PIN.val.length ? "on" : ""}"></i>`).join("")}</div>`}
    <div class="pin-msg" aria-live="assertive">${msg || ""}</div>
    <div class="kp-keys">${["1", "2", "3", "4", "5", "6", "7", "8", "9", "✖", "0", "⌫"].map(k => `<button class="kp-k" data-pin="${k}" aria-label="${k === "✖" ? "Cancel" : k === "⌫" ? "Delete" : k}">${k}</button>`).join("")}</div>
    ${PIN.mode === "forgot" ? `<button class="btn btn-go" data-pin="ok">✓ Check</button>` : PIN.mode === "check" ? `<button class="linkish" data-act="pin-forgot">Forgot the code?</button>` : ""}
  </div>`;
}
function featureTap(el) {
  const d = el.dataset;
  if (d.pin != null) pinKey(d.pin);
  else if (d.av != null && KF) { KF.avatar = d.av; document.querySelectorAll(".av").forEach(b => { const on = b.dataset.av === d.av; b.classList.toggle("on", on); b.setAttribute("aria-checked", String(on)); }); sfx("pop"); }
  else if (d.who != null) switchProfile(d.who);
}
function pinKey(k) {
  if (!PIN) return; sfx("pop");
  if (k === "✖") { const c = PIN.onCancel; closePin(); c && c(); return; }
  if (k === "⌫") { PIN.val = PIN.val.slice(0, -1); paintPin(); return; }
  if (PIN.mode === "forgot") {
    if (k === "ok") { if (+PIN.val === PIN.a * PIN.b) { PIN.mode = "set"; PIN.val = ""; paintPin("Now make a new code."); } else { PIN.val = ""; newForgot(); paintPin("Not quite. Try this one."); } return; }
    if (PIN.val.length < 5) PIN.val += k; paintPin(); return;
  }
  if (!/^\d$/.test(k) || PIN.val.length >= 4) return;
  PIN.val += k; paintPin();
  if (PIN.val.length < 4) return;
  setTimeout(() => {
    if (!PIN) return;
    if (PIN.mode === "check") { if (PIN.val === parent.pin) { PIN_OK = Date.now(); const f = PIN.onOK; closePin(); f && f(); } else { PIN.val = ""; sfx("wrong"); paintPin("That's not the code. Try again."); } }
    else if (PIN.mode === "set") { PIN.first = PIN.val; PIN.val = ""; PIN.mode = "confirm"; paintPin(); }
    else if (PIN.mode === "confirm") { if (PIN.val === PIN.first) { parent.pin = PIN.val; saveParent(); PIN_OK = Date.now(); toast("Parent code saved 🔒"); const f = PIN.onOK; closePin(); f && f(); } else { PIN.mode = "set"; PIN.val = ""; PIN.first = null; sfx("wrong"); paintPin("The codes didn't match. Start again."); } }
  }, 180);
}
function newForgot() { PIN.a = R(12, 19); PIN.b = R(6, 9); }
function closePin() { const d = $("pinpad"); if (d) d.remove(); PIN = null; }

/* ---------------- screen time ---------------- */
let snoozeUntil = 0;
function checkScreenTime() {
  if (!parent.screen || Date.now() < snoozeUntil || $("break-ov")) return;
  const m = minutesToday(); if (m < parent.screen) return;
  freezeQuizTimer();
  hush();
  const d = document.createElement("div"); d.className = "overlay break-ov"; d.id = "break-ov";
  d.innerHTML = `<div class="panel bb-card" role="dialog" aria-modal="true" aria-label="Break time"><div class="bb-emo">🌳</div><div class="bb-title">Time for a break!</div><div class="bb-txt">You've learned for <b>${m} minutes</b> today. Great work, ${esc(profileName(curProfile()))}! Let's rest your eyes and move your body.</div>
    <div class="btn-row"><button class="btn btn-go" data-act="break-ok">👋 OK, bye for now</button><button class="btn btn-sm" data-act="break-more">Grown-up: 15 more minutes</button></div></div>`;
  document.body.appendChild(d);
  sfx("soft"); speak(`Time for a break! You learned for ${m} minutes today. Great work! Let's rest your eyes and move your body.`, true);
}
function breakMore() { const ok = () => { snoozeUntil = Date.now() + 15 * 60000; const d = $("break-ov"); if (d) d.remove(); if (!PAUSED) thawQuizTimer(); toast("15 more minutes ⏰"); }; if (parent.pin) askPin(ok, null, "more time"); else ok(); }
function breakOK() { const d = $("break-ov"); if (!d) return; stopAll(); go(""); d.querySelector(".bb-txt").innerHTML = "See you later! 👋 Ask a grown-up if you'd like more time."; d.querySelector('[data-act="break-ok"]').remove(); }

/* ---------------- accessibility ---------------- */
const A11Y = [["font", "Easy-read font (helps with dyslexia)", "🔤"], ["big", "Bigger text and buttons", "🔎"], ["contrast", "High contrast", "🌗"], ["cb", "Color helper: name the colors in pictures", "🎨"], ["calm", "Calm mode: less motion, no confetti", "🍃"]];
function applyA11y() {
  const a = (curProfile() && curProfile().a11y) || {};
  A11Y.forEach(([k]) => document.body.classList.toggle("a11y-" + k, !!a[k]));
  reduced = osReduced || !!a.calm;
}
const COLOR_RX = /\b(red|orange|yellow|green|blue|purple|pink|brown|black|white|gr[ae]y)\b/i;
function a11yLabels(root) {
  if (!document.body.classList.contains("a11y-cb") || !root) return;
  root.querySelectorAll(".oval [aria-label], .q-vis [aria-label], .oval [title], .q-vis [title]").forEach(el => {
    if (el.dataset.cbl || el.closest(".cb-done")) return;
    const lab = el.getAttribute("aria-label") || el.getAttribute("title") || "";
    if (!COLOR_RX.test(lab) || (el.textContent || "").trim().length > 2) return;
    el.dataset.cbl = 1; el.insertAdjacentHTML("afterend", `<small class="cb-lbl">${esc(lab.replace(/^the /i, ""))}</small>`);
  });
}
function childPrefsHTML(pid) {
  const p = profiles.find(x => x.id === pid); if (!p) return "";
  const a = p.a11y || {};
  return `<div class="field"><label for="pref-diff-${pid}">Quiz difficulty</label><select id="pref-diff-${pid}" data-pref="diff" data-pid="${pid}">${[["auto", "Auto: adapts to how they're doing (recommended)"], ["easy", "🌱 Always easy (3 choices, more time, hints)"], ["normal", "⭐ Always normal"], ["challenge", "🔥 Always challenge (less time, type the answer)"]].map(([v, l]) => `<option value="${v}"${(p.diff || "auto") === v ? " selected" : ""}>${l}</option>`).join("")}</select></div>
    ${A11Y.map(([k, l, e]) => `<div class="toggle-row"><label for="pref-${k}-${pid}">${e} ${l}</label><input type="checkbox" class="switch" id="pref-${k}-${pid}" data-pref="${k}" data-pid="${pid}"${a[k] ? " checked" : ""}></div>`).join("")}`;
}
document.addEventListener("change", e => {
  if (e.target && e.target.id === "bk-file") { const f = e.target.files && e.target.files[0]; if (!f) return; f.text().then(t => { const n = restoreBackup(t); toast(`Restored ${n} child${n === 1 ? "" : "ren"} ✔`); applyA11y(); paintWho(); render(curHash); }).catch(err => toast(err.message || "Couldn't read that file")); e.target.value = ""; return; }
  const el = e.target.closest("[data-pref],[data-par]"); if (!el) return;
  if (el.dataset.par) { const k = el.dataset.par; parent[k] = el.type === "checkbox" ? el.checked : +el.value; if (k === "lock" && el.checked && !parent.pin) { el.checked = false; parent.lock = false; askPin(() => { parent.lock = true; saveParent(); render(curHash); }, null, "", "set"); return; } saveParent(); toast("Saved ✔"); return; }
  const p = profiles.find(x => x.id === el.dataset.pid); if (!p) return;
  if (el.dataset.pref === "diff") p.diff = el.value; else { p.a11y = Object.assign({}, p.a11y, { [el.dataset.pref]: el.checked }); }
  p.u = Date.now(); saveProfiles(); if (p.id === curPid) applyA11y(); sfx("pop");
});

/* ---------------- special quizzes: review, daily, story ---------------- */
function startReview() {
  if (!P.mistakes.length) {
    app.innerHTML = `<div class="results"><div class="pip-talk">${PIP}<div class="bubble">No mistakes to practice right now. Wow! 🎉 When you miss a question in any quiz, it shows up here so you can try it again.</div></div><div class="btn-row"><button class="btn btn-go" data-go="">🏠 Home</button>${P.lastAge ? `<button class="btn btn-sun" data-go="age-${P.lastAge}-english">Pick a topic ▶</button>` : ""}</div></div>`;
    speak("No mistakes to practice right now. Wow!"); return;
  }
  const items = shuffle(P.mistakes).slice(0, Math.min(10, P.mistakes.length));
  startQuiz({ special: "review", age: P.lastAge || curProfile().age || 7, subj: "mix", id: "review", title: "Practice my mistakes", icon: "🔁", preset: items });
}
function seeded(str) { let h = 2166136261; for (const c of str) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 100000) / 100000; }; }
function dailyTopic(age) {
  const rnd = seeded(dayKey() + curPid + age), subs = Object.keys(SUBJ), order = [...subs, subs[Math.floor(rnd() * subs.length)]], qs = [];
  for (const s of order) {
    const list = C[age][s], t = list[Math.floor(rnd() * list.length)];
    for (let i = 0; i < 20; i++) { let q; try { q = t.gen(); } catch (e) { continue; } q.opts = (q.opts || []).map(String); q.ans = String(q.ans); if ((!q.kind || q.kind === "count") && !q.opts.includes(q.ans)) continue; if (qs.some(x => x.key != null && x.key === q.key && x._src.id === t.id)) continue; q._src = { age, subj: s, id: t.id }; qs.push(q); break; }
  }
  return { special: "daily", age, subj: "mix", id: "daily", title: "Daily Challenge", icon: "📅", preset: qs };
}
function calendarHTML(p = P) {
  const now = new Date(), y = now.getFullYear(), m = now.getMonth(), first = new Date(y, m, 1), lead = (first.getDay() + 6) % 7, days = new Date(y, m + 1, 0).getDate(), tk = dayKey();
  const cells = []; for (let i = 0; i < lead; i++) cells.push(`<span class="cal-x"></span>`);
  for (let d = 1; d <= days; d++) { const k = dayKey(new Date(y, m, d)), done = p.daily[k]; cells.push(`<span class="cal-d${done ? " done" : ""}${k === tk ? " today" : ""}${k > tk ? " future" : ""}" aria-label="${d}${done ? ", done" : ""}">${done ? "⭐" : d}</span>`); }
  return `<div class="cal"><div class="cal-h">${now.toLocaleString("en-US", { month: "long", year: "numeric" })}</div><div class="cal-g">${["M", "T", "W", "T", "F", "S", "S"].map(x => `<b>${x}</b>`).join("")}${cells.join("")}</div></div>`;
}
function dailyPage() {
  const age = P.lastAge || curProfile().age;
  if (!age) { app.innerHTML = `<div class="age-head"><div><div class="eyebrow">Daily Challenge</div><h1>What grade are you in?</h1></div></div><div class="age-grid">${[6, 7, 8, 9].map(a => `<button class="age-card c${a}" data-act="daily-age" data-age="${a}"><span class="age-num">${a}</span><span class="age-lbl">years old</span></button>`).join("")}</div>`; return; }
  const done = P.daily[dayKey()], sk = dailyStreak(), wk = daysThisWeek(), prize = P.prizes.find(z => z.wk === weekKey());
  app.innerHTML = `<div class="age-head"><div><div class="eyebrow">Grade ${GRADE[age]} · 5 questions · a new set every day</div><h1>📅 Daily Challenge</h1></div><div class="streak-big">🔥 ${sk}<small>day streak</small></div></div>
  <div class="daily-wrap">
    <div class="daily-main">
      <div class="pip-talk">${PIP}<div class="bubble">${done ? `You did today's challenge and got <b>${done.sc} of ${done.n}</b>! Come back tomorrow for a new one.` : sk ? `Keep your ${sk}-day streak going! Five quick questions from all your subjects.` : "Five quick questions, one from every subject. Do it every day to build a streak!"}</div></div>
      <div class="week-prize"><b>This week:</b> <span class="wk-dots">${range(1, 5).map(i => `<i class="${i <= wk ? "on" : ""}">${i <= wk ? "⭐" : ""}</i>`).join("")}</span> ${prize ? `<span class="tag good">Prize won: ${prize.e}</span>` : wk >= 5 ? "" : `<span>${5 - wk} more day${5 - wk === 1 ? "" : "s"} to win this week's prize 🎁</span>`}</div>
      <div class="btn-row">${done ? `<button class="btn" data-act="daily-start">🔁 Play again for fun</button>` : `<button class="btn btn-sun wiggle" data-act="daily-start">▶ Start today's challenge</button>`}<button class="btn btn-sm" data-act="daily-age" data-age="">Change grade</button></div>
    </div>
    ${calendarHTML()}
  </div>`;
  speak(done ? "You already did today's challenge. Come back tomorrow!" : "Daily challenge! Five quick questions. Ready?");
}
function specialResults() {
  const t = Q.t, n = Q.qs.length, sc = Q.score, pct = sc / n;
  const stars = pct >= 0.9 ? 3 : pct >= 0.7 ? 2 : pct >= 0.5 ? 1 : 0;
  let head = "", extra = "", btns = "", say = "";
  if (t.special === "review") {
    const left = P.mistakes.length;
    head = sc === n ? "You fixed every one! Amazing!" : sc ? `You fixed ${sc} mistake${sc > 1 ? "s" : ""}! The rest will wait for next time.` : "Those are tricky! Let's look at the lessons and try again.";
    extra = `<div class="res-stats"><span>✅ Fixed: ${sc}</span><span>🔁 Still to practice: ${left}</span></div>`;
    btns = `${left ? `<button class="btn btn-go" data-act="retry">🔁 Practice again</button>` : ""}<button class="btn btn-sun" data-go="">🏠 Home</button>`;
    say = `You fixed ${sc} out of ${n}. ${head}`;
    if (sc >= Math.ceil(n / 2)) { sfx("fanfare"); confetti(70); } else sfx("soft");
  } else if (t.special === "daily") {
    const k = dayKey(), first = !P.daily[k];
    if (!P.daily[k] || sc > P.daily[k].sc) P.daily[k] = { sc, n };
    let stk = first ? awardSticker() : null, prize = null;
    if (daysThisWeek() >= 5 && !P.prizes.some(z => z.wk === weekKey())) { const left = PRIZES.filter(e => !P.prizes.some(z => z.e === e)); prize = pick(left.length ? left : PRIZES); P.prizes.push({ e: prize, wk: weekKey() }); }
    saveP();
    const sk = dailyStreak();
    head = `${first ? "Daily challenge done!" : "Nice practice!"} You got ${sc} out of ${n}.`;
    extra = `<div class="streak-big center">🔥 ${sk}<small>day streak</small></div>${stk ? `<div class="sticker-win"><div class="stk-reveal">${stk}</div><div><b>New sticker!</b><br>It's in your sticker book.</div></div>` : ""}${prize ? `<div class="levelup prize-win">🎁 WEEKLY PRIZE! <span class="emo xl">${prize}</span> You did the challenge 5 days this week!</div>` : ""}${calendarHTML()}`;
    btns = `<button class="btn btn-go" data-go="">🏠 Home</button><button class="btn" data-go="stickers">🏅 Sticker book</button>${P.mistakes.length && sc < n ? `<button class="btn btn-ai" data-go="review">🔁 Practice my mistakes</button>` : ""}`;
    say = `${head} You have a ${sk} day streak!${stk ? " And you won a new sticker!" : ""}${prize ? " And you won this week's special prize!" : ""}`;
    sfx("fanfare"); confetti(prize ? 140 : 80); if (stk) setTimeout(() => sfx("sticker"), 900); if (prize) setTimeout(() => sfx("levelup"), 1600);
  } else {
    const st = t.story, k = "story-" + st.id, before = progress[k] || 0;
    if (stars > before) progress[k] = stars;
    const stk = stars >= 1 ? awardSticker() : null; saveP();
    head = stars === 3 ? "You really understood the story!" : stars ? "Good reading! Read it again to catch every detail." : "Let's read the story again together. Look for the answers as you read!";
    extra = `<div class="big-stars">${starsHTML(stars)}</div>${stk ? `<div class="sticker-win"><div class="stk-reveal">${stk}</div><div><b>New sticker!</b><br>It's in your sticker book.</div></div>` : ""}`;
    btns = `<button class="btn btn-go" data-go="story-${st.id}">📖 Read it again</button><button class="btn" data-act="retry">🔁 Quiz again</button><button class="btn btn-sun" data-go="stories">📚 More stories</button>`;
    say = `You got ${sc} out of ${n}. ${head}${stk ? " And you won a new sticker!" : ""}`;
    if (stars >= 2) { sfx("fanfare"); confetti(80); } else sfx("soft"); if (stk) setTimeout(() => sfx("sticker"), 900);
  }
  app.innerHTML = `<div class="results"><div class="pip-talk">${PIP}<div class="bubble">${head}</div></div>
    <div class="score-line">You got ${sc} out of ${n}!</div>
    <div class="review" aria-label="Your answers">${Q.log.map((ok, i) => `<span class="${ok ? "r-ok" : "r-no"}">${i + 1}</span>`).join("")}</div>
    ${extra}<div class="btn-row">${btns}</div></div>`;
  $("stk-count").textContent = stickers.length;
  speak(say);
  Q = null;
}

/* ---------------- story time ---------------- */
function storiesPage() {
  const age = P.lastAge || curProfile().age, ages = age ? [age, ...[6, 7, 8, 9].filter(a => a !== age)] : [6, 7, 8, 9];
  app.innerHTML = `<div class="age-head"><div><div class="eyebrow">Read along with Pip</div><h1>📚 Story Time</h1></div></div>
    <p class="slide-txt">Pip reads each story out loud and lights up every word. Tap any word to hear it. Then answer 5 questions to win a sticker!</p>
    ${ages.map(a => `<h2 class="story-age">Grade ${GRADE[a]}</h2><div class="topic-grid">${READ_STORIES.filter(s => s.age === a).map(s => `<article class="topic story-card" data-go="story-${s.id}"><div class="t-top"><div class="t-icon">${s.icon}</div>${starsHTML(progress["story-" + s.id] || 0)}</div><h3>${s.title}</h3><p>${s.blurb}</p><div class="t-actions"><button class="btn btn-go btn-sm" data-go="story-${s.id}">📖 Read</button><button class="btn btn-sm" data-go="storyquiz-${s.id}">❓ Quiz</button></div></article>`).join("")}</div>`).join("")}`;
}
let SR = null;
function storyRead(st) {
  SR = { st, i: 0 };
  app.innerHTML = `<div class="lesson-head"><div><div class="eyebrow">Story Time · Grade ${GRADE[st.age]}</div><h1><span class="emo">${st.icon}</span>${st.title}</h1></div></div>
    <div id="story-page"></div>
    <div class="slide-nav"><button class="btn" data-act="sr-prev" id="sr-prev">◀ Back</button><div class="dots sr-dots" id="sr-dots" role="group" aria-label="Pages"></div><button class="btn btn-go" data-act="sr-next" id="sr-next">Next page ▶</button></div>
    <div class="side-links"><button class="btn btn-sm" data-go="storyquiz-${st.id}"${progress["story-" + st.id] != null || (P.storiesRead || {})[st.id] ? "" : " hidden"}>❓ Skip to the questions</button><button class="btn btn-sm" data-go="stories">📚 Other stories</button></div>`;
  storyPage(0);
}
function storyWords(text) {
  let wi = 0;
  return splitParts(text).map(sent => `<span class="sr-sent">${sent.split(/\s+/).map(w => `<span class="w" data-wi="${wi++}" data-say="${attr(w.replace(/[^\w'’-]/g, ""))}">${esc(w)}</span>`).join(" ")}</span>`).join(" ");
}
function storyPage(i) {
  stopReadAlong();
  const st = SR.st, n = st.pages.length; SR.i = Math.max(0, Math.min(n - 1, i));
  const pg = st.pages[SR.i];
  $("story-page").innerHTML = `<div class="slide-card story-card-big slide-anim"><div class="slide-top"><div class="pip-mini-talk">${PIP}<span>${SR.i === 0 ? "Let's read together!" : SR.i === n - 1 ? "The last page!" : "Follow the words with me!"}</span></div><span class="step-tag">Page ${SR.i + 1} of ${n}</span></div>
    <div class="story-pic"><span class="emo">${pg.e}</span></div>
    <p class="story-text" id="story-text">${storyWords(pg.text)}</p>
    <div class="foot-btns"><button class="btn btn-sm btn-sun" data-act="sr-read" id="sr-read">🔊 Read to me</button><button class="btn btn-sm pause-sm" data-act="pause" aria-label="Pause everything"><span class="emo">⏸️</span> Pause</button></div></div>`;
  $("sr-dots").innerHTML = st.pages.map((_, k) => `<button type="button" class="sr-dot" data-act="sr-go" data-i="${k}" aria-label="Page ${k + 1}"${k === SR.i ? ' aria-current="page"' : ""}><span class="${k === SR.i ? "on" : k < SR.i ? "done" : ""}"></span></button>`).join("");
  $("sr-prev").disabled = SR.i === 0;
  const nb = $("sr-next"); nb.innerHTML = SR.i === n - 1 ? "Questions time! ❓" : "Next page ▶"; nb.classList.toggle("btn-sun", SR.i === n - 1); nb.classList.toggle("wiggle", SR.i === n - 1);
  /* Next page waits until Pip has read the page (or, with sound off, a reading time) */
  const tok = SR.lock = (SR.lock || 0) + 1; SR.t0 = Date.now(); lockNav(true);
  const unlock = () => { if (SR && SR.lock === tok) lockNav(false); };
  SR.unlock = unlock; SR.minMs = readMs(pg.text);
  if (window.voiceOn()) readAlong(0, () => pTimeout(unlock, pace().after));
  else pTimeout(unlock, SR.minMs + pace().after);
}
let RA = null;
function stopReadAlong() { if (RA) { RA.tok = -1; clearInterval(RA.iv); RA = null; hush(); } document.querySelectorAll(".story-text .w.now").forEach(w => w.classList.remove("now")); const b = $("sr-read"); if (b) b.textContent = "🔊 Read to me"; }
function readAlong(fromSent = 0, onDone) {
  if (!hasSpeech || settings.muted) { toast("Turn the sound on to hear the story"); return; }
  stopReadAlong();
  const words = [...document.querySelectorAll("#story-text .w")]; if (!words.length) return;
  const sents = [...document.querySelectorAll("#story-text .sr-sent")].map(s => [...s.querySelectorAll(".w")]);
  const tok = ++speechTok; RA = { tok, iv: null, onDone };
  const b = $("sr-read"); if (b) b.textContent = "⏹ Stop";
  try { speechSynthesis.cancel(); } catch (e) { }
  if (!voice) pickVoice();
  const light = w => { words.forEach(x => x.classList.toggle("now", x === w)); };
  let si = fromSent;
  const nextSent = () => {
    if (!RA || RA.tok !== tok || speechTok !== tok) return;
    clearInterval(RA.iv);
    if (si >= sents.length) { const cb = RA && RA.onDone; light(null); stopReadAlong(); if (cb) cb(); return; }
    RA.cur = si; const ws = sents[si++], text = ws.map(w => w.textContent).join(" "), starts = []; let pos = 0;
    ws.forEach(w => { starts.push(pos); pos += w.textContent.length + 1; });
    const u = new SpeechSynthesisUtterance(text), rate = Math.max(0.4, settings.rate * 0.92);
    if (voice) { u.voice = voice; u.lang = voice.lang; } else u.lang = "en-US";
    u.rate = rate; u.pitch = 1.04;
    let gotB = false, moved = false;
    const go2 = () => { if (moved) return; moved = true; clearTimeout(guard); setTimeout(nextSent, 280 / Math.max(0.6, settings.rate)); };
    const guard = setTimeout(go2, 2500 + text.length * 120 / rate);
    u.onboundary = e => { if (e.name && e.name !== "word") return; gotB = true; clearInterval(RA && RA.iv); let k = 0; for (let j = 0; j < starts.length; j++) if (starts[j] <= e.charIndex) k = j; light(ws[k]); };
    u.onstart = () => {
      light(ws[0]);
      setTimeout(() => { if (gotB || !RA || RA.tok !== tok) return; let k = 0; RA.iv = setInterval(() => { if (!RA || RA.tok !== tok) return; k = Math.min(ws.length - 1, k + 1); light(ws[k]); if (k >= ws.length - 1) clearInterval(RA.iv); }, Math.max(220, (text.length / ws.length + 1) * 62 / rate)); }, 450);
    };
    u.onend = go2; u.onerror = go2;
    speechSynthesis.speak(u);
  };
  nextSent();
}

/* ---------------- home extras & parent dashboard ---------------- */
function homeCards() {
  const done = P.daily[dayKey()], sk = dailyStreak(), m = P.mistakes.length;
  return `<div class="quick-grid">
    <button class="quick c-daily" data-go="daily"><span class="emo">📅</span><span><b>Daily Challenge</b><small>${done ? "Done today ✅" : "5 quick questions"} · 🔥 ${sk} day${sk === 1 ? "" : "s"}</small></span></button>
    <button class="quick c-story" data-go="stories"><span class="emo">📚</span><span><b>Story Time</b><small>Read along with Pip</small></span></button>
    <button class="quick c-review" data-go="review"><span class="emo">🔁</span><span><b>Practice my mistakes</b><small>${m ? `${m} question${m === 1 ? "" : "s"} to try again` : "Nothing to fix yet!"}</small></span></button>
  </div>`;
}
function topicStat(d, key) { const s = d.stats[key]; return s && s.q ? { acc: Math.round(s.c / s.q * 100), q: s.q, n: s.n, last: s.h && s.h.length ? s.h[s.h.length - 1] : null } : null; }
let dashPid = null;
function parentPage() {
  const kids = liveProfiles(); if (!kids.some(k => k.id === dashPid)) dashPid = curPid;
  const p = profiles.find(x => x.id === dashPid), d = p.id === curPid ? P : loadP(p.id), age = d.lastAge || p.age || 7;
  const stars = Object.values(d.progress).reduce((a, b) => a + b, 0), st = Object.entries(d.stats);
  const totQ = st.reduce((a, [, s]) => a + (s.q || 0), 0), totC = st.reduce((a, [, s]) => a + (s.c || 0), 0), quizzes = st.reduce((a, [, s]) => a + (s.n || 0), 0);
  const week = range(0, 6).map(i => { const day = addDays(new Date(), i - 6), k = dayKey(day), x = d.days[k] || {}; return { lab: day.toLocaleDateString("en-US", { weekday: "short" }), m: Math.round((x.s || 0) / 60), q: x.q || 0, c: x.c || 0 }; });
  const weekMin = week.reduce((a, w) => a + w.m, 0), maxM = Math.max(10, ...week.map(w => w.m));
  const bySubj = Object.keys(SUBJ).map(s => { const e = st.filter(([k]) => k.split("-")[1] === s), q = e.reduce((a, [, x]) => a + x.q, 0), c = e.reduce((a, [, x]) => a + x.c, 0); return { s, q, acc: q ? Math.round(c / q * 100) : null }; });
  const rows = st.map(([k, s]) => { const [a, sj, ...id] = k.split("-"), t = findTopic(+a, sj, id.join("-")); return t && s.q >= 5 ? { t, acc: Math.round(s.c / s.q * 100), s } : null; }).filter(Boolean);
  const weak = rows.filter(r => r.acc < 80).sort((x, y) => x.acc - y.acc).slice(0, 5), strong = rows.filter(r => r.acc >= 90).sort((x, y) => y.acc - x.acc).slice(0, 5);
  const next = Object.keys(SUBJ).map(s => C[age][s].find(t => !d.progress[pkey(t)] && !d.stats[pkey(t)])).filter(Boolean);
  const goBtn = (t, mode, label, cls = "") => `<button class="btn btn-sm ${cls}" data-act="dash-go" data-pid="${p.id}" data-to="age-${t.age}-${t.subj}-${t.id}-${mode}">${label}</button>`;
  const topicRow = r => `<li><span class="emo">${r.t.icon}</span><span class="dr-name"><b>${r.t.title}</b><small>Grade ${GRADE[r.t.age]} · ${SUBJ[r.t.subj].short} · ${stdChip(r.t)} · ${r.s.q} answered</small></span><span class="acc ${r.acc >= 90 ? "hi" : r.acc < 60 ? "lo" : ""}">${r.acc}%</span>${goBtn(r.t, "learn", "📖")}${goBtn(r.t, "quiz", "⏱️ Practice", "btn-go")}</li>`;
  app.innerHTML = `<div class="age-head"><div><div class="eyebrow">For grown-ups</div><h1>👪 Parent dashboard</h1></div><button class="btn btn-sm" data-act="lock-now">🔒 Lock</button></div>
  <div class="tabs kid-tabs" role="tablist">${kids.map(k => `<button class="tab" role="tab" aria-selected="${k.id === p.id}" data-act="dash-kid" data-pid="${k.id}"><span class="emo">${k.avatar}</span><span>${esc(profileName(k))}<small>${k.id === curPid ? "playing now" : "tap to view"}</small></span></button>`).join("")}<button class="tab" data-act="dash-add"><span class="emo">➕</span><span>Add a child</span></button></div>
  <div class="dash-cards">
    <div class="dcard"><b>${stars}</b><small>stars earned</small></div>
    <div class="dcard"><b>${quizzes}</b><small>quizzes finished</small></div>
    <div class="dcard"><b>${totQ ? Math.round(totC / totQ * 100) + "%" : "–"}</b><small>right answers (${totQ} total)</small></div>
    <div class="dcard"><b>${weekMin}<i> min</i></b><small>learning in the last 7 days</small></div>
    <div class="dcard"><b>🔥 ${dailyStreak(d)}</b><small>daily challenge streak</small></div>
    <div class="dcard"><b>${d.mistakes.length}</b><small>questions saved to practice</small></div>
  </div>
  <div class="dash-2">
    <section class="dsec"><h3>Time and answers, last 7 days</h3><div class="wk-chart">${week.map(w => `<div class="wk-col" title="${w.m} min, ${w.q} questions"><span class="wk-bar" style="height:${Math.round(w.m / maxM * 100)}%"><em>${w.m || ""}</em></span><small>${w.lab}</small><small class="wk-q">${w.q ? `${w.c}/${w.q}` : ""}</small></div>`).join("")}</div><p class="hint">Bars are active minutes. Numbers under each day are right answers / questions.</p></section>
    <section class="dsec"><h3>By subject</h3>${bySubj.map(b => `<div class="subj-row"><span>${SUBJ[b.s].icon} ${SUBJ[b.s].short}</span><span class="sbar"><i style="width:${b.acc || 0}%" class="${b.acc >= 90 ? "hi" : b.acc != null && b.acc < 60 ? "lo" : ""}"></i></span><b>${b.acc == null ? "–" : b.acc + "%"}</b><small>${b.q} q</small></div>`).join("")}</section>
  </div>
  <section class="dsec"><h3>🌱 Needs practice</h3>${weak.length ? `<ul class="dash-list">${weak.map(topicRow).join("")}</ul>` : `<p class="hint">Nothing yet. Topics show up here once ${esc(profileName(p))} has answered at least 5 questions in them and gets less than 80% right.</p>`}
    ${d.mistakes.length ? `<div class="btn-row"><button class="btn btn-ai btn-sm" data-act="dash-go" data-pid="${p.id}" data-to="review">🔁 Practice saved mistakes (${d.mistakes.length})</button></div>` : ""}</section>
  ${strong.length ? `<section class="dsec"><h3>⭐ Doing great</h3><ul class="dash-list">${strong.map(topicRow).join("")}</ul></section>` : ""}
  <section class="dsec"><h3>➡️ Try next (grade ${GRADE[age]})</h3>${next.length ? `<ul class="dash-list">${next.map(t => `<li><span class="emo">${t.icon}</span><span class="dr-name"><b>${t.title}</b><small>${SUBJ[t.subj].short} · ${stdChip(t)} · ${t.blurb}</small></span>${goBtn(t, "learn", "📖 Start", "btn-go")}</li>`).join("")}</ul>` : `<p class="hint">Every topic for age ${age} has been tried. Wow!</p>`}</section>
  <section class="dsec"><h3>📋 Curriculum map: Grade ${GRADE[age]}</h3><p class="hint">Topics are lined up with US Common Core (math and English), CASEL social-emotional skills, and health & safety. The match is approximate: it shows where each topic usually fits, not an official alignment.</p>
    <div class="age-switch dash-ages">${[6, 7, 8, 9].map(a => `<button class="age-chip c${a}" data-act="dash-age" data-age="${a}" aria-current="${a === age}" aria-label="Grade ${GRADE[a]}">${GRADE[a]}</button>`).join("")}</div>
    ${Object.keys(SUBJ).map(s => `<details class="cmap"><summary>${SUBJ[s].icon} ${SUBJ[s].name} <small>${C[age][s].filter(t => d.progress[pkey(t)]).length}/${C[age][s].length} with stars</small></summary><table><thead><tr><th>Topic</th><th>Standard</th><th>Stars</th><th>Right</th></tr></thead><tbody>${C[age][s].map(t => { const g = gradeOf(t), ts = topicStat(d, pkey(t)); return `<tr><td>${t.icon} ${t.title}</td><td><b>${g.code}</b><small>${g.name}</small></td><td>${starsHTML(d.progress[pkey(t)] || 0)}</td><td>${ts ? ts.acc + "%" : "–"}</td></tr>`; }).join("")}</tbody></table></details>`).join("")}
  </section>
  <div class="dash-2">
    <section class="dsec"><h3>${p.avatar} ${esc(profileName(p))}'s settings</h3>${childPrefsHTML(p.id)}
      <div class="btn-row"><button class="btn btn-sm" data-act="dash-edit" data-pid="${p.id}">✏️ Name, picture & age</button>${kids.length > 1 ? `<button class="btn btn-sm" data-act="kid-del-ask" data-pid="${p.id}">🗑️ Remove child</button>` : ""}</div>
      <div class="reset-ask" id="kid-del" hidden>Remove ${esc(profileName(p))} and all their progress? <button class="btn btn-sm" data-act="kid-del-yes" data-pid="${p.id}">Yes, remove</button><button class="btn btn-sm" data-act="kid-del-no">Keep</button></div></section>
    <section class="dsec"><h3>🔒 Family controls</h3>
      <div class="toggle-row"><label for="par-lock">Need the parent code to open Settings</label><input type="checkbox" class="switch" id="par-lock" data-par="lock"${parent.lock ? " checked" : ""}></div>
      <div class="field"><label for="par-screen">Daily screen-time reminder (per child)</label><select id="par-screen" data-par="screen">${[[0, "Off"], [15, "15 minutes"], [20, "20 minutes"], [30, "30 minutes"], [45, "45 minutes"], [60, "1 hour"], [90, "1½ hours"]].map(([v, l]) => `<option value="${v}"${+parent.screen === v ? " selected" : ""}>${l}</option>`).join("")}</select><small class="hint">When time is up, Pip suggests a break. More time needs the parent code.</small></div>
      <div class="btn-row"><button class="btn btn-sm" data-act="pin-change">🔑 Change parent code</button></div>
    </section>
  </div>
  <section class="dsec" id="save-sec"><h3>💾 Saving progress</h3>
    <div class="sync-box" id="sync-box">${syncText()}</div>
    <div id="gh-panel">${ghPanel()}</div>
    <div class="btn-row"><button class="btn btn-sm" data-act="bk-down">⬇️ Download a backup</button><label class="btn btn-sm" for="bk-file">⬆️ Restore a backup</label><input type="file" accept=".json,application/json" id="bk-file" hidden></div>
    <p class="hint">A backup file has every child's stars, stickers and progress. Use it to move to another device or keep a copy. Restoring adds to what's already here; nothing gets deleted.</p>
  </section>`;
}
function syncText() {
  const s = SYNC.status, ago = SYNC.last ? Math.max(0, Math.round((Date.now() - SYNC.last) / 60000)) : null, when = ago != null ? ` Last synced ${ago ? ago + " min ago" : "just now"}.` : "";
  const gh = typeof ghCfg === "function" && ghCfg();
  if (s === "gh-auth") return `⚠️ GitHub stopped accepting the token (it may have expired or been removed). Progress is safe on this device. Paste a new token below to keep saving to GitHub.`;
  if (SYNC.kind === "gh" && gh) {
    if (s === "on") return `🐙 <b>Saved to GitHub</b> in <b>${esc(gh.repo)}</b>${gh.private ? " (private)" : " ⚠️ this repository is public, so anyone can read the progress files"}. Saves happen about once a minute while kids play, and whenever the page is closed.${when}`;
    if (s === "syncing") return "🐙 Syncing with GitHub…";
    if (s === "error") return `⚠️ Couldn't reach GitHub right now. Progress is safe on this device and will be saved when it can.`;
  }
  if (s === "on") return `☁️ <b>Saved to your Claude account.</b> Progress follows each child to any device where you open this page while signed in.${when}`;
  if (s === "syncing") return "☁️ Syncing…";
  if (s === "error") return `⚠️ Couldn't reach cloud save right now. Progress is safe on this device and will sync when it can.`;
  if (s === "readonly") return "💾 Saved on this device. (Cloud save needs edit access to this page.)";
  return "💾 Saved on this device only (in this browser). To use it on other devices, connect a GitHub repository below or use a backup file.";
}
function ghPanel() {
  const gh = typeof ghCfg === "function" && ghCfg();
  if (gh && SYNC.status !== "gh-auth") return `<div class="btn-row"><button class="btn btn-sm" data-act="gh-sync">🔄 Sync now</button><button class="btn btn-sm" data-act="gh-off">Disconnect this device</button></div><p class="hint">Folder <code>${esc(gh.dir)}</code> on branch <code>${esc(gh.branch)}</code>. Each child is saved under their name: ${liveProfiles().filter(k => nameSlug(k.name)).map(k => `<code>kid-${esc(nameSlug(k.name))}.json</code>`).join(", ") || "add a name to save a child"}. To add another device, open the site there and connect the same repository.</p>`;
  return `<details class="cmap gh-setup"${gh ? " open" : ""}><summary>🐙 Save progress to GitHub (optional)</summary>
    <ol class="gh-steps">
      <li>On GitHub, create a new <b>private</b> repository just for progress, for example <code>pip-progress</code>. Keep it separate from the site's repository.</li>
      <li>Make a token: <b>Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token</b>. Under <b>Repository access</b> choose <b>Only select repositories</b> and pick that repository. Under <b>Permissions → Repository permissions</b>, set <b>Contents</b> to <b>Read and write</b>. Pick an expiration date.</li>
      <li>Paste the repository and token below. Do this once on each device. The token is kept only in this browser. Never put it in the website's files.</li>
      <li>Each child's progress is saved under their name, as <code>kid-&lt;name&gt;.json</code>. On another device, the child just types the same name to pick up where they left off.</li>
    </ol>
    <label class="fl">Repository (owner/name)<input id="gh-repo" autocomplete="off" spellcheck="false" placeholder="your-name/pip-progress" value="${attr(gh ? gh.repo : "")}"></label>
    <label class="fl">Token<input id="gh-token" type="password" autocomplete="off" spellcheck="false" placeholder="github_pat_…"></label>
    <label class="fl">Folder in the repository<input id="gh-dir" autocomplete="off" spellcheck="false" value="${attr(gh ? gh.dir : "pip-data")}"></label>
    <div class="btn-row"><button class="btn btn-go btn-sm" data-act="gh-connect">🔗 Connect</button></div>
    <div class="pin-msg" id="gh-msg" aria-live="polite"></div>
  </details>`;
}
function paintGh() { const p = $("gh-panel"); if (p) p.innerHTML = ghPanel(); }
function paintSync() { const b = $("sync-box"); if (b) b.innerHTML = syncText(); if (SYNC.status === "gh-auth" && $("gh-panel") && !$("gh-repo")) paintGh(); }
function onSyncedChange() { applyA11y(); paintWho(); if (!Q && !D && !SR && !PIN && !editKid && !(route.topic)) render(curHash); else crumbs(); }

/* ---------------- page router & actions ---------------- */
function renderPage(r) {
  SR = null;
  if (r.page === "kids") kidsPage();
  else if (r.page === "parent") parentPage();
  else if (r.page === "daily") dailyPage();
  else if (r.page === "review") startReview();
  else if (r.page === "stories") storiesPage();
  else if (r.page === "story") { if (r.mode === "quiz") startQuiz(storyTopic(r.story)); else storyRead(r.story); }
}
function featureAct(a, el) {
  const d = el.dataset;
  if (a === "kid-edit") { kidForm(d.pid); return true; }
  if (a === "kid-add") { guardParent(() => { if (route.page !== "kids") go("kids"); setTimeout(() => kidForm("new"), 0); }, "adding a child"); return true; }
  if (a === "kid-age") { if (KF) { KF.age = KF.age === +d.age ? null : +d.age; document.querySelectorAll('#kid-form [data-act="kid-age"]').forEach(b => b.setAttribute("aria-current", String(+b.dataset.age === KF.age))); sfx("pop"); } return true; }
  if (a === "kid-save") { kidSave(); return true; }
  if (a === "kid-cancel") { editKid = null; $("kid-form").innerHTML = ""; return true; }
  if (a === "pin-forgot") { PIN.mode = "forgot"; PIN.val = ""; newForgot(); paintPin(); return true; }
  if (a === "pin-change") { askPin(() => toast("Parent code changed 🔑"), null, "", "set"); return true; }
  if (a === "lock-now") { PIN_OK = 0; go(""); toast("Dashboard locked 🔒"); return true; }
  if (a === "dash-kid") { dashPid = d.pid; render(curHash); return true; }
  if (a === "dash-add") { editKid = "new"; go("kids"); return true; }
  if (a === "dash-edit") { editKid = d.pid; go("kids"); return true; }
  if (a === "dash-age") { const p = profiles.find(x => x.id === dashPid); if (p) { if (p.id === curPid) { P.lastAge = +d.age; saveP(); } else { const x = loadP(p.id); x.lastAge = +d.age; x.updatedAt = Date.now(); LS.set("p." + p.id, x); markDirty(p.id); } } render(curHash); return true; }
  if (a === "dash-go") { if (d.pid !== curPid) { curPid = d.pid; LS.set("current", d.pid); P = loadP(d.pid); bindP(); applyA11y(); paintWho(); toast(`${curProfile().avatar} Playing as ${profileName(curProfile())}`); } go(d.to); return true; }
  if (a === "kid-del-ask") { $("kid-del").hidden = false; return true; }
  if (a === "kid-del-no") { $("kid-del").hidden = true; return true; }
  if (a === "kid-del-yes") { const p = profiles.find(x => x.id === d.pid); if (p && liveProfiles().length > 1) { p.del = true; p.u = Date.now(); saveProfiles(); LS.del("p." + p.id); if (p.id === curPid) { curPid = liveProfiles()[0].id; LS.set("current", curPid); P = loadP(curPid); bindP(); applyA11y(); paintWho(); } dashPid = curPid; toast("Removed"); render(curHash); } return true; }
  if (a === "break-ok") { breakOK(); return true; }
  if (a === "break-more") { breakMore(); return true; }
  if (a === "daily-start") { startQuiz(dailyTopic(P.lastAge || curProfile().age || 7)); return true; }
  if (a === "daily-age") { P.lastAge = d.age ? +d.age : null; if (!d.age) { const p = curProfile(); p.age = null; p.u = Date.now(); saveProfiles(); } saveP(); render(curHash); return true; }
  if (a === "sr-next") { if (SR.i < SR.st.pages.length - 1) { sfx("page"); storyPage(SR.i + 1); } else { P.storiesRead = Object.assign({}, P.storiesRead, { [SR.st.id]: 1 }); saveP(); sfx("levelup"); go("storyquiz-" + SR.st.id); } return true; }
  if (a === "sr-prev") { sfx("page"); storyPage(SR.i - 1); return true; }
  if (a === "sr-go") { const k = +d.i; if (SR && k !== SR.i && k >= 0 && k < SR.st.pages.length) { sfx("page"); storyPage(k); } return true; }
  if (a === "sr-read") { if (RA) { stopReadAlong(); if (SR && SR.unlock) pTimeout(SR.unlock, Math.max(0, SR.t0 + SR.minMs - Date.now())); } else readAlong(0, SR && SR.unlock ? () => pTimeout(SR.unlock, pace().after) : null); return true; }
  if (a === "open-parent") { closeSettings(); go("parent"); return true; }
  if (a === "gh-connect") {
    const msg = $("gh-msg"), btn = el; btn.disabled = true; msg.style.color = ""; msg.textContent = "Checking with GitHub…";
    ghConnect($("gh-repo").value, $("gh-token").value, $("gh-dir").value)
      .then(cfg => { toast("Connected to GitHub 🐙"); paintGh(); paintSync(); if (!cfg.private) toast("Heads up: that repository is public"); })
      .catch(e => { msg.textContent = e.message || "Something went wrong."; btn.disabled = false; });
    return true;
  }
  if (a === "gh-sync") { if (SYNC.db) { SYNC.busy = false; pullAll(false).then(() => { paintSync(); toast("Synced 🔄"); }); } else initSync(); return true; }
  if (a === "gh-off") { ghDisconnect(); paintGh(); paintSync(); toast("This device is no longer saving to GitHub"); return true; }
  if (a === "bk-down") { downloadBackup().then(r => toast(r === "saved" ? "Backup downloaded ⬇️" : r === "declined" ? "Backup not saved" : "Couldn't save the backup here")); return true; }
  return false;
}
document.addEventListener("keydown", e => {
  if (SR && route.page === "story" && route.mode === "read" && !$("pinpad") && !(e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName))) { if (e.key === "ArrowRight") $("sr-next").click(); else if (e.key === "ArrowLeft" && SR.i > 0) storyPage(SR.i - 1); }
});
function prizeShelf() { return P.prizes.length ? `<h2 class="story-age">🎁 Weekly prizes</h2><div class="sticker-grid prize-grid">${P.prizes.map(z => `<button class="stk prize" data-act="stk" aria-label="weekly prize">${z.e}<small>${parseDay(z.wk).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</small></button>`).join("")}</div>` : `<p class="hint">🎁 Do the Daily Challenge 5 days in one week to win a special weekly prize!</p>`; }

/* ---------------- v26: ask the child's name ---------------- */
function nameAskOpen() { return !!document.getElementById("name-ask"); }
function nameAskChips() {
  const ks = liveProfiles().filter(k => k.name); if (!ks.length) return "";
  return `<p class="na-or">Played before? Tap your name:</p><div class="na-kids">${ks.map(k => `<button type="button" class="na-kid" data-nakid="${k.id}">${k.avatar} ${esc(k.name)}</button>`).join("")}</div>`;
}
function nameAsk() {
  if (nameAskOpen()) return;
  const ov = document.createElement("div"); ov.id = "name-ask"; ov.className = "na-ov"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true"); ov.setAttribute("aria-labelledby", "na-h");
  ov.innerHTML = `<form class="na-card" novalidate>
    <div class="na-pip" aria-hidden="true">${curProfile().avatar || "🦊"}</div>
    <h2 id="na-h">Hi! What's your name?</h2>
    <p class="na-sub">Pip will save your stars and stickers under your name.</p>
    <input id="na-name" maxlength="20" autocomplete="off" autocapitalize="words" spellcheck="false" placeholder="Type your first name" aria-label="Your first name">
    <div class="pron-pick" data-name="na-name"></div>
    <button class="btn btn-go na-go" type="submit">Let's go! ➜</button>
    <div id="na-chips">${nameAskChips()}</div>
  </form>`;
  document.body.appendChild(ov); document.body.classList.add("na-open");
  ov.querySelector("form").addEventListener("submit", e => { e.preventDefault(); nameAskGo(document.getElementById("na-name").value); });
  ov.addEventListener("click", e => { const b = e.target.closest("[data-nakid]"); if (b) nameAskPick(b.dataset.nakid); });
  setTimeout(() => { const i = document.getElementById("na-name"); if (i) i.focus(); }, 60);
  try { narrate("Hi! What's your name?", { force: true }); } catch (e) { }
}
function nameAskClose(greet) {
  const ov = document.getElementById("name-ask"); if (ov) ov.remove(); document.body.classList.remove("na-open");
  paintWho();
  if (greet) { const p = curProfile(); toast(`${p.avatar} Hi, ${p.name}!`); try { narrate(`Hi, ${kidName()}! Let's learn!`, { force: true }); } catch (e) { } }
}
/* what to save from a picker: undefined = nothing chosen; "-" = as written; otherwise the spelling */
function v37PronValue(box, name) {
  if (!box || box.dataset.for == null || !box.innerHTML) return undefined;
  const first = String(name || "").trim().split(/\s+/)[0].toLowerCase(); if (box.dataset.for !== first) return undefined;
  const sel = box.dataset.sel || "", builtin = NAME_PRON_BUILTIN[first] || "";
  if (sel === builtin) return "";        /* the built-in spelling: keep following it */
  return sel || "-";
}
function nameAskPick(pid) {
  const cp = curProfile(), k = profiles.find(x => x.id === pid && !x.del); if (!k) return;
  if (k.id !== cp.id) { if (!cp.name) absorbKid(cp, k); saveProfiles(); curPid = k.id; LS.set("current", k.id); P = loadP(k.id); bindP(); applyA11y(); }
  ss.set("picked", "1"); nameAskClose(true); render(curHash);
}
function nameAskGo(raw) {
  const name = String(raw || "").trim().replace(/\s+/g, " ").slice(0, 20), inp = document.getElementById("na-name");
  if (!name) { if (inp) { inp.classList.remove("na-shake"); void inp.offsetWidth; inp.classList.add("na-shake"); inp.focus(); } return; }
  const cp = curProfile(), hit = findKidByName(name);
  if (hit) return nameAskPick(hit.id);
  const ppBox = document.querySelector('.pron-pick[data-name="na-name"]'), ppSel = ppBox ? v37PronValue(ppBox, name) : undefined;
  if (!cp.name) { cp.name = name; if (ppSel !== undefined) cp.namePron = ppSel; cp.u = Date.now(); saveProfiles(); markDirty(cp.id); }
  else {
    const free = AVATARS.filter(a => !liveProfiles().some(k => k.avatar === a));
    const p = { id: newId(), name, avatar: pick(free.length ? free : AVATARS), age: null, diff: "auto", a11y: {}, u: Date.now() }; if (ppSel !== undefined) p.namePron = ppSel;
    profiles.push(p); saveProfiles(); LS.set("p." + p.id, Object.assign(blankP(), { updatedAt: Date.now() })); markDirty(p.id);
    curPid = p.id; LS.set("current", p.id); P = loadP(p.id); bindP(); applyA11y();
  }
  ss.set("picked", "1"); nameAskClose(true); render(curHash);
}
/* when saved children arrive from GitHub or the cloud, show them as buttons in the prompt */
const _onSyncedChange26 = onSyncedChange;
onSyncedChange = function () { _onSyncedChange26(); const c = document.getElementById("na-chips"); if (c) c.innerHTML = nameAskChips(); };
