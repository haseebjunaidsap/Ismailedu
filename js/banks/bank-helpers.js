/* =====================================================================
   Question banks: helpers for adding more questions to existing topics.
   bank_*.js files are loaded after all topics are defined.
   ===================================================================== */
const TP = (age, subj, id) => { const t = (C[age] && C[age][subj] || []).find(x => x.id === id); if (!t) console.warn("bank: no topic", age, subj, id); return t; };
/* Add a new generator to a topic. weight = chance (0–1) that a question comes from the new generator.
   Pick it so old and new questions are mixed fairly, e.g. new / (old + new). */
const BANK_GENS = [];
function addBank(age, subj, id, weight, gen) {
  const t = TP(age, subj, id); if (!t) return;
  BANK_GENS.push([age, subj, id, gen]);
  const old = t.gen;
  t.gen = function () { if (Math.random() < weight) { const q = gen.call(this); if (q) return q; } return old.call(this); };
}
/* Manners & Behavior: add scenarios S [situation, best answer, [3 wrong answers], why, emoji]
   and statements J [statement, labelIndex (0 = good/kind/safe…, 1 = the opposite), why]. */
const BANK_MANNERS = [];
function moreManners(age, id, o) { const t = TP(age, "manners", id); if (!t) return; BANK_MANNERS.push([age, id, o]); if (o.S) t._S.push(...o.S); if (o.J) t._J.push(...o.J); }

/* Why each wrong choice in a Manners & Behavior scenario isn't the best one.
   reasons: { "situation text": ["why wrong option 1 is wrong", "…2", "…3"] } in the same order as the wrong options. */
function whyNotManners(age, id, reasons) {
  const t = TP(age, "manners", id); if (!t) return;
  for (const s of t._S) { const r = reasons[s[0]]; if (r) s[5] = r; }
}

/* Topic-specific "why is this answer wrong" rules. fn(q, picked) returns a short sentence, or null to let the
   general rules decide. picked is the exact option string the child chose (q.opts[k]). */
const WHY_RULES = {};
/* Several files may add rules for one topic: each is tried in the order it was added, the first non-null reason wins. */
function whyRule(age, subj, id, fn) { const k = `${age}-${subj}-${id}`, prev = WHY_RULES[k]; WHY_RULES[k] = prev ? (q, p) => { const r = prev(q, p); return r != null ? r : fn(q, p); } : fn; }

