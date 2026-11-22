/* =====================================================================
   Learning pace: keep children with Pip until each explanation is done.
   While Pip is explaining (a lesson step, a question and its choices, the
   feedback after an answer, Explain-more, a story page), the buttons that
   move on or leave are grayed out. They light up a moment after Pip
   finishes. With read-aloud off, a reading time is used instead.
   ===================================================================== */
const PACE = {
  relaxed: { gap: 1.6, rate: 0.92, after: 1500 },
  normal: { gap: 1, rate: 1, after: 1000 },
};
const pace = () => PACE[settings.pace] || PACE.relaxed;
/* Settings switches (all on unless a grown-up turns them off):
   attnOn      Pip asks the child to listen carefully / pay attention
   waitReadOn  answers stay locked until Pip has read the question and choices
   waitExplainOn  Next (and other move-on buttons) wait until Pip has finished explaining */
const attnOn = () => settings.attnPrompts !== false;
const waitReadOn = () => settings.waitRead !== false;
const waitExplainOn = () => settings.waitExplain !== false;
/* how long to wait when nothing is read aloud: about a slow reading speed for children */
function readMs(text) { const w = clean(text || "").split(/\s+/).filter(Boolean).length; return Math.max(2500, Math.round(w * 420 / Math.max(0.6, settings.rate))); }
let NAR_TOK = 0;
/* speak text; call done() once it has finished (plus a short pause). done is skipped if a newer narration started. */
function narrate(text, opts, done) {
  opts = opts || {};
  const tok = ++NAR_TOK, after = opts.after != null ? opts.after : pace().after;
  const fin = () => pTimeout(() => { if (tok === NAR_TOK && done) done(); }, after);
  const canTalk = hasSpeech && !settings.muted && (opts.force || settings.voice);
  if (canTalk) speak(text, !!opts.force, fin, Object.assign({}, opts, { gate: true }));
  else pTimeout(() => { if (tok === NAR_TOK && done) done(); }, readMs(text) + after);
  return tok;
}
/* gray out the buttons that move on or leave while Pip is explaining */
const NAV_SEL = '#next-btn, #prev-btn, #sr-next, #sr-prev, .side-links button, .deep-actions button, .bar .brand, .crumbs button, .stk-btn, #who-btn, [data-act="deep-step"], #deep [data-act="deep-new"], #deep .dopt, [data-act="deep-open"], [data-act="ai-open"], [data-act="ai-why"], [data-act="read"], [data-act="hint"], [data-act="sayq"], .say-opt, .ai-chip, #ai-form button, #ai-form input, [data-act="ai-retry"], .explain-btn';
/* say something with the helper buttons grayed out until Pip has finished */
function sayLocked(text, opts, after) { lockNav(true); return narrate(text, Object.assign({ force: true }, opts || {}), () => { lockNav(false); if (after) after(); }); }
function lockNav(on, root) {
  document.body.classList.toggle("pip-talking", !!on);
  /* "Wait for Pip's explanations" is off: keep buttons usable (a question being read still waits if that switch is on) */
  if (on && !waitExplainOn() && !(Q && Q.reading)) return;
  (root || document).querySelectorAll(NAV_SEL).forEach(b => {
    if (on) { if (!b.disabled) { b.dataset.locked = "1"; b.disabled = true; b.setAttribute("aria-disabled", "true"); } }
    else if (b.dataset.locked) { delete b.dataset.locked; b.disabled = false; b.removeAttribute("aria-disabled"); }
  });
}
/* the answer choices: locked until the question (and choices) have been read, plus one second */
const ANSWER_WAIT_MS = 1000;
function lockAnswers(on) {
  const r = document.querySelector(".q-right"); if (!r) return;
  r.classList.toggle("reading", !!on);
  r.querySelectorAll("button:not(.say-opt)").forEach(b => { if (on) { if (!b.disabled) { b.dataset.rlock = "1"; b.disabled = true; } } else if (b.dataset.rlock) { delete b.dataset.rlock; b.disabled = false; } });
  document.querySelectorAll(".tc-item").forEach(b => { b.disabled = !!on; });
}
/* the words Pip says for a multiple-choice question: the question, then each choice */
function questionScript(q) {
  let qText = clean(q.say || q.q).trim(); if (!/[.!?]$/.test(qText)) qText += ".";
  /* v29: every question starts with "Listen carefully, <name>, before you answer." */
  if (attnOn()) {
    qText = qText.replace(/^listen carefully[.!,]?\s*/i, "");
    const nm = typeof kidName === "function" ? kidName() : "";
    qText = `${nm ? `Listen carefully, ${nm}, before you answer.` : "Listen carefully before you answer."} ${qText}`;
  }
  if (settings.readOpts === false || (q.kind && q.kind !== "count") || !q.opts || !q.opts.length) return { text: qText, first: Infinity };
  const nums = ["One", "Two", "Three", "Four"];
  const one = o => clean(optSpeech(o)).replace(/[.!?]+(\s|$)/g, ",$1").replace(/[,\s]+$/, "");
  const first = splitParts(forSpeech(clean(qText))).length;
  return { text: `${qText} ${q.opts.map((o, k) => `${nums[k]}: ${one(o)}.`).join(" ")}`, first };
}

