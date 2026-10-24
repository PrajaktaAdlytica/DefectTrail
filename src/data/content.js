export const products = [
  {
    id: "defect-desk",
    short: "Desk",
    name: "Defect Desk",
    number: "01",
    tone: "plum",
    icon: "chronology",
    eyebrow: "INCIDENT INTAKE & EVIDENCE CHRONOLOGY",
    headline: "Give the incident a dated evidence trail.",
    description:
      "Bring the incident, source records and investigator notes into one chronology. See what happened, where the record came from, and which steps are still missing.",
    job: "Incident intake and evidence chronology.",
    price: "$2,500",
    unit: "/ case",
    scope: "Incident reconstruction",
    image: "evidence-folder",
    inputs: [
      "Incident reports and inspection findings",
      "Dated station and material references",
      "Analyst notes, exceptions and unanswered questions",
    ],
    steps: [
      "Name the incident and its accountable owner",
      "Separate event, recording and import times",
      "Attach a source to every observation",
      "Review the gaps before exporting the chronology",
    ],
    output:
      "A source-linked incident chronology, with an owner, exceptions and a dated next action.",
    limit:
      "An absent process event stays absent. The chronology does not invent what happened between records.",
    faq: "Can I add an investigator interpretation?",
    answer:
      "Yes, in the synthetic demo. An annotation remains visibly separate from the underlying observation, with its own author and date.",
  },
  {
    id: "defect-review",
    short: "Review",
    name: "Defect Review",
    number: "02",
    tone: "apricot",
    icon: "genealogy",
    eyebrow: "SERIAL & BATCH GENEALOGY",
    headline: "Follow the serial. Keep the missing links.",
    description:
      "Trace a serialized assembly back to its incoming lot and forward to a candidate set. Incomplete genealogy remains visible, rather than becoming an invented relationship.",
    job: "Serial and batch genealogy search.",
    price: "$700",
    unit: "/ month / line",
    scope: "Genealogy search",
    image: "exploded-assembly",
    inputs: [
      "Synthetic serial and batch identifiers",
      "Material-usage and incoming-lot links",
      "Source permissions and mapping status",
    ],
    steps: [
      "Select a serial, batch or material reference",
      "Inspect its recorded relationships",
      "Compare the forward and backward trace",
      "Keep unresolved mappings in the review packet",
    ],
    output:
      "An inspectable unit-to-lot trace with explicit resolved, missing and conflicting relationships.",
    limit:
      "A missing supplier mapping blocks that branch of the trace. It does not imply a supplier or lot is defective.",
    faq: "Does a lot relationship establish a cause?",
    answer:
      "No. A relationship tells you which records are linked. It does not establish why a defect occurred.",
  },
  {
    id: "defect-proof",
    short: "Proof",
    name: "Defect Proof",
    number: "03",
    tone: "sage",
    icon: "comparison",
    eyebrow: "CROSS-STATION ANOMALY COMPARISON",
    headline: "Compare the pattern. Challenge the explanation.",
    description:
      "Put station observations, inspection outcomes and counterexamples alongside one another. Make a useful lead inspectable without presenting correlation as a cause.",
    job: "Cross-station anomaly comparison.",
    price: "$1,200",
    unit: "/ month / line",
    scope: "Station anomaly workspace",
    image: "station-fixture",
    inputs: [
      "Timestamped station settings",
      "Inspection observations and label context",
      "Passed-unit and alternate-station counterexamples",
    ],
    steps: [
      "Align the available station records",
      "Inspect the proposed relationship",
      "Surface the same-setting counterexample",
      "Keep alternative explanations in the case",
    ],
    output:
      "A source-linked comparison that retains supporting records, counterevidence and unresolved questions.",
    limit:
      "The proposed workspace does not establish causal accuracy or replace an experienced manufacturing engineer.",
    faq: "Why is a passed unit shown beside the finding?",
    answer:
      "A passed unit at the same setting is relevant counterevidence. It makes a simple station-setting explanation incomplete.",
  },
  {
    id: "defect-signal",
    short: "Signal",
    name: "Defect Signal",
    number: "04",
    tone: "review",
    icon: "scope",
    eyebrow: "SUSPECT-LOT & CONTAINMENT REVIEW",
    headline: "Prepare the scope. Leave authority with people.",
    description:
      "Assemble a candidate suspect set with its supporting evidence, objections and exclusions. Give an authorized reviewer a rationale to assess, rather than an action already executed.",
    job: "Suspect-lot review with traceable rationale.",
    price: "$1,000",
    unit: "/ case",
    scope: "Containment review pack",
    image: "inspection-board",
    inputs: [
      "Investigator-selected lots and serials",
      "Supporting and contradictory evidence",
      "Selection rationale and review owner",
    ],
    steps: [
      "Select a draft suspect scope manually",
      "Record the rationale and exclusions",
      "Review contradictions and missing mappings",
      "Save a simulated reviewer decision locally",
    ],
    output:
      "A draft containment-review pack with a traceable rationale and explicit human ownership.",
    limit:
      "No quarantine, line stop, material release, machine command or live writeback is executed.",
    faq: "Does selecting a lot place it on hold?",
    answer:
      "No. A selection changes only the local synthetic draft. Authorized quality and operations staff own physical containment.",
  },
  {
    id: "defect-report",
    short: "Report",
    name: "Defect Report",
    number: "05",
    tone: "plum",
    icon: "packet",
    eyebrow: "CAPA EVIDENCE & EFFECTIVENESS FOLLOW-UP",
    headline: "Carry the evidence into the next review.",
    description:
      "Prepare a versioned evidence packet with the review decision, unresolved items, action owners and effectiveness follow-up. Keep the context intact beyond the first discussion.",
    job: "CAPA evidence package and effectiveness follow-up.",
    price: "$800",
    unit: "/ month / site",
    scope: "CAPA follow-up",
    image: "review-packet",
    inputs: [
      "Reviewed case and source snapshot",
      "Action owner and dated next step",
      "Follow-up observations and unresolved items",
    ],
    steps: [
      "Review the source-linked case",
      "Keep the rejected explanation in history",
      "Assign the next evidence task",
      "Export a labeled packet and follow-up ledger",
    ],
    output:
      "A versioned review packet and dated follow-up ledger, with provenance and uncertainty retained.",
    limit:
      "A completed evidence packet is not automatic CAPA closeout. Effectiveness remains Not measured until a real evaluation.",
    faq: "Can I take the example packet with me?",
    answer:
      "Yes. The isolated demo exports labeled synthetic HTML and JSON packets. No source record is overwritten or transmitted.",
  },
];

