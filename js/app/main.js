/* =====================================================================
   Pip's Learning Park — app (v2)
   Change DEFAULTS to set what a new visitor gets.
   ===================================================================== */
const DEFAULTS = { v: 5, ai: true, voiceName: "", timer: "auto", count: 20, sound: true, voice: true, ticking: true, autonext: true, pause: 5, rate: 0.9, muted: false, pace: "relaxed", readOpts: true, explainOv: true, attnPrompts: true, waitRead: true, waitExplain: true };
const AUTO_TIMER = { 6: 35, 7: 32, 8: 30, 9: 25 };
const RATES = [[0.45, "Very very slow", "🦥"], [0.6, "Very slow", "🐌"], [0.75, "Slow", "🐢"], [0.9, "Normal", "🙂"], [1.05, "Fast", "🐇"], [1.2, "Super fast", "🚀"]];
const SUBJ = { english: { name: "Reading & English", short: "English", icon: "📖", sub: "Phonics, words and reading" }, math: { name: "Math", short: "Math", icon: "🧮", sub: "Numbers, shapes and time" }, science: { name: "Science", short: "Science", icon: "🔬", sub: "Living things, earth, space and how things work" }, social: { name: "Social Studies", short: "Social Studies", icon: "🌎", sub: "Communities, maps, history and money" }, logic: { name: "Logical Thinking", short: "Logic", icon: "🧩", sub: "Puzzles, patterns and brain games" }, manners: { name: "Manners & Behavior", short: "Behavior", icon: "🌟", sub: "Kindness, good choices, feelings and safety" } };
const STICKERS = ["🦄", "🐉", "🦖", "🐙", "🦋", "🐢", "🦊", "🐼", "🐨", "🦁", "🐯", "🐸", "🐵", "🦉", "🐧", "🐬", "🦈", "🐳", "🦒", "🦓", "🦔", "🦜", "🦩", "🐝", "🐞", "🌈", "🚀", "🛸", "🌟", "🪐", "☄️", "🎈", "🎨", "🎸", "🥁", "🏆", "👑", "💎", "🍩", "🍦", "🧁", "🍕", "⚽", "🏀", "🎯", "🚂", "🚁", "🏰"];
const LEVELS = [[0, "Little Sprout", "🌱"], [6, "Curious Cub", "🐻"], [18, "Brave Explorer", "🧭"], [40, "Super Star", "⭐"], [80, "Rocket Genius", "🚀"], [140, "Learning Legend", "👑"]];
const BREAKS = [["Stretch up high like a giraffe!", "🦒"], ["Wiggle your fingers!", "🖐️"], ["Give yourself a high five!", "✋"], ["Take a big balloon breath!", "🎈"], ["Do a silly dance!", "💃"], ["Roar like a lion!", "🦁"], ["Flap your arms like a bird!", "🐦"], ["Hop like a bunny three times!", "🐰"]];

/* ---------- storage (safe) ---------- */
const store = {
  get(k, d) { try { const v = localStorage.getItem("pip." + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem("pip." + k, JSON.stringify(v)); } catch (e) { } },
};
const savedSettings = store.get("settings", {});
if (!savedSettings.v || savedSettings.v < 5) { savedSettings.count = 20; savedSettings.v = 5; }
const settings = Object.assign({}, DEFAULTS, savedSettings);
settings.rate = RATES.reduce((b, r) => Math.abs(r[0] - settings.rate) < Math.abs(b - settings.rate) ? r[0] : b, 0.9);
let progress, stickers, bestPts;
function bindP() { progress = P.progress; stickers = P.stickers; bestPts = P.bestpts; }
bindP();
const saveSettings = () => { settings._u = Date.now(); store.set("settings", settings); markDirty("state"); };
const pkey = t => `${t.age}-${t.subj}-${t.id}`;
const bestStars = t => progress[pkey(t)] || 0;
const totalStars = () => Object.values(progress).reduce((a, b) => a + b, 0);
function levelOf(s) { let i = 0; LEVELS.forEach((l, k) => { if (s >= l[0]) i = k; }); return i; }

/* ---------- sound effects (Web Audio, no files needed) ---------- */
let ac = null;
/* iPhones/iPads mute Web Audio when the ring switch is on silent; asking for "playback" and
   playing a silent <audio> once on the first tap lets sound effects and ticks through. */
let unlocked = false;
let speechUnlocked = false, unlockAt = 0;
function unlockSpeech() {
  if (speechUnlocked || !("speechSynthesis" in window)) return; speechUnlocked = true;
  try { const u = new SpeechSynthesisUtterance("."); u.volume = 0; u.rate = 2; unlockAt = Date.now(); window.speechSynthesis.speak(u); } catch (e) { }
}
function unlockAudio() {
  unlockSpeech();
  if (unlocked) return; unlocked = true;
  try { if (navigator.audioSession) navigator.audioSession.type = "playback"; } catch (e) { }
  try {
    const n = 800, buf = new Uint8Array(44 + n), dv = new DataView(buf.buffer), w = (o, t) => [...t].forEach((ch, i) => buf[o + i] = ch.charCodeAt(0));
    w(0, "RIFF"); dv.setUint32(4, 36 + n, true); w(8, "WAVEfmt "); dv.setUint32(16, 16, true); dv.setUint16(20, 1, true); dv.setUint16(22, 1, true);
    dv.setUint32(24, 8000, true); dv.setUint32(28, 8000, true); dv.setUint16(32, 1, true); dv.setUint16(34, 8, true); w(36, "data"); dv.setUint32(40, n, true); buf.fill(128, 44);
    const a = new Audio(URL.createObjectURL(new Blob([buf], { type: "audio/wav" }))); a.setAttribute("playsinline", ""); a.volume = 0.01; a.play().catch(() => { });
  } catch (e) { }
}
document.addEventListener("pointerdown", () => { unlockAudio(); actx(); }, { capture: true });
document.addEventListener("touchend", () => { unlockSpeech(); }, { capture: true, passive: true });
document.addEventListener("click", () => { unlockSpeech(); }, { capture: true });
document.addEventListener("keydown", () => { unlockAudio(); actx(); }, { capture: true });
let noiseBuf = null;
function clack(freq, vol, q = 5) {
  const c = actx(); if (!c) return;
  if (!noiseBuf) { noiseBuf = c.createBuffer(1, Math.floor(c.sampleRate * 0.06), c.sampleRate); const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 6); }
  const src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
  src.buffer = noiseBuf; f.type = "bandpass"; f.frequency.value = freq; f.Q.value = q; g.gain.value = vol;
  src.connect(f).connect(g).connect(c.destination); src.start();
}
function actx() {
  if (!ac) { const Ctx = window.AudioContext || window.webkitAudioContext; if (!Ctx) return null; try { ac = new Ctx(); } catch (e) { return null; } }
  if (ac.state === "suspended") ac.resume().catch(() => { });
  return ac;
}
function tone(freq, start, dur, type = "sine", vol = 0.16, slide) {
  const c = actx(); if (!c) return;
  const o = c.createOscillator(), g = c.createGain(), t = c.currentTime + start;
  o.type = type; o.frequency.setValueAtTime(freq, t); if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + dur);
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + 0.05);
}
let tickFlip = false;
const SFX = {
  correct() { [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.07, 0.22, "triangle", 0.17)); },
  combo() { [659, 784, 988, 1319, 1568].forEach((f, i) => tone(f, i * 0.06, 0.2, "triangle", 0.16)); tone(2093, 0.32, 0.4, "sine", 0.08); },
  wrong() { tone(311, 0, 0.18, "sawtooth", 0.07, 220); tone(220, 0.18, 0.35, "sawtooth", 0.07, 147); },
  tick() { tickFlip = !tickFlip; clack(tickFlip ? 3200 : 2100, 3.2); tone(tickFlip ? 1900 : 1300, 0, 0.045, "triangle", 0.22); },
  tickHard() { clack(3600, 5); tone(1760, 0, 0.09, "square", 0.3); clack(2400, 4.5); tone(1175, 0.13, 0.09, "square", 0.26); },
  timeup() { tone(392, 0, 0.15, "sawtooth", 0.08); tone(262, 0.16, 0.18, "sawtooth", 0.08); tone(196, 0.34, 0.4, "sawtooth", 0.08); },
  pop() { tone(620, 0, 0.06, "sine", 0.12); tone(930, 0.04, 0.06, "sine", 0.08); },
  page() { tone(300, 0, 0.12, "sine", 0.1, 900); },
  count() { tone(660, 0, 0.14, "square", 0.08); },
  go() { tone(880, 0, 0.1, "square", 0.1); tone(1320, 0.1, 0.3, "square", 0.1); },
  fanfare() { [523, 659, 784, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.12, i === 5 ? 0.6 : 0.2, "triangle", 0.17)); },
  sticker() { [784, 988, 1175, 1568].forEach((f, i) => tone(f, 0.1 + i * 0.09, 0.25, "sine", 0.14)); },
  levelup() { [392, 523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, i * 0.09, 0.3, "triangle", 0.15)); },
  soft() { [392, 523, 659].forEach((f, i) => tone(f, i * 0.12, 0.3, "sine", 0.12)); },
  whoosh() { tone(200, 0, 0.35, "sawtooth", 0.04, 1200); },
};
function sfx(n) { if (settings.sound && !settings.muted && SFX[n]) SFX[n](); }

/* ---------- read aloud (Web Speech) ---------- */
const hasSpeech = "speechSynthesis" in window;
let voice = null;
/* Voices differ by device. Rank them so the most natural-sounding one wins:
   Edge "Natural"/"Online" voices, Apple "Premium"/"Enhanced" voices and Google's online voices sound
   far more human than the older built-in ones. Novelty voices (Zarvox, Bubbles…) are never picked. */
const NOVELTY = /Albert|Bad News|Bahh|Bells|Boing|Bubbles|Cellos|Deranged|Good News|Hysterical|Jester|Organ|Pipe Organ|Superstar|Trinoids|Whisper|Wobble|Zarvox|Fred|Junior|Ralph|Kathy|Princess|Grandma|Grandpa|Eddy|Flo|Reed|Rocko|Sandy|Shelley/i;
function voiceScore(v) {
  let s = 0;
  if (/^en[-_]US/i.test(v.lang)) s += 30; else if (/^en[-_](GB|AU|CA|IE|NZ)/i.test(v.lang)) s += 22; else if (/^en/i.test(v.lang)) s += 12; else return -999;
  if (/Natural|Neural/i.test(v.name)) s += 60;
  if (/Premium/i.test(v.name)) s += 55;
  if (/Enhanced/i.test(v.name)) s += 45;
  if (/Google/i.test(v.name)) s += 30;
  if (/Online/i.test(v.name)) s += 20;
  if (/Siri/i.test(v.name)) s += 40;
  if (/Aria|Jenny|Ava|Emma|Ana|Michelle|Samantha|Allison|Susan|Zoe|Nicky|Libby|Sonia|Serena|Karen|Moira|Tessa|Joanna|Salli|Kendra/i.test(v.name)) s += 10;
  if (!v.localService) s += 5;
  if (NOVELTY.test(v.name)) s -= 500;
  return s;
}
function englishVoices() { if (!hasSpeech) return []; return speechSynthesis.getVoices().filter(v => voiceScore(v) > -100).sort((a, b) => voiceScore(b) - voiceScore(a)); }
function pickVoice() {
  if (!hasSpeech) return;
  const vs = englishVoices(); if (!vs.length) return;
  voice = (settings.voiceName && vs.find(v => v.name === settings.voiceName)) || vs[0];
  if (!document.getElementById("settings").hidden) fillVoiceList();
}
function fillVoiceList() {
  const sel = document.getElementById("set-voicename"); if (!sel) return;
  const vs = englishVoices(), best = vs[0];
  sel.innerHTML = `<option value="">Automatic (most natural: ${best ? best.name.replace(/Microsoft |Google |\(.*?\)|Online/g, "").trim() : "none found"})</option>` +
    vs.map(v => `<option value="${attr(v.name)}">${voiceScore(v) >= 75 ? "⭐ " : ""}${v.name} · ${v.lang}</option>`).join("");
  sel.value = settings.voiceName && vs.some(v => v.name === settings.voiceName) ? settings.voiceName : "";
}
if (hasSpeech) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; setTimeout(pickVoice, 600); }
window.voiceOn = () => hasSpeech && settings.voice && !settings.muted;
function optLen(q) { return Math.max(...q.opts.map(o => /<svg/.test(o) ? 0 : clean(o).length)); }
function optSpeech(o) {
  const m = o.match(/(?:title|aria-label)="([^"]+)"/), text = clean(o.replace(/<svg[\s\S]*?<\/svg>/g, " "));
  return text || (m ? m[1] : "this picture");
}
function answerSpeech(q) {
  if (q.sayAns) return q.sayAns;
  const a = q.ans, m = a.match(/(?:title|aria-label)="([^"]+)"/);
  const text = clean(a.replace(/<svg[\s\S]*?<\/svg>/g, " "));
  return text || (m ? m[1] : "the one shown in green");
}
/* Speak sentence by sentence: each one gets its own natural pause and pitch lift, which sounds
   much less robotic than one long flat utterance (and avoids Chrome cutting off long speech). */
/* ---------- natural speech ----------
   Text is spoken phrase by phrase. Between phrases Pip pauses (short at commas, longer at
   sentence ends), and each phrase gets its own pitch and pace: questions lift, exclamations
   sparkle, statements settle down at the end, praise is bright, comfort is soft and slower,
   and the key answer is said a little slower so it's easy to catch. */
