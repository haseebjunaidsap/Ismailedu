/* =====================================================================
   Ask Pip — AI helper
   Uses Claude when the page is opened on claude.ai (no setup), or your own
   server when AI_ENDPOINT is set (see ai-proxy/worker.js). Never put an API
   key in this file: anyone can read a web page's code.
   ===================================================================== */
const AI_ENDPOINT = ""; // e.g. "https://pip-ai.yourname.workers.dev"

let aiFn = null, aiChat = null, aiWhyCtl = null, aiStatus = "checking", aiInit = null;
function initAI() { aiInit = initAIReal(); return aiInit; }
async function initAIReal() {
  aiFn = null; aiStatus = settings.ai ? "checking" : "off"; syncAIStatus();
  if (settings.ai) {
    if (AI_ENDPOINT) {
      aiFn = async (turns, o = {}) => {
        let r;
        try { r = await fetch(AI_ENDPOINT, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ messages: turns }), signal: o.signal }); }
        catch (e) { throw { code: e && e.name === "AbortError" ? "cancelled" : "upstream_error" }; }
        if (!r.ok) throw { code: r.status === 429 ? "rate_limited" : "upstream_error" };
        const j = await r.json().catch(() => ({})), text = String(j.text || "").trim();
        if (!text) throw { code: "empty_completion" };
        o.onText && o.onText({ text }); return text;
      };
      aiStatus = "ready";
    } else if (window.claude && typeof window.claude.use === "function") {
      try {
        const s = await window.claude.use("sample");
        if (s) { aiFn = (turns, o = {}) => s(turns, { cache: false, modelTier: "quick", onText: o.onText, signal: o.signal }).then(r => r.text); aiStatus = "ready"; }
        else aiStatus = "no-sample";
      } catch (e) { aiFn = null; aiStatus = "no-sample"; }
    } else aiStatus = "no-claude";
  }
  syncAIStatus();
}
const AI_STATUS_TEXT = {
  checking: "Connecting to Pip's AI helper…",
  ready: "✅ Connected. Kids can ask Pip questions.",
  off: "Off. Turn it on above.",
  "no-sample": "Not available in this app. Open this page on claude.ai in a web browser (Chrome, Edge or Safari on a computer or tablet).",
  "no-claude": "Not connected. This copy of the site needs its AI server set up (see README → AI helper setup).",
  denied: "A grown-up said no to AI for this visit. Reload the page to be asked again.",
};
function syncAIStatus() {
  document.body.classList.toggle("has-ai", !!aiFn);
  document.body.classList.toggle("ai-on", !!settings.ai);
  const el = document.getElementById("ai-status"); if (el) el.textContent = AI_STATUS_TEXT[aiStatus] || "";
}

function aiRules(t) {
  const words = t.age <= 7 ? 60 : 90;
  return `You are Pip, a warm, cheerful owl who tutors a ${t.age}-year-old child on a kids' learning website.
Current topic: "${t.title}" (${SUBJ[t.subj].name}, for grade ${GRADE[t.age]}, about age ${t.age}).
What the lesson teaches: ${t.lesson.map(s => s.say).join(" ")}
Pip's trick for this topic: ${trickFor(t)}

Rules:
- Talk to the child directly, like a kind teacher. Use short sentences and words a ${t.age}-year-old knows.
- Keep every answer under ${words} words: at most 4 short sentences, or a tiny numbered list of up to 4 steps.
- Use one concrete, everyday example (toys, food, animals, school, family).
- Plain text only. No markdown, no asterisks, no links, no headings. One emoji at most.
- Be encouraging and patient. Never make the child feel bad.
- Only talk about learning: reading, English, math, logic, good manners, behavior and good choices, healthy habits, feelings, staying safe, and this topic. For safety topics, give simple, accurate, calm advice (for example: tell a trusted grown-up, call 911 in an emergency) and never scary details. If the child asks about anything else, or anything scary, grown-up or unsafe, kindly say that's a good question for a grown-up and bring them back to the lesson.
- Never ask for, or repeat, personal information such as names, addresses, schools, or photos.
- Be accurate. Double-check any math. If you're not sure, say so simply.
- If you give a practice question, don't give the answer until the child replies.`;
}
const AI_ERR = {
  not_granted: "A grown-up needs to say yes to Pip's AI helper first. 🙂",
  sampling_disabled: "Pip's AI helper isn't available on this account.",
  rate_limited: "Pip needs a little rest. Try again in a minute!",
  session_expired: "A grown-up needs to sign in again.",
  refused: "Pip can't help with that one. Let's ask about the lesson!",
};
const aiErrText = e => AI_ERR[e && e.code] || "Hmm, Pip couldn't answer that. Please try again!";
function aiPermanent(e) { const p = e && /not_granted|sampling_disabled|not_declared|capability_disabled|capability_removed/.test(e.code); if (p) aiStatus = e.code === "not_granted" ? "denied" : "no-sample"; return p; }

