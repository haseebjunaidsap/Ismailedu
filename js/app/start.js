/* =====================================================================
   Start the app. This file loads last, so everything above is ready.
   ===================================================================== */
/* ---------------- start up ---------------- */
applyA11y();
syncTop();
if (liveProfiles().length > 1 && !ss.get("picked") && !location.hash) { try { history.replaceState(null, "", "#kids"); } catch (e) { } ss.set("picked", "1"); }
render(location.hash);
if (!curProfile().name) nameAsk();
initAI();
initSync();