export const productById = Object.fromEntries(products.map((p) => [p.id, p]));
export const roles = [
  {
    id: "quality-directors",
    name: "Quality director",
    title: "Own the decision. Inspect the evidence.",
    description:
      "Review evidence sufficiency, contradictions and the next action. Define the evaluation standard before judging an outcome.",
    artifact: "Decision review",
    icon: "review",
    image: "review-packet",
    checks: [
      "Source records available",
      "Contradictory evidence retained",
      "Alternative explanations visible",
      "Next evidence task assigned",
    ],
  },
  {
    id: "manufacturing-engineering",
    name: "Manufacturing engineering",
    title: "Compare the process, not just the result.",
    description:
      "Read station observations alongside the passed-unit counterexample. Keep label consistency and alternate settings in view.",
    artifact: "Station comparison",
    icon: "comparison",
    image: "station-fixture",
    checks: [
      "Station and event time aligned",
      "Same-setting passed unit visible",
      "Alternate-station finding retained",
      "Causal explanation remains unresolved",
    ],
  },
  {
    id: "operator",
    name: "Day-to-day operator",
    title: "Make the next evidence task clear.",
    description:
      "Bring inspection findings and source references into the case, with a named owner and a dated next step.",
    artifact: "Evidence task",
    icon: "chronology",
    image: "inspection-board",
    checks: [
      "Open the inspection source",
      "Identify the missing mapping",
      "Keep observations separate from notes",
      "Hand the case to the quality lead",
    ],
  },
];