/* ---------- lesson chat ---------- */
const AI_CHIPS = [["🔄", "Explain it a different way"], ["🍎", "Give me a real-life example"], ["📖", "Tell me a short story about it"], ["🐣", "Make it even simpler"], ["❓", "Why does it work?"], ["🎯", "Give me a practice question"]];
async function openAIChat() {
  if (!route.topic) return;
  if (!aiFn && aiStatus === "checking" && aiInit) { const box = document.getElementById("ai"); if (box) box.innerHTML = `<section class="ai-panel"><div class="ai-msg pip thinking"><span class="dots"><i></i><i></i><i></i></span> Waking Pip up…</div></section>`; await aiInit; }
  if (!aiFn) { renderAIUnavailable(); return; }
  closeDeep(true);
  if (!aiChat || aiChat.topic !== route.topic) aiChat = { topic: route.topic, turns: [], busy: false, ctl: null };
  renderAIChat(true);
}
function renderAIUnavailable() {
  closeDeep(true);
  const box = document.getElementById("ai"); if (!box) return;
  const why = aiStatus === "no-sample" ? "This Claude app can't run AI inside pages yet. Open this page on <b>claude.ai</b> in a web browser (Chrome, Edge or Safari on a computer or tablet), and Ask Pip will work there."
    : aiStatus === "denied" ? "AI was not allowed for this visit. Reload the page, tap Ask Pip, and choose Allow when Claude asks."
    : aiStatus === "off" ? "The AI helper is switched off in Settings."
    : "This copy of the site isn't connected to AI yet. A grown-up can connect it by following <b>AI helper setup</b> in the README.";
  box.innerHTML = `<section class="ai-panel" aria-label="Ask Pip">
    <div class="deep-head"><div class="pip-mini-talk">${PIP}<span>Pip's AI helper is sleeping 😴</span></div><button class="icon-btn" data-act="ai-close" aria-label="Close">✖</button></div>
    <p class="ai-help"><b>For grown-ups:</b> ${why}</p>
    <p class="ai-help">Meanwhile, try <b>🤔 Explain more</b>: it works everywhere, with no AI needed.</p>
    <div class="deep-actions"><button class="btn btn-sm" data-act="ai-retry">🔄 Try connecting again</button><button class="btn btn-sm btn-go" data-act="deep-open">🤔 Explain more</button></div>
  </section>`;
  box.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  sayLocked("Pip's AI helper is sleeping right now. Try Explain more instead!");
}
function closeAIChat() { if (aiChat && aiChat.ctl) aiChat.ctl.abort(); const box = document.getElementById("ai"); if (box) box.innerHTML = ""; }
function renderAIChat(first) {
  const box = document.getElementById("ai"); if (!box || !aiChat) return;
  box.innerHTML = `<section class="ai-panel" aria-label="Ask Pip">
    <div class="deep-head"><div class="pip-mini-talk">${PIP}<span>Ask me anything about <b>${route.topic.title}</b>!</span></div><button class="icon-btn" data-act="ai-close" aria-label="Close Ask Pip">✖</button></div>
    <div class="ai-msgs" id="ai-msgs" aria-live="polite"></div>
    <div class="ai-chips">${AI_CHIPS.map(([e, t]) => `<button class="chip ai-chip" data-ai-ask="${attr(t)}"><span class="emo">${e}</span> ${t}</button>`).join("")}</div>
    <form class="ai-form" id="ai-form"><input id="ai-input" type="text" maxlength="200" autocomplete="off" placeholder="Type your question for Pip…" aria-label="Your question for Pip"><button class="btn btn-go" id="ai-send" type="submit">Ask ✨</button><button class="btn" id="ai-stop" type="button" data-act="ai-stop" hidden>Stop</button></form>
    <p class="ai-note">Pip's answers come from AI. They are usually right, but a grown-up can double-check.</p>
  </section>`;
  const msgs = document.getElementById("ai-msgs");
  if (!aiChat.turns.length) msgs.innerHTML = `<div class="ai-msg pip">Hi! Tap a button or type a question, and I'll explain. 🦉</div>`;
  aiChat.turns.forEach(tn => { const d = document.createElement("div"); d.className = "ai-msg " + (tn.role === "user" ? "kid" : "pip"); d.textContent = tn.content; msgs.appendChild(d); });
  document.getElementById("ai-form").addEventListener("submit", ev => { ev.preventDefault(); const v = document.getElementById("ai-input").value.trim(); if (v) askPip(v); });
  if (first) box.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}