const ORDS = { "1st": "first", "2nd": "second", "3rd": "third", "4th": "fourth", "5th": "fifth", "6th": "sixth", "7th": "seventh", "8th": "eighth", "9th": "ninth", "10th": "tenth" };
function forSpeech(t) {
  return String(t)
    .replace(/\$(\d+)\.(\d\d)\b/g, (m, d, c) => { d = +d; c = +c; return d && c ? `${d} dollar${d > 1 ? "s" : ""} and ${c} cents` : d ? `${d} dollar${d > 1 ? "s" : ""}` : `${c} cents`; })
    .replace(/\b(\d+(?:st|nd|rd|th))\b/g, m => ORDS[m] || m)
    .replace(/\bMrs\./g, "Missus").replace(/\bMr\./g, "Mister").replace(/\bMs\./g, "Miz").replace(/\bDr\./g, "Doctor").replace(/\bvs\./g, "versus")
    .replace(/\bsq units\b/g, "square units").replace(/\bsq m\b/g, "square meters").replace(/&/g, " and ")
    .replace(/\s*[—–]\s*/g, ", ").replace(/…|\.\.\./g, ". ").replace(/([!?])[!?]+/g, "$1")
    .replace(/\((\d+), ?(\d+)\)/g, "$1 comma $2").replace(/\(([^)]*)\)/g, ", $1, ").replace(/\s*,\s*,/g, ",").replace(/\s+/g, " ").replace(/\s+([,.?!])/g, "$1").replace(/,([.?!])/g, "$1").trim();
}
/* sentences: split only where . ! ? is followed by a space, so 0.45 and 3:30 stay whole */
function splitParts(txt) { return String(txt).replace(/([.!?]+)\s+/g, "$1\u0001").split("\u0001").map(p => p.trim()).filter(Boolean); }
function phrases(sentence) {
  const bits = sentence.replace(/([,;:])\s+/g, "$1\u0001").split("\u0001").map(x => x.trim()).filter(Boolean), out = [];
  for (const b of bits) { const last = out[out.length - 1]; if (last && last.split(" ").length < 3) out[out.length - 1] = last + " " + b; else out.push(b); }
  return out;
}
const MOODS = { cheer: [1.14, 1.04], gentle: [0.96, 0.9], teach: [1.0, 0.96], ask: [1.04, 0.98], plain: [1.02, 1] };
const RX_CHEER = /^(great job|you got it|super|awesome|well done|brilliant|yes|wow|nailed it|fantastic|amazing|hooray|great|nice|good job|good try|level up|and you won|hi there)/i;
const RX_GENTLE = /^(wrong answer|time's up|not quite|not that one|that's okay|oops|almost|let's learn it together|pip's ai helper is sleeping|no problem)/i;
const RX_KEY = /^(the correct answer is|the answer is|step \d|it's a|the story says)/i;
let speechTok = 0, SPK = null;
/* GATE: the speech the Next button waits for. Stop or leaving the screen counts as finished,
   so the Next button can never stay stuck. */
let GATE = null;
function releaseGate() { const g = GATE; GATE = null; if (g) g(); }
function speak(t, force, onend, opts = {}) {
  /* if Pip is cut off by another sound (replaying the question, an answer's speaker…),
     the Next button keeps waiting until that new speech is finished too */
  const waiting = GATE; GATE = null;
  if (waiting && opts.gate) waiting();
  let done = false; const fin = () => { if (done) return; done = true; if (GATE === fin) GATE = null; onend && onend(); if (waiting && !opts.gate) waiting(); };
  if (opts.gate || waiting) GATE = fin;
  const tok = ++speechTok;
  if (!hasSpeech || settings.muted || (!force && !settings.voice)) { if (onend) setTimeout(fin, 0); return; }
  try {
    const wasBusy = (speechSynthesis.speaking || speechSynthesis.pending) && Date.now() - unlockAt > 1500;
    speechSynthesis.cancel(); nameAudioStop();
    if (!voice) pickVoice();
    const txt = forSpeech(clean(t)), sents = splitParts(txt), rm = opts.rate || 1, base = opts.mood || "plain", queue = [];
    sents.forEach((sent, si) => {
      const mood = RX_CHEER.test(sent) ? "cheer" : RX_GENTLE.test(sent) ? "gentle" : base, key = RX_KEY.test(sent);
      const ph = phrases(sent);
      ph.forEach((p, pi) => {
        const lastInSent = pi === ph.length - 1, end = p.slice(-1);
        let [pitch, rate] = MOODS[mood];
        if (key) { rate *= 0.9; }
        if (lastInSent && end === "?") { pitch += 0.08; rate *= 0.97; }
        else if (lastInSent && end === "!") { pitch += 0.08; rate *= 1.03; }
        else if (lastInSent) { pitch -= 0.03; }
        else { pitch += 0.03; }
        pitch += (Math.random() - 0.5) * 0.04;
        const gap = !lastInSent ? (/[;:]$/.test(p) ? 220 : 140) : si === sents.length - 1 ? 0 : end === "?" ? 420 : end === "!" ? 320 : 360;
        const segs = nameSplit(p), pr = Math.max(0.7, Math.min(1.4, pitch)), rt = Math.max(0.4, Math.min(1.6, settings.rate * rm * rate * pace().rate));
        segs.forEach((sg, gi) => queue.push(Object.assign({ p: typeof sg === "string" ? sg : kidName(), pitch: pr, rate: rt, gap: gi === segs.length - 1 ? gap * pace().gap / Math.max(0.6, settings.rate) : 60, si, first: pi === 0 && gi === 0 }, typeof sg === "string" ? {} : { name: 1 })));
      });
    });
    /* SPK holds the running speech so the Pause button can stop it and resume at the same phrase */
    const S = SPK = { tok, gen: 0, i: 0, cur: -1, next: null };
    const next = () => {
      if (tok !== speechTok || S !== SPK) return;
      if (PAUSED) { S.waiting = true; return; }
      if (S.i >= queue.length) { S.cur = -1; fin(); return; }
      const idx = S.i++, c = queue[idx], gen = S.gen;
      S.cur = idx;
      if (c.name) {
        /* v34: the child's name, said by an Arabic voice (e.g. إسماعيل); if that fails, the English spelling */
        const a = null; let movedA = false;
        const goA = () => { if (movedA || gen !== S.gen) return; movedA = true; pClear(guardA); if (a) { a.onended = null; a.onerror = null; } S.cur = -1; if (tok === speechTok) pTimeout(next, c.gap); };
        const guardA = pTimeout(goA, 3500);
        if (c.first && opts.onPart) { if (tok === speechTok && gen === S.gen) opts.onPart(c.si); }
        const viaVoice = () => { if (movedA) return; try { const u2 = new SpeechSynthesisUtterance(c.p); if (voice) { u2.voice = voice; u2.lang = voice.lang; } else u2.lang = "en-US"; u2.pitch = c.pitch; u2.rate = c.rate; u2.onend = goA; u2.onerror = goA; speechSynthesis.speak(u2); } catch (e) { goA(); } };
        const arTxt = nameArFor(curProfile()), av = arVoice();
        if (arTxt && av) {
          try {
            const u3 = new SpeechSynthesisUtterance(arTxt); u3.voice = av; u3.lang = av.lang; u3.pitch = c.pitch; u3.rate = Math.max(0.5, c.rate * 0.9);
            u3.onend = goA; u3.onerror = () => { const pr = namePronFor(curProfile()); c.p = pr || c.p; viaVoice(); };
            speechSynthesis.speak(u3);
          } catch (e) { viaVoice(); }
          return;
        }
        if (!a) { c.p = namePronFor(curProfile()) || c.p; viaVoice(); return; }
        try { a.currentTime = 0; a.onended = goA; a.onerror = () => { a.onerror = null; viaVoice(); }; const pr = a.play(); if (pr && pr.catch) pr.catch(() => viaVoice()); } catch (e) { viaVoice(); }
        return;
      }
      const u = new SpeechSynthesisUtterance(c.p);
      if (voice) { u.voice = voice; u.lang = voice.lang; } else u.lang = "en-US";
      u.pitch = c.pitch; u.rate = c.rate; u.volume = 1;
      let moved = false;
      const go = () => { if (moved || gen !== S.gen) return; moved = true; pClear(guard); S.cur = -1; if (tok === speechTok) pTimeout(next, c.gap); };
      const guard = pTimeout(go, 1500 + c.p.length * 110 / c.rate);
      if (c.first && opts.onPart) u.onstart = () => { if (tok === speechTok && gen === S.gen) opts.onPart(c.si); };
      u.onend = go; u.onerror = go;
      speechSynthesis.speak(u);
    };
    S.next = next;
    S.interrupt = () => { if (S.cur >= 0) { S.gen++; S.i = S.cur; S.cur = -1; S.waiting = true; nameAudioStop(); } };
    if (speechSynthesis.paused) try { speechSynthesis.resume(); } catch (e) { }
    /* start in the same tick when idle: iPhone/iPad only allow speech that starts directly from a tap */
    if (wasBusy) pTimeout(next, 120); else next();
    if (onend) pTimeout(() => { if (tok === speechTok) fin(); }, Math.max(4000, txt.length * 95 / (settings.rate * rm) + queue.length * 500));
  } catch (e) { if (onend) setTimeout(fin, 0); }
}
function hush() { releaseGate(); speechTok++; nameAudioStop(); if (hasSpeech) try { speechSynthesis.cancel(); } catch (e) { } }
/* v30: how to say the child's name. A recording (Settings → For this child) is played in place of the
   computer voice whenever Pip says the name. A recording of "Ismail" is built in. */
const NAME_SND_BUILTIN = {}; /* v32: no recordings are kept in the site */
/* v32: how the computer voice should say a name. Worked out from a parent's recording of "Ismail": iss-MAH-il, 3 beats. */
const NAME_PRON_BUILTIN = { ismail: "Eesma-eel" }; /* v36: starts with an "ee" sound */ /* v35: Pip's normal voice, the Arabic way: is-maa-EEL, the beat on "eel" */
/* v34: names said the Arabic way, by an Arabic voice */
const NAME_AR_BUILTIN = { ismail: "إسماعيل" };
function nameArFor(p) { return ""; /* v35: the name is always said in Pip's normal voice */ if (!p || !p.name || p.nameVoice === "en") return ""; const k = String(p.name).trim().split(/\s+/)[0].toLowerCase(); return (p.nameAr && String(p.nameAr).trim()) || NAME_AR_BUILTIN[k] || ""; }
function arVoice() { try { const vs = speechSynthesis.getVoices().filter(v => /^ar([-_]|$)/i.test(v.lang)); return vs.find(v => /ar[-_]SA/i.test(v.lang) && v.localService) || vs.find(v => /ar[-_]SA/i.test(v.lang)) || vs.find(v => v.localService) || vs[0] || null; } catch (e) { return null; } }
const NAME_PRON_IDEAS = { ismail: ["Eesma-eel", "Ees-maa-eel", "Eesmaa-eel", "Ees-mah-eel", "Eesmaeel"] };
/* v33: drop older suggested spellings that were saved for Ismail, so the new one is used */
try { const OLD = ["iss-mah-il", "iss-mile", "iss-mah-eel", "is-mah-eel", "iss-mah-ee-l", "issma-eel", "iss-maa-eel", "ismaa-eel", "ismaeel"]; let ch = false; for (const k of profiles) if (k && k.name && /^ismail$/i.test(String(k.name).trim().split(/\s+/)[0]) && k.namePron && OLD.includes(String(k.namePron).trim().toLowerCase())) { k.namePron = ""; k.u = Date.now(); ch = true; } if (ch) LS.set("profiles", profiles); } catch (e) { }
function nameSoundFor(p) { return ""; /* v32: the name is never played from a recording */ }
function namePronFor(p) { if (!p || !p.name) return ""; if (p.namePron === "-") return ""; const k = String(p.name).trim().split(/\s+/)[0].toLowerCase(); return (p.namePron && String(p.namePron).trim()) || NAME_PRON_BUILTIN[k] || ""; }
let NAME_AUD = null;
function nameAudio() {
  let src = ""; try { src = nameSoundFor(curProfile()); } catch (e) { }
  if (!src) return null;
  if (!NAME_AUD || NAME_AUD._src !== src) { try { NAME_AUD = new Audio(src); NAME_AUD._src = src; NAME_AUD.preload = "auto"; } catch (e) { NAME_AUD = null; } }
  return NAME_AUD;
}
function nameAudioStop() { try { if (NAME_AUD && !NAME_AUD.paused) { NAME_AUD.pause(); NAME_AUD.currentTime = 0; } } catch (e) { } }
/* v37: pronunciation picker, used when a name is typed (name prompt, child editor, Settings) */
let NAME_RAW = false;   /* true while previewing a spelling, so it is spoken exactly as written */
function pronIdeasFor(name) {
  const base = String(name || "").trim().split(/\s+/)[0]; if (!base) return [];
  const k = base.toLowerCase(), V = "aeiouy";
  /* split into beats: V C V → V-CV, V CC V → VC-CV */
  let s = "", w = base;
  for (let i = 0; i < w.length; i++) {
    s += w[i];
    const a = w[i].toLowerCase(), b = (w[i + 1] || "").toLowerCase(), c = (w[i + 2] || "").toLowerCase(), d = (w[i + 3] || "").toLowerCase();
    if (V.includes(a) && b && !V.includes(b)) {
      if (c && V.includes(c) && i + 2 < w.length - 1) s += "-";
      else if (c && !V.includes(c) && d && V.includes(d) && b !== c && !/^(ch|sh|th|ph|wh|ck)$/.test(b + c)) { s += w[i + 1] + "-"; i++; }
    }
  }
  const syl = s;
  const ee = /^[iI]/.test(syl) ? "Ee" + syl.slice(1) : "";
  const longEnd = /[^aeiouy]$/i.test(base) && syl.includes("-") ? syl.replace(/([^-]*)$/, m => m.replace(/i(?=[^aeiouy]*$)/i, "ee").replace(/a(?=[^aeiouy]*$)/i, "aa")) : "";
  return [...new Set([...(NAME_PRON_IDEAS[k] || []), base, syl, ee, longEnd].filter(x => x && x.length <= 30))].slice(0, 6);
}
function pronPreview(pr) { if (!pr) return; NAME_RAW = true; try { speak(`Hi, ${pr}!`, true); } finally { NAME_RAW = false; } }
/* box: the element to fill; name: typed name; sel: chosen spelling ("" = say it as written) */
function pronPickPaint(box, name, sel) {
  if (!box) return;
  const nm = String(name || "").trim();
  if (!nm) { box.innerHTML = ""; box.dataset.sel = ""; return; }
  const ideas = pronIdeasFor(nm), first = nm.split(/\s+/)[0];
  if (sel == null) sel = box.dataset.sel != null && box.dataset.for === first.toLowerCase() ? box.dataset.sel : (NAME_PRON_BUILTIN[first.toLowerCase()] || "");
  box.dataset.sel = sel || ""; box.dataset.for = first.toLowerCase();
  const cur = sel || first, custom = sel && !ideas.some(x => x === sel);
  box.innerHTML = `<div class="pp-h">🔊 How should Pip say <b>${esc(first)}</b>? <small>Tap to hear it, then pick the one that sounds right.</small></div>
    <div class="pp-row">${ideas.map(x => `<button type="button" class="pp-chip${x === cur ? " on" : ""}" data-pp="${attr(x === first ? "" : x)}" aria-pressed="${x === cur}">${x === cur ? "✔ " : "▶ "}${esc(x)}</button>`).join("")}${custom ? `<button type="button" class="pp-chip on" data-pp="${attr(sel)}" aria-pressed="true">✔ ${esc(sel)}</button>` : ""}</div>
    <div class="pp-row"><input class="pp-own" maxlength="30" autocomplete="off" placeholder="Or type how it sounds, e.g. ${attr(ideas[1] || first)}" aria-label="Type how the name sounds"><button type="button" class="btn btn-sm pp-try">▶ Try it</button></div>`;
}
document.addEventListener("click", ev => {
  const box = ev.target.closest && ev.target.closest(".pron-pick"); if (!box) return;
  const chip = ev.target.closest("[data-pp]"), tr = ev.target.closest(".pp-try");
  let v = null;
  if (chip) v = chip.dataset.pp;
  else if (tr) { v = (box.querySelector(".pp-own").value || "").trim().slice(0, 30); if (!v) { box.querySelector(".pp-own").focus(); return; } }
  if (v == null) return;
  const nm = box.dataset.name ? document.getElementById(box.dataset.name) : null, name = nm ? nm.value : box.dataset.fixed || "";
  if (sameName(v, String(name).trim().split(/\s+/)[0])) v = "";
  pronPickPaint(box, name, v);
  pronPreview(v || String(name).trim().split(/\s+/)[0]);
  if (box.id === "ns-pick") nsSetPron(v, true);
});
document.addEventListener("keydown", ev => { if (ev.key === "Enter" && ev.target && ev.target.classList && ev.target.classList.contains("pp-own")) { ev.preventDefault(); ev.target.closest(".pron-pick").querySelector(".pp-try").click(); } });
document.addEventListener("input", ev => {
  const id = ev.target && ev.target.id; if (id !== "na-name" && id !== "kid-name") return;
  const box = document.querySelector(`.pron-pick[data-name="${id}"]`); if (!box) return;
  clearTimeout(box._t); box._t = setTimeout(() => pronPickPaint(box, ev.target.value), 250);
});
function nsPaint() {
  const h = document.getElementById("ns-hint"), inp = document.getElementById("ns-pron"), ideas = document.getElementById("ns-ideas"); if (!h || !inp) return;
  { const pk = document.getElementById("ns-pick"), pp = curProfile(); if (pk) { pk.dataset.fixed = pp.name || ""; pronPickPaint(pk, pp.name || "", namePronFor(pp)); } }
  const p = curProfile(), k = p.name ? String(p.name).trim().split(/\s+/)[0].toLowerCase() : "", cur = namePronFor(p);
  inp.value = p.namePron || ""; inp.placeholder = cur ? `Sounds like… ${cur}` : "Sounds like… e.g. Eesma-eel";
  const list = [...new Set([...(NAME_PRON_IDEAS[k] || []), p.name ? p.name : ""].filter(Boolean))];
  ideas.innerHTML = p.name ? list.map(x => `<button type="button" class="btn btn-sm ns-idea${sameName(x, cur || p.name) ? " on" : ""}" data-pron="${attr(x)}">${esc(x)}</button>`).join("") : "";
  const vb = document.getElementById("ns-voice"), arT = p.name ? (p.nameAr || NAME_AR_BUILTIN[k] || "") : "", av = arVoice();
  if (vb) vb.innerHTML = ""; if (false) vb.innerHTML = arT ? `<button type="button" class="btn btn-sm ns-v${p.nameVoice !== "en" ? " on" : ""}" data-nsv="ar">🗣️ Arabic voice: ${esc(arT)}</button><button type="button" class="btn btn-sm ns-v${p.nameVoice === "en" ? " on" : ""}" data-nsv="en">🔤 English spelling</button>` : "";
  if (false && arT && p.nameVoice !== "en") { h.textContent = av ? `Pip says the name with an Arabic voice (${av.name}), like “${arT}”. The rest is in English.` : `This device has no Arabic voice, so Pip uses the English spelling “${cur}”. Adding an Arabic voice in the device's settings will make it sound right.`; ideas.style.display = av ? "none" : ""; return; }
  ideas.style.display = "";
  h.textContent = !p.name ? "Add the child's name first." : cur && !sameName(cur, p.name) ? `Pip says the name like “${cur}”. Tap ▶ to hear it, or try another spelling.` : "Pip says the name as it is written. If it sounds wrong, type how it sounds, like Eesma-eel.";
}
try { speechSynthesis.addEventListener("voiceschanged", () => { try { nsPaint(); } catch (e) { } }); } catch (e) { }
function nsSetPron(v, quiet) { const p = curProfile(); if (!p.name) { toast("Add the child's name first."); return; } v = String(v || "").trim().slice(0, 30); p.namePron = !v || sameName(v, p.name) ? "-" : v; p.u = Date.now(); saveProfiles(); markDirty(p.id); nsPaint(); if (!quiet) speak(`Hi, ${kidName()}!`, true); }
document.addEventListener("click", ev => {
  const vsel = ev.target.closest && ev.target.closest("[data-nsv]");
  if (vsel) { const p = curProfile(); p.nameVoice = vsel.dataset.nsv === "en" ? "en" : ""; p.u = Date.now(); saveProfiles(); markDirty(p.id); nsPaint(); speak(`Hi, ${kidName()}!`, true); return; }
  const b = ev.target.closest && ev.target.closest("#ns-play,[data-pron]"); if (!b) return;
  if (b.id === "ns-play") { if (!kidName()) { toast("Add the child's name first."); return; } speak(`Listen carefully, ${kidName()}, before you answer.`, true); return; }
  nsSetPron(b.dataset.pron);
});
document.addEventListener("change", ev => { if (ev.target && ev.target.id === "ns-pron") nsSetPron(ev.target.value); });
/* split one spoken phrase around the child's name: ["Listen carefully, ", NAME, ", before…"] */
function nameSplit(p) {
  /* v34: an Arabic name (like Ismail, إسماعيل) is said by an Arabic voice when the device has one */
  const n = kidName(); let pron = ""; try { pron = namePronFor(curProfile()); } catch (e) { }
  if (NAME_RAW) return [p];
  if (n && nameArFor(curProfile()) && arVoice()) {
    const rx3 = new RegExp(`\\b(${n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})\\b`, "gi");
    if (rx3.test(p)) return p.split(rx3).map(x => sameName(x, n) ? { name: 1 } : x).filter(x => typeof x !== "string" || /[a-z0-9]/i.test(x));
  }
  if (!n || !pron || sameName(pron, n)) return [p];
  const rx2 = new RegExp(`\\b${n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
  return [p.replace(rx2, pron)];
  /* eslint-disable-next-line no-unreachable */
  if (!n || !nameAudio()) return [p];
  const rx = new RegExp(`\\b(${n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})\\b`, "gi");
  if (!rx.test(p)) return [p];
  return p.split(rx).map(x => sameName(x, n) ? { name: 1 } : x).filter(x => typeof x !== "string" || /[a-z0-9]/i.test(x));
}

/* ---------- fx ---------- */
const osReduced = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
let reduced = osReduced;
const CONF_COLS = ["#FF7A59", "#1FAF6E", "#3D7BFF", "#9B5DE5", "#FFC93C"];
function confetti(n = 70) {
  if (reduced) return;
  const box = document.getElementById("fx");
  for (let i = 0; i < n; i++) {
    const s = document.createElement("i");
    s.style.left = Math.random() * 100 + "vw"; s.style.background = pick(CONF_COLS);
    s.style.animationDuration = (1.6 + Math.random() * 1.6) + "s"; s.style.animationDelay = Math.random() * 0.35 + "s";
    box.appendChild(s); setTimeout(() => s.remove(), 3800);
  }
}
function burstAt(el, n = 16) {
  if (reduced || !el) return;
  const r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2, box = document.getElementById("fx");
  for (let i = 0; i < n; i++) {
    const s = document.createElement("b"), a = Math.random() * Math.PI * 2, d = 60 + Math.random() * 90;
    s.className = "spark"; s.textContent = pick(["⭐", "✨", "🌟", "💫"]);
    s.style.left = cx + "px"; s.style.top = cy + "px"; s.style.setProperty("--dx", Math.cos(a) * d + "px"); s.style.setProperty("--dy", Math.sin(a) * d + "px");
    box.appendChild(s); setTimeout(() => s.remove(), 900);
  }
}
function floater(el, text, cls = "") {
  if (!el) return;
  const r = el.getBoundingClientRect(), f = document.createElement("div");
  f.className = "floater " + cls; f.textContent = text;
  f.style.left = (r.left + r.width / 2) + "px"; f.style.top = (r.top + 8) + "px";
  document.getElementById("fx").appendChild(f); setTimeout(() => f.remove(), 1300);
}
function toast(msg) { document.querySelectorAll(".toast").forEach(t => t.remove()); const t = document.createElement("div"); t.className = "toast"; t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 1900); }
function announce(msg) { const l = document.getElementById("live"); l.textContent = ""; setTimeout(() => l.textContent = clean(msg), 30); }

/* ---------- pieces ---------- */
const PIP = `<svg class="pip" viewBox="0 0 64 64" aria-hidden="true"><path d="M13 20 L18 5 L27 16Z M51 20 L46 5 L37 16Z" fill="#D6532F"/><ellipse cx="32" cy="37" rx="22" ry="23" fill="#FF7A59"/><ellipse cx="32" cy="45" rx="13" ry="13" fill="#FFE3C4"/><g class="pip-eyes"><circle cx="23" cy="29" r="9" fill="#fff"/><circle cx="41" cy="29" r="9" fill="#fff"/><circle cx="24" cy="30" r="4.5" fill="#1D2B4F"/><circle cx="40" cy="30" r="4.5" fill="#1D2B4F"/><circle cx="25.4" cy="28.4" r="1.5" fill="#fff"/><circle cx="41.4" cy="28.4" r="1.5" fill="#fff"/></g><path class="pip-beak" d="M28.5 36 L35.5 36 L32 41Z" fill="#FFC93C"/><path d="M22 58 q3 3 6 0 M36 58 q3 3 6 0" stroke="#D6532F" stroke-width="2.6" fill="none" stroke-linecap="round"/></svg>`;
const starsHTML = n => `<span class="stars" aria-label="${n} of 3 stars">${[0, 1, 2].map(i => `<span class="${i < n ? "on" : "off"}">★</span>`).join("")}</span>`;
const app = document.getElementById("app");
const topicsOf = (age, subj) => C[age][subj];
const findTopic = (age, subj, id) => (C[age] && C[age][subj] || []).find(t => t.id === id);
function ageStars(age) { let got = 0, all = 0; for (const s of Object.keys(SUBJ)) for (const t of C[age][s]) { got += bestStars(t); all += 3; } return [got, all]; }
const rateInfo = () => RATES.find(r => r[0] === settings.rate) || RATES[2];

/* ---------- routing: #age-7-math-money-quiz ---------- */
let route = {}, curHash = null;
function parse(h) {
  const raw = (h || "").replace(/^#/, "");
  if (raw === "stickers") return { stickers: true };
  if (["kids", "parent", "daily", "review", "stories"].includes(raw)) return { page: raw };
  if (raw.startsWith("story-")) { const st = READ_STORIES.find(x => x.id === raw.slice(6)); return st ? { page: "story", story: st, mode: "read" } : { page: "stories" }; }
  if (raw.startsWith("storyquiz-")) { const st = READ_STORIES.find(x => x.id === raw.slice(10)); return st ? { page: "story", story: st, mode: "quiz" } : { page: "stories" }; }
  const p = raw.split("-").filter(Boolean);
  if (p[0] !== "age" || !C[p[1]]) return {};
  const r = { age: +p[1], subj: SUBJ[p[2]] ? p[2] : "english" };
  if (p[3]) { r.topic = findTopic(r.age, r.subj, p[3]); r.mode = p[4] === "quiz" ? "quiz" : "learn"; if (!r.topic) delete r.topic; }
  return r;
}
function go(h) {
  const target = "#" + h;
  if (target === curHash) { render(curHash); return; }
  try { history.pushState(null, "", h ? target : location.pathname + location.search); } catch (e) { }
  render(target);
}
function render(h) {
  stopAll();
  curHash = h; route = parse(h);
  document.body.dataset.age = route.age || (route.story && route.story.age) || "";
  if (route.age && P.lastAge !== route.age) { P.lastAge = route.age; saveP(); }
  crumbs();
  if (route.page && !pageAllowed(route.page)) return;
  if (route.stickers) stickerBook();
  else if (route.page) renderPage(route);
  else if (!route.age) home();
  else if (!route.topic) agePage(route.age, route.subj);
  else if (route.mode === "quiz") startQuiz(route.topic);
  else lesson(route.topic);
  window.scrollTo({ top: 0 });
}
window.addEventListener("popstate", () => { if (location.hash !== curHash) render(location.hash); });
window.addEventListener("hashchange", () => { if (location.hash !== curHash) render(location.hash); });

function crumbs() {
  const c = document.getElementById("crumbs"), r = route, parts = [];
  if (r.stickers) parts.push(`<button data-go="">Home</button>`, `<span class="cur">Sticker Book</span>`);
  if (r.page) { parts.push(`<button data-go="">Home</button>`); if (r.story) parts.push(`<button data-go="stories">Story Time</button>`); parts.push(`<span class="cur">${PAGE_NAMES[r.page] && r.page !== "story" ? PAGE_NAMES[r.page] : r.story ? r.story.title : ""}</span>`); }
  if (r.age) {
    parts.push(`<button data-go="">Home</button>`);
    const ageLabel = `Grade ${GRADE[r.age]}`;
    if (!r.topic) parts.push(`<span class="cur">${ageLabel} · ${SUBJ[r.subj].short}</span>`);
    else { parts.push(`<button data-go="age-${r.age}-${r.subj}">${ageLabel} · ${SUBJ[r.subj].short}</button>`); parts.push(`<span class="cur">${r.topic.title}</span>`); }
  }
  c.innerHTML = parts.join('<span class="sep">›</span>');
  document.getElementById("stk-count").textContent = stickers.length;
  paintWho();
}

/* ---------- HOME ---------- */
function levelCard() {
  const s = totalStars(), li = levelOf(s), L = LEVELS[li], N = LEVELS[li + 1];
  const pct = N ? Math.round(((s - L[0]) / (N[0] - L[0])) * 100) : 100;
  return `<div class="level-card"><span class="lv-badge">${L[2]}</span><div class="lv-body"><div class="lv-name">${L[1]}</div><div class="lv-bar"><span style="width:${pct}%"></span></div><div class="lv-next">${N ? `★ ${s} stars · ${N[0] - s} more to become <b>${N[1]} ${N[2]}</b>` : `★ ${s} stars · You reached the top level!`}</div></div><button class="btn btn-sun btn-sm" data-go="stickers">🏅 Stickers ${stickers.length}/${STICKERS.length}</button></div>`;
}
function home() {
  const sample = { 6: "Letter sounds, doubles, following directions", 7: "Blends, coins, self-control", 8: "Bar graphs, codes, choices & consequences", 9: "Idioms, decimals, growth mindset" };
  const topicCount = a => Object.keys(SUBJ).reduce((n, k) => n + C[a][k].length, 0);
  app.innerHTML = `
  <section class="hero">
    <div class="pip-talk">${PIP}<div class="bubble">Hi${curProfile().name ? `, <b>${esc(curProfile().name)}</b>` : ""}! I'm <b>Pip</b>. Let's learn, play and win stickers! What grade are you in?</div></div>
    ${levelCard()}
    <h1>Pick your <span>grade</span> to start</h1>
  </section>
  <div class="age-grid">
    ${[6, 7, 8, 9].map(a => { const [g, all] = ageStars(a); return `<button class="age-card c${a}${(P.lastAge || curProfile().age) === a ? " mine" : ""}" data-go="age-${a}-english" aria-label="Grade ${GRADE[a]}"><span class="age-lbl">Grade</span><span class="age-num">${GRADE[a]}</span><span class="age-topics">${sample[a]} · ${topicCount(a)} topics</span><span class="age-stars">★ ${g} / ${all}</span></button>`; }).join("")}
  </div>
  ${homeCards()}
  <section class="how" aria-label="How it works">
    <div class="how-step"><span class="how-n">1</span><div><b>Learn it</b><p>Reading, math, logic puzzles, and manners & behavior, with pictures and sounds.</p></div></div>
    <div class="how-step"><span class="how-n">2</span><div><b>Beat the clock</b><p>3, 2, 1, GO! Answer fast for bonus points and build a streak.</p></div></div>
    <div class="how-step"><span class="how-n">3</span><div><b>Win stickers</b><p>Earn stars and collect all ${STICKERS.length} stickers in your book.</p></div></div>
  </section>
  <p class="grownups">For grown-ups: see each child's progress in the <button data-go="parent">Parent dashboard</button>, add children in <button data-go="kids">Who's learning?</button>, and change the timer, voice and more in <button data-act="open-settings">Settings</button>.</p>`;
}

/* ---------- STICKER BOOK ---------- */
function stickerBook() {
  app.innerHTML = `
  <div class="age-head"><div><div class="eyebrow">Your collection</div><h1>My Sticker Book</h1></div><button class="btn btn-go" data-go="">🎒 Pick a grade</button></div>
  <p class="slide-txt">You have <b>${stickers.length}</b> of ${STICKERS.length} stickers. Get at least 1 star in any quiz to win a new one!</p>
  <div class="sticker-grid">${STICKERS.map(s => stickers.includes(s) ? `<button class="stk" data-act="stk" aria-label="sticker">${s}</button>` : `<span class="stk locked" aria-label="locked sticker">?</span>`).join("")}</div>
  ${v32PetsHTML()}
  ${prizeShelf()}`;
}

/* ---------- AGE PAGE ---------- */
function agePage(age, subj) {
  const list = topicsOf(age, subj);
  app.innerHTML = `
  <div class="age-head">
    <div><div class="eyebrow">Grade ${GRADE[age]}</div><h1>What do you want to learn?</h1></div>
    <div class="age-switch" role="group" aria-label="Change grade"><span>Grade</span>${[6, 7, 8, 9].map(a => `<button class="age-chip c${a}" data-go="age-${a}-${subj}" aria-current="${a === age}" aria-label="Grade ${GRADE[a]}">${GRADE[a]}</button>`).join("")}</div>
  </div>
  <div class="tabs" role="tablist">
    ${Object.entries(SUBJ).map(([k, s]) => `<button class="tab" role="tab" aria-selected="${k === subj}" data-go="age-${age}-${k}"><span class="emo">${s.icon}</span><span>${s.name}<small>${s.sub} · ${C[age][k].length} topics</small></span></button>`).join("")}
  </div>
  <button class="surprise" data-act="surprise"><span class="emo">🎲</span><span><b>Surprise me!</b><small>Pip picks a ${SUBJ[subj].short} quiz for you</small></span></button>
  <div class="topic-grid">
    ${list.map(t => `<article class="topic" data-go="age-${age}-${subj}-${t.id}-learn">
      <div class="t-top"><div class="t-icon">${t.icon}</div>${starsHTML(bestStars(t))}</div>
      <h3>${t.title}</h3><p>${t.blurb}</p>${stdChip(t)}
      <div class="t-actions"><button class="btn btn-go btn-sm" data-go="age-${age}-${subj}-${t.id}-learn">📖 Learn</button><button class="btn btn-sm" data-go="age-${age}-${subj}-${t.id}-quiz">⏱️ Quiz</button></div>
    </article>`).join("")}
  </div>`;
}

/* ---------- LESSON ---------- */
let slideIdx = 0;
const PIP_LESSON = ["Let's learn something new!", "Tap the pictures and words!", "You're doing great!", "Ooh, this is my favorite part!", "Almost quiz time!"];
function lesson(t) {
  slideIdx = 0;
  app.innerHTML = `
  <div class="lesson-head">
    <div><div class="eyebrow">Grade ${GRADE[t.age]} · ${SUBJ[t.subj].short} · Learn ${stdChip(t)}</div><h1><span class="emo">${t.icon}</span>${t.title}</h1></div>
  </div>
  <div id="slide"></div>
  <div id="deep"></div>
  <div id="ai"></div>
  <div class="slide-nav">
    <button class="btn" data-act="prev" id="prev-btn">◀ Back</button>
    <div class="dots" id="dots" aria-hidden="true"></div>
    <button class="btn btn-go" data-act="next" id="next-btn">Next ▶</button>
  </div>
  <div class="side-links">
    <button class="btn btn-sm" id="skip-quiz" data-go="age-${t.age}-${t.subj}-${t.id}-quiz">⏱️ Go to the quiz</button>
    <button class="btn btn-sm" data-go="age-${t.age}-${t.subj}">🗂️ Other ${SUBJ[t.subj].short} topics</button>
    <button class="btn btn-sm" data-go="">🎒 Change grade</button>
  </div>`;
  showSlide(0, true);
}
function showSlide(i, first) {
  closeDeep(true);
  const t = route.topic, n = t.lesson.length; slideIdx = Math.max(0, Math.min(n - 1, i));
  const s = t.lesson[slideIdx], pipLine = slideIdx === n - 1 ? PIP_LESSON[4] : slideIdx === 0 ? PIP_LESSON[0] : /data-say/.test(s.html) ? PIP_LESSON[1] : pick(PIP_LESSON.slice(2, 4));
  document.getElementById("slide").innerHTML = `
    <div class="slide-card ${first ? "" : "slide-anim"}">
      <div class="slide-top"><div class="pip-mini-talk">${PIP}<span>${pipLine}</span></div><span class="step-tag">Step ${slideIdx + 1} of ${n}</span></div>
      <h2>${s.t}</h2>
      <div class="slide-vis">${s.html}</div>
      <div class="slide-foot"><p class="slide-txt">${s.txt || s.say}</p><div class="foot-btns"><button class="btn btn-sm btn-sun" data-act="read">🔊 Read to me</button><button class="btn btn-sm btn-go explain-btn" data-act="deep-open">🤔 Explain more</button><button class="btn btn-sm btn-ai ai-only" data-act="ai-open">✨ Ask Pip</button><button class="btn btn-sm pause-sm" data-act="pause" aria-label="Pause everything"><span class="emo">⏸️</span> Pause</button></div></div>
    </div>`;
  document.getElementById("dots").innerHTML = t.lesson.map((_, k) => `<span class="${k === slideIdx ? "on" : k < slideIdx ? "done" : ""}"></span>`).join("");
  document.getElementById("prev-btn").disabled = slideIdx === 0;
  const nb = document.getElementById("next-btn");
  nb.innerHTML = slideIdx === n - 1 ? "Quiz time! 🚀" : "Next ▶";
  nb.classList.toggle("btn-sun", slideIdx === n - 1); nb.classList.toggle("btn-go", slideIdx !== n - 1); nb.classList.toggle("wiggle", slideIdx === n - 1);
  /* Next, Back and the links stay gray until Pip has finished this step */
  lockNav(true);
  const myIdx = slideIdx, myT = t;
  const kn = kidName(), nSl = t.lesson.length;
  const lead = !kn ? "" : slideIdx === nSl - 1 && nSl > 2 ? `Here's the last part, ${kn}.` : !attnOn() ? "" : slideIdx === 0 ? `${kn}, listen carefully.` : slideIdx === 1 ? `${kn}, look closely.` : "";
  narrate(lead ? `${lead} ${s.say}` : s.say, { mood: "teach" }, () => {
    if (route.topic !== myT || slideIdx !== myIdx) return;
    lockNav(false);
    if (myIdx === n - 1) { P.lessons = P.lessons || {}; if (!P.lessons[pkey(t)]) { P.lessons[pkey(t)] = 1; saveP(); } const sk = document.getElementById("skip-quiz"); if (sk) sk.hidden = false; }
  });
}

/* ---------- EXPLAIN MORE (5 levels) ---------- */
let D = null;
const DEEP = [["🔊", "Say it again, slowly"], ["👀", "Watch Pip do one"], ["🪜", "Step by step"], ["✋", "Your turn, with hints"], ["💡", "Pip's secret trick"]];
const DEEP_PIP = ["No problem! Let's go over it again.", "Let me show you with an example.", "Let's break it into small steps.", "Now you try! I'll give you hints.", "Here's my favorite trick!"];
function newExample() {
  for (let i = 0; i < 20; i++) { try { const q = route.topic.gen(); q.opts = q.opts.map(String); q.ans = String(q.ans); if (q.opts.includes(q.ans)) return q; } catch (e) { } }
  return null;
}
function openDeep(level = 1) {
  D = { level, ex: level > 1 ? newExample() : null, tries: 0, step: 0, tok: 0, done: false };
  renderDeep(true);
}
function closeDeep(silent) {
  if (!D) return; D = null; NAR_TOK++; lockNav(false); const d = document.getElementById("deep"); if (d) d.innerHTML = "";
  const b = document.querySelector(".explain-btn"); if (b) b.hidden = false;
  if (!silent) { hush(); speak("Great! Let's keep going.", true); }
}
function exCard(q, interactive) {
  return `<div class="ex-card"><div class="ex-tag">Example</div><div class="q-text">${q.q}</div>${q.vis ? `<div class="q-vis" id="ex-vis">${q.vis}</div>` : ""}
    <div class="opts n${q.opts.length}${optLen(q) > 22 ? " long" : ""}">${q.opts.map((o, k) => `<div class="opt-wrap"><button class="opt dopt${q.big ? " big" : ""}" data-dopt="${k}" ${interactive ? "" : "disabled"}><span class="okey">${k + 1}</span><span class="oval">${o}</span></button><button class="say-opt" data-sayexopt="${k}" aria-label="Read answer ${k + 1} to me">🔊</button></div>`).join("")}</div>
    <div id="ex-fb"></div></div>`;
}
function exReveal() {
  const q = D.ex; document.querySelectorAll(".dopt").forEach((b, j) => { b.disabled = true; if (q.opts[j] === q.ans) b.classList.add("correct", "pop"); else b.classList.add("dim"); });
  document.getElementById("ex-fb").innerHTML = `<div class="feedback ok"><div class="fb-icon">✔</div><div class="fb-body"><div class="fb-title">The answer is <span class="val">${q.ans}</span></div><div class="fb-why">${q.why || ""}</div></div></div>`;
}
function renderDeep(first) {
  const box = document.getElementById("deep"); if (!box || !D) return;
  const t = route.topic, s = t.lesson[slideIdx], L = D.level, tok = ++D.tok;
  const b = document.querySelector(".explain-btn"); if (b) b.hidden = true;
  if (L > 1 && !D.ex) D.ex = newExample();
  const q = D.ex;
  let body = "";
  if (L === 1) {
    const parts = splitParts(clean(s.say));
    body = `<div class="say-card">${s.html ? `<div class="slide-vis small">${s.html}</div>` : ""}<ol class="say-steps">${parts.map((p, i) => `<li id="ss${i}">${p}</li>`).join("")}</ol></div>`;
  } else if (L === 2) body = exCard(q, false);
  else if (L === 3) {
    const steps = ["Read the question", q.vis ? "Look at the picture" : "Look at the choices", "Cross out the wrong ones", "Pick the answer"];
    body = `<ol class="steps deep-steps">${steps.map((st, i) => `<li class="${i < D.step ? "done" : i === D.step ? "now" : ""}">${st}</li>`).join("")}</ol>` + exCard(q, false);
  } else if (L === 4) body = exCard(q, true);
  else body = `<div class="trick-card"><span class="emo">💡</span><div><b>Pip's secret trick</b><p>${trickFor(t)}</p></div></div>` + exCard(q, true);
  const btns = [];
  if (L > 1) btns.push(`<button class="btn btn-sm" data-act="deep-back">◀ Back a level</button>`);
  btns.push(L === 1 ? `<button class="btn btn-sm" data-act="deep-new">🔁 Say it again</button>` : `<button class="btn btn-sm" data-act="deep-new">🔁 Different example</button>`);
  if (L === 3) btns.push(`<button class="btn btn-sm btn-sun" data-act="deep-step" id="deep-step">${D.step >= 4 ? "Watch again" : "Next step ▶"}</button>`);
  if (L < 5) btns.push(`<button class="btn btn-sm btn-go" data-act="deep-more">🤔 Explain even more</button>`);
  btns.push(`<button class="btn btn-sm btn-sun" data-go="age-${t.age}-${t.subj}-${t.id}-quiz">⏱️ ${L === 5 ? "I'm ready for the quiz!" : "Go to the quiz"}</button>`);
  btns.push(`<button class="btn btn-sm btn-good" data-act="deep-close">👍 I get it!</button>`);
  box.innerHTML = `<section class="deep" aria-label="Pip explains more">
    <div class="deep-head"><div class="pip-mini-talk">${PIP}<span>${DEEP_PIP[L - 1]}</span></div>
      <div class="deep-lv" aria-label="Level ${L} of 5">${DEEP.map((d, i) => `<span class="${i < L ? "on" : ""}">${i + 1}</span>`).join("")}</div></div>
    <h3><span class="emo">${DEEP[L - 1][0]}</span> Level ${L}: ${DEEP[L - 1][1]}</h3>
    <div class="deep-body">${body}</div>
    <div class="deep-actions">${btns.join("")}</div></section>`;
  if (first) box.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  sfx("page");
  const alive = () => D && D.tok === tok;
  lockNav(true, box);
  const done = () => { if (alive()) lockNav(false); };
  if (L === 1) {
    const lead = kidName() && attnOn() ? `${kidName()}, listen carefully. ${DEEP_PIP[0]}` : DEEP_PIP[0], off = splitParts(clean(lead)).length;
    narrate(`${lead} ${s.say}`, { force: true, rate: 0.82, mood: "teach", onPart: i => { if (!alive()) return; document.querySelectorAll(".say-steps li").forEach((li, k) => li.classList.toggle("now", k === i - off)); } }, done);
  } else if (L === 2) {
    speak(`${heyKid(DEEP_PIP[1], false)} ${q.say || q.q}`, true, () => { if (!alive()) return; pTimeout(() => { if (!alive()) return; exReveal(); sfx("correct"); narrate(`The answer is ${answerSpeech(q)}. ${q.why || ""}`, { force: true }, done); }, 900); }, { gate: true });
  } else if (L === 3) {
    D.step = 0; runStep();
  } else if (L === 4) {
    D.tries = 0; D.done = false; narrate(`${heyKid(DEEP_PIP[3], false)} ${q.say || q.q}`, { force: true }, done);
  } else {
    D.tries = 0; D.done = false; narrate(`${heyKid(DEEP_PIP[4], false)} ${trickFor(t)} Now try this one. ${q.say || q.q}`, { force: true }, done);
  }
}
function runStep() {
  const q = D.ex, st = D.step, tok = D.tok;
  const lis = document.querySelectorAll(".deep-steps li");
  lis.forEach((li, i) => { li.classList.toggle("done", i < st); li.classList.toggle("now", i === st); });
  const nb = document.getElementById("deep-step"), box = document.getElementById("deep");
  lockNav(true, box);
  const say = txt => narrate(txt, { force: true }, () => { if (D && D.tok === tok) lockNav(false); });
  if (st === 0) say(`Step 1. Read the question. ${q.say || q.q}`);
  else if (st === 1) { const v = document.getElementById("ex-vis"); if (v) { v.classList.remove("glow"); void v.offsetWidth; v.classList.add("glow"); } say(q.vis ? "Step 2. Look carefully at the picture. What do you notice?" : "Step 2. Read every choice carefully."); }
  else if (st === 2) {
    say("Step 3. Let's cross out the ones that don't fit.");
    const wrong = [...document.querySelectorAll(".dopt")].filter((b, j) => q.opts[j] !== q.ans);
    wrong.forEach((b, i) => pTimeout(() => { if (!D || D.tok !== tok) return; b.classList.add("wrong", "crossed"); sfx("pop"); }, 900 + i * 700));
  } else if (st === 3) { exReveal(); sfx("correct"); burstAt(document.querySelector(".dopt.correct"), 10); say(`Step 4. ${heyKid(`The answer is ${answerSpeech(q)}.`)} ${q.why || ""}`); }
  if (nb) nb.textContent = st >= 3 ? "🔁 Watch again" : "Next step ▶";
}
/* Explain-more feedback: the panel's buttons wait until Pip has finished */
function deepSay(txt) { const box = document.getElementById("deep"), tok = D && D.tok; if (box) lockNav(true, box); narrate(txt, { force: true }, () => { if (D && D.tok === tok) lockNav(false); }); }
function deepAnswer(k) {
  if (!D || D.done) return;
  const q = D.ex, btns = [...document.querySelectorAll(".dopt")], b = btns[k];
  if (q.opts[k] === q.ans) {
    D.done = true; b.classList.add("correct", "pop"); btns.forEach(x => x.disabled = true); sfx("correct"); burstAt(b, 14);
    document.getElementById("ex-fb").innerHTML = `<div class="feedback ok"><div class="fb-icon">✔</div><div class="fb-body"><div class="fb-title">${pick(YAY)}</div><div class="fb-why">${q.why || ""}</div></div><button class="btn btn-go btn-sm" data-act="deep-new">Try another ▶</button></div>`;
    deepSay(`${pick(YAY)} ${q.why || ""}`);
    return;
  }
  D.tries++; b.classList.add("wrong"); b.disabled = true; sfx("wrong");
  if (D.tries === 1) {
    document.getElementById("ex-fb").innerHTML = `<div class="feedback no"><div class="fb-icon">💡</div><div class="fb-body"><div class="fb-title">Not that one. Here's a hint!</div><div class="fb-why">${trickFor(route.topic)}</div></div></div>`;
    deepSay(`Not that one. Here's a hint. ${trickFor(route.topic)} Try again!`);
  } else {
    D.done = true; exReveal();
    const fb = document.querySelector("#ex-fb .feedback"); if (fb) fb.insertAdjacentHTML("beforeend", `<button class="btn btn-go btn-sm" data-act="deep-new">Try another ▶</button>`);
    deepSay(`That's okay! The correct answer is ${answerSpeech(q)}. ${q.why || ""} Let's try another one.`);
  }
}

/* ---------- QUIZ ---------- */
let Q = null, timerId = null, autoId = null, overlayId = null;
function timerSeconds(age) { return settings.timer === "auto" ? AUTO_TIMER[age] : +settings.timer; }
function buildQuestions(t) {
  if (t.preset) return t.preset.map(q => JSON.parse(JSON.stringify(q)));
  /* Prefer questions this child hasn't answered yet; after a few visits the oldest ones come back. */
  const n = +settings.count, qs = [], seen = new Set(), past = new Set(P.seen[pkey(t)] || []); let tries = 0;
  while (qs.length < n && tries < n * 80) {
    tries++;
    let q; try { q = t.gen(); } catch (e) { console.error(e); continue; }
    q.opts = (q.opts || []).map(String); q.ans = String(q.ans);
    if ((!q.kind || q.kind === "count") && !q.opts.includes(q.ans)) continue;
    const k = seenKey(q);
    if (seen.has(k) && tries < n * 60) continue;
    if (past.has(k) && tries < n * 50) continue;
    seen.add(k); qs.push(q);
  }
  return qs;
}
function startQuiz(t) {
  Q = { t, qs: buildQuestions(t), i: 0, score: 0, pts: 0, streak: 0, best: 0, log: [], locked: false, token: 0, prevPct: 0, levelBefore: levelOf(totalStars()), level: levelFor(t), missRun: 0, hitRun: 0, boost: false, up: false };
  if (!Q.qs.length) { Q = null; go(""); return; }
  countdown(() => showQuestion());
}
function overlay(html, cls, ms, then) {
  closeOverlay();
  const o = document.createElement("div"); o.className = "ov " + cls; o.innerHTML = html; o.id = "ov";
  document.body.appendChild(o);
  const done = () => { if (!document.getElementById("ov")) return; closeOverlay(); then && then(); };
  o.addEventListener("click", done);
  if (ms) overlayId = pTimeout(done, ms);
  return o;
}
function closeOverlay() { if (overlayId) { pClear(overlayId); overlayId = null; } const o = document.getElementById("ov"); if (o) o.remove(); }
function countdown(then) {
  const t = Q.t;
  app.innerHTML = `<div class="quiz-intro"><div class="pip-talk">${PIP}<div class="bubble">${t.icon} <b>${t.title}</b>: ${Q.qs.length} questions. Ready?<br><span class="lvl-pill lvl-${Q.level}">${LVL[Q.level][0]} ${LVL[Q.level][1]}</span></div></div></div>`;
  /* No tap yet on this page (opened from a link or reload)? Browsers won't let Pip talk until
     the child taps once, so ask for a tap first. */
  if (!speechUnlocked && hasSpeech && settings.voice && !settings.muted) {
    overlay(`<div class="tap-start"><div class="emo" style="font-size:90px">👆</div><div class="cd-num go" style="font-size:min(14vw,72px)">Tap to start!</div></div>`, "cd", 0, () => { unlockSpeech(); actx(); countdown(then); });
    return;
  }
  speak("Get ready!", false, null, { mood: "cheer" });
  if (reduced) { then(); return; }
  const o = overlay(`<div class="cd-num" id="cdn">3</div><div class="cd-sub">Tap to skip</div>`, "cd", 0, null);
  let n = 3; sfx("count");
  const stepper = () => {
    n--; const el = document.getElementById("cdn"); if (!el) return;
    if (n > 0) { el.textContent = n; el.style.animation = "none"; void el.offsetWidth; el.style.animation = ""; sfx("count"); overlayId = pTimeout(stepper, 650); }
    else if (n === 0) { el.textContent = "GO!"; el.classList.add("go"); el.style.animation = "none"; void el.offsetWidth; el.style.animation = ""; sfx("go"); overlayId = pTimeout(stepper, 600); }
    else { closeOverlay(); then(); }
  };
  overlayId = pTimeout(stepper, 650);
  o.addEventListener("click", () => { closeOverlay(); then(); }, { once: true });
}
const pctOf = i => 2 + (i / Q.qs.length) * 90;
function showQuestion() {
  const t = Q.t, q = Q.qs[Q.i], n = Q.qs.length, lvl = effLevel();
  prepQ(q, t, lvl);
  const src = srcTopic(q, t), age = (src && src.age) || t.age || 7;
  const base = timerSeconds(age), secs = q.calm ? 0 : levelSecs(base ? base + (q.extra || 0) : 0, lvl, q);
  Q.helpStep = 0; Q.out = []; Q.helpPlan = null;
  Q.waiting = false; Q.early = 0; Q.lockIn = false; Q.pend = null; Q.firstPick = null; Q.rethink = false;
  const listenOnly = !!q.listen && window.voiceOn();
  Q.locked = false; Q.token++; Q.secs = secs; Q.started = Date.now(); Q.hinted = false; Q.lastText = null; KS = null;
  const big = q.big ? " big" : "", now = pctOf(Q.i), mc = !q.kind || q.kind === "count";
  const links = src ? `<button class="btn btn-sm" data-go="age-${src.age}-${src.subj}-${src.id}-learn">📖 Learn ${t.special ? `“${src.title}”` : "it again"}</button>` : "";
  const hintOK = true; /* v39: Help is on every question */
  setTimeout(() => { try { v32TrackCheer(n); } catch (e) { } }, 900);
  app.innerHTML = `
  <div class="quiz-top">
    <div class="pip-mini" id="pipm">${PIP}<span class="pip-say" id="pipsay" aria-hidden="true"></span></div>
    <div class="track" aria-label="Question ${Q.i + 1} of ${n}">
      <div class="track-line"><span class="track-fill" id="tfill" style="width:${Q.prevPct}%"></span></div>
      ${Q.qs.map((_, i) => `<span class="stop ${i < Q.i ? (Q.log[i] ? "ok" : "no") : ""}" style="left:${pctOf(i)}%"></span>`).join("")}
      <span class="rocket" id="rocket" style="left:${Q.prevPct}%">🚀</span><span class="goal">🏆</span>
    </div>
    <div class="hud">
      <span class="lvl-pill lvl-${lvl}" title="Difficulty: ${LVL[lvl][1]}" aria-label="Difficulty: ${LVL[lvl][1]}">${LVL[lvl][0]}<b>${LVL[lvl][1]}</b></span>
      <div class="qscore" id="pts" aria-label="Points">🪙 ${Q.pts}</div>
      <div class="streak-pill ${Q.streak >= 2 ? "hot" : ""}" id="streak">🔥 ${Q.streak}</div>
      <div class="egg-pill${v32EggLeft() <= 0 ? " ready" : ""}" id="egg" title="Every ${V32_EGG} right answers hatch a new pet" aria-label="Pet egg: ${v32EggNow()} of ${V32_EGG}"><span class="egg-ico" aria-hidden="true">🥚</span><b>${v32EggNow()}</b><small>/${V32_EGG}</small></div>
      ${secs ? `<div class="timer" id="timer" role="timer" aria-label="Seconds left"><svg viewBox="0 0 44 44"><circle class="tr-bg" cx="22" cy="22" r="19"/><circle class="tr-fg" id="tr-fg" cx="22" cy="22" r="19" stroke-dasharray="119.4" stroke-dashoffset="0"/></svg><span id="tnum">${secs}</span></div>` : ""}
      <button class="pause-btn" data-act="pause" aria-label="Pause everything" title="Pause (P)"><span aria-hidden="true">⏸</span><b>Pause</b></button>
    </div>
  </div>
  <div class="q-card q-in kind-${q.kind || "mc"}">
    <div class="q-head"><div class="q-num">${Q.i + 1}<small>/${n}</small></div><div class="q-text">${listenOnly ? `<span class="v27-listen">👂 Listen to Pip!</span> <button class="btn btn-sm v27-again" data-act="sayq">🔊 Hear it again</button>` : q.q}</div><div class="q-btns"><button class="icon-btn" data-act="sayq" aria-label="Read the question to me">🔊</button>${hintOK ? `<button class="icon-btn help-btn" data-act="hint" aria-label="Help: get a hint" title="Help">💡<small>Help</small></button>` : ""}</div></div>
    ${t.special && src ? `<div class="q-src">${SUBJ[src.subj].icon} ${src.title} · Grade ${GRADE[src.age]}</div>` : ""}
    <div id="hint-box"></div>
    <div class="q-body${q.vis ? " has-vis" : ""}">
    ${q.vis ? `<div class="q-vis">${q.vis}</div>` : ""}
    <div class="q-right">
    ${q.wait && q.turtle ? `<div class="v27-light v38-turtle" id="v27-light" aria-live="polite"><span class="v38-track" aria-hidden="true"><i class="v38-shell">🐢</i></span><span class="v27-lt">Listen first…</span></div><div class="v28-tip" id="v28-tip" hidden></div>` : ""}
    ${q.wait && !q.turtle ? `<div class="v27-light" id="v27-light" aria-live="polite"><span class="v27-lamps" aria-hidden="true"><i class="r"></i><i class="y"></i><i class="g"></i></span><span class="v27-lt">Listen first…</span></div><div class="v28-tip" id="v28-tip" hidden></div>` : ""}
    ${mc ? `<div class="opts n${q.opts.length}${optLen(q) > 22 ? " long" : ""}">${q.opts.map((o, k) => `<div class="opt-wrap" style="animation-delay:${k * 70}ms"><button class="opt${big}" data-opt="${k}"><span class="okey">${k + 1}</span><span class="oval">${o}</span></button><button class="say-opt" data-sayopt="${k}" aria-label="Read answer ${k + 1} to me">🔊</button></div>`).join("")}</div>` : kindHTML(q)}
    <div id="fb"></div>
    </div></div>
  </div>
  <div class="side-links">
    ${links}
    ${t.special ? `<button class="btn btn-sm" data-go="">🏠 Home</button>` : `<button class="btn btn-sm" data-go="age-${t.age}-${t.subj}">🗂️ Other topics</button><button class="btn btn-sm" data-go="">🎒 Change grade</button>`}
  </div>`;
  requestAnimationFrame(() => requestAnimationFrame(() => { const r = document.getElementById("rocket"), f = document.getElementById("tfill"); if (r) r.style.left = now + "%"; if (f) f.style.width = now + "%"; Q && (Q.prevPct = now); }));
  a11yLabels(app);
  /* Pip reads the question and each choice (lighting it up); answers and the clock wait until he's done */
  /* "Wait for Pip to read" can be turned off in Settings; the patience topics (q.wait) always wait, since waiting is their lesson */
  const waitRead = waitReadOn() || !!q.wait;
  Q.reading = waitRead; if (waitRead) { lockAnswers(true); lockNav(true); }
  const sc = questionScript(q), tokQ = Q.token;
  narrate(sc.text, { mood: "ask", after: Math.round(pace().after / 2), onPart: si => { if (!Q || Q.token !== tokQ) return; const k = si - sc.first; document.querySelectorAll(".q-right .opt-wrap").forEach((w, j) => w.classList.toggle("reading-now", j === k)); } }, () => {
    if (!Q || Q.token !== tokQ) return;
    document.querySelectorAll(".reading-now").forEach(x => x.classList.remove("reading-now"));
    if (!waitRead) {
      /* answers were open from the start; the clock still starts once Pip has finished reading (unless answered or Help is open) */
      const go = () => { if (!Q || Q.token !== tokQ || Q.locked || Q.helpStep) return; if (PAUSED) { setTimeout(go, 300); return; } if (secs) startTimer(secs); };
      go(); return;
    }
    /* v26: a one-second pause after the reading, so the child looks at all the choices before tapping */
    const unlock = () => {
      if (!Q || Q.token !== tokQ) return;
      if (PAUSED) { setTimeout(unlock, 300); return; }
      Q.reading = false; lockAnswers(false); lockNav(false);
      Q.started = Date.now();
      if (q.wait) {
        const grow = 0; /* v31: fixed timing: 1.5 s red, 1.5 s yellow, then green */
        v27Light(q.wait + grow, tokQ, () => { Q.started = Date.now(); if (q.peek) v28Cover(true); if (secs) startTimer(secs); }, q.v27 && q.v27.tip, grow);
        return;
      }
      if (secs) startTimer(secs);
    };
    setTimeout(unlock, q.wait ? 0 : ANSWER_WAIT_MS); /* the light starts as soon as Pip finishes reading */
  });
}
/* v27: the wait-for-green light (patience). Red, then yellow for a moment, then green. Taps on red get a kind reminder. */
const V31_STEP = 1500; /* each light (red, then yellow) lasts 1.5 seconds */
function v27Light(secs, tok, then, tip, grow) {
  const el = document.getElementById("v27-light"); if (!el || !Q || Q.token !== tok) { then(); return; }
  const lt = el.querySelector(".v27-lt"), set = (c, msg) => { el.dataset.c = c; lt.textContent = msg; };
  if (tip) { const tp = document.getElementById("v28-tip"); if (tp) { tp.textContent = tip; tp.hidden = false; } }
  if (grow && grow > (Q.growShown || 0)) { Q.growShown = grow; toast(`⏳ Longer wait: you're getting so patient!`); }
  if (el.classList.contains("v38-turtle")) {
    /* the turtle walks across; answers count when it reaches the end */
    Q.waiting = true; el.dataset.c = "walk"; lt.textContent = "🐢 Look closely… take your time";
    el.style.setProperty("--walk", (secs * 1000) + "ms"); el.classList.remove("go"); void el.offsetWidth; el.classList.add("go");
    pTimeout(() => { if (!Q || Q.token !== tok) return; Q.waiting = false; el.dataset.c = "g"; lt.textContent = Q.early ? "🐢 Done! Now you can choose." : "🐢 Done! You took your time. Great!"; sfx("pop"); then(); }, secs * 1000);
    return;
  }
  Q.waiting = true; set("r", "🔴 Wait for green… think!");
  const red = V31_STEP;
  pTimeout(() => {
    if (!Q || Q.token !== tok) return; set("y", "🟡 Get ready…");
    pTimeout(() => {
      if (!Q || Q.token !== tok) return; Q.waiting = false; set("g", Q.early ? "🟢 Go! Now you can tap." : "🟢 Go! You waited. Great patience!");
      sfx("pop"); then();
    }, V31_STEP);
  }, red);
}
/* v28: hide or show the pictures in a "look and remember" question */
function v38TurtlePause(on) { document.querySelectorAll(".v38-turtle.go").forEach(x => x.classList.toggle("held", !!on)); }
function v28Cover(on) { document.querySelectorAll(".q-card .v28-peek").forEach(x => { x.classList.toggle("covered", on); const nt = x.querySelector(".v28-peek-note"); if (nt) nt.textContent = on ? "The pictures are hiding. What do you remember?" : "Here they are again!"; }); if (on) sfx("whoosh"); }
/* v28: "Are you sure?" — the child locks in an answer, or thinks again */
function v28Confirm(k) {
  Q.pend = k; if (Q.firstPick == null) Q.firstPick = k;
  document.querySelectorAll(".q-card .opt").forEach((b, j) => b.classList.toggle("chosen", j === k));
  let bar = document.getElementById("v28-confirm");
  if (!bar) {
    bar = document.createElement("div"); bar.id = "v28-confirm"; bar.className = "v28-confirm"; bar.setAttribute("role", "group"); bar.setAttribute("aria-label", "Are you sure?");
    bar.innerHTML = `<span>🤔 Are you sure? Look one more time.</span><button class="btn btn-go btn-sm" type="button" data-v28="lock">🔒 Yes, lock it in</button><button class="btn btn-sm" type="button" data-v28="again">🔄 Let me think again</button>`;
    const opts = document.querySelector(".q-card .opts"); if (opts) opts.after(bar); else document.querySelector(".q-card .q-right")?.appendChild(bar);
    bar.addEventListener("click", e => {
      const b = e.target.closest("[data-v28]"); if (!b || !Q || Q.locked || PAUSED) return;
      if (b.dataset.v28 === "lock") { Q.lockIn = true; answer(Q.pend); }
      else { Q.rethink = true; Q.pend = null; document.querySelectorAll(".q-card .opt.chosen").forEach(x => x.classList.remove("chosen")); bar.remove(); toast("🔍 Good! Look at every choice again."); try { speak(heyKid("good thinking. Look at every choice again."), true, null, { mood: "teach" }); } catch (e2) { } }
    });
    if (!Q.askedSure) { Q.askedSure = true; try { speak(heyKid("are you sure? Look one more time, then lock it in."), true, null, { mood: "ask" }); } catch (e) { } }
  }
  bar.classList.remove("pop-in"); void bar.offsetWidth; bar.classList.add("pop-in");
}
function v27Early(k) {
  Q.early = (Q.early || 0) + 1;
  const el = document.getElementById("v27-light"); if (el) { el.classList.remove("nudge"); void el.offsetWidth; el.classList.add("nudge"); }
  const b = k != null ? document.querySelector(`.opt[data-opt="${k}"]`) : null; if (b) { b.classList.remove("shake"); void b.offsetWidth; b.classList.add("shake"); }
  const turtle = el && el.classList.contains("v38-turtle");
  if (Q.early === 1) { toast(turtle ? "🐢 Slow down! Let the turtle finish." : "🚦 Wait for green!"); try { speak(heyKid(turtle ? "slow down. Let the turtle finish walking." : "wait for the green light."), true, null, { mood: "teach" }); } catch (e) { } }
}
/* v39: Help. Stops the clock, then gives hints one step at a time, never the answer:
   1) a way to think about this question, 2) cross out a wrong answer (and why), 3) cross out another. */
function v39HelpPlan(q, src) {
  const steps = [], plain = s => xPlain(String(s || "")), ansP = plain(q.ans).trim();
  const mc = Array.isArray(q.opts) && !q.kind;
  /* step 1: how to think about it */
  let think = [];
  const qt = String(q.q || ""), words = (qt.match(/<b>([^<]{2,24})<\/b>/g) || []).map(x => x.replace(/<\/?b>/g, "")).concat(qt.match(/\b(NOT|ONLY|FIRST|LAST|SECOND|EXACTLY|SAME|OPPOSITE|SMALLEST|BIGGEST|FEWEST|MOST|LEAST|EXCEPT|BEST|MORE|FEWER|LEFT)\b/g) || []);
  const key = words.map(w => w.trim()).find(w => /^[A-Z ]{2,}$/.test(w) || /\b(not|only|first|last|same|opposite|best|more|fewer|left|smallest|biggest)\b/i.test(w));
  if (key) think.push(`Look at the important word${/ /.test(key) ? "s" : ""}: <b>${esc(key)}</b>. ${/not|except/i.test(key) ? "It means you look for the one that does NOT fit." : /only/i.test(key) ? "Only count or pick that one kind." : /first|last|second/i.test(key) ? "Think about the order." : /same|exactly/i.test(key) ? "Check every part, one at a time." : /opposite/i.test(key) ? "Think of the word that means the other way." : "Think about what it asks."}`);
  let ex = null; try { ex = xoExprIn(q, plain(q.say || q.q) + " " + plain(q.vis || "")); } catch (e) { }
  if (ex && ex.op === "+") think.push(`Start with the bigger number, ${Math.max(ex.a, ex.b)}, and count on ${Math.min(ex.a, ex.b)} more.${ex.a > 9 || ex.b > 9 ? " Or add the tens first, then the ones." : ""}`);
  else if (ex && ex.op === "−") think.push(`Start at ${ex.a} and count back ${ex.b}. Or think: ${ex.b} + what makes ${ex.a}?`);
  else if (ex && ex.kind === "array") think.push(`Think of ${ex.a} groups with ${ex.b} in each group. Skip-count by ${ex.b}, ${ex.a} times.`);
  else if (ex && ex.kind === "share") think.push(`Share ${ex.a} into ${ex.b} equal groups. Or think: ${ex.b} × what = ${ex.a}?`);
  if (q.listen) think.push("Tap 🔊 to hear Pip say it again. Make a picture in your mind.");
  else if (q.vis && !ex) think.push("Look closely at the picture. Point to each part with your finger.");
  let tip = ""; try { tip = src && typeof trickFor === "function" ? trickFor(src) : ""; } catch (e) { }
  if (tip) think.push(`Remember: ${tip}`);
  if (!think.length) think.push("Read the question again slowly. Then look at every answer before you choose.");
  steps.push({ t: "think", html: think.slice(0, 2).join("<br>") });
  /* steps 2–3: cross out wrong answers (always leave at least 2) */
  if (mc && q.opts.length >= 3) {
    const wrong = q.opts.map((o, k) => k).filter(k => q.opts[k] !== q.ans);
    const cuts = shuffle(wrong).slice(0, Math.min(2, q.opts.length - 2));
    for (const k of cuts) {
      let r = ""; try { const w = wrongReason(Object.assign(JSON.parse(JSON.stringify(q)), {}), k, null, src); r = w && w.reason ? String(w.reason) : ""; } catch (e) { }
      /* never let the reason give the answer away */
      const rp = xPlain(r).toLowerCase(), a = ansP.toLowerCase();
      const leaks = /(right|correct) answer|than the answer|the answer is|should be|it'?s really|the real answer/i.test(rp) || a && (/^\d[\d,.]*$/.test(a) ? new RegExp(`(^|[^\\d])${a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^\\d]|$)`).test(rp) : rp.includes(a));
      steps.push({ t: "cut", k, html: `It's <b>not</b> ${q.opts[k]}.${r && !leaks ? ` <span class="h-why">${esc(xStrip(r))}</span>` : ""}` });
    }
  }
  return steps;
}
function showHint() {
  if (!Q || Q.locked) return;
  const q = Q.qs[Q.i], src = srcTopic(q, Q.t);
  if (!Q.helpPlan) Q.helpPlan = v39HelpPlan(q, src);
  const plan = Q.helpPlan;
  /* the clock stops for the rest of this question */
  if (Q.secs && document.getElementById("timer")) { stopTimer(); Q.secs = 0; Q.paused = false; document.body.classList.remove("hurry"); const tb = document.getElementById("timer"); tb.classList.add("paused", "helped"); tb.classList.remove("warn", "mid"); const tn = document.getElementById("tnum"); if (tn) tn.textContent = "⏸"; tb.setAttribute("aria-label", "The clock is stopped while you get help"); }
  if (Q.helpStep >= plan.length) { toast("That's all the help for this one. You can do it! 💪"); return; }
  const st = plan[Q.helpStep++]; Q.hinted = true;
  if (st.t === "cut") {
    Q.out.push(st.k);
    const b = document.querySelector(`.q-right .opt[data-opt="${st.k}"]`);
    if (b) { b.classList.add("out"); b.disabled = true; b.setAttribute("aria-label", "Crossed out: not the answer"); }
  }
  const box = document.getElementById("hint-box");
  if (box) {
    const more = Q.helpStep < plan.length;
    box.innerHTML = `<div class="help-card"><div class="help-top"><b>💡 Help</b><span class="help-dots">${plan.map((_, i) => `<i class="${i < Q.helpStep ? "on" : ""}"></i>`).join("")}</span>${Q.helpStep === 1 && document.getElementById("timer") ? `<small>⏸ The clock is stopped. Take your time!</small>` : ""}</div>
      ${plan.slice(0, Q.helpStep).map((s, i) => `<div class="help-step${i === Q.helpStep - 1 ? " new" : ""}"><span class="help-n">${i + 1}</span><span>${s.html}</span></div>`).join("")}
      ${more ? `<button type="button" class="btn btn-sm help-more" data-act="hint">💡 I need another hint</button>` : `<small class="help-end">You've got this! Look at the answers that are left. 💪</small>`}</div>`;
  }
  const hb = document.querySelector('.q-btns [data-act="hint"]'); if (hb && Q.helpStep >= plan.length) hb.classList.add("used");
  sfx("pop");
  const say = xStrip(st.html.replace(/<span class="h-why">/, " ")).replace(/\s+/g, " ").trim();
  sayLocked(Q.helpStep === 1 ? `Here's some help. ${say}` : say, { mood: "teach" });
}
function startTimer(secs) {
  Q.tSecs = secs; Q.tLeft = secs * 1000; Q.paused = false; Q.lastSec = null;
  runTimer();
}
function runTimer() {
  const secs = Q.tSecs, end = Date.now() + Q.tLeft, tok = Q.token;
  const fg = document.getElementById("tr-fg"), num = document.getElementById("tnum"), box = document.getElementById("timer");
  const step = () => {
    if (!Q || Q.token !== tok) { stopTimer(); return; }
    const left = Math.max(0, end - Date.now()), s = Math.ceil(left / 1000), frac = left / (secs * 1000);
    Q.tLeft = left;
    fg.setAttribute("stroke-dashoffset", String(119.4 * (1 - frac)));
    num.textContent = s;
    box.classList.toggle("mid", frac <= 0.5 && s > 5);
    const warn = s <= 5 && s > 0;
    box.classList.toggle("warn", warn); document.body.classList.toggle("hurry", warn);
    if (s !== Q.lastSec && left > 0) { Q.lastSec = s; if (settings.ticking) sfx(warn ? "tickHard" : "tick"); }
    if (left <= 0) { stopTimer(); answer(null); }
  };
  timerId = setInterval(step, 100); step();
}
/* The quiz clock is frozen and restarted by the Pause button (see pause.js). Paused time doesn't count against the speed bonus. */
function freezeQuizTimer() { if (!Q || Q.locked || Q.reading || !Q.secs || Q.paused || !document.getElementById("timer")) return; stopTimer(); Q.paused = true; Q.pausedAt = Date.now(); document.getElementById("timer")?.classList.add("paused"); }
function thawQuizTimer() { if (!Q || !Q.paused || !document.getElementById("timer")) return; Q.paused = false; Q.started += Date.now() - Q.pausedAt; document.getElementById("timer")?.classList.remove("paused"); if (!Q.locked && Q.secs) runTimer(); }
function togglePause() { if (PAUSED) resumeAll(); else pauseAll(); }
function stopTimer() { if (timerId) { clearInterval(timerId); timerId = null; } document.body.classList.remove("hurry"); }
const YAY = ["Great job!", "You got it!", "Super!", "Awesome!", "Well done!", "Brilliant!", "Yes! That's right!", "Wow, smart!", "Nailed it!", "Fantastic!"];
function answer(k, kres) {
  if (!Q || Q.locked || Q.reading || PAUSED) return;
  if (Q.waiting) { v27Early(k); return; }
  if (k != null && Q.out && Q.out.includes(k)) return;
  if (Q.qs[Q.i].confirm && k != null && !kres && !Q.lockIn) { v28Confirm(k); return; }
  document.getElementById("v28-confirm")?.remove();
  Q.locked = true; Q.lastPick = kres ? null : k; stopTimer();
  if (Q.paused) { Q.paused = false; Q.started += Date.now() - Q.pausedAt; document.getElementById("timer")?.classList.remove("paused"); document.getElementById("pause-note")?.setAttribute("hidden", ""); }
  const q = Q.qs[Q.i], mc = !q.kind || q.kind === "count", btns = mc ? [...document.querySelectorAll(".opt")] : [];
  const ok = kres ? kres.ok : (k != null && q.opts[k] === q.ans), timeUp = k == null && !kres;
  const leftFrac = Q.secs ? 1 - (Date.now() - Q.started) / (Q.secs * 1000) : 0;
  if (mc) btns.forEach((b, j) => { b.disabled = true; if (q.opts[j] === q.ans) b.classList.add("correct"); else if (j === k) b.classList.add("wrong"); else b.classList.add("dim"); });
  else kindReveal(q, ok);
  if (q.listen) { const qt = document.querySelector(".q-card .q-text"); if (qt) qt.innerHTML = q.q; }
  document.getElementById("v27-light")?.classList.add("done");
  if (q.peek) v28Cover(false);
  if (q.wait) { Q.waitQs = (Q.waitQs || 0) + 1; if (!Q.early) { Q.patient = (Q.patient || 0) + 1; Q.patRun = (Q.patRun || 0) + 1; } else Q.patRun = 0; }
  document.querySelectorAll(".tc-item").forEach(b => b.disabled = true);
  const hit = kres ? kres.el : btns[k];
  const pip = document.getElementById("pipm");
  let gained = 0, extras = [];
  if (ok) {
    Q.score++; Q.streak++; Q.best = Math.max(Q.best, Q.streak); gained = 10;
    if (leftFrac > 0.5) { gained += 5; extras.push("⚡ Speedy +5"); }
    if (Q.streak >= 3) { gained += 5; extras.push(`🔥 Streak +5`); }
    if (q.kind && q.kind !== "count") { gained += 5; extras.push("🧠 Bonus +5"); }
    if (Q.hinted) { gained = Math.max(5, gained - 5); extras.push("💡 Hint used"); }
    if (q.wait && !Q.early) { gained += 5; extras.push("🚦 Patient +5"); }
    if (Q.rethink && Q.firstPick != null && Q.firstPick !== k) { gained += 5; extras.push("🔍 Great checking +5"); }
    Q.pts += gained;
    if (Q.streak >= 3 && Q.streak % 3 === 0) { sfx("combo"); confetti(45); } else sfx("correct");
    if (hit) { hit.classList.add("pop"); burstAt(hit); floater(hit, `+${gained}`); }
    pip && pip.classList.add("happy");
    try { v32Correct(hit, Q.pts - gained, Q.pts, Q.streak); } catch (e) { }
    Q.missRun = 0; Q.hitRun++;
  } else {
    Q.streak = 0; sfx(timeUp ? "timeup" : "wrong");
    pip && pip.classList.add("sad");
    try { v32PipSay(pick(["You've got this!", "Let's learn it!", "Keep going!", "Almost!"])); } catch (e) { }
    Q.missRun++; Q.hitRun = 0;
  }
  Q.log.push(ok);
  recordAnswer(q, ok, Q.t);
  let adapt = "";
  if (!ok && Q.missRun >= 3 && !Q.boost && Q.level !== "easy") { Q.boost = true; Q.up = false; adapt = "Let's make the next ones a little easier."; }
  else if (ok && Q.boost && Q.hitRun >= 3) { Q.boost = false; adapt = "You're back on track!"; }
  else if (ok && !Q.boost && !Q.up && Q.level === "normal" && Q.hitRun >= 6) { Q.up = true; adapt = "You're on fire! Here come some challenge questions."; }
  const last = Q.i === Q.qs.length - 1;
  const title = ok ? pick(YAY) : timeUp ? "Time's up!" : "Wrong answer";
  const ansSay = answerSpeech(q);
  /* wrong answer: say what they picked and why it doesn't fit, then the right answer and why */
  let wr = null; if (!ok && !timeUp) try { wr = wrongReason(q, k, kres, srcTopic(q, Q.t) || Q.t); } catch (e) { wr = null; }
  const fb = document.getElementById("fb");
  fb.innerHTML = `<div class="feedback ${ok ? "ok" : "no"}">
    <div class="fb-icon" aria-hidden="true">${ok ? "✔" : timeUp ? "⏰" : "✘"}</div>
    <div class="fb-body"><div class="fb-title">${title}${ok && Q.streak >= 2 ? ` <span class="streak">🔥 ${Q.streak} in a row!</span>` : ""}</div>
      ${ok ? (extras.length ? `<div class="fb-extras">${extras.map(x => `<span>${x}</span>`).join("")}</div>` : "") : `${wr ? `<div class="fb-wrong">You picked <b>${esc(wr.pick.replace(/[.]$/, ""))}</b>. ${esc(wr.reason)}</div>` : ""}<div class="fb-ans">The correct answer is <span class="val">${q.ans}</span></div>`}
      <div class="fb-why">${q.why || ""}</div>${adapt ? `<div class="fb-adapt">${Q.boost ? "🌱" : "🔥"} ${adapt}</div>` : ""}${ok ? "" : `<button class="btn btn-sm btn-ai ai-ready" data-act="ai-why">✨ Why? Ask Pip</button>`}</div>
    <button class="btn btn-go ${settings.autonext ? "auto" : ""}" data-act="nextq" id="nextq" disabled aria-disabled="true" title="Listen to Pip first">${last ? "See my prize! 🎁" : "Next ▶"}</button>
  </div>`;
  if (!ok || reduced) document.getElementById("pts").textContent = "🪙 " + Q.pts;
  const sp = document.getElementById("streak"); sp.textContent = "🔥 " + Q.streak; sp.classList.toggle("hot", Q.streak >= 2); if (ok && Q.streak >= 2) { sp.classList.remove("bump"); void sp.offsetWidth; sp.classList.add("bump"); }
  fb.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "nearest" });
  const said = ((ok ? `${title} ${q.why || ""}` : `${timeUp ? `Time's up! ${attnOn() ? heyKid("Listen carefully and pay attention.") : heyKid("Let's look together.")}` : !attnOn() ? "Oops, you got it wrong." : (kidName() ? `Oops, you got it wrong. ${kidName()}, listen carefully and pay attention.` : "Oops, you got it wrong. So listen carefully and pay attention.")}${wr ? ` You picked ${wr.pick.replace(/[.]$/, "")}. ${wr.reason}` : ""} The correct answer is ${ansSay}. ${q.why || ""}`) + (adapt ? ` ${adapt}` : "")).replace(/([.!?])\s*\./g, "$1");
  announce(ok ? title : `${title}. The correct answer is ${ansSay}`);
  const tok = Q.token;
  /* Next unlocks 1 second after Pip finishes talking (or right away when "Wait for Pip's explanations" is off) */
  lockNav(true);
  if (!waitExplainOn()) pTimeout(() => { if (!Q || Q.token !== tok) return; setNextReady(true); const ag = document.querySelector('#xov [data-xo="again"]'); if (ag) ag.disabled = false; }, 400);
  const advance = also => pTimeout(() => { if (!Q || Q.token !== tok) return; lockNav(false); setNextReady(true); if (typeof also === "function") also(); startPause(tok); }, pace().after);
  let shown = false;
  if (settings.explainOv !== false) {
    try {
      if (!ok) explainWrong({ q, wr, ansSay, adapt, timeUp, picked: kres ? null : (k != null ? q.opts[k] : null) }, advance);
      else explainRight({ q, title, extras, gained, adapt, streak: Q.streak, hit }, advance);
      shown = true; fb.classList.add("under-ov");
    } catch (err) { try { console.error("explainer", err); closeExplainOv(); const u = document.getElementById("nextq-under"); if (u) u.id = "nextq"; } catch (e2) { } }
  }
  if (shown) { }
  else if (window.voiceOn()) speak(said, false, advance, { gate: true });
  else advance();
}
/* The Next button stays grayed out until Pip has finished saying whether the answer was right and why. */
function setNextReady(on) {
  const b = document.getElementById("nextq"); if (!b) return;
  b.disabled = !on; b.setAttribute("aria-disabled", String(!on)); b.title = on ? "" : "Listen to Pip first";
  if (on) b.focus({ preventScroll: true });
}
/* After Pip finishes talking, wait (5 s by default) so kids can look at the answer, then move on.
   Tapping Next (or pressing Enter) skips the wait. */
function startPause(tok) {
  if (!settings.autonext || !Q || Q.token !== tok || !Q.locked) return;
  const btn = document.getElementById("nextq"); if (!btn) return;
  const total = Math.max(1, +settings.pause || 5), label = btn.dataset.label || btn.textContent;
  btn.dataset.label = label; btn.style.setProperty("--pause", total + "s"); btn.classList.add("counting");
  let left = total;
  const paint = () => { btn.innerHTML = `<span class="pbar"></span><span class="plabel">${label} <small>${left}</small></span>`; };
  paint();
  const tick = () => {
    autoId = null;
    if (!Q || Q.token !== tok) return;
    left--; if (left > 0) { paint(); autoId = pTimeout(tick, 1000); return; }
    nextQuestion();
  };
  autoId = pTimeout(tick, 1000);
}
function clearAuto() { if (autoId) { pClear(autoId); autoId = null; } }
function nextQuestion() {
  clearAuto(); closeExplainOv();
  if (!Q) return;
  Q.token++;
  if (Q.i < Q.qs.length - 1) {
    Q.i++;
    if (Q.i % 5 === 0) (Q.t && ["stopthink", "eagleeyes", "listenfollow", "slowsteady"].includes(Q.t.id) ? v28Breathe : brainBreak)(() => { sfx("whoosh"); showQuestion(); window.scrollTo({ top: 0 }); });
    else { sfx("whoosh"); showQuestion(); window.scrollTo({ top: 0 }); }
  } else results();
}
/* v28: breathe with Pip — 3 slow breaths, then carry on */
function v28Breathe(then) {
  hush(); closeOverlay();
  const done = Q.i, o = document.createElement("div"); o.className = "ov v28-breathe"; o.id = "ov";
  o.innerHTML = `<div class="bb-card"><div class="bb-title">${done} done! Let's breathe 🌬️</div><div class="v28-bubble" id="v28-bub"></div><div class="v28-say" id="v28-bsay">Get ready…</div><div class="v28-count" id="v28-bn">Breath 1 of 3</div><button class="btn btn-sun" id="v28-bgo" hidden>I feel calm. Keep going ▶</button></div>`;
  document.body.appendChild(o);
  const bub = o.querySelector("#v28-bub"), sayEl = o.querySelector("#v28-bsay"), nEl = o.querySelector("#v28-bn"), go = o.querySelector("#v28-bgo");
  let finished = false;
  const end = () => { if (finished) return; finished = true; closeOverlay(); then && then(); };
  go.addEventListener("click", e => { e.stopPropagation(); end(); });
  speak(heyKid("let's take 3 slow breaths together. Watch the bubble."), true, null, { mood: "teach" });
  const phase = (i, inhale) => {
    if (!document.body.contains(o)) return;
    if (i > 3) { sayEl.textContent = "Great! A calm body helps your brain think. 🧠"; nEl.textContent = "3 slow breaths ✔"; go.hidden = false; speak(heyKid("great breathing. You're calm and ready."), true, null, { mood: "cheer" }); overlayId = pTimeout(end, 6000); return; }
    nEl.textContent = `Breath ${i} of 3`;
    bub.classList.toggle("in", inhale); sayEl.textContent = inhale ? "Breathe in… 🌬️" : "…and breathe out 😌";
    speak(inhale ? "Breathe in" : "and out", true);
    overlayId = pTimeout(() => phase(inhale ? i : i + 1, !inhale), 3500);
  };
  overlayId = pTimeout(() => phase(1, true), 2600);
}
function brainBreak(then) {
  hush();
  const [txt, e] = pick(BREAKS), done = Q.i, left = Q.qs.length - Q.i;
  sfx("fanfare"); confetti(40);
  overlay(`<div class="bb-card"><div class="bb-emo">${e}</div><div class="bb-title">${done} done! 🎉</div><div class="bb-txt">Wiggle break: ${txt}</div><div class="bb-sub">${left} to go · You have 🪙 ${Q.pts} points</div><button class="btn btn-sun">Keep going! ▶</button></div>`, "bb", 5200, then);
  speak(`Wow, ${done} done! Wiggle break. ${txt}`, true);
}
function awardSticker() {
  const left = STICKERS.filter(s => !stickers.includes(s));
  if (!left.length) return null;
  const s = pick(left); stickers.push(s); saveP(); return s;
}
function results() {
  closeExplainOv();
  const v32Hatch = v32EggLeft() <= 0;
  setTimeout(() => { try { v32ResultsFx(); if (v32Hatch) setTimeout(v32HatchEgg, reduced ? 600 : 2600); } catch (e) { } }, 30);
  if (Q.t.special) { specialResults(); return; }
  const t = Q.t, n = Q.qs.length, pct = Q.score / n, stars = pct >= 0.9 ? 3 : pct >= 0.7 ? 2 : pct >= 0.5 ? 1 : 0;
  recordQuiz(t, Q.score, n);
  const k = pkey(t), before = progress[k] || 0;
  if (stars > before) { progress[k] = stars; }
  const newBestPts = Q.pts > (bestPts[k] || 0); if (newBestPts) { bestPts[k] = Q.pts; }
  saveP();
  const lvAfter = levelOf(totalStars()), leveled = lvAfter > Q.levelBefore;
  const stk = stars >= 1 ? awardSticker() : null;
  const list = topicsOf(t.age, t.subj), idx = list.indexOf(t), nextT = list[(idx + 1) % list.length];
  const msg = stars === 3 ? "Amazing! You really know this!" : stars === 2 ? "Great work! A little more practice and you'll get 3 stars." : stars === 1 ? "Good try! Look at the lesson again, then have another go." : "Let's learn it together again. You can do it!";
  app.innerHTML = `
  <div class="results">
    <div class="pip-talk">${PIP}<div class="bubble">${msg}</div></div>
    <div class="big-stars">${starsHTML(stars)}</div>
    <div class="score-line">You got ${Q.score} out of ${n}!</div>
    <div class="res-stats"><span>🪙 ${Q.pts} points${newBestPts && bestPts[k] ? " · best!" : ""}</span><span>🔥 Best streak ${Q.best}</span>${Q.waitQs ? `<span>${Q.t && Q.t.id === "slowsteady" ? "🐢 Took your time" : "🚦 Waited for green"} ${Q.patient || 0} of ${Q.waitQs} times</span>` : ""}</div>
    <div class="review" aria-label="Your answers">${Q.log.map((ok, i) => `<span class="${ok ? "r-ok" : "r-no"}">${i + 1}</span>`).join("")}</div>
    ${stk ? `<div class="sticker-win"><div class="stk-reveal">${stk}</div><div><b>New sticker!</b><br>It's in your sticker book.</div></div>` : stars >= 1 && stickers.length >= STICKERS.length ? `<div class="tag good">You collected every sticker! 🏆</div>` : `<div class="tag bad">Get 1 star or more to win a sticker!</div>`}
    ${leveled ? `<div class="levelup">LEVEL UP! ${LEVELS[lvAfter][2]} You are now a <b>${LEVELS[lvAfter][1]}</b>!</div>` : ""}
    <div class="btn-row">
      <button class="btn btn-go" data-act="retry">🔁 Play again</button>
      <button class="btn" data-go="age-${t.age}-${t.subj}-${t.id}-learn">📖 Learn it again</button>
      ${nextT !== t ? `<button class="btn btn-sun" data-go="age-${t.age}-${t.subj}-${nextT.id}-learn">Next: ${nextT.title} ▶</button>` : ""}
      ${Q.score < n && P.mistakes.length ? `<button class="btn btn-ai" data-go="review">🔁 Practice my mistakes (${P.mistakes.length})</button>` : ""}
    </div>
    <div class="btn-row">
      <button class="btn btn-sm" data-go="age-${t.age}-${t.subj}">🗂️ Other ${SUBJ[t.subj].short} topics</button>
      ${Object.keys(SUBJ).filter(k => k !== t.subj).map(k => `<button class="btn btn-sm" data-go="age-${t.age}-${k}">${SUBJ[k].icon} Try ${SUBJ[k].short}</button>`).join("")}
      <button class="btn btn-sm" data-go="stickers">🏅 Sticker book</button>
      <button class="btn btn-sm" data-go="">🎒 Change grade</button>
    </div>
  </div>`;
  document.getElementById("stk-count").textContent = stickers.length;
  if (stars >= 2) { sfx("fanfare"); confetti(stars === 3 ? 120 : 70); } else sfx("soft");
  if (stk) setTimeout(() => sfx("sticker"), 900);
  if (leveled) setTimeout(() => { sfx("levelup"); confetti(80); }, 1600);
  speak(`You got ${Q.score} out of ${n}. ${msg}${Q.waitQs ? ` You waited for the green light ${Q.patient || 0} out of ${Q.waitQs} times${(Q.patient || 0) >= Q.waitQs * 0.8 ? ". Wonderful patience!" : ". Let's try to wait for green every time!"}` : ""}${stk ? " And you won a new sticker!" : ""}${leveled ? ` Level up! You are now a ${LEVELS[lvAfter][1]}!` : ""}`);
  Q = null;
}
/* ================= v32: engagement & animation ================= */
const V32_EGG = 15;
const V32_PETS = [["🐣", "Sunny the Chick"], ["🐶", "Biscuit the Puppy"], ["🐱", "Whiskers the Kitten"], ["🐰", "Hops the Bunny"], ["🐼", "Bamboo the Panda"], ["🐨", "Koko the Koala"], ["🐯", "Stripes the Tiger"], ["🦁", "Leo the Lion"], ["🐸", "Ribbit the Frog"], ["🐵", "Bananas the Monkey"], ["🐧", "Waddles the Penguin"], ["🦉", "Hoot the Owl"], ["🐢", "Shelly the Turtle"], ["🐙", "Inky the Octopus"], ["🐻", "Honey the Bear"], ["🐷", "Oinky the Piglet"], ["🐮", "Daisy the Calf"], ["🦄", "Sparkle the Unicorn"], ["🐲", "Puff the Dragon"], ["🐬", "Splash the Dolphin"], ["🦋", "Flutter the Butterfly"], ["🐝", "Buzzy the Bee"], ["🐞", "Dottie the Ladybug"], ["🦊", "Rusty the Fox"]];
function v32EggNow() { return Math.max(0, Math.min(V32_EGG, (P.eggTotal || 0) - (P.pets || []).length * V32_EGG)); }
function v32EggLeft() { return V32_EGG - v32EggNow(); }
function v32PipSay(txt) {
  const b = document.getElementById("pipsay"); if (!b) return;
  b.textContent = txt; b.classList.remove("show"); void b.offsetWidth; b.classList.add("show");
  clearTimeout(b._t); b._t = setTimeout(() => b.classList.remove("show"), 1800);
}
function v32CountUp(el, from, to, fmt, ms = 700) {
  if (!el) return; if (reduced || from === to) { el.textContent = fmt(to); return; }
  const t0 = performance.now();
  const step = now => { const k = Math.min(1, (now - t0) / ms), v = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3))); el.textContent = fmt(v); if (k < 1) requestAnimationFrame(step); else { el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); } };
  requestAnimationFrame(step);
}
function v32Coins(fromEl, toEl, n, done) {
  if (reduced || !fromEl || !toEl) { done && done(); return; }
  const a = fromEl.getBoundingClientRect(), b = toEl.getBoundingClientRect(), box = document.body; /* above the explanation screen */
  let left = n;
  for (let i = 0; i < n; i++) {
    const c = document.createElement("b"); c.className = "v32-coin"; c.textContent = "🪙";
    c.style.left = (a.left + a.width / 2 + (Math.random() * 40 - 20)) + "px"; c.style.top = (a.top + a.height / 2) + "px";
    box.appendChild(c);
    setTimeout(() => { c.style.left = (b.left + b.width / 2) + "px"; c.style.top = (b.top + b.height / 2) + "px"; c.classList.add("go"); }, 30 + i * 90);
    setTimeout(() => { c.remove(); if (--left === 0) { done && done(); sfx("pop"); } }, 760 + i * 90);
  }
}
const V32_COMBO = { 3: ["🔥", "3 in a row!", "You're on fire!"], 5: ["⚡", "5 in a row!", "Super star!"], 7: ["🌟", "7 in a row!", "Amazing!"], 10: ["🚀", "10 in a row!", "Unstoppable!"], 15: ["👑", "15 in a row!", "Champion!"] };
function v32Combo(n) {
  const c = V32_COMBO[n]; if (!c || reduced) return;
  const el = document.createElement("div"); el.className = "v32-combo"; el.setAttribute("aria-hidden", "true");
  el.innerHTML = `<span class="ce">${c[0]}</span><b>${c[1]}</b><small>${c[2]}</small>`;
  document.body.appendChild(el); setTimeout(() => el.remove(), 2000);
}
function v32Correct(hit, from, to, streak) {
  const pts = document.getElementById("pts");
  v32Coins(hit, pts, Math.min(5, 2 + Math.floor((to - from) / 10)), () => v32CountUp(pts, from, to, v => "🪙 " + v));
  if (reduced && pts) pts.textContent = "🪙 " + to;
  v32Combo(streak);
  v32PipSay(pick(streak >= 3 ? ["Woohoo!", "On fire!", "Super!", "Yes!!"] : ["Yay!", "Nice!", "Great!", "You got it!"]));
  /* the pet egg grows with every right answer */
  const before = v32EggNow(); P.eggTotal = (P.eggTotal || 0) + 1; const now = v32EggNow();
  const egg = document.getElementById("egg");
  if (egg) {
    egg.querySelector("b").textContent = now; egg.setAttribute("aria-label", `Pet egg: ${now} of ${V32_EGG}`);
    egg.classList.remove("wig"); void egg.offsetWidth; egg.classList.add("wig");
    if (now >= V32_EGG && before < V32_EGG) { egg.classList.add("ready"); setTimeout(() => toast("🥚 Your egg is ready to hatch! Finish the quiz to see it!"), 1400); }
  }
}
function v32TrackCheer(n) {
  if (!Q || n < 4) return;
  const msg = Q.i === n - 1 ? "🏁 Last one!" : Q.i === Math.floor(n / 2) ? "🚀 Halfway there!" : ""; if (!msg) return;
  const tr = document.querySelector(".quiz-top .track"), rk = document.getElementById("rocket"); if (!tr) return;
  const el = document.createElement("span"); el.className = "v32-cheer"; el.textContent = msg; el.style.left = (rk ? rk.style.left : "50%");
  tr.appendChild(el); setTimeout(() => el.remove(), 2400);
  if (rk) { rk.classList.remove("v32-zoom"); void rk.offsetWidth; rk.classList.add("v32-zoom"); }
}
function v32ResultsFx() {
  const box = document.querySelector(".results .big-stars"); if (!box) return;
  const line = document.querySelector(".results .score-line"), m = line && line.textContent.match(/(\d+) out of (\d+)/);
  if (m) { const got = +m[1], tot = +m[2]; v32CountUp(line, 0, got, v => `You got ${v} out of ${tot}!`, 900); }
  if (reduced) return;
  box.classList.add("v32-pre");
  const gift = document.createElement("div"); gift.className = "v32-gift"; gift.textContent = "🎁"; box.appendChild(gift);
  setTimeout(() => {
    burstAt(gift, 22); gift.remove(); box.classList.remove("v32-pre"); box.classList.add("v32-show");
    box.querySelectorAll(".stars .on").forEach((s, i) => setTimeout(() => sfx("pop"), 250 + i * 330));
  }, 1000);
}
function v32HatchEgg() {
  if (v32EggLeft() > 0 || document.getElementById("v32-hatch")) return;
  const owned = new Set(P.pets || []), free = V32_PETS.filter(x => !owned.has(x[1]));
  const pet = pick(free.length ? free : V32_PETS);
  P.pets = [...(P.pets || []), free.length ? pet[1] : pet[1] + " " + ((P.pets || []).length + 1)]; saveP();
  const o = document.createElement("div"); o.id = "v32-hatch"; o.className = "v32-hatch"; o.setAttribute("role", "dialog"); o.setAttribute("aria-label", "Your egg hatched");
  o.innerHTML = `<div class="v32-hcard"><div class="v32-htitle">Your egg is hatching!</div><div class="v32-egg" aria-hidden="true"><span class="shell">🥚</span><span class="pet">${pet[0]}</span></div><div class="v32-hname"></div><button class="btn btn-go" type="button" id="v32-hok" hidden>Yay! ▶</button></div>`;
  document.body.appendChild(o);
  const egg = o.querySelector(".v32-egg"), nm = o.querySelector(".v32-hname"), ok = o.querySelector("#v32-hok");
  const close = () => { o.classList.add("bye"); setTimeout(() => o.remove(), 300); };
  ok.addEventListener("click", close);
  sfx("whoosh");
  setTimeout(() => { egg.classList.add("shake"); }, 200);
  setTimeout(() => { egg.classList.add("open"); burstAt(egg, 26); confetti(60); sfx("levelup"); nm.innerHTML = `Meet <b>${esc(pet[1])}</b>!<br><small>Your new pet is in your sticker book.</small>`; ok.hidden = false; ok.focus(); speak(`Your egg hatched! ${heyKid(`meet ${pet[1]}!`)}`, true); }, reduced ? 300 : 2100);
}
function v32PetsHTML() {
  const pets = P.pets || [], have = pets.map(n => V32_PETS.find(x => n.startsWith(x[1])) || ["🐾", n]);
  return `<h2 class="v32-pets-h">🐾 My pets</h2>
  <div class="v32-eggbar"><span class="egg-ico">🥚</span><span class="v32-eggtrack"><i style="width:${Math.round(v32EggNow() / V32_EGG * 100)}%"></i></span><b>${v32EggNow()}/${V32_EGG}</b><small>right answers until your next egg hatches</small></div>
  ${have.length ? `<div class="v32-petgrid">${have.map((x, i) => `<div class="v32-pet" style="animation-delay:${i * 60}ms"><span class="pe">${x[0]}</span><span class="pn">${esc(pets[i])}</span></div>`).join("")}</div>` : `<p class="slide-txt">No pets yet. Every ${V32_EGG} right answers hatch a new pet!</p>`}`;
}
/* Pip moves his beak while he talks */
setInterval(() => { try { document.body.classList.toggle("talking", !!(hasSpeech && speechSynthesis.speaking && !PAUSED)); } catch (e) { } }, 250);
function stopAll() { closeExplainOv(); NAR_TOK++; lockNav(false); cancelPause(); D = null; KS = null; if (typeof stopReadAlong === "function") stopReadAlong(); if (aiChat && aiChat.ctl) aiChat.ctl.abort(); aiChat = null; if (aiWhyCtl) aiWhyCtl.abort(); stopTimer(); clearAuto(); closeOverlay(); hush(); if (Q) { Q.token++; Q = null; } }

/* ---------- settings ---------- */
const $ = id => document.getElementById(id);
function openSettings() {
  $("set-timer").value = String(settings.timer); $("set-count").value = String(settings.count);
  $("set-sound").checked = settings.sound; $("set-voice").checked = settings.voice; $("set-autonext").checked = settings.autonext; $("set-ticking").checked = settings.ticking;
  $("set-pace").value = settings.pace || "relaxed"; $("set-readopts").checked = settings.readOpts !== false; $("set-explainov").checked = settings.explainOv !== false;
  $("set-attn").checked = settings.attnPrompts !== false; $("set-waitread").checked = settings.waitRead !== false; $("set-waitexplain").checked = settings.waitExplain !== false;
  $("set-rate").value = String(settings.rate); $("set-pause").value = String(settings.pause); $("set-ai").checked = settings.ai; syncAIStatus(); fillVoiceList(); $("reset-ask").hidden = true;
  const cp = curProfile(); $("set-kidname").value = cp.name || ""; nsPaint(); $("child-h").innerHTML = `${cp.avatar} For ${esc(profileName(cp))}`; $("child-prefs").innerHTML = childPrefsHTML(cp.id);
  $("settings").hidden = false; $("set-timer").focus();
}
function closeSettings() { $("settings").hidden = true; }
["set-timer", "set-count", "set-sound", "set-voice", "set-autonext", "set-rate", "set-ticking", "set-pause", "set-voicename", "set-ai", "set-pace", "set-readopts", "set-explainov", "set-attn", "set-waitread", "set-waitexplain"].forEach(id => $(id).addEventListener("change", () => {
  settings.attnPrompts = $("set-attn").checked; settings.waitRead = $("set-waitread").checked; settings.waitExplain = $("set-waitexplain").checked;
  settings.pace = $("set-pace").value; settings.readOpts = $("set-readopts").checked; settings.explainOv = $("set-explainov").checked;
  settings.timer = $("set-timer").value === "auto" ? "auto" : +$("set-timer").value;
  settings.count = +$("set-count").value; settings.sound = $("set-sound").checked; settings.voice = $("set-voice").checked;
  settings.autonext = $("set-autonext").checked; settings.rate = +$("set-rate").value; settings.ticking = $("set-ticking").checked; settings.pause = +$("set-pause").value; settings.voiceName = $("set-voicename").value; pickVoice(); if (settings.ai !== $("set-ai").checked) { settings.ai = $("set-ai").checked; initAI(); if (!settings.ai) closeAIChat(); }
  if (!settings.voice) hush();
  saveSettings(); syncTop();
  if (id === "set-sound" && settings.sound) sfx("pop");
  if (id === "set-ticking" && settings.ticking) testTicks();
  if (id === "set-rate" || id === "set-voicename") speak("Hi there! I'm Pip. Let's learn something fun together!", true);
}));
function syncTop() {
  const b = $("mute-btn"); b.textContent = settings.muted ? "🔇" : "🔊"; b.setAttribute("aria-label", settings.muted ? "Turn sound on" : "Turn sound off");
  const r = rateInfo(), sb = $("speed-btn"); sb.textContent = r[2]; sb.setAttribute("aria-label", `Voice speed: ${r[1]}. Tap to change.`); sb.title = `Voice speed: ${r[1]}`;
}

function testTicks() { if (settings.muted || !settings.sound) { toast("Turn on sound effects to hear the ticks"); return; } [0, 1, 2].forEach(i => setTimeout(() => SFX.tick(), i * 1000)); [3, 4].forEach(i => setTimeout(() => SFX.tickHard(), i * 1000)); }

/* ---------- events ---------- */
document.addEventListener("click", e => {
  const sayOpt = e.target.closest("[data-sayopt],[data-sayexopt]");
  if (sayOpt) {
    const q = sayOpt.dataset.sayopt != null ? (Q && Q.qs[Q.i]) : (D && D.ex), k = +(sayOpt.dataset.sayopt ?? sayOpt.dataset.sayexopt);
    if (q && q.opts[k] != null) { actx(); speak(optSpeech(q.opts[k]), true); sayOpt.classList.remove("boing"); void sayOpt.offsetWidth; sayOpt.classList.add("boing"); }
    return;
  }
  const kEl = e.target.closest("[data-kp],[data-ord],[data-sort],[data-multi],[data-sayitem],[data-tc-item],[data-pin],[data-av],[data-who]");
  if (kEl) {
    if (kEl.disabled) return;
    const d = kEl.dataset; actx();
    if (d.kp != null) kpPress(d.kp);
    else if (d.ord != null) ordPick(+d.ord);
    else if (d.sort != null) { const [i, j] = d.sort.split(":").map(Number); sortPick(i, j); }
    else if (d.multi != null) multiToggle(+d.multi);
    else if (d.sayitem != null) { const q = Q && Q.qs[Q.i]; if (q) { speak(kindSpeakItem(q, +d.sayitem), true); kEl.classList.remove("boing"); void kEl.offsetWidth; kEl.classList.add("boing"); } }
    else if (d.tcItem != null) { if (Q && !Q.locked) tapCountItem(kEl); }
    else featureTap(kEl);
    return;
  }
  const askEl = e.target.closest("[data-ai-ask]");
  if (askEl) { if (!askEl.disabled) askPip(askEl.dataset.aiAsk); return; }
  const dBtn = e.target.closest(".dopt");
  if (dBtn) { if (!dBtn.disabled) deepAnswer(+dBtn.dataset.dopt); return; }
  const optBtn = e.target.closest(".opt");
  if (optBtn && !optBtn.disabled) { answer(+optBtn.dataset.opt); return; }
  const sayEl = e.target.closest("[data-say]");
  if (sayEl) { speak(sayEl.dataset.say, true); sfx("pop"); sayEl.classList.remove("boing"); void sayEl.offsetWidth; sayEl.classList.add("boing"); return; }
  const goEl = e.target.closest("[data-go]");
  if (goEl) { e.preventDefault(); actx(); go(goEl.dataset.go); return; }
  const act = e.target.closest("[data-act]"); if (!act) return;
  const a = act.dataset.act; actx();
  if (a === "next") { if (slideIdx < route.topic.lesson.length - 1) { sfx("page"); showSlide(slideIdx + 1); } else { sfx("levelup"); toast("Lesson complete! 🎉"); go(`age-${route.age}-${route.subj}-${route.topic.id}-quiz`); } }
  else if (a === "prev") { sfx("page"); showSlide(slideIdx - 1); }
  else if (a === "pause") togglePause();
  else if (a === "resume") resumeAll();
  else if (a === "ai-open") openAIChat();
  else if (a === "ai-close") closeAIChat();
  else if (a === "ai-stop") { if (aiChat && aiChat.ctl) aiChat.ctl.abort(); hush(); }
  else if (a === "ai-why") aiWhy();
  else if (a === "ai-retry") { initAI().then(() => openAIChat()); }
  else if (a === "deep-open") { actx(); openDeep(1); }
  else if (a === "deep-more" && D) { D.level = Math.min(5, D.level + 1); D.ex = newExample(); D.step = 0; renderDeep(); }
  else if (a === "deep-back" && D) { D.level = Math.max(1, D.level - 1); D.ex = newExample(); D.step = 0; renderDeep(); }
  else if (a === "deep-new" && D) { D.ex = newExample(); D.step = 0; renderDeep(); }
  else if (a === "deep-step" && D) { if (D.step >= 3) { D.step = 0; renderDeep(); } else { D.step++; runStep(); } }
  else if (a === "deep-close") { closeDeep(); document.getElementById("slide").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); }
  else if (a === "read") sayLocked(route.topic.lesson[slideIdx].say, { mood: "teach" });
  else if (a === "sayq" && Q) { const q = Q.qs[Q.i]; speak(q.say || q.q, true, null, { mood: "ask" }); }
  else if (a === "nextq") { if (!act.disabled) nextQuestion(); }
  else if (a === "retry") render(curHash);
  else if (a === "surprise") { const list = topicsOf(route.age, route.subj), t = pick(list); sfx("whoosh"); toast(`🎲 ${t.title}!`); go(`age-${route.age}-${route.subj}-${t.id}-quiz`); }
  else if (a === "stk") { sfx("sticker"); act.classList.remove("boing"); void act.offsetWidth; act.classList.add("boing"); burstAt(act, 10); }
  else if (a === "speed") { const i = RATES.findIndex(r => r[0] === settings.rate); settings.rate = RATES[(i + 1) % RATES.length][0]; saveSettings(); syncTop(); const r = rateInfo(); toast(`Voice speed: ${r[1]} ${r[2]}`); speak(`${r[1]}. This is how fast I talk.`, true); }
  else if (a === "tick-test") testTicks();
  else if (a === "voice-test") speak("Hi there! I'm Pip. Let's learn something fun together!", true);
  else if (a === "open-settings") guardParent(openSettings, "Settings");
  else if (a === "k-check") kindCheck();
  else if (a === "ord-undo") ordUndo();
  else if (a === "hint") showHint();
  else if (featureAct(a, act, e)) { }
  else if (a === "close-settings") closeSettings();
  else if (a === "mute") { settings.muted = !settings.muted; saveSettings(); syncTop(); if (settings.muted) hush(); else sfx("pop"); }
  else if (a === "reset-ask") $("reset-ask").hidden = false;
  else if (a === "reset-no") $("reset-ask").hidden = true;
  else if (a === "reset-yes") { P.progress = {}; P.stickers = []; P.bestpts = {}; P.mistakes = []; P.mU = Date.now(); bindP(); saveP(); $("reset-ask").hidden = true; closeSettings(); toast("Stars and stickers cleared"); render(curHash); }
});
$("settings").addEventListener("click", e => { if (e.target.id === "settings") closeSettings(); });
document.addEventListener("keydown", e => {
  if (PAUSED) { if (/^(p|P| |Enter|Escape)$/.test(e.key)) { e.preventDefault(); resumeAll(); } return; }
  if ((e.key === "p" || e.key === "P") && !(e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) && $("settings").hidden && !document.getElementById("pinpad")) { e.preventDefault(); pauseAll(); return; }
  if (e.key === "Escape" && !$("settings").hidden) { closeSettings(); return; }
  if (e.key === "Escape" && document.getElementById("pinpad")) { closePin(); return; }
  if (document.getElementById("pinpad")) { if (/^[0-9]$/.test(e.key)) pinKey(e.key); else if (e.key === "Backspace") pinKey("⌫"); return; }
  if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
  if (!$("settings").hidden || e.altKey || e.ctrlKey || e.metaKey) return;
  if (document.getElementById("ov") && (e.key === "Enter" || e.key === " ")) { document.getElementById("ov").click(); e.preventDefault(); return; }
  if (Q && !Q.locked && e.key === " " && document.activeElement === document.body) { e.preventDefault(); pauseAll(); return; }
  if (Q && !Q.locked && KS && KS.kind === "type" && /^([0-9.]|Backspace|Enter)$/.test(e.key)) { e.preventDefault(); kpPress(e.key === "Enter" ? "ok" : e.key); return; }
  if (typeof XO !== "undefined" && XO && XO.turnOpen && /^[1-4]$/.test(e.key)) { const b = document.querySelectorAll("#xov .xo-topt")[+e.key - 1]; if (b && !b.disabled) b.click(); return; }
  if (Q && !Q.locked && /^[1-4]$/.test(e.key)) { const q = Q.qs[Q.i], k = +e.key - 1; if (!q.kind || q.kind === "count") { if (k < q.opts.length) answer(k); } else if (q.kind === "multi" && k < q.opts.length) multiToggle(k); }
  else if (Q && Q.locked && e.key === "Enter" && document.activeElement.id !== "nextq") { const nb = document.getElementById("nextq"); if (nb && !nb.disabled) nextQuestion(); }
  else if (route.topic && route.mode === "learn" && e.key === "ArrowRight") document.getElementById("next-btn").click();
  else if (route.topic && route.mode === "learn" && e.key === "ArrowLeft" && slideIdx > 0 && !document.getElementById("prev-btn").disabled) showSlide(slideIdx - 1);
});