export const faqs = [
  [
    "Is DefectTrail a live product?",
    "No. This is a research-stage concept with an isolated synthetic demo. Production integrations, product advantage and customer outcomes have not been demonstrated.",
  ],
  [
    "Does it establish the root cause?",
    "The proposed workspace organizes source-linked observations, alternatives and contradictions for human investigation. A correlation is not an established cause. The sample quality lead declines an unsupported root-cause statement.",
  ],
  [
    "Can it quarantine a lot or stop a line?",
    "No. The demo changes only local simulated state. Authorized quality and operations staff own quarantines, line stops and material decisions. There are no machine commands or live writebacks.",
  ],
  [
    "What happens when genealogy is missing?",
    "The absent mapping stays visible, with its affected conclusions and a next evidence task. The demo does not invent a supplier or silently complete the trace.",
  ],
  [
    "Are these confirmed prices?",
    "No. All five prices are indicative interview and conditional-SOW hypotheses, not validated market rates, accepted prices or an active checkout.",
  ],
  [
    "Are MES or QMS integrations connected?",
    "No. Production connectors are future work, subject to permissions, data ownership, integration feasibility and any applicable validation. The demo uses only local synthetic records.",
  ],
  [
    "Where would an evaluation start?",
    "One line, one product family and one selected module. A quality lead, named operator and data owner agree the authorized retrospective protocol, baseline and failure conditions before any real records are used.",
  ],
  [
    "Can I upload real inspection or production records?",
    "No. This public preview has no record-upload feature. Real-data requests belong in a separate human security/legal review with procurement, export and supplier permission as appropriate.",
  ],
  [
    "How would value be measured?",
    "Investigator time to accepted evidence and false-lead count across three blinded historical cases, against a pre-agreed human baseline. Missed contradictory evidence and invented causal claims are failure conditions.",
  ],
  [
    "Could this expand to supplier quality?",
    "That is an expansion hypothesis. It depends on repeatable integrations, supplier permissions and demonstrated fit. Adjacent buyer segments are not combined into one demand count.",
  ],
  [
    "What happens to an inquiry in this preview?",
    "Nothing is sent or stored remotely. The form validates your business context and creates a local reviewable summary. Follow-up permission and optional research updates are separate choices.",
  ],
];

export const sources = [
  {
    name: "Tulip · Genealogy and traceability",
    url: "https://support.tulip.co/docs/genealogy-and-traceability-use-case",
    text: "Documented discrete-assembly workflows link serials, lots, parts and recorded actions. This establishes adjacent capability, not DefectTrail differentiation.",
  },
  {
    name: "Tulip · Manufacturing genealogy",
    url: "https://tulip.co/traceability-and-compliance/genealogy/",
    text: "Point-of-work material, action and inspection records provide traceability context. DefectTrail proposes read-only investigation rather than production capture or station control.",
  },
  {
    name: "Instrumental · NPI investigation",
    url: "https://instrumental.com/accelerate-your-npi-programs/",
    text: "Unit-level inspection, test and process investigation and correlation suggestions are existing adjacent capabilities. A suggested relationship must still be investigated.",
  },
  {
    name: "Instrumental · Data Streams",
    url: "https://instrumental.com/resources/company/launching-instrumental-data-streams/",
    text: "Photos, measurements and other data organized by unit illustrate why source-linked unit context matters. No integration or endorsement is implied.",
  },
];