async function askPip(text) {
  if (!aiFn || !aiChat || aiChat.busy) return;
  hush(); actx();
  aiChat.busy = true; aiChat.turns.push({ role: "user", content: text.slice(0, 200) });
  if (aiChat.turns.length > 12) aiChat.turns = aiChat.turns.slice(-12);
  renderAIChat();
  const msgs = document.getElementById("ai-msgs"), bub = document.createElement("div");
  bub.className = "ai-msg pip thinking"; bub.innerHTML = `<span class="dots"><i></i><i></i><i></i></span> Pip is thinking…`;
  msgs.appendChild(bub); bub.scrollIntoView({ behavior: "smooth", block: "nearest" });
  const inp = document.getElementById("ai-input"), send = document.getElementById("ai-send"), stop = document.getElementById("ai-stop");
  inp.value = ""; inp.disabled = true; send.disabled = true; stop.hidden = false;
  document.querySelectorAll(".ai-chip").forEach(c => c.disabled = true);
  const ctl = aiChat.ctl = new AbortController(), chat = aiChat;
  try {
    const answer = await aiFn([{ role: "user", content: aiRules(chat.topic) }, ...chat.turns], {
      signal: ctl.signal, onText: ({ text }) => { if (chat !== aiChat) return; bub.classList.remove("thinking"); bub.textContent = text; },
    });
    if (chat !== aiChat) return;
    chat.turns.push({ role: "assistant", content: answer.trim() });
    bub.classList.remove("thinking"); bub.textContent = answer.trim(); sfx("pop");
    sayLocked(answer);
  } catch (e) {
    if (chat !== aiChat) return;
    chat.turns.pop();
    if (e && e.code === "cancelled") { bub.remove(); }
    else { bub.classList.remove("thinking"); bub.classList.add("err"); bub.textContent = aiErrText(e); sayLocked(aiErrText(e)); }
    if (aiPermanent(e)) { aiFn = null; syncAIStatus(); }
  } finally {
    if (chat === aiChat) {
      chat.busy = false; chat.ctl = null;
      const i2 = document.getElementById("ai-input"); if (i2) { i2.disabled = false; i2.focus({ preventScroll: true }); }
      const s2 = document.getElementById("ai-send"); if (s2) s2.disabled = false;
      const st = document.getElementById("ai-stop"); if (st) st.hidden = true;
      document.querySelectorAll(".ai-chip").forEach(c => c.disabled = false);
      if (document.body.classList.contains("pip-talking")) lockNav(true); /* still reading the answer aloud */
    }
  }
}

/* ---------- quiz: "Why?" after a wrong answer ---------- */
function optText(o) { return answerSpeech({ ans: o }); }
async function aiWhy() {
  if (!aiFn || !Q) return;
  const q = Q.qs[Q.i], t = srcTopic(q, Q.t) || Q.t, picked = Q.lastPick;
  if (autoId) { clearAuto(); const nb = document.getElementById("nextq"); if (nb && nb.dataset.label) { nb.classList.remove("counting"); nb.textContent = nb.dataset.label; } }
  Q.token++; hush();
  const fb = document.querySelector("#fb .fb-body"); if (!fb) return;
  setNextReady(false); /* wait for Pip's explanation too */
  const btn = document.querySelector('[data-act="ai-why"]'); if (btn) btn.remove();
  const bub = document.createElement("div"); bub.className = "ai-msg pip thinking why"; bub.innerHTML = `<span class="dots"><i></i><i></i><i></i></span> Pip is thinking…`;
  fb.appendChild(bub);
  const prompt = `${aiRules(t)}

The child just answered a quiz question.
Question: ${clean(q.say || q.q)}
${q.kind === "type" ? "The child typed a number." : q.kind === "order" ? `Items to put in order: ${q.items.map(optText).join(" | ")}` : q.kind === "sort" ? `Items to sort into ${q.bins.map(optText).join(" / ")}: ${q.items.map(optText).join(" | ")}` : `Choices: ${q.opts.map(optText).join(" | ")}`}
${picked != null && q.opts[picked] != null ? `The child chose: ${optText(q.opts[picked])}` : Q.lastText ? `The child answered: ${Q.lastText}` : "The child ran out of time."}
Correct answer: ${answerSpeech(q)}
Hint from the answer key: ${clean(q.why || "")}

In 2 or 3 short sentences, kindly explain why the correct answer is right${picked != null ? " and what makes the child's choice not fit" : ""}. End with a quick tip for next time.`;
  if (aiWhyCtl) aiWhyCtl.abort();
  const ctl = aiWhyCtl = new AbortController(), myQ = Q, myI = Q.i;
  try {
    const text = await aiFn([{ role: "user", content: prompt }], { signal: ctl.signal, onText: ({ text }) => { bub.classList.remove("thinking"); bub.textContent = text; } });
    if (Q !== myQ || Q.i !== myI) return;
    bub.classList.remove("thinking"); bub.textContent = text.trim(); lockNav(true); narrate(text, { force: true }, () => { lockNav(false); if (Q === myQ && Q.i === myI) setNextReady(true); });
  } catch (e) {
    if (Q === myQ && Q.i === myI) setNextReady(true);
    if (e && e.code === "cancelled") { bub.remove(); return; }
    bub.classList.remove("thinking"); bub.classList.add("err"); bub.textContent = aiErrText(e);
    if (aiPermanent(e)) { aiFn = null; syncAIStatus(); }
  }
}

