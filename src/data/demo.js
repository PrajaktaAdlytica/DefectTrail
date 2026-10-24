export const DEMO_LABEL = "DEMO · SIMULATED DATA · CONCEPT PREVIEW";
const ev = (id, ref, type, title, detail, time, options = {}) => ({
  id,
  ref,
  type,
  title,
  detail,
  time,
  ...options,
});
export const cases = [
  {
    id: "DT-101",
    serial: "SN-24011",
    title: "Assembly fit exception",
    status: "Reviewed in demo",
    state: "reviewed",
    lot: "L81",
    date: "2026-10-08",
    owner: "Mara Vale",
    operator: "Nia Hart",
    task: "Keep the same-setting counterexample in the reviewed chronology.",
    taskOwner: "Tobin Reed",
    due: "2026-10-12T10:00:00Z",
    note: "Chronology reviewed. The same-setting passed unit is retained; no confirmed root cause.",
    sources: [
      ev(
        "R01.E3",
        "DEMO-GEN81",
        "genealogy",
        "Incoming material link",
        "SN-24011 is linked to incoming lot L81.",
        "08:50",
        { locator: "row 11", lot: "L81" },
      ),
      ev(
        "R01.E2",
        "DEMO-LOG02",
        "station",
        "Station S02 setting",
        "Illustrative fixture setting B=18 recorded before inspection.",
        "09:05",
        { locator: "row 11", station: "S02", setting: "B=18" },
      ),
      ev(
        "R01.E4",
        "DEMO-I10",
        "counterexample",
        "Same-setting unit passed",
        "SN-24010 passed at S02 with setting B=18 and lot L81.",
        "09:17",
        {
          locator: "frame 1 / log row 10",
          serial: "SN-24010",
          station: "S02",
          setting: "B=18",
          lot: "L81",
        },
      ),
      ev(
        "R01.E1",
        "DEMO-I11",
        "inspection",
        "Fit-check observation",
        "SN-24011 has a synthetic assembly fit-check finding.",
        "09:20",
        { locator: "frame 1", serial: "SN-24011" },
      ),
    ],
    gap: "No missing mapping in the supplied synthetic record bundle. Source completeness does not establish cause.",
    reviewAt: "2026-10-08T15:00:00Z",
  },
  {
    id: "DT-102",
    serial: "SN-24014",
    title: "Connector seating observation",
    status: "Blocked: genealogy gap",
    state: "blocked",
    lot: "Unknown supplier lot",
    batch: "B6",
    date: "2026-10-09",
    owner: "Tobin Reed",
    operator: "Nia Hart",
    task: "Request the missing supplier-lot mapping before narrowing the trace.",
    taskOwner: "Arden Pike",
    due: "2026-10-12T10:00:00Z",
    note: "Supplier mapping is absent. Retain the internal batch and the same-setting counterexample.",
    sources: [
      ev(
        "R02.E3",
        "DEMO-GEN6",
        "genealogy",
        "Internal batch recorded",
        "SN-24014 is linked to internal batch B6; supplier-lot link absent.",
        "12:50",
        { locator: "row 14", lot: null },
      ),
      ev(
        "R02.E2",
        "DEMO-LOG03",
        "station",
        "Station S03 setting",
        "Illustrative fixture setting C=7 recorded before inspection.",
        "13:04",
        { locator: "row 14", station: "S03", setting: "C=7" },
      ),
      ev(
        "R02.E4",
        "DEMO-I13",
        "counterexample",
        "Same-setting unit passed",
        "SN-24013 passed at S03 with C=7 and internal batch B6.",
        "13:16",
        {
          locator: "frame 1 / log row 13",
          serial: "SN-24013",
          station: "S03",
          setting: "C=7",
        },
      ),
      ev(
        "R02.E1",
        "DEMO-I14",
        "inspection",
        "Connector seating finding",
        "SN-24014 has a synthetic connector-seating observation.",
        "13:20",
        { locator: "frame 1", serial: "SN-24014" },
      ),
    ],
    gap: "Supplier-lot mapping for SN-24014 is absent. Do not infer a supplier from the internal batch.",
    reviewAt: "2026-10-09T14:00:00Z",
  },
  {
    id: "DT-103",
    serial: "SN-24017",
    title: "Final inspection finding",
    status: "Awaiting review",
    state: "pending",
    lot: "L88",
    date: "2026-10-10",
    owner: "Mara Vale",
    operator: "Nia Hart",
    task: "Review the missing mapping and inspection-label consistency.",
    taskOwner: "Arden Pike",
    due: "2026-10-12T10:00:00Z",
    note: "Decline the proposed S04 root cause. Retain both counterexamples. Request the missing mapping and inspect label consistency.",
    sources: [
      ev(
        "R04",
        "DEMO-REC88",
        "receipt",
        "Incoming lot received",
        "Lot L88 recorded at receipt. This is not evidence that the lot is defective.",
        "07:40",
        { locator: "row 12", lot: "L88" },
      ),
      ev(
        "R05",
        "DEMO-GEN88",
        "genealogy",
        "Serial / lot relationship",
        "SN-24017 is linked to L88. Supplier mapping for SN-24018 remains missing.",
        "08:12",
        { locator: "rows 17–18", lot: "L88" },
      ),
      ev(
        "R06",
        "DEMO-LOG04",
        "station",
        "Station S04 setting",
        "Illustrative setpoint A=42 was recorded before inspection.",
        "08:18",
        { locator: "row 41", station: "S04", setting: "A=42" },
      ),
      ev(
        "R08",
        "DEMO-I16",
        "counterexample",
        "Same-setting unit passed",
        "SN-24016 passed the same synthetic check at S04, setting A=42, lot L88.",
        "08:25",
        {
          locator: "frame 1 / log row 39",
          serial: "SN-24016",
          station: "S04",
          setting: "A=42",
          lot: "L88",
        },
      ),
      ev(
        "R07",
        "DEMO-I17",
        "inspection",
        "Final inspection finding",
        "SN-24017 failed a synthetic visual check. The inspection illustration is fictional.",
        "08:27",
        { locator: "frame 1", serial: "SN-24017" },
      ),
      ev(
        "R09",
        "DEMO-I19",
        "counterexample",
        "Alternate-station finding",
        "SN-24019 failed at S05, setpoint A=40, with a recorded link to L88.",
        "08:31",
        {
          locator: "DEMO-LOG05 row 7",
          serial: "SN-24019",
          station: "S05",
          setting: "A=40",
          lot: "L88",
        },
      ),
    ],
    gap: "Supplier mapping for SN-24018 is missing. Lot and station causation remain unproven.",
    reviewAt: "2026-10-10T09:10:00Z",
  },
];
export const caseById = Object.fromEntries(cases.map((c) => [c.id, c]));
export const demoAccount = {
  name: "Cedar Arc Assemblies",
  industry: "Electronics / discrete assembly",
  line: "DEMO-LINE1",
  family: "Control-board assembly",
  qualityLead: "Mara Vale",
  engineer: "Tobin Reed",
  operator: "Nia Hart",
  dataOwner: "Arden Pike",
  permission: "Pending — simulated permission gate",
  proposal: "Supervised one-line evaluation",
  sow: "Draft · unsigned · no booked revenue",
};
export const evidenceCount = cases.reduce((n, c) => n + c.sources.length, 0);
export function fullTime(c, s, offset = 0) {
  const d = new Date(`${c.date}T${s.time}:00Z`);
  d.setMinutes(d.getMinutes() + offset);
  return d.toISOString();
}
export function readableDate(value) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}
export function readableTime(value) {
  return (
    new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    }).format(new Date(value)) + " UTC"
  );
}
export function initialReview(c) {
  return {
    status:
      c.id === "DT-101"
        ? "Reviewed in demo"
        : c.id === "DT-102"
          ? "Blocked: missing mapping"
          : "Awaiting local review",
    decision: "Unsupported cause rejected",
    rationale: c.note,
    suspectLots: [],
    note: "",
    savedAt: null,
  };
}
export function makePacket(c, review) {
  return {
    environment: DEMO_LABEL,
    caseId: c.id,
    serial: c.serial,
    lot: c.lot,
    sourceCount: c.sources.length,
    version: review.savedAt ? "v2 — local review" : "v1 — synthetic seed",
    exportedAt: new Date().toISOString(),
    question:
      "Which records support a draft review scope, and what remains unresolved?",
    observations: c.sources.map((s) => ({
      ...s,
      environment: "DEMO / SIMULATED",
      eventAt: fullTime(c, s),
      recordedAt: fullTime(c, s, 5),
      importedAt: fullTime(c, s, 6),
      sourceVersion: "v1",
    })),
    alternatives: [
      {
        name: "Station-setting explanation",
        status: "Not established",
        reason: "A same-setting passed unit is retained as counterevidence.",
      },
      {
        name: "Incoming-lot explanation",
        status: "Not established",
        reason:
          c.id === "DT-102"
            ? "Supplier mapping is missing."
            : "A lot relationship does not establish causation.",
      },
      {
        name: "Inspection / label inconsistency",
        status: "Unresolved",
        reason: "Further evidence and a human review are required.",
      },
    ],
    missingness: c.gap,
    review: {
      ...review,
      reviewer: demoAccount.qualityLead + " — DEMO",
      seedReviewedAt: c.reviewAt,
    },
    nextAction: { task: c.task, owner: c.taskOwner + " — DEMO", due: c.due },
    containment: "Not executed. Outside the demo boundary.",
    effectiveness: "Not measured",
    boundary:
      "No machine commands, line stops, quarantine execution, live writeback or production integrations.",
  };
}
export function downloadFile(name, contents, type = "application/json") {
  const blob = new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
export function packetHtml(p) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>DEMO ${esc(p.caseId)} — DefectTrail evidence packet</title><style>body{margin:40px auto;padding:24px;max-width:900px;background:#f7f4ed;color:#22232a;font:16px/1.65 system-ui}h1,h2{font-family:Georgia,serif;font-weight:400}h1{font-size:38px}h2{margin-top:36px}aside{padding:16px;border:1px solid #5a5188;color:#443963}article{padding:18px 0;border-bottom:1px solid #d8d4ce}small{display:block;color:#585865}table{width:100%;border-collapse:collapse}td{padding:10px;border-bottom:1px solid #ddd}.watermark{font-size:12px;letter-spacing:.12em;color:#5a5188}pre{white-space:pre-wrap}@media print{body{margin:0}.watermark{position:fixed;top:0}article{break-inside:avoid}h2{break-after:avoid}}</style></head><body><p class="watermark">${esc(p.environment)}</p><h1>${esc(p.caseId)} · Serialized investigation review</h1><p>${esc(p.version)} · Serial ${esc(p.serial)} · Lot ${esc(p.lot)}</p><aside>All people, events, sources and decisions are fictional. No containment executed. ${esc(p.boundary)}</aside><h2>Question under review</h2><p>${esc(p.question)}</p><h2>Source chronology</h2>${p.observations.map((s) => `<article><strong>${esc(s.title)}</strong><p>${esc(s.detail)}</p><small>DEMO / SIMULATED · ${esc(s.id)} · ${esc(s.ref)} · ${esc(s.locator)} · ${esc(s.sourceVersion)}</small><small>Event: ${esc(s.eventAt)}<br>Recorded: ${esc(s.recordedAt)}<br>Imported: ${esc(s.importedAt)}</small></article>`).join("")}<h2>Alternatives and contradictions</h2>${p.alternatives.map((a) => `<article><strong>${esc(a.name)} · ${esc(a.status)}</strong><p>${esc(a.reason)}</p></article>`).join("")}<h2>Missingness</h2><p>${esc(p.missingness)}</p><h2>Simulated reviewer</h2><p>${esc(p.review.reviewer)} · ${esc(p.review.decision)}</p><p>${esc(p.review.rationale)}</p><p>Draft suspect scope: ${esc(p.review.suspectLots.join(", ") || "Not selected")}. ${esc(p.containment)}</p><p>Local saved time: ${esc(p.review.savedAt || "Not locally saved")}. This is a simulated review, not an authenticated signature.</p><h2>Next evidence task</h2><p>${esc(p.nextAction.owner)} · ${esc(p.nextAction.task)} · Due ${esc(p.nextAction.due)}</p><p>CAPA effectiveness: ${esc(p.effectiveness)}</p><footer><p>${esc(p.environment)} · Exported ${esc(p.exportedAt)}</p></footer></body></html>`;
}