export const resourceArticles = [
  {
    slug: "example-evidence-packet",
    eyebrow: "SYNTHETIC ARTIFACT",
    title: "What belongs in an evidence packet?",
    description:
      "Read a sample chronology, alternative explanations, source references and a fictional review declining an unsupported cause.",
    image: "review-packet",
  },
  {
    slug: "evidence-and-uncertainty",
    eyebrow: "INVESTIGATION PRACTICE",
    title: "A useful lead must survive a counterexample.",
    description:
      "Separate observations from interpretations and keep missing relationships visible beside the proposed explanation.",
    image: "inspection-board",
  },
  {
    slug: "pilot-protocol",
    eyebrow: "EVALUATION METHOD",
    title: "Three closed cases. A pre-agreed test.",
    description:
      "Define the baseline, evaluator, comparison window and failure threshold before a permissioned retrospective comparison.",
    image: "evidence-folder",
  },
  {
    slug: "research-notes",
    eyebrow: "SOURCES & OPEN QUESTIONS",
    title: "Existing capabilities. Unproven advantage.",
    description:
      "Traceability, inspection and CAPA already exist. Here is the evidence, the alternatives and the benchmark still missing.",
    image: "station-fixture",
  },
];

export const dictionary = [
  [
    "Environment label",
    "DEMO / SIMULATED DATA",
    "Required on every record, screen and export.",
  ],
  [
    "Case and record IDs",
    "DT-103 · R07",
    "Stable fictional identifiers; never production IDs.",
  ],
  [
    "Serial / batch / lot",
    "SN-24017 · L88",
    "Unknown relationships remain explicitly missing.",
  ],
  [
    "Event / recorded / imported time",
    "10 Oct 2026 · UTC",
    "Separate fields; source-recording time is not event time.",
  ],
  [
    "Source and locator",
    "DEMO-I17 · frame 1 · v1",
    "Each observation retains an inspectable source reference.",
  ],
  [
    "Relationship state",
    "Recorded / missing / conflicting",
    "A linked record is not evidence of a root cause.",
  ],
  [
    "Annotation and author",
    "Fictional investigator note",
    "Interpretations stay separate from raw observations.",
  ],
  [
    "Supports / contradicts / unknowns",
    "Record-reference lists",
    "Review retains counterexamples and unanswered questions.",
  ],
  [
    "Draft suspect scope",
    "Manual selection and rationale",
    "Selection does not issue a quarantine or line stop.",
  ],
  [
    "Reviewer / decision / time",
    "Mara Vale — DEMO",
    "Only explicit user action changes local review state.",
  ],
  [
    "Next action / owner / due date",
    "Arden Pike — DEMO",
    "A dated follow-up remains pending until reviewed.",
  ],
  [
    "Packet version / exported time",
    "v1 · local export time",
    "Synthetic labels remain on every exported page.",
  ],
];

export const scoreMetrics = [
  "Time to accepted evidence",
  "False-lead count",
  "Contradictory evidence retained",
];
export const platformLayers = [
  ["Source records", "Inspect the original reference, version and locator."],
  ["Event timestamps", "Keep event, recording and import time separate."],
  [
    "Serial / lot relationships",
    "Follow recorded links, with gaps still visible.",
  ],
  [
    "Gaps and alternatives",
    "Retain what supports, contradicts and remains unknown.",
  ],
  ["Human review", "Assign a reviewer, disposition and dated next action."],
  ["Exportable packet", "Carry a labeled snapshot into the next discussion."],
];

export const allRoutes = [
  "/",
  "/why-change",
  "/solutions",
  "/solutions/quality-directors",
  "/solutions/manufacturing-engineering",
  "/solutions/electronics-discrete-assembly",
  "/solutions/supplier-quality",
  "/products",
  ...products.map((p) => "/products/" + p.id),
  "/platform",
  "/pricing",
  "/results",
  "/evaluation",
  "/request-evaluation",
  "/request-demo",
  "/demo",
  "/demo/evaluation",
  "/demo/cases/DT-101",
  "/demo/cases/DT-102",
  "/demo/cases/DT-103",
  "/demo/cases/DT-101/report",
  "/demo/cases/DT-102/report",
  "/demo/cases/DT-103/report",
  "/resources",
  ...resourceArticles.map((a) => "/resources/" + a.slug),
  "/integrations",
  "/trust",
  "/company",
  "/contact",
  "/waitlist",
  "/sign-in",
  "/access-help",
  "/legal/privacy",
  "/legal/terms",
  "/accessibility",
];
