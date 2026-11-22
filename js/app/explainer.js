/* =====================================================================
   Wrong-answer explainer: an overlay that walks through the mistake.
   1) the child's pick shakes and is crossed out while Pip says why it doesn't fit,
   2) the right answer pops in,
   3) a short animation made from the question itself shows why it's right.
   Next waits until Pip has finished. Pause freezes it like everything else.
   ===================================================================== */
let XO = null;
const XO_OBJ = ["🍎", "⭐", "🎈", "🐟", "🍪", "🌸", "🐞", "🧁", "⚽", "🍓"];
const xoNum = s => +String(s).replace(/[,\s]/g, "");
const xoWait = ms => new Promise(r => pTimeout(r, reduced ? Math.min(ms, 150) : ms));
function closeExplainOv() {
  const o = document.getElementById("xov"); if (!o) return;
  if (XO) XO.tok++;
  o.remove(); document.body.classList.remove("xov-open"); XO = null;
}

/* ---------- which picture to draw for a question ---------- */
function xoKind(q, t) {
  const subj = t ? t.subj : "", id = t ? t.id : "", txt = xPlain(q.say || q.q), ans = xPlain(q.ans);
  if (q.kind && q.kind !== "count") return "plain";
  if (q.v27) return q.v27.xo || "reveal";
  if (q.v40) return q.v40.xo || "reveal";
  if (subj === "manners") return XO_STAMP.test(ans) ? "stamp" : /best thing to do|best choice|what should|best way/i.test(txt) ? "manners" : /which one is/i.test(txt) ? "whichone" : "reveal";
  const vt = xPlain(q.vis || "");
  if (/class="passage(?!\s+scene)/.test(q.vis || "") && vt.length > 140) return "passage";
  if (/^\d{1,2}\/\d{1,2}$/.test(ans) && +ans.split("/")[1] <= 12 && +ans.split("/")[1] > 0) return "pie";
  if (/^\d{1,2}:\d{2}$/.test(ans)) return "clock";
  if (/^odd|oddone|oddword/.test(id) || /does ?n[o']t belong|odd one out/i.test(txt)) return "oddout";
  if (subj === "math" && /^[<>=]$/.test(ans) && xoFracs(txt).length === 2) return "fraccmp";
  if (q.v24 && q.v24.t === "cg") return "coordwalk";
  if (q.v24 && q.v24.t === "lg" && (q.v24.ask === "read" || q.v24.ask === "diff")) return "lgguide";
  if (subj === "math" && xoWhySteps(q).length >= 2) return "steps";
  if (subj === "math" || subj === "logic") {
    const e = xoExpr(q); if (e && !(/left over|remainder/i.test(txt) && e.kind === "share")) return e.kind;
    if (subj === "logic") { const lk = xoLogicKind(q, t, txt, ans); if (lk) return lk; }
    if ((/[<>=]/.test(ans) && ans.length <= 2 || /compare|symbols/.test(id)) && !xoFracs(txt).length) { const ns = (txt.match(/\d[\d,]*/g) || []).map(xoNum); if (ns.length >= 2) return "compare"; }
  }
  if (subj === "math") {
    const ansN = xoNum(ans);
    if (/^\d{1,2} o'?clock$/i.test(ans) || /^half past \d{1,2}$/i.test(ans)) return "clock";
    if (/^(even|odd)$/i.test(ans) && (txt.match(/\d+/g) || []).some(n => +n <= 30)) return "evenodd";
    if (/round/i.test(txt) && isFinite(ansN) && /nearest/i.test(txt)) return "roundline";
    if (/(\d+)\/(\d+) of (\d+)/.test(txt) && isFinite(ansN)) return "fracof";
    if (/tens?\b|ones\b|hundreds?\b/i.test(txt + " " + (q.why || "")) && isFinite(ansN) && ansN >= 10 && ansN < 1000 && /^\d+$/.test(ans.replace(/,/g, "")) && !/how many (tens|ones|hundreds)|tens digit|ones digit|hundreds digit|which digit|value of the/i.test(txt)) return "blocks";
    if (xoCountVis(q) != null) return "countvis";
    if (xoCountList(q)) return "countlist";
    if (/biggest|smallest|greatest|least|largest|most|fewest|greater|longer|shorter|taller|heavier/i.test(txt) && q.opts.length >= 2 && q.opts.every(o => /^\$?\d[\d,.]*[¢%]?$/.test(xPlain(o)))) return "rank";
    if (XO_SIDES[ans.toLowerCase()] != null) return "sides";
    if (/compare|more|less|greater|fewer/i.test(txt) && (txt.match(/\d[\d,]*/g) || []).length === 2 && (txt.match(/\d[\d,]*/g) || []).map(xoNum).includes(ansN)) return "compare";
  }
  if (subj === "english" && /rhyme/.test(id)) return "rhyme";
  if (subj === "english" && /opposite|synonym|antonym/.test(id) && /<b>[^<]+<\/b>/.test(q.q || "")) return "pairword";
  if (subj === "english" && /'/.test(ans) && /contraction/.test(id + txt)) return "contract";
  if (subj === "english" && xoBuild(q)) return "build";
  if (/class="blank"|_{3,}/.test(q.q || "") && subj !== "math") return "fill";
  if (xoHasQ(q.vis) && !(subj === "math" && (/left over|remainder/i.test(txt) || !/missing|hiding|hidden|goes in|comes next|what number|which number|fill/i.test(txt)))) return "visfill";
  const phon = /sounds|vowels|sight|endsound|digraphs|blends|vteams|magice|bossyr|silent|wordfam|syllables|wordgroups|ing|plurals|irregplural|homophones/.test(id);
  if (subj === "english" && phon && /^[a-z]{2,12}$/i.test(ans) && !xoClueText(q)) return "spell";
  if (xoWhySteps(q).length) return "steps";
  if (xoClueText(q)) return "clues";
  if (subj === "english" && phon && /^[a-z]{2,12}$/i.test(ans)) return "spell";
  return "reveal";
}
/* an arithmetic fact in the question that gives exactly the right answer */
function xoExpr(q) {
  return xoExprIn(q, xPlain(q.say || q.q) + " " + xPlain(q.vis || "")) || xoExprIn(q, xPlain(q.why || ""));
}
function xoExprIn(q, txt) {
  const ans = xoNum(xPlain(q.ans));
  if (!isFinite(ans) || /[^\d,]/.test(xPlain(q.ans))) return null;
  const re = /(\d[\d,]*)\s*(\+|plus|-|−|minus|take away|×|x|times|÷|divided by)\s*(\d[\d,]*)/gi; let m;
  while ((m = re.exec(txt))) {
    const a = xoNum(m[1]), b = xoNum(m[3]), op = m[2].toLowerCase();
    if (/\+|plus/.test(op) && a + b === ans) return { kind: a <= 10 && b <= 10 ? "objadd" : "column", op: "+", a, b, r: ans };
    if (/-|−|minus|take/.test(op) && a - b === ans) return { kind: a <= 12 ? "objsub" : "column", op: "−", a, b, r: ans };
    if (/×|x|times/.test(op) && a * b === ans && a <= 12 && b <= 12) return { kind: "array", a, b, r: ans };
    if (/÷|divided/.test(op) && b && a / b === ans && a <= 60) return { kind: "share", a, b, r: ans };
  }
  /* missing number: 5 + ? = 9 */
  const mm = txt.match(/(\d+)\s*\+\s*(?:\?|_+|blank)\s*=\s*(\d+)/i);
  if (mm && xoNum(mm[2]) - xoNum(mm[1]) === ans && ans <= 20) return { kind: "counton", a: xoNum(mm[1]), b: ans, r: xoNum(mm[2]) };
  return null;
}
const xoHasQ = vis => !!vis && />\s*\?\s*</.test(vis);

/* ---------- the animations ---------- */
const XO_DEMO = {
  async plain(box, q) {
    box.innerHTML = `${q.vis ? `<div class="xo-vis">${q.vis}</div>` : ""}<div class="xo-big pop-in">${q.ans}</div>`;
    await xoWait(600);
  },
  async objadd(box, q, e) {
    const o = pick(XO_OBJ), grp = (n, c) => `<div class="xo-grp ${c}">${Array.from({ length: n }, (_, i) => `<span class="xo-o" style="--d:${i * 90}ms">${o}</span>`).join("")}</div>`;
    box.innerHTML = `<div class="xo-add">${grp(e.a, "ga")}<b class="xo-op">+</b>${grp(e.b, "gb")}</div><div class="xo-count" aria-live="off"></div>`;
    await xoWait(900); box.querySelector(".xo-add").classList.add("joined");
    await xoWait(500);
    const all = [...box.querySelectorAll(".xo-o")], c = box.querySelector(".xo-count");
    for (let i = 0; i < all.length; i++) { all[i].classList.add("counted"); c.textContent = i + 1; await xoWait(300); }
    c.innerHTML = `${e.a} + ${e.b} = <b>${e.r}</b>`; c.classList.add("pop-in");
  },
  async objsub(box, q, e) {
    const o = pick(XO_OBJ);
    box.innerHTML = `<div class="xo-grp xo-subg">${Array.from({ length: e.a }, () => `<span class="xo-o">${o}</span>`).join("")}</div><div class="xo-count"></div>`;
    const all = [...box.querySelectorAll(".xo-o")], c = box.querySelector(".xo-count");
    await xoWait(800);
    for (let i = 0; i < e.b; i++) { all[e.a - 1 - i].classList.add("gone"); c.textContent = `take away ${i + 1}`; await xoWait(380); }
    await xoWait(300);
    for (let i = 0; i < e.r; i++) { all[i].classList.add("counted"); c.textContent = i + 1; await xoWait(280); }
    c.innerHTML = `${e.a} − ${e.b} = <b>${e.r}</b>`; c.classList.add("pop-in");
  },
  async counton(box, q, e) {
    const o = pick(XO_OBJ);
    box.innerHTML = `<div class="xo-grp">${Array.from({ length: e.r }, (_, i) => `<span class="xo-o ${i < e.a ? "have" : "ghost"}">${o}</span>`).join("")}</div><div class="xo-count">Start at ${e.a}…</div>`;
    const all = [...box.querySelectorAll(".xo-o.ghost")], c = box.querySelector(".xo-count");
    await xoWait(900);
    for (let i = 0; i < all.length; i++) { all[i].classList.remove("ghost"); all[i].classList.add("counted"); c.textContent = `${e.a + i + 1} (that's ${i + 1} more)`; await xoWait(420); }
    c.innerHTML = `${e.a} + <b>${e.b}</b> = ${e.r}`; c.classList.add("pop-in");
  },
  async column(box, q, e) {
    const A = String(e.a), B = String(e.b), Rr = String(e.r), w = Math.max(A.length, B.length, Rr.length);
    const cells = s => s.padStart(w, " ").split("").map(d => `<span class="xo-d">${d.trim()}</span>`).join("");
    box.innerHTML = `<div class="xo-col" style="--w:${w + 1}"><span class="xo-d"></span>${cells(A)}<span class="xo-d op">${e.op}</span>${cells(B)}<span class="xo-line"></span><span class="xo-d"></span>${Rr.padStart(w, " ").split("").map(d => `<span class="xo-d res">${d.trim()}</span>`).join("")}</div><div class="xo-count">${e.op === "+" ? "Add" : "Subtract"} the ones first, then the tens${w > 2 ? ", then the hundreds" : ""}.</div>`;
    const grid = [...box.querySelectorAll(".xo-col .xo-d")], cols = w + 1, res = [...box.querySelectorAll(".xo-d.res")];
    await xoWait(900);
    for (let j = w - 1; j >= 0; j--) {
      grid.forEach((g, i) => g.classList.toggle("hot", i % cols === j + 1));
      await xoWait(650); res[j].classList.add("show"); await xoWait(350);
    }
    grid.forEach(g => g.classList.remove("hot"));
    box.querySelector(".xo-count").innerHTML = `${e.a.toLocaleString("en-US")} ${e.op} ${e.b.toLocaleString("en-US")} = <b>${e.r.toLocaleString("en-US")}</b>`;
  },
  async array(box, q, e) {
    box.innerHTML = `<div class="xo-arr" style="--c:${e.b}">${Array.from({ length: e.a * e.b }, () => `<span class="xo-dot"></span>`).join("")}</div><div class="xo-count">${e.a} rows of ${e.b}</div>`;
    const dots = [...box.querySelectorAll(".xo-dot")], c = box.querySelector(".xo-count"), run = [];
    await xoWait(700);
    for (let r = 0; r < e.a; r++) { for (let k = 0; k < e.b; k++) dots[r * e.b + k].classList.add("on"); run.push((r + 1) * e.b); c.textContent = run.join(", "); await xoWait(e.a > 8 ? 380 : 520); }
    c.innerHTML = `${e.a} × ${e.b} = <b>${e.r}</b>`; c.classList.add("pop-in");
  },
  async share(box, q, e) {
    box.innerHTML = `<div class="xo-pile">${Array.from({ length: e.a }, () => `<span class="xo-dot on"></span>`).join("")}</div><div class="xo-bins">${Array.from({ length: e.b }, () => `<div class="xo-bin"></div>`).join("")}</div><div class="xo-count">Share ${e.a} into ${e.b} equal groups</div>`;
    const pile = [...box.querySelectorAll(".xo-pile .xo-dot")], bins = [...box.querySelectorAll(".xo-bin")];
    await xoWait(800);
    const step = e.a > 30 ? 90 : 170;
    for (let i = 0; i < e.a; i++) { const d = pile[e.a - 1 - i]; bins[i % e.b].appendChild(d); await xoWait(step); }
    bins.forEach(b => b.classList.add("done"));
    box.querySelector(".xo-count").innerHTML = `${e.a} ÷ ${e.b} = <b>${e.r}</b> in each group`;
  },
  async pie(box, q) {
    const [n, d] = xPlain(q.ans).split("/").map(Number), R = 70, C = 80;
    const slice = i => { const a0 = (i / d) * 2 * Math.PI - Math.PI / 2, a1 = ((i + 1) / d) * 2 * Math.PI - Math.PI / 2; return d === 1 ? `<circle cx="${C}" cy="${C}" r="${R}" class="xo-sl"/>` : `<path class="xo-sl" d="M${C},${C} L${C + R * Math.cos(a0)},${C + R * Math.sin(a0)} A${R},${R} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${C + R * Math.cos(a1)},${C + R * Math.sin(a1)} Z"/>`; };
    box.innerHTML = `<svg class="xo-pie" viewBox="0 0 160 160" width="170" height="170" role="img" aria-label="${n} out of ${d} equal parts shaded">${Array.from({ length: d }, (_, i) => slice(i)).join("")}</svg><div class="xo-count">${d} equal parts</div>`;
    const sl = [...box.querySelectorAll(".xo-sl")], c = box.querySelector(".xo-count");
    await xoWait(900);
    for (let i = 0; i < Math.min(n, d * 2); i++) { if (sl[i % d]) sl[i % d].classList.add("on"); c.textContent = `${i + 1} of ${d} parts`; await xoWait(450); }
    c.innerHTML = `<b>${n}/${d}</b>: ${n} part${n === 1 ? "" : "s"} out of ${d} equal parts`; c.classList.add("pop-in");
  },
  async clock(box, q) {
    const at = xPlain(q.ans), oc = at.match(/^(\d{1,2}) o'?clock$/i), hp = at.match(/^half past (\d{1,2})$/i);
    const [h, m] = oc ? [+oc[1], 0] : hp ? [+hp[1], 30] : at.split(":").map(Number), hd = ((h % 12) + m / 60) * 30, md = m * 6;
    box.innerHTML = `<svg class="xo-clock" viewBox="0 0 160 160" width="180" height="180" role="img" aria-label="clock showing ${xPlain(q.ans)}"><circle cx="80" cy="80" r="74" fill="#fff" stroke="#1D2B4F" stroke-width="5"/>${Array.from({ length: 12 }, (_, i) => { const a = (i + 1) * 30 * Math.PI / 180; return `<text x="${80 + 58 * Math.sin(a)}" y="${86 - 58 * Math.cos(a)}" text-anchor="middle" font-size="15" font-weight="700" fill="#1D2B4F">${i + 1}</text>`; }).join("")}<line class="xo-hh" x1="80" y1="80" x2="80" y2="44" stroke="#1D2B4F" stroke-width="7" stroke-linecap="round" style="transform-origin:80px 80px"/><line class="xo-mh" x1="80" y1="80" x2="80" y2="26" stroke="#F26B3A" stroke-width="5" stroke-linecap="round" style="transform-origin:80px 80px"/><circle cx="80" cy="80" r="5" fill="#1D2B4F"/></svg><div class="xo-count">The short hand shows the hour. The long hand shows the minutes.</div>`;
    await xoWait(700);
    box.querySelector(".xo-hh").style.transform = `rotate(${hd}deg)`; box.querySelector(".xo-mh").style.transform = `rotate(${md + (m === 0 ? 360 : 0)}deg)`;
    await xoWait(2600);
    box.querySelector(".xo-count").innerHTML = `It's <b>${xPlain(q.ans)}</b>`;
  },
  async compare(box, q) {
    const ns = (xPlain(q.say || q.q).match(/\d[\d,]*/g) || []).map(xoNum).slice(0, 2), mx = Math.max(...ns, 1);
    box.innerHTML = `<div class="xo-bars">${ns.map(n => `<div class="xo-bar"><i style="--h:${Math.max(6, n / mx * 100)}%"></i><b>${n.toLocaleString("en-US")}</b></div>`).join(`<div class="xo-sym">${/^[<>=]$/.test(xPlain(q.ans)) ? esc(xPlain(q.ans)) : "vs"}</div>`)}</div>`;
    await xoWait(600); box.querySelectorAll(".xo-bar").forEach(b => b.classList.add("grow"));
    await xoWait(1500);
    const bars = [...box.querySelectorAll(".xo-bar")], an = xoNum(xPlain(q.ans)), ai = ns.indexOf(an);
    if (ai >= 0) bars[ai].classList.add("win"); else if (ns[0] !== ns[1]) bars[ns[0] > ns[1] ? 0 : 1].classList.add("win");
    box.querySelector(".xo-sym")?.classList.add("pop-in");
  },
  async oddout(box, q) {
    box.innerHTML = `<div class="xo-odd">${q.opts.map(o => `<div class="xo-card ${o === q.ans ? "odd" : "same"}">${o}</div>`).join("")}</div><div class="xo-count"></div>`;
    await xoWait(900); box.querySelector(".xo-odd").classList.add("split");
    box.querySelector(".xo-count").textContent = "These go together, and this one is different!";
  },
  async rhyme(box, q) {
    const a = xPlain(q.ans).toLowerCase(), m = String(q.q).match(/<b>([^<]+)<\/b>/) || String(q.say || "").match(/“([^”]+)”/), w = m ? xPlain(m[1]).toLowerCase() : "";
    if (!w || w === a) return XO_DEMO.spell(box, q);
    let k = 0; while (k < Math.min(a.length, w.length) && a[a.length - 1 - k] === w[w.length - 1 - k]) k++;
    const show = s => `<span class="xo-w">${s.slice(0, s.length - k)}<span class="end">${s.slice(s.length - k)}</span></span>`;
    box.innerHTML = `<div class="xo-rhyme">${show(w)}<span class="xo-op">🎵</span>${show(a)}</div><div class="xo-count"></div>`;
    await xoWait(900); box.querySelectorAll(".end").forEach(e => e.classList.add("glow"));
    box.querySelector(".xo-count").innerHTML = k >= 2 ? `Both end with <b>-${a.slice(a.length - k)}</b>` : "They sound the same at the end";
  },
  async fill(box, q) {
    const html = String(q.q).replace(/<span class="blank">[^<]*<\/span>|_{3,}/, `<span class="xo-slot">&nbsp;</span>`);
    box.innerHTML = `<div class="xo-sent">${html}</div><div class="xo-chip">${q.ans}</div>`;
    await xoWait(900);
    const slot = box.querySelector(".xo-slot"), chip = box.querySelector(".xo-chip");
    if (slot) { chip.classList.add("drop"); await xoWait(600); slot.innerHTML = q.ans; slot.classList.add("filled"); chip.remove(); }
  },
  async visfill(box, q) {
    box.innerHTML = `<div class="xo-vis big">${q.vis}</div>`;
    await xoWait(800);
    const leaves = [...box.querySelectorAll(".xo-vis *")].filter(el => !el.children.length && el.textContent.trim() === "?");
    if (!leaves.length) return XO_DEMO.plain(box, q);
    leaves.forEach(el => { el.innerHTML = q.ans; el.classList.add("xo-filled"); });
    const svgT = leaves.find(el => el.tagName.toLowerCase() === "text"); if (svgT) svgT.textContent = xPlain(q.ans) || xStrip(q.ans);
  },
  async spell(box, q) {
    const w = xPlain(q.ans);
    box.innerHTML = `<div class="xo-spell">${w.split("").map(ch => `<span>${ch}</span>`).join("")}</div>`;
    await xoWait(700);
    for (const s of box.querySelectorAll(".xo-spell span")) { s.classList.add("lit"); await xoWait(380); }
  },
  async passage(box, q) {
    const p = (q.vis || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(), sents = p.match(/[^.!?]+[.!?]+["”’]?/g) || [p];
    const quoted = (String(q.why || "").match(/[“"]([^”"]{12,})[”"]/) || [])[1];
    const words = s => new Set(s.toLowerCase().match(/[a-z']+/g) || []);
    const target = quoted ? quoted.toLowerCase().replace(/[.!?]$/, "") : null, wq = words(q.why || "");
    let best = -1, bs = 0;
    sents.forEach((s, i) => { let sc = 0; if (target && s.toLowerCase().includes(target.slice(0, 40))) sc = 1000; else words(s).forEach(w => { if (w.length > 3 && wq.has(w)) sc++; }); if (sc > bs) { bs = sc; best = i; } });
    box.innerHTML = `<div class="xo-pass">${sents.map((s, i) => `<span class="${i === best ? "proof" : ""}">${esc(s.trim())}</span>`).join(" ")}</div>${best >= 0 ? `<div class="xo-count">The story tells us here 👆</div>` : ""}`;
    await xoWait(900);
    const pr = box.querySelector(".proof"); if (pr) { pr.classList.add("lit"); pr.scrollIntoView({ block: "nearest", behavior: reduced ? "auto" : "smooth" }); }
  },
  async manners(box, q) {
    box.innerHTML = `${q.vis ? `<div class="xo-vis">${q.vis}</div>` : ""}<div class="xo-man"><div class="xo-card best">👍 ${q.ans}</div></div>`;
    await xoWait(700); box.querySelector(".xo-man .best").classList.add("pop-in", "glow");
  },
};


const XO_SIDES = { triangle: 3, square: 4, rectangle: 4, rhombus: 4, trapezoid: 4, pentagon: 5, hexagon: 6, octagon: 8, circle: 0, oval: 0 };
const XO_STOP = new Set("that this with from they them their there were when what which have about into your will would could should because then than just like also only some been very more most other each where while does doesn't isn't".split(" "));
/* how many of one picture are in the question's picture, when that is the answer */
function xoCountVis(q) {
  const n = xoNum(xPlain(q.ans)); if (!isFinite(n) || n < 2 || n > 40 || !q.vis || /<svg/.test(q.vis)) return null;
  const em = (xStrip(q.vis).match(/\p{Extended_Pictographic}/gu) || []), c = {};
  em.forEach(x => c[x] = (c[x] || 0) + 1);
  const hit = Object.keys(c).find(x => c[x] === n); return hit || null;
}
/* the sum written in the why, e.g. "3 × 4 = 12" or "20 + 5 = 25" */
function xoWhySteps(q) {
  const w = xPlain(q.why || "");
  return (w.match(/\$?\d[\d,.]*[°¢%]?\s*(?:[+\-−×x÷]\s*\$?\d[\d,.]*[°¢%]?\s*)+=\s*\$?\d[\d,.]*[°¢%]?/g) || []).slice(0, 3);
}
/* a counting list in the why that ends at the answer: "5, 10, 15, 20" */
function xoCountList(q) {
  const a = xoNum(xPlain(q.ans).replace(/[¢$°]/g, "")); if (!isFinite(a)) return null;
  const m = xPlain(q.why || "").match(/(\$?\d[\d,.]*¢?(?:,\s*\$?\d[\d,.]*¢?){2,})/); if (!m) return null;
  const list = m[1].split(/,\s*/); return xoNum(list[list.length - 1].replace(/[¢$]/g, "")) === a ? list : null;
}
/* a short sentence or passage the answer comes from, with clue words from the why */
function xoClueText(q) {
  let src = xPlain(q.vis || "");
  if (src.length < 25) { const qq = xPlain(q.q || ""); src = (qq.match(/[“"]([^”"]{20,})[”"]/) || [])[1] || (qq.length > 40 ? qq : ""); }
  if (!src || src.length > 420) return null;
  const why = new Set((xPlain(q.why || "") + " " + xPlain(q.ans)).toLowerCase().match(/[a-z']{4,}/g) || []);
  const hits = (src.toLowerCase().match(/[a-z']{4,}/g) || []).filter(w => why.has(w) && !XO_STOP.has(w));
  return hits.length ? { src, hits: new Set(hits) } : null;
}
/* a word built from a base word in the question plus a prefix or suffix */
function xoBuild(q) {
  const a = xPlain(q.ans).toLowerCase(); if (!/^[a-z]{4,16}$/.test(a)) return null;
  const words = (xPlain(q.say || q.q) + " " + xPlain(q.vis || "")).toLowerCase().match(/[a-z]{3,}/g) || [];
  for (const w of words.sort((x, y) => y.length - x.length)) {
    if (w === a || w.length < 3) continue;
    if (a.startsWith(w) && a.length - w.length <= 5) return { base: w, pre: "", suf: a.slice(w.length) };
    if (a.endsWith(w) && a.length - w.length <= 5) return { base: w, pre: a.slice(0, a.length - w.length), suf: "" };
  }
  return null;
}
Object.assign(XO_DEMO, {
  async steps(box, q) {
    const eqs = xoWhySteps(q).map(e => e.replace(/[.,]+$/, ""));
    box.innerHTML = `${q.vis && !/class="passage/.test(q.vis) ? `<div class="xo-vis">${q.vis}</div>` : ""}<div class="xo-steps">${eqs.map(e => `<div class="xo-eq">${e.split(/\s+/).map(tk => `<span>${esc(tk)}</span>`).join(" ")}</div>`).join("")}</div>`;
    await xoWait(700);
    for (const eq of box.querySelectorAll(".xo-eq")) { eq.classList.add("show"); for (const tk of eq.querySelectorAll("span")) { tk.classList.add("on"); await xoWait(tk.textContent === "=" ? 600 : 330); } eq.lastElementChild.classList.add("res"); await xoWait(500); }
  },
  async countvis(box, q) {
    const e = xoCountVis(q), n = xoNum(xPlain(q.ans));
    const wrap = node => { if (node.nodeType === 3) { if (!node.nodeValue.includes(e)) return; const f = document.createDocumentFragment(); node.nodeValue.split(e).forEach((part, i, arr) => { if (part) f.appendChild(document.createTextNode(part)); if (i < arr.length - 1) { const sp = document.createElement("span"); sp.className = "xo-cnt"; sp.textContent = e; f.appendChild(sp); } }); node.replaceWith(f); } else [...node.childNodes].forEach(wrap); };
    box.innerHTML = `<div class="xo-vis big">${q.vis}</div><div class="xo-count"></div>`; wrap(box.querySelector(".xo-vis"));
    const items = [...box.querySelectorAll(".xo-cnt")], c = box.querySelector(".xo-count");
    await xoWait(700);
    for (let i = 0; i < items.length; i++) { items[i].classList.add("on"); items[i].dataset.n = i + 1; c.textContent = i + 1; await xoWait(n > 20 ? 200 : 330); }
    c.innerHTML = `<b>${n}</b> in all`; c.classList.add("pop-in");
  },
  async blocks(box, q) {
    const n = xoNum(xPlain(q.ans)), h = Math.floor(n / 100), t = Math.floor(n % 100 / 10), o = n % 10;
    const sq = `<span class="xo-hund">${Array.from({ length: 100 }, () => "<i></i>").join("")}</span>`, rod = `<span class="xo-rod">${Array.from({ length: 10 }, () => "<i></i>").join("")}</span>`, cube = `<span class="xo-cube"></span>`;
    box.innerHTML = `<div class="xo-blocks">${h ? `<div class="xo-bgrp" data-l="${h} hundred${h > 1 ? "s" : ""}">${sq.repeat(h)}</div>` : ""}${t ? `<div class="xo-bgrp" data-l="${t} ten${t > 1 ? "s" : ""}">${rod.repeat(t)}</div>` : ""}${o ? `<div class="xo-bgrp" data-l="${o} one${o > 1 ? "s" : ""}">${cube.repeat(o)}</div>` : ""}</div><div class="xo-count"></div>`;
    const c = box.querySelector(".xo-count"); let run = 0;
    await xoWait(600);
    for (const g of box.querySelectorAll(".xo-bgrp")) { for (const b of g.children) { b.classList.add("on"); run += b.classList.contains("xo-hund") ? 100 : b.classList.contains("xo-rod") ? 10 : 1; c.textContent = run.toLocaleString("en-US"); await xoWait(260); } g.classList.add("lab"); await xoWait(400); }
    c.innerHTML = `${[h && `${h} hundred${h > 1 ? "s" : ""}`, t && `${t} ten${t > 1 ? "s" : ""}`, o && `${o} one${o > 1 ? "s" : ""}`].filter(Boolean).join(" + ")} = <b>${n.toLocaleString("en-US")}</b>`;
  },
  async evenodd(box, q) {
    const n = +(xPlain(q.say || q.q).match(/\d+/g) || []).find(x => +x <= 30);
    box.innerHTML = `<div class="xo-pairs">${Array.from({ length: Math.ceil(n / 2) }, (_, i) => `<span class="xo-pr">${"<i></i>".repeat(i * 2 + 1 < n ? 2 : 1)}</span>`).join("")}</div><div class="xo-count">Make pairs of two…</div>`;
    await xoWait(600);
    for (const pr of box.querySelectorAll(".xo-pr")) { pr.classList.add("on"); if (pr.children.length === 1) pr.classList.add("lonely"); await xoWait(320); }
    box.querySelector(".xo-count").innerHTML = n % 2 ? `One is left over, so ${n} is <b>odd</b>` : `Every one has a partner, so ${n} is <b>even</b>`;
  },
  async roundline(box, q) {
    const txt = xPlain(q.say || q.q), x = xoNum((txt.match(/\d[\d,]*/) || [""])[0]), a = xoNum(xPlain(q.ans));
    const unit = /hundred thousand/i.test(txt) ? 1e5 : /ten thousand/i.test(txt) ? 1e4 : /thousand/i.test(txt) ? 1000 : /hundred/i.test(txt) ? 100 : 10;
    const lo = Math.floor(x / unit) * unit, hi = lo + unit; if (!isFinite(x) || (a !== lo && a !== hi)) return XO_DEMO.plain(box, q);
    const pos = v => 8 + (v - lo) / unit * 84, f = v => v.toLocaleString("en-US");
    box.innerHTML = `<div class="xo-nl"><div class="xo-nlbar"></div><span class="xo-tk" style="left:${pos(lo)}%"><b>${f(lo)}</b></span><span class="xo-tk mid" style="left:${pos(lo + unit / 2)}%"><b>${f(lo + unit / 2)}</b></span><span class="xo-tk" style="left:${pos(hi)}%"><b>${f(hi)}</b></span><span class="xo-pt" style="left:${pos(x)}%"><em>${f(x)}</em></span></div><div class="xo-count">Which ${f(unit).replace(/^1,?0*$/, "")}${unit === 10 ? "ten" : unit === 100 ? "hundred" : unit === 1000 ? "thousand" : unit === 1e4 ? "ten thousand" : "hundred thousand"} is it closer to?</div>`;
    await xoWait(1200);
    const pt = box.querySelector(".xo-pt"); pt.style.left = pos(a) + "%"; pt.classList.add("moved");
    await xoWait(1200);
    box.querySelector(".xo-count").innerHTML = `${f(x)} is closer to <b>${f(a)}</b>`;
  },
  async fracof(box, q) {
    const m = xPlain(q.say || q.q).match(/(\d+)\/(\d+) of (\d+)/), n = +m[1], d = +m[2], whole = +m[3];
    if (whole % d || whole > 60) return XO_DEMO.plain(box, q);
    await XO_DEMO.share(box, q, { a: whole, b: d, r: whole / d });
    const bins = [...box.querySelectorAll(".xo-bin")]; bins.forEach((b, i) => b.classList.toggle("pick", i < n));
    box.querySelector(".xo-count").innerHTML = `${n} of the ${d} equal groups = <b>${xPlain(q.ans)}</b>`;
  },
  async sides(box, q) {
    const nm = xPlain(q.ans).toLowerCase(), k = XO_SIDES[nm];
    if (!k) { box.innerHTML = `<svg viewBox="0 0 160 160" width="160" height="160"><${nm === "oval" ? 'ellipse cx="80" cy="80" rx="70" ry="48"' : 'circle cx="80" cy="80" r="66"'} fill="#FFE48A" stroke="#1D2B4F" stroke-width="5" class="xo-draw"/></svg><div class="xo-count">A ${nm} is round. It has <b>no</b> straight sides.</div>`; return xoWait(1500); }
    const w = nm === "rectangle" ? 1.5 : 1, pts = Array.from({ length: k }, (_, i) => { const a = -Math.PI / 2 + (k === 4 ? Math.PI / 4 : 0) + i * 2 * Math.PI / k; return [80 + 64 * Math.cos(a) * w, 80 + 64 * Math.sin(a)]; });
    const vb = nm === "rectangle" ? "-20 0 200 160" : "0 0 160 160";
    box.innerHTML = `<svg viewBox="${vb}" width="220" height="170">${pts.map((p, i) => { const r = pts[(i + 1) % k]; return `<line class="xo-side" x1="${p[0]}" y1="${p[1]}" x2="${r[0]}" y2="${r[1]}"/><text class="xo-sn" x="${(p[0] + r[0]) / 2 + ((p[0] + r[0]) / 2 - 80) * .28}" y="${(p[1] + r[1]) / 2 + ((p[1] + r[1]) / 2 - 80) * .28 + 6}" text-anchor="middle">${i + 1}</text>`; }).join("")}</svg><div class="xo-count"></div>`;
    await xoWait(600);
    const ls = [...box.querySelectorAll(".xo-side")], ns = [...box.querySelectorAll(".xo-sn")], c = box.querySelector(".xo-count");
    for (let i = 0; i < k; i++) { ls[i].classList.add("on"); ns[i].classList.add("on"); c.textContent = `${i + 1} side${i ? "s" : ""}`; await xoWait(500); }
    c.innerHTML = `${k} sides make a <b>${nm}</b>`;
  },
  async contract(box, q) {
    const a = xPlain(q.ans), m = xPlain(q.say || q.q).match(/\b([a-z]+) (not|is|are|will|have|has|had|would|am|us)\b/i);
    if (!m) return XO_DEMO.spell(box, q);
    box.innerHTML = `<div class="xo-con"><span class="w1">${esc(m[1])}</span> <span class="w2">${esc(m[2])}</span></div><div class="xo-count"></div>`;
    await xoWait(900); box.querySelector(".xo-con").classList.add("squeeze");
    await xoWait(900); box.querySelector(".xo-con").innerHTML = `<span class="w1 pop-in">${esc(a).replace("'", `<b class="apo">'</b>`)}</span>`;
    box.querySelector(".xo-count").innerHTML = `The <b class="apo">'</b> takes the place of the missing letter${a.length < m[1].length + m[2].length - 1 ? "s" : ""}`;
  },
  async build(box, q) {
    const b = xoBuild(q);
    box.innerHTML = `<div class="xo-build">${b.pre ? `<span class="xo-aff pre">${b.pre}</span>` : ""}<span class="xo-base">${b.base}</span>${b.suf ? `<span class="xo-aff suf">${b.suf}</span>` : ""}</div><div class="xo-count"></div>`;
    await xoWait(900); box.querySelector(".xo-build").classList.add("join");
    await xoWait(800); box.querySelector(".xo-count").innerHTML = `${b.pre ? `${b.pre}- + ` : ""}${b.base}${b.suf ? ` + -${b.suf}` : ""} = <b>${xPlain(q.ans)}</b>`;
  },
  async clues(box, q) {
    const { src, hits } = xoClueText(q);
    box.innerHTML = `<div class="xo-pass">${src.split(/(\s+)/).map(w => { const k = w.toLowerCase().replace(/[^a-z']/g, ""); return hits.has(k) ? `<span class="clue">${esc(w)}</span>` : esc(w); }).join("")}</div><div class="xo-count">Look for the clue words 🔎</div>`;
    await xoWait(800);
    for (const c of box.querySelectorAll(".clue")) { c.classList.add("lit"); await xoWait(450); }
  },
});


Object.assign(XO_DEMO, {
  async countlist(box, q) {
    const list = xoCountList(q);
    box.innerHTML = `${q.vis ? `<div class="xo-vis">${q.vis}</div>` : ""}<div class="xo-train">${list.map((v, i) => `<span style="--i:${i}">${esc(v)}</span>`).join("")}</div>`;
    await xoWait(700);
    const cars = [...box.querySelectorAll(".xo-train span")], coins = [...box.querySelectorAll(".xo-vis .coin, .xo-vis figure")];
    for (let i = 0; i < cars.length; i++) { cars[i].classList.add("on"); if (coins[i]) coins[i].classList.add("xo-hl"); await xoWait(480); }
    cars[cars.length - 1].classList.add("res");
  },
  async rank(box, q) {
    const vals = q.opts.map(o => xoNum(xPlain(o).replace(/[$¢%]/g, ""))), mx = Math.max(...vals, 0.0001);
    box.innerHTML = `<div class="xo-bars">${q.opts.map((o, i) => `<div class="xo-bar ${o === q.ans ? "ans" : ""}"><i style="--h:${Math.max(4, vals[i] / mx * 100)}%"></i><b>${o}</b></div>`).join("")}</div>`;
    await xoWait(600); box.querySelectorAll(".xo-bar").forEach(b => b.classList.add("grow"));
    await xoWait(1500); box.querySelector(".xo-bar.ans")?.classList.add("win");
  },
});


/* fractions written in the question: "2/3" or "2 over 3" */
function xoFracs(txt) { return [...String(txt).matchAll(/\b(\d{1,2})\s*(?:\/|over)\s*(\d{1,2})\b/g)].map(m => [+m[1], +m[2]]).filter(f => f[1] > 0 && f[1] <= 12 && f[0] <= f[1] * 2); }
function xoPieSvg(n, d, cls) {
  const R = 60, C = 66, sl = i => { const a0 = (i / d) * 2 * Math.PI - Math.PI / 2, a1 = ((i + 1) / d) * 2 * Math.PI - Math.PI / 2; return d === 1 ? `<circle cx="${C}" cy="${C}" r="${R}" class="xo-sl"/>` : `<path class="xo-sl" d="M${C},${C} L${C + R * Math.cos(a0)},${C + R * Math.sin(a0)} A${R},${R} 0 0 1 ${C + R * Math.cos(a1)},${C + R * Math.sin(a1)} Z"/>`; };
  return `<svg class="xo-pie ${cls || ""}" viewBox="0 0 132 132" width="132" height="132" data-n="${n}">${Array.from({ length: d }, (_, i) => sl(i)).join("")}</svg>`;
}
XO_DEMO.fraccmp = async function (box, q) {
  const [[a, b], [c, d]] = xoFracs(xPlain(q.say || q.q) + " " + xPlain(q.vis || ""));
  box.innerHTML = `<div class="xo-fc"><div>${xoPieSvg(a, b)}<b>${a}/${b}</b></div><div class="xo-sym">?</div><div>${xoPieSvg(c, d)}<b>${c}/${d}</b></div></div><div class="xo-count"></div>`;
  await xoWait(700);
  const pies = [...box.querySelectorAll(".xo-pie")];
  for (const pie of pies) { const n = +pie.dataset.n, sl = [...pie.querySelectorAll(".xo-sl")]; for (let i = 0; i < Math.min(n, sl.length); i++) { sl[i].classList.add("on"); await xoWait(300); } }
  const sym = box.querySelector(".xo-sym"); sym.textContent = xPlain(q.ans); sym.classList.add("pop-in");
  const v1 = a / b, v2 = c / d;
  box.querySelector(".xo-count").innerHTML = v1 === v2 ? "They cover the same amount" : `${v1 > v2 ? `${a}/${b}` : `${c}/${d}`} covers <b>more</b> of the circle`;
};


/* reveal the "why" a few words at a time while Pip says it */
function xoTypeWhy(el, txt) {
  const words = String(txt || "").split(/(\s+)/); el.innerHTML = words.map(w => /\s/.test(w) ? w : `<span class="xw">${esc(w)}</span>`).join("");
  const spans = [...el.querySelectorAll(".xw")], per = Math.max(140, Math.min(380, 330 / Math.max(0.6, settings.rate)));
  spans.forEach((sp, i) => pTimeout(() => sp.classList.add("on"), reduced ? 0 : i * per));
}
/* right answers: a quick celebration card with the reason */
function explainRight(o, done) {
  const { q, extras, gained, adapt, streak } = o, last = Q.i === Q.qs.length - 1, nm = kidName();
  const title = !nm ? o.title : /,/.test(o.title) ? `${o.title} Great job, ${nm}!` : `${o.title.replace(/[!.]+$/, "")}, ${nm}!`;
  const under = document.getElementById("nextq"); if (under) under.id = "nextq-under";
  const ov = document.createElement("div"); ov.id = "xov"; ov.className = "xov ok"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-label", title);
  ov.innerHTML = `<div class="xo-card-main">
    <div class="xo-cheer"><div class="xo-star">⭐</div><div class="xo-title">${esc(title)}</div>${streak >= 2 ? `<div class="xo-streak">🔥 ${streak} in a row!</div>` : ""}</div>
    <div class="xo-right ok-ans"><small>Your answer</small><div class="xo-val">${q.ans}</div></div>
    ${extras && extras.length ? `<div class="xo-extras">${extras.map((x, i) => `<span style="--i:${i}">${esc(x)}</span>`).join("")}</div>` : ""}
    <div class="xo-pts">+${gained} <span>🪙</span></div>
    <p class="xo-why"></p>
    ${adapt ? `<p class="xo-adapt">${esc(adapt)}</p>` : ""}
    <div class="xo-btns"><button class="btn btn-sm" data-xo="look">👀 See the question</button><button class="btn btn-go" data-act="nextq" id="nextq" disabled aria-disabled="true">${last ? "See my prize! 🎁" : "Next ▶"}</button></div>
  </div>`;
  document.body.appendChild(ov); document.body.classList.add("xov-open");
  ov.addEventListener("click", ev => { const b = ev.target.closest("[data-xo]"); if (!b || PAUSED) return; const m = ov.classList.toggle("min"); b.textContent = m ? "🦉 Back to Pip" : "👀 See the question"; });
  XO = { tok: 1 };
  pTimeout(() => { const st = ov.querySelector(".xo-star"); if (st) burstAt(st, 18); }, 250);
  const why = ov.querySelector(".xo-why"); xoTypeWhy(why, xStrip(q.why || "").replace(/\s+/g, " ").trim());
  lockNav(true);
  const said = `${title} ${q.why || ""}${adapt ? ` ${adapt}` : ""}`.replace(/([.!?])\s*\./g, "$1");
  narrate(said, { force: !!window.voiceOn(), mood: "cheer", after: 0 }, () => { if (XO && document.getElementById("xov") === ov) done(); });
}


/* ===== round 2: logic and manners pictures ===== */
const XO_STAMP = /^(true|false|yes|no|we can.t tell|can.t tell|yes, always|no, never|maybe|polite|rude|kind|unkind|safe|unsafe|good choice|not a good choice|a good choice|okay|not okay|ok to share|okay to share|keep it private|tell a grown.up|call 911|don.t call 911|fact|opinion|healthy|not healthy|surprise|secret|helpful|not helpful|respectful|disrespectful|fair|not fair|honest|not honest)\b/i;
const xoEmo = h => (xStrip(h).match(/\p{Extended_Pictographic}(?:️|‍\p{Extended_Pictographic})*/gu) || []);
function xoLogicKind(q, t, txt, ans) {
  const id = t ? t.id : "", why = xPlain(q.why || ""), ae = xoEmo(q.ans), ve = xoEmo(q.vis || "");
  if (XO_STAMP.test(ans)) return "stamp";
  if ((why.match(/\b[A-Z]\s*(?:=|→)\s*[A-Z0-9]+/g) || []).length >= 2) return "decode";
  if (/venn/.test(id) || /^(only in|in both|in neither|both circles|neither)/i.test(ans)) return "venn";
  if (/^the order is:/i.test(why)) return "order";
  if (/most likely|least likely|how many more|which color/i.test(txt) && new Set(ve).size >= 2) return "tally";
  if (/^spot \d+$/i.test(ans) && /lr-cell/.test(q.vis || "")) return "findvis";
  if (ae.length === 1 && ve.includes(ae[0]) && /left|right|above|below|top|bottom|shelf|spot|next to|between|square/i.test(txt)) return "findvis";
  if (/^they /i.test(ans) && ve.length >= 2) return "common";
  if (ae.length === 1 && ve.length >= 1 && !ve.includes(ae[0]) && /group|goes with|go together|belongs|belong/i.test(txt)) return "join";
  if (/riddle|detective|numriddles|shapeclues|numdetective/.test(id) || /who am i|what am i|which (number|shape) (is it|am i)|secret number/i.test(txt)) return "clues2";
  return null;
}
Object.assign(XO_DEMO, {
  /* the answer hides in a wobbling gift box, then pops out */
  async reveal(box, q) {
    box.innerHTML = `${q.vis && !/class="passage/.test(q.vis) ? `<div class="xo-vis">${q.vis}</div>` : ""}<div class="xo-mys"><div class="xo-gift">🎁</div><div class="xo-big xo-inside">${q.ans}</div></div>`;
    await xoWait(600); const g = box.querySelector(".xo-gift"); g.classList.add("wob");
    await xoWait(1500); g.classList.add("open"); sfx("pop"); box.querySelector(".xo-inside").classList.add("show"); burstAt(box.querySelector(".xo-inside"), 16);
  },
  /* a rubber stamp: TRUE / FALSE / POLITE / SAFE … */
  async stamp(box, q) {
    const a = xPlain(q.ans), good = /^(true|yes|polite|kind|safe|good choice|a good choice|okay|ok to share|okay to share|fact|healthy|surprise|helpful|respectful|fair|honest|tell a grown|call 911)/i.test(a) && !/^not /i.test(a);
    const neutral = /can.t tell|maybe|opinion|keep it private/i.test(a);
    const src = xPlain(q.vis || "") || ((xPlain(q.q || "").match(/[“"]([^”"]+)[”"]/) || [])[1] || xPlain(q.say || q.q));
    box.innerHTML = `<div class="xo-paper"><p>${esc(src.slice(0, 260))}</p><div class="xo-stamp ${neutral ? "mid" : good ? "good" : "bad"}">${neutral ? "🤔" : good ? "✔" : "✘"} ${esc(a)}</div></div>`;
    await xoWait(1000); box.querySelector(".xo-stamp").classList.add("down"); sfx("pop");
  },
  /* letter by letter: L → 12, O → 15 … */
  async decode(box, q) {
    const pairs = [...xPlain(q.why || "").matchAll(/\b([A-Z])\s*(?:=|→)\s*([A-Z0-9]+)/g)].map(m => [m[1], m[2]]);
    box.innerHTML = `<div class="xo-dec">${pairs.map(([a, b]) => `<div class="xo-flip"><span class="f">${a}</span><span class="b">${b}</span></div>`).join("")}</div><div class="xo-count"></div>`;
    await xoWait(700);
    for (const f of box.querySelectorAll(".xo-flip")) { f.classList.add("on"); sfx("pop"); await xoWait(600); }
    box.querySelector(".xo-count").innerHTML = `So the answer is <b>${q.ans}</b>`;
  },
  /* two circles and the picture flies into the right part */
  async venn(box, q) {
    const why = xPlain(q.why || ""), labels = [...why.matchAll(/["“]([^"”]+)["”]/g)].map(m => m[1]), a = xPlain(q.ans).toLowerCase();
    if (labels.length < 2) return XO_DEMO.reveal(box, q);
    const L = labels[0], Rr = labels.find(x => x !== L) || labels[1];
    const inL = a.includes("both") || (a.startsWith("only in") && a.includes(L.toLowerCase())), inR = a.includes("both") || (a.startsWith("only in") && a.includes(Rr.toLowerCase()));
    const x = inL && inR ? 50 : inL ? 31 : inR ? 69 : 92, y = inL || inR ? 52 : 86;
    const item = xoEmo(q.vis || "")[0] || (xPlain(q.vis || "").match(/\d+/) || ["⭐"])[0];
    box.innerHTML = `<div class="xo-venn"><div class="c l"><span>${esc(L)}</span></div><div class="c r"><span>${esc(Rr)}</span></div><div class="xo-vitem">${esc(item)}</div></div><div class="xo-count"></div>`;
    await xoWait(900); const it = box.querySelector(".xo-vitem"); it.style.left = x + "%"; it.style.top = y + "%"; it.classList.add("in");
    await xoWait(1300); burstAt(it, 10);
    box.querySelector(".xo-count").innerHTML = inL && inR ? "It fits <b>both</b> circles, so it goes in the middle" : inL || inR ? `It fits <b>${esc(inL ? L : Rr)}</b> only` : "It fits <b>neither</b> circle, so it goes outside";
  },
  /* steps in order with numbers */
  async order(box, q) {
    const steps = xPlain(q.why || "").replace(/^the order is:\s*/i, "").replace(/\.$/, "").split(/,\s*(?:and\s+)?then\s+|\s+then\s+|,\s*/i).map(x => x.trim()).filter(Boolean).slice(0, 6);
    const a = xPlain(q.ans).toLowerCase();
    box.innerHTML = `<div class="xo-steps2">${steps.map((st, i) => `<div class="xo-st ${st.toLowerCase() === a ? "ans" : ""}"><b>${i + 1}</b><span>${esc(st)}</span></div>`).join("")}</div>`;
    await xoWait(600);
    for (const st of box.querySelectorAll(".xo-st")) { st.classList.add("on"); await xoWait(650); }
    box.querySelector(".xo-st.ans")?.classList.add("glow");
  },
  /* count each picture in the bag and compare */
  async tally(box, q) {
    const em = xoEmo(q.vis || ""), c = {}; em.forEach(x => c[x] = (c[x] || 0) + 1);
    const keys = Object.keys(c).sort((a, b) => c[b] - c[a]), mx = Math.max(...Object.values(c)), ae = xoEmo(q.ans)[0];
    box.innerHTML = `<div class="xo-vis">${q.vis}</div><div class="xo-tally">${keys.map(k => `<div class="xo-trow ${k === ae ? "ans" : ""}"><span class="e">${k}</span><i style="--w:${c[k] / mx * 100}%"></i><b>${c[k]}</b></div>`).join("")}</div>`;
    await xoWait(700); box.querySelectorAll(".xo-trow").forEach((r, i) => pTimeout(() => r.classList.add("on"), i * 350));
    await xoWait(keys.length * 350 + 900); box.querySelector(".xo-trow.ans")?.classList.add("glow");
  },
  /* find the answer in the picture and point to it */
  async findvis(box, q) {
    box.innerHTML = `<div class="xo-vis big">${q.vis}</div>`;
    const vis = box.querySelector(".xo-vis"), a = xPlain(q.ans);
    let target = null;
    const spot = a.match(/^spot (\d+)$/i); if (spot) target = vis.querySelectorAll(".lr-cell")[+spot[1] - 1];
    if (!target) { const ae = xoEmo(q.ans)[0]; target = [...vis.querySelectorAll("*")].filter(el => el.children.length === 0 && el.textContent.includes(ae)).pop(); }
    if (!target) return XO_DEMO.reveal(box, q);
    await xoWait(700);
    const cells = vis.querySelectorAll(".lr-cell");
    if (spot && cells.length) { for (let i = 0; i < +spot[1]; i++) { cells[i].classList.add("xo-countc"); cells[i].dataset.n = i + 1; await xoWait(420); } }
    target.classList.add("xo-target"); sfx("pop");
  },
  /* the things share something: a badge drops under each */
  async common(box, q) {
    const items = xoEmo(q.vis || ""), lab = xPlain(q.ans).replace(/^they /i, "");
    box.innerHTML = `<div class="xo-common">${items.map(e => `<div class="xo-ci"><span class="e">${e}</span><span class="badge">${esc(lab)}</span></div>`).join("")}</div>`;
    await xoWait(700);
    for (const ci of box.querySelectorAll(".xo-ci")) { ci.classList.add("on"); sfx("pop"); await xoWait(550); }
  },
  /* the answer flies over to join its group or partner */
  async join(box, q) {
    const ae = xoEmo(q.ans)[0];
    box.innerHTML = `<div class="xo-join"><div class="xo-vis">${q.vis}</div><span class="xo-fly">${ae}</span></div><div class="xo-count"></div>`;
    await xoWait(800); box.querySelector(".xo-fly").classList.add("go");
    await xoWait(1100); burstAt(box.querySelector(".xo-fly"), 12);
    box.querySelector(".xo-count").textContent = /group|belong/i.test(xPlain(q.say || q.q)) ? "It belongs with them! 🧺" : "They go together! 🔗";
  },
  /* each clue gets a tick for the answer */
  async clues2(box, q) {
    let clues = xPlain((q.vis || "").replace(/<br\s*\/?>/gi, "\n").replace(/<\/?(div|p|li)[^>]*>/gi, "\n")).length > 8 ? (q.vis || "").replace(/<br\s*\/?>/gi, "\n").replace(/<\/?(div|p|li)[^>]*>/gi, "\n").split("\n").map(xPlain).filter(x => x.length > 3) : [];
    if (clues.length < 2) clues = (xPlain(q.say || q.q).match(/[^.!?]+[.!?]/g) || []).map(x => x.trim()).filter(x => !/\?$/.test(x));
    if (!clues.length) return XO_DEMO.reveal(box, q);
    box.innerHTML = `<div class="xo-clue2">${clues.slice(0, 5).map(c => `<div class="xo-cl"><span class="tick">✔</span>${esc(c.replace(/^\d+\.\s*|^🔎\s*/, ""))}</div>`).join("")}</div><div class="xo-mys small"><div class="xo-gift">❓</div><div class="xo-big xo-inside">${q.ans}</div></div>`;
    await xoWait(600);
    for (const c of box.querySelectorAll(".xo-cl")) { c.classList.add("on"); sfx("pop"); await xoWait(700); }
    const g = box.querySelector(".xo-gift"); g.classList.add("wob"); await xoWait(900); g.classList.add("open"); box.querySelector(".xo-inside").classList.add("show"); burstAt(box.querySelector(".xo-inside"), 14);
  },
  /* manners scenarios: the two choices and how they make people feel */
  async manners(box, q) {
    const picked = XO && XO.picked;
    box.innerHTML = `${q.vis ? `<div class="xo-vis">${q.vis}</div>` : ""}<div class="xo-roads">${picked != null ? `<div class="xo-road bad"><div class="xo-card">${picked}</div><div class="xo-face">😟</div><div class="xo-meter"><i></i></div><small>Not the best choice</small></div>` : ""}<div class="xo-road good"><div class="xo-card">${q.ans}</div><div class="xo-face">😊</div><div class="xo-meter"><i></i></div><small>The best choice!</small></div></div>`;
    await xoWait(700);
    for (const r of box.querySelectorAll(".xo-road")) { r.classList.add("on"); await xoWait(900); }
    const g = box.querySelector(".xo-road.good"); g.classList.add("glow"); burstAt(g.querySelector(".xo-face"), 14);
  },
});


XO_DEMO.pairword = async function (box, q) {
  const w = xPlain((String(q.q).match(/<b>([^<]+)<\/b>/) || [])[1] || ""), opp = /opposite|antonym/i.test(xPlain(q.say || q.q) + " " + ((srcTopic(q, Q.t) || {}).id || ""));
  box.innerHTML = `<div class="xo-pw"><span class="w a">${esc(w)}</span><span class="link">${opp ? "↔️" : "🟰"}</span><span class="w b">${q.ans}</span></div><div class="xo-count"></div>`;
  await xoWait(800); box.querySelector(".xo-pw").classList.add("on"); sfx("pop");
  await xoWait(900); box.querySelector(".xo-count").innerHTML = opp ? `<b>${esc(w)}</b> and <b>${xPlain(q.ans)}</b> are opposites` : `<b>${esc(w)}</b> and <b>${xPlain(q.ans)}</b> mean almost the same`;
};


/* "Which one is unsafe?": stamp the answer with the word that was asked about */
XO_DEMO.whichone = async function (box, q) {
  const asked = xPlain((String(q.q).match(/which one is (?:a |an )?<b>([^<]+)<\/b>/i) || [])[1] || (xPlain(q.say || q.q).match(/which one is (?:a |an )?([a-z' ]+?)\??$/i) || [])[1] || "");
  const neg = /^(unsafe|rude|unkind|not|unhealthy|unfair|mean)/i.test(asked) || /\bnot\b/i.test(xPlain(q.q || "")), picked = XO && XO.picked;
  box.innerHTML = `<div class="xo-roads">${picked != null ? `<div class="xo-road plainr"><div class="xo-card">${picked}</div><small>🤔 This one isn't ${esc(asked || "it")}</small></div>` : ""}<div class="xo-road ${neg ? "bad" : "good"} ans"><div class="xo-paper sm"><div class="xo-card">${q.ans}</div><div class="xo-stamp ${neg ? "bad" : "good"}">${neg ? "✘" : "✔"} ${esc(asked || "this one")}</div></div></div></div>`;
  await xoWait(700); box.querySelectorAll(".xo-road").forEach(r => r.classList.add("on"));
  await xoWait(900); box.querySelector(".xo-stamp").classList.add("down"); sfx("pop");
};


/* the child's name, so Pip can talk to them directly */
function kidName() { try { const p = curProfile(); return p && p.name ? String(p.name).trim().split(/\s+/)[0].slice(0, 20) : ""; } catch (e) { return ""; } }
const heyKid = (rest, cap1) => { const n = kidName(); return n ? `${n}, ${rest.charAt(0).toLowerCase() + rest.slice(1)}` : (cap1 === false ? rest : rest.charAt(0).toUpperCase() + rest.slice(1)); };
document.addEventListener("change", ev => {
  if (ev.target && ev.target.id === "set-kidname") {
    const p = curProfile(); if (!p) return; const nv = ev.target.value.trim().replace(/\s+/g, " ").slice(0, 20);
    if (nv && findKidByName(nv, p.id)) { ev.target.value = p.name || ""; toast(`There's already a child named ${nv}`); return; }
    p.name = nv; p.u = Date.now(); saveProfiles(); markDirty(p.id); paintWho(); NAME_AUD = null; nsPaint();
    const h = document.getElementById("child-h"); if (h) h.innerHTML = `${p.avatar} For ${esc(profileName(p))}`; toast("Saved ✔");
  }
});


/* coordinate grid: a dot walks across, then up */
XO_DEMO.coordwalk = async function (box, q) {
  const x = q.v24, a = x.a, b = x.b;
  box.innerHTML = `<div class="xo-vis big">${q.vis}</div><div class="xo-count">Start at 0…</div>`;
  const svg = box.querySelector("svg.v24-grid"), c = box.querySelector(".xo-count"); if (!svg) return XO_DEMO.reveal(box, q);
  const g = V24_gridGeo(+svg.dataset.n || 6), NS = "http://www.w3.org/2000/svg";
  const path = document.createElementNS(NS, "polyline"); path.setAttribute("fill", "none"); path.setAttribute("stroke", "#22B573"); path.setAttribute("stroke-width", "5"); path.setAttribute("stroke-linecap", "round"); path.setAttribute("stroke-linejoin", "round"); svg.appendChild(path);
  const dot = document.createElementNS(NS, "circle"); dot.setAttribute("r", "9"); dot.setAttribute("fill", "#F26B3A"); dot.setAttribute("stroke", "#fff"); dot.setAttribute("stroke-width", "3"); dot.setAttribute("cx", g.X(0)); dot.setAttribute("cy", g.Y(0)); svg.appendChild(dot);
  const pts = [[g.X(0), g.Y(0)]], put = (px, py) => { pts.push([px, py]); path.setAttribute("points", pts.map(p => p.join(",")).join(" ")); dot.setAttribute("cx", px); dot.setAttribute("cy", py); };
  await xoWait(800);
  for (let i = 1; i <= a; i++) { put(g.X(i), g.Y(0)); c.textContent = `${i} across`; sfx("pop"); await xoWait(450); }
  await xoWait(300);
  for (let j = 1; j <= b; j++) { put(g.X(a), g.Y(j)); c.textContent = `${a} across, ${j} up`; sfx("pop"); await xoWait(450); }
  c.innerHTML = `(${a}, ${b}) → <b>${a} across, ${b} up</b>`; c.classList.add("pop-in");
};
/* line graph: guide lines from the label up to the dot, then across to the number */
XO_DEMO.lgguide = async function (box, q) {
  const x = q.v24;
  box.innerHTML = `<div class="xo-vis big">${q.vis}</div><div class="xo-count"></div>`;
  const svg = box.querySelector("svg.v24-lg"), c = box.querySelector(".xo-count"); if (!svg) return XO_DEMO.reveal(box, q);
  const NS = "http://www.w3.org/2000/svg", L = +svg.dataset.l, B = +svg.dataset.b;
  const idx = x.ask === "read" ? [x.i] : [x.ia, x.ib];
  for (const i of idx) {
    const dot = svg.querySelector(`circle[data-i="${i}"]`); if (!dot) continue;
    const cx = +dot.getAttribute("cx"), cy = +dot.getAttribute("cy");
    const ln = document.createElementNS(NS, "polyline"); ln.setAttribute("points", `${cx},${B} ${cx},${cy} ${L},${cy}`); ln.setAttribute("fill", "none"); ln.setAttribute("stroke", "#22B573"); ln.setAttribute("stroke-width", "3"); ln.setAttribute("stroke-dasharray", "6 5"); ln.setAttribute("class", "xo-guide"); svg.insertBefore(ln, dot);
    await xoWait(900); dot.setAttribute("r", "8"); dot.setAttribute("fill", "#22B573"); sfx("pop");
    c.innerHTML = `${V24_lab(x.labs ? x.labs[i] : "")} → <b>${x.v[i]}</b>`.replace(/^ → /, ""); await xoWait(900);
  }
  if (x.ask === "diff") c.innerHTML = `${x.a} − ${x.b} = <b>${x.d}</b>`;
};

/* ---------- the overlay and its script ---------- */
function explainWrong(o, done) {
  const { q, wr, ansSay, adapt, timeUp, picked } = o, t = srcTopic(q, Q.t) || Q.t, kind = xoKind(q, t), e = xoExpr(q);
  const under = document.getElementById("nextq"); if (under) under.id = "nextq-under";
  const last = Q.i === Q.qs.length - 1, mc = !q.kind || q.kind === "count";
  /* the two choices for "your turn": what they picked (or another wrong one) and the right answer */
  const other = picked != null && picked !== q.ans ? picked : (q.opts || []).find(x => x !== q.ans);
  const turnOpts = mc && other != null ? shuffle([other, q.ans]) : null;
  const miss = picked != null && !timeUp ? xoMissLine(picked, q.ans) : "";
  const qShort = xStrip(q.q || "").replace(/\s+/g, " ").trim(), askAgain = qShort.length <= 70 && /\?$/.test(qShort) && !/^(tap|look|count)/i.test(qShort) ? qShort : "";
  const ov = document.createElement("div"); ov.id = "xov"; ov.className = "xov"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-label", "Let's look at this together");
  ov.innerHTML = `<div class="xo-card-main staged">
    <div class="xo-head"><div class="pip-mini-talk">${PIP}<span class="xo-say">${esc(timeUp ? `Time's up! ${heyKid("Let's look together.")}` : (attnOn() ? heyKid("Listen carefully and pay attention!") : heyKid("Let's look together.")))}</span></div></div>
    <div class="xo-stepbar" aria-hidden="true"><span data-st="1">🤔 ${timeUp ? "Time's up" : "Your pick"}</span><span data-st="2">✅ Right answer</span><span data-st="3">💡 Why</span>${turnOpts ? `<span data-st="4">👆 Your turn</span>` : ""}</div>
    <div class="xo-pair">
      ${timeUp ? `<div class="xo-pick xo-blk timeup" data-b="1"><small>Time ran out</small><div class="xo-val">⏰</div></div>` : picked != null ? `<div class="xo-pick xo-blk" data-b="1"><small>You picked</small><div class="xo-val">${picked}</div><div class="xo-think" aria-hidden="true">🤔</div>${wr ? `<p>${esc(wr.reason)}</p>` : ""}${miss}</div>` : `<div class="xo-pick xo-blk" data-b="1"><small>Your answer</small><div class="xo-val">${wr && wr.pick ? esc(wr.pick) : "✘"}</div><div class="xo-think" aria-hidden="true">🤔</div><p>${wr ? esc(wr.reason) : "That's not quite right."}</p></div>`}
      <div class="xo-right xo-blk" data-b="2" hidden><small>The right answer</small><div class="xo-val">${q.ans}</div></div>
    </div>
    <div class="xo-blk xo-whybox" data-b="3" hidden><div class="xo-demo"></div><p class="xo-why"></p></div>
    ${turnOpts ? `<div class="xo-blk xo-turn" data-b="4" hidden><div class="xo-turn-q">👆 ${esc(kidName() ? kidName() + ", your turn!" : "Your turn!")} ${askAgain ? esc(askAgain) : "Tap the <b>right</b> answer."}</div><div class="xo-turn-opts">${turnOpts.map(x => `<button class="xo-topt" data-ok="${x === q.ans ? 1 : 0}">${x}</button>`).join("")}</div></div>` : ""}
    <div class="xo-btns"><button class="btn btn-sm" data-xo="look">👀 See the question</button><button class="btn btn-sm btn-sun" data-xo="again" disabled>🔁 Watch again</button><button class="btn btn-go" data-act="nextq" id="nextq" disabled aria-disabled="true">${last ? "See my prize! 🎁" : "Next ▶"}</button></div>
  </div>`;
  document.body.appendChild(ov); document.body.classList.add("xov-open");
  const card = ov.querySelector(".xo-card-main"), bubble = ov.querySelector(".xo-say");
  const stage = n => {
    card.dataset.stage = n;
    ov.querySelectorAll(".xo-stepbar span").forEach(x => { const k = +x.dataset.st; x.classList.toggle("done", k < n); x.classList.toggle("now", k === n); });
    ov.querySelectorAll(".xo-blk").forEach(x => x.classList.toggle("spot", +x.dataset.b === n));
    const blk = ov.querySelector(`.xo-blk[data-b="${n}"]`); if (blk && !blk.hidden) blk.scrollIntoView({ block: "nearest", behavior: reduced ? "auto" : "smooth" });
    if (n > 1) sfx("whoosh");
  };
  ov.addEventListener("click", ev => {
    if (PAUSED) return;
    const tb = ev.target.closest(".xo-topt"); if (tb && !tb.disabled && XO && XO.turnOpen) return turnTap(tb);
    const b = ev.target.closest("[data-xo]"); if (!b || b.disabled) return;
    if (b.dataset.xo === "look") { const m = ov.classList.toggle("min"); b.textContent = m ? "🦉 Back to the explanation" : "👀 See the question"; }
    else if (b.dataset.xo === "again") play(true);
  });
  XO = { tok: 0, turnOpen: false, turned: false, picked };
  const opener = timeUp ? `Time's up! ${attnOn() ? heyKid("Listen carefully and pay attention.") : heyKid("Let's look together.")}` : !attnOn() ? "Oops, you got it wrong." : `Oops, you got it wrong. ${kidName() ? `${kidName()}, listen carefully and pay attention.` : "So listen carefully and pay attention."}`;
  const pickTxt = wr ? ` You picked ${wr.pick.replace(/[.]$/, "")}. ${wr.reason}` : "";
  const s1 = `${opener}${pickTxt}`.replace(/([.!?])\s*\./g, "$1");
  const s2 = `The correct answer is ${ansSay}.`.replace(/([.!?])\s*\./g, "$1");
  const nmK = kidName();
  const s3lead = nmK ? pick([`Watch this, ${nmK}.`, `Look closely, ${nmK}.`, `Here's why, ${nmK}.`, `${nmK}, here's how it works.`]) : "";
  const s3end = nmK && !turnOpts ? pick([`Do you see it now, ${nmK}?`, `Remember that, ${nmK}!`, `Now you know, ${nmK}!`]) : "";
  const s3 = `${s3lead} ${q.why || ""}${adapt ? ` ${adapt}` : ""} ${s3end}`.replace(/\s+/g, " ").trim();
  const say = (txt, after, mood) => new Promise(res => { if (!txt) return res(); narrate(txt, { force: !!window.voiceOn(), mood: mood || "teach", after }, res); });
  const again = ov.querySelector('[data-xo="again"]');
  const finish = tok => { if (!XO || XO.tok !== tok) return; done(() => { if (document.getElementById("xov") === ov) again.disabled = false; }); };
  /* "your turn": a quick tap so the child picks the right answer themselves */
  function turnTap(btn) {
    const tok = XO.tok;
    if (btn.dataset.ok === "1") {
      XO.turnOpen = false; XO.turned = true;
      ov.querySelectorAll(".xo-topt").forEach(x => { x.disabled = true; if (x !== btn) x.classList.add("dim"); });
      btn.classList.add("correct", "pop"); sfx("correct"); burstAt(btn, 14); stage(5);
      bubble.textContent = "Yes! You've got it! 🎉";
      const nm = kidName(); say(pick(["Yes! That's it", "Great! Now you know it", "You got it this time", "Yes! Well done"]) + (nm && Math.random() < 0.5 ? `, ${nm}!` : "!"), 300, "cheer").then(() => finish(tok));
    } else {
      btn.classList.remove("shake"); void btn.offsetWidth; btn.classList.add("shake", "wrongtry"); sfx("wrong");
      bubble.textContent = "Not that one. Look again! 👀";
      XO.turnOpen = false; say("Not that one. Look again, and try the other one.", 200).then(() => { if (XO && XO.tok === tok) XO.turnOpen = true; });
    }
  }
  async function play(replay) {
    const tok = ++XO.tok, alive = () => XO && XO.tok === tok && document.getElementById("xov") === ov;
    lockNav(true); again.disabled = waitExplainOn(); XO.turnOpen = false;
    const nb = ov.querySelector("#nextq"); if (replay && nb && waitExplainOn()) { clearAuto(); nb.classList.remove("counting"); if (nb.dataset.label) nb.textContent = nb.dataset.label; nb.disabled = true; nb.setAttribute("aria-disabled", "true"); }
    if (replay) { ["2", "3"].forEach(n => { const x = ov.querySelector(`.xo-blk[data-b="${n}"]`); if (x) x.hidden = true; }); ov.querySelector(".xo-pick")?.classList.remove("crossed"); ov.querySelector(".xo-miss")?.classList.remove("go"); }
    /* 1: what happened with their pick */
    stage(1); bubble.textContent = timeUp ? `Time's up! ${heyKid("Let's look together.")}` : (attnOn() ? heyKid("Listen carefully and pay attention!") : heyKid("Let's look together."));
    const pk = ov.querySelector(".xo-pick");
    if (pk) { pk.classList.remove("shake"); void pk.offsetWidth; pk.classList.add("shake"); pTimeout(() => { if (!alive()) return; pk.classList.add("crossed"); ov.querySelector(".xo-miss")?.classList.add("go"); }, 900); }
    if (!window.voiceOn() && !replay) await xoWait(600);
    await say(replay ? pickTxt.trim() : s1, 500); if (!alive()) return;
    /* 2: the right answer */
    const rt = ov.querySelector(".xo-right"); rt.hidden = false; rt.classList.remove("pop-in"); void rt.offsetWidth; rt.classList.add("pop-in"); stage(2); sfx("pop"); burstAt(rt.querySelector(".xo-val"), 10);
    bubble.textContent = nmK ? `Here's the right answer, ${nmK}! ✅` : "Here's the right answer! ✅";
    await say(s2, 400); if (!alive()) return;
    /* 3: why it's right, with a picture made from the question */
    const box = ov.querySelector(".xo-whybox"), demo = ov.querySelector(".xo-demo"), why = ov.querySelector(".xo-why"); box.hidden = false; stage(3);
    bubble.textContent = nmK ? `Watch how it works, ${nmK}! 💡` : "Watch how it works! 💡"; xoTypeWhy(why, xStrip(q.why || "").replace(/\s+/g, " ").trim());
    const fn = XO_DEMO[kind] || XO_DEMO.plain;
    const anim = Promise.resolve().then(() => fn(demo, q, e)).catch(() => XO_DEMO.plain(demo, q));
    await Promise.all([anim, say(s3, 0)]); if (!alive()) return;
    why.querySelectorAll(".xw").forEach(w => w.classList.add("on"));
    /* 4: your turn (once; a replay skips it) */
    const turn = ov.querySelector(".xo-turn");
    if (turn && !XO.turned) {
      turn.hidden = false; stage(4); bubble.textContent = kidName() ? `${kidName()}, your turn! Tap the right answer. 👆` : "Your turn! Tap the right answer. 👆";
      const askSay = askAgain && q.say && xPlain(q.say).length <= 110 && /\?\s*$/.test(xPlain(q.say)) ? xPlain(q.say) : askAgain;
      await say(askAgain ? `${heyKid("Now it's your turn.")} ${askSay}` : `${heyKid("Now it's your turn.")} Tap the right answer!`, 0, "ask"); if (!alive()) return;
      XO.turnOpen = true; lockNav(false); return;   /* turnTap finishes */
    }
    stage(5);
    if (replay) { pTimeout(() => { if (!alive()) return; lockNav(false); again.disabled = false; setNextReady(true); if (Q) startPause(Q.token); }, pace().after); return; }
    finish(tok);
  }
  play(false);
}
/* how far a wrong number is from the right one, drawn on a little number line */
function xoMissLine(picked, ans) {
  const pn = xPlain(picked), an = xPlain(q2s(ans)), unit = (an.match(/[¢%°]|\s?[a-z]+$/i) || [""])[0];
  const P = xoNum(pn.replace(/[$¢%°]|\s?[a-z]+$/gi, "")), A = xoNum(an.replace(/[$¢%°]|\s?[a-z]+$/gi, ""));
  if (!isFinite(P) || !isFinite(A) || P === A || !/^\$?\d[\d,.]*/.test(pn) || !/^\$?\d[\d,.]*/.test(an)) return "";
  const lo = Math.min(P, A), hi = Math.max(P, A), pad = (hi - lo) * 0.35 || 1, L = lo - pad, H = hi + pad, x = v => 6 + (v - L) / (H - L) * 88;
  const d = Math.round(Math.abs(P - A) * 1000) / 1000, more = P > A, f = v => v.toLocaleString("en-US");
  return `<div class="xo-miss"><div class="xo-ml"><i class="bar"></i><span class="pt bad" style="left:${x(P)}%"><b>${esc(pn)}</b></span><span class="pt good" style="left:${x(A)}%"><b>${esc(an)}</b></span><span class="gap" style="left:${x(lo)}%;width:${x(hi) - x(lo)}%"></span></div><div class="xo-mtxt">${f(d)}${unit && unit.trim() ? " " + esc(unit.trim()) : ""} too ${more ? "many ⬆" : "few ⬇"}</div></div>`;
}
const q2s = v => String(v == null ? "" : v);

