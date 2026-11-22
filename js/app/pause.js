/* =====================================================================
   One Pause button for everything: the quiz clock, Pip's voice, the
   next-question countdown, the 3-2-1 countdown, wiggle breaks, Explain-more
   demos, read-along stories and animations. Resume continues from exactly
   where things stopped (speech restarts at the phrase that was cut off).
   ===================================================================== */
let PAUSED = false, PAUSE_STATE = null;
const PT = new Set();
/* setTimeout that freezes while paused */
function pTimeout(fn, ms) {
  const t = { fn, left: ms, due: Date.now() + ms, id: null };
  const arm = () => { t.due = Date.now() + t.left; t.id = setTimeout(() => { PT.delete(t); t.fn(); }, t.left); };
  t.arm = arm; PT.add(t);
  if (!PAUSED) arm();
  return t;
}
function pClear(t) { if (!t) return; clearTimeout(t.id); PT.delete(t); }
function pauseAll() {
  if (PAUSED) return;
  PAUSED = true; const now = Date.now();
  for (const t of PT) { clearTimeout(t.id); t.id = null; t.left = Math.max(0, t.due - now); }
  freezeQuizTimer();
  let ra = null;
  if (typeof RA !== "undefined" && RA && typeof SR !== "undefined" && SR) { ra = { page: SR.i, si: RA.cur || 0, onDone: RA.onDone }; RA.tok = -1; clearInterval(RA.iv); RA = null; }
  if (SPK && SPK.tok === speechTok) SPK.interrupt();
  if (hasSpeech) try { speechSynthesis.cancel(); } catch (e) { }
  PAUSE_STATE = { ra };
  document.body.classList.add("paused");
  /* a small banner, not a cover: the screen stays visible so a grown-up can talk through it */
  const o = document.createElement("div"); o.id = "pause-ov"; o.className = "pause-pill"; o.setAttribute("role", "status");
  o.innerHTML = `<span class="pz-emo" aria-hidden="true">⏸</span><span class="pz-txt"><b>Paused</b><small> · Pip and the clock are waiting</small></span><button class="btn btn-go btn-sm pz-go" type="button">▶ Keep going</button>`;
  o.querySelector(".pz-go").addEventListener("click", e => { e.stopPropagation(); resumeAll(); });
  document.body.appendChild(o);
  paintPauseBtns();
  announce("Paused");
}
function resumeAll() {
  if (!PAUSED) return;
  PAUSED = false;
  document.getElementById("pause-ov")?.remove();
  document.body.classList.remove("paused");
  for (const t of [...PT]) if (t.id == null) t.arm();
  thawQuizTimer();
  const st = PAUSE_STATE || {}; PAUSE_STATE = null;
  /* speak straight away inside the tap so phones allow it */
  if (SPK && SPK.tok === speechTok && SPK.waiting) { SPK.waiting = false; SPK.next(); }
  else if (st.ra && typeof SR !== "undefined" && SR && SR.i === st.ra.page) readAlong(st.ra.si, st.ra.onDone);
  paintPauseBtns();
}
/* leaving the screen while paused: drop the paused speech and carry on */
function cancelPause() { if (!PAUSED) return; SPK = null; PAUSE_STATE = null; resumeAll(); }
function paintPauseBtns() {
  document.querySelectorAll('[data-act="pause"]').forEach(b => {
    b.setAttribute("aria-pressed", String(PAUSED)); b.classList.toggle("is-paused", PAUSED);
    b.setAttribute("aria-label", PAUSED ? "Resume" : "Pause everything");
    if (b.classList.contains("pause-btn")) b.innerHTML = PAUSED ? `<span aria-hidden="true">▶</span><b>Resume</b>` : `<span aria-hidden="true">⏸</span><b>Pause</b>`;
    else b.innerHTML = PAUSED ? `<span class="emo">▶️</span> Resume` : `<span class="emo">⏸️</span> Pause`;
  });
}
/* if the child switches apps or tabs in the middle of a quiz, pause for them */
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden" && !PAUSED && Q && !Q.locked && Q.secs) pauseAll(); });

