import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  WarningCircle,
  FileText,
  Database,
  ShieldCheck,
  TreeStructure,
  LockSimple,
  EnvelopeSimple,
} from "@phosphor-icons/react";
import {
  Art,
  Button,
  DemoBadge,
  Eyebrow,
  Meta,
  Notice,
  SectionHead,
  Status,
  TextLink,
  usePageMotion,
  usePreferences,
} from "../lib";
import {
  dictionary,
  faqs,
  products,
  resourceArticles,
  roles,
  sources,
} from "../data/content";
import { PageHero } from "../components/Layout";
import {
  BuyerRoles,
  EvaluationSection,
  FAQ,
  FinalCTA,
  PricingTable,
  ReviewBoundary,
  SharedCase,
} from "../components/Marketing";
import { InquiryForm } from "../components/Forms";
import { ReportPage } from "./Demo";

const protocolRows = [
  [
    "Case sample",
    "Three closed historical incidents, selected with a documented method.",
    "Permissioned and anonymized; do not select only easy successes.",
  ],
  [
    "Human baseline",
    "The existing investigator workflow, tools and evidence access.",
    "Use the same evidence set; document preparation/access differences.",
  ],
  [
    "Accepted evidence",
    "A source-linked item the grader accepts as relevant.",
    "Define before comparison; evidence volume is not evidence quality.",
  ],
  [
    "Time to evidence",
    "Minutes from the standardized start to the accepted evidence set.",
    "Report each case and the median; threshold agreed in advance.",
  ],
  [
    "False leads",
    "Distinct leads the blinded grader rejects under the defined rule.",
    "Record per case; do not change the definition after seeing results.",
  ],
  [
    "Contradiction coverage",
    "Which known contradictory records were surfaced.",
    "No missed contradictory evidence under the agreed rubric.",
  ],
  [
    "Causal claims",
    "Unsupported causes asserted as established.",
    "Failure condition: pause and review.",
  ],
  [
    "Reviewer and blinding",
    "Named quality-lead grader; independent review arrangement.",
    "Document blinding, order/carryover and conflicts of interest.",
  ],
  [
    "Observation window",
    "Task start/end, comparison method and follow-up window.",
    "Agree before work; values are not yet set.",
  ],
  [
    "Decision threshold",
    "Time, false-lead and explicit failure thresholds.",
    "To be pre-registered in the pilot SOW, not invented here.",
  ],
  [
    "Commercial commitment",
    "Qualified buyer → conditional SOW → signed paid commitment.",
    "Count separately from traffic, waitlist and prototype interest.",
  ],
  [
    "Service burden",
    "Preparation, analyst and integration effort.",
    "Separate services costs from software value.",
  ],
];

export function PlatformPage() {
  const ref = usePageMotion();
  return (
    <main id="main" ref={ref}>
      <Meta title="The proposed source-linked platform" />
      <PageHero
        eyebrow="THE SHARED DEFECTTRAIL CASE"
        title={
          <>
            A case with context.
            <br />
            An answer with limits.
          </>
        }
        description="Five separately scoped modules share one proposed evidence model. Sources, annotations, alternatives and reviewer decisions remain inspectable."
        image="evidence-folder"
      >
        <div className="button-row">
          <Button to="/demo">Open the synthetic workbench</Button>
          <TextLink to="/products">Meet the five modules</TextLink>
        </div>
      </PageHero>
      <SharedCase />
      <section className="container section-space">
        <SectionHead
          eyebrow="PROPOSED DATA MODEL"
          title="Provenance is a field, not a footnote."
          description="The dictionary below describes the local synthetic case. It is not a claim of production integration or a verified enterprise deployment."
        />
        <div className="table-wrap dictionary">
          <table>
            <thead>
              <tr>
                <th scope="col">Field group</th>
                <th scope="col">Example</th>
                <th scope="col">Responsibility</th>
              </tr>
            </thead>
            <tbody>
              {dictionary.map(([name, example, rule]) => (
                <tr key={name}>
                  <th scope="row">{name}</th>
                  <td>{example}</td>
                  <td>{rule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="container editorial-columns section-space">
        <div>
          <Eyebrow>READ-ONLY BOUNDARY</Eyebrow>
          <h2>
            Connect the evidence.
            <br />
            Keep authority explicit.
          </h2>
          <p>
            Production connectors are future work. The initial concept uses an
            isolated deterministic demo and a manually assisted evaluation
            workflow. Permissions and source completeness are assessed before
            any real reconstruction.
          </p>
          <TextLink to="/integrations">
            Read future integration requirements
          </TextLink>
        </div>
        <div>
          <Notice>
            A source export does not grant machine-control authority.
            Quarantines, line stops and material decisions remain with
            authorized people.
          </Notice>
          <h3>Reversible evidence export</h3>
          <p>
            The labeled packet retains its version, sources, assumptions and
            unresolved items. Export does not overwrite the original source or
            execute an external action.
          </p>
          <TextLink to="/resources/example-evidence-packet">
            Read the sample packet
          </TextLink>
        </div>
      </section>
    </main>
  );
}
export function PricingPage() {
  const ref = usePageMotion();
  return (
    <main id="main" ref={ref}>
      <Meta title="Five indicative pilot price hypotheses" />
      <PageHero
        eyebrow="PROPOSED COMMERCIAL MODEL"
        title={
          <>
            Start with one module.
            <br />
            Agree a useful test.
          </>
        }
        description="Five separately quotable offers. Every amount below is an interview and conditional-SOW hypothesis, not a verified market rate or an accepted current price."
        image="review-packet"
      >
        <Button to="/request-evaluation">Discuss a paid evaluation</Button>
      </PageHero>
      <section className="container pricing-page-table">
        <Eyebrow>INDICATIVE PILOT PRICE HYPOTHESES · USD</Eyebrow>
        <PricingTable />
        <Notice>
          No active checkout, subscription provisioning or payment collection.
          No savings, accuracy or performance guarantee is published.
        </Notice>
      </section>
      <section className="container section-space">
        <SectionHead title="The quote starts with the responsibility." />
        <div className="editorial-columns">
          <div>
            <h3>Agree the scope</h3>
            <p>
              Select one module, one line and one product family first. Define a
              case, line or site; data preparation; included analyst review;
              services and integration costs; and the evidence packet to be
              delivered.
            </p>
            <h3>Agree the test</h3>
            <p>
              Pre-register the baseline, evaluator, comparison method,
              observation window and failure threshold. A three-case
              retrospective comparison does not establish broad product
              performance.
            </p>
          </div>
          <div>
            <h3>Agree the permission</h3>
            <p>
              Appropriate procurement/legal authorization and an approved
              anonymized MES/QMS export precede real-data use. Supplier
              permissions and proprietary imagery must be addressed separately.
            </p>
            <h3>Agree the decision gate</h3>
            <p>
              Proceed beyond demo only with signed quality-lead scope, approved
              export and a blinded comparison showing fewer false leads without
              missed contradictory evidence.
            </p>
          </div>
        </div>
        <div className="button-row">
          <Button to="/request-evaluation">
            Request a scoped conversation
          </Button>
          <TextLink to="/evaluation">Read the pilot protocol</TextLink>
        </div>
      </section>
      <FAQ all />
    </main>
  );
}
export function EvaluationPage({ results = false }) {
  const ref = usePageMotion();
  return (
    <main id="main" ref={ref}>
      <Meta
        title={
          results
            ? "How value would be measured"
            : "The proposed evaluation protocol"
        }
      />
      <PageHero
        eyebrow={
          results ? "METHOD BEFORE METRICS" : "A PERMISSIONED EVALUATION"
        }
        title={
          results ? (
            <>
              Evidence of value
              <br />
              starts with a baseline.
            </>
          ) : (
            <>
              Three closed cases.
              <br />A pre-agreed test.
            </>
          )
        }
        description={
          results
            ? "Customer outcomes have not been demonstrated. Here is the proposed measurement method, with every result still unmeasured."
            : "Nominate a quality-lead grader, a named operator and the data owner. Agree the comparator and evidence standard before any real records are used."
        }
      >
        <div className="button-row">
          <Button to="/request-evaluation">Discuss a paid evaluation</Button>
          <TextLink to="/demo/evaluation">
            View simulated evaluation slots
          </TextLink>
        </div>
      </PageHero>
      <EvaluationSection standalone />
      <section className="container section-space">
        <SectionHead
          eyebrow="PRE-REGISTRATION WORKSHEET"
          title="Define the comparison before the work."
          description="The pilot SOW fixes these definitions in advance. Baseline, evaluator, observation window and thresholds have not been agreed or measured for this concept."
        />
        <div className="table-wrap protocol-table">
          <table>
            <thead>
              <tr>
                <th>Dimension</th>
                <th>Definition</th>
                <th>Acceptance treatment</th>
              </tr>
            </thead>
            <tbody>
              {protocolRows.map(([name, definition, acceptance]) => (
                <tr key={name}>
                  <th scope="row">{name}</th>
                  <td>{definition}</td>
                  <td>{acceptance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="decision-gate">
        <div className="container">
          <Eyebrow light>GO / NO-GO</Eyebrow>
          <h2>
            Pause when the evidence
            <br />
            or permission is missing.
          </h2>
          <p>
            Proceed beyond demo only after quality-lead sign-off on the
            supervised paid pilot, legal approval of the anonymized export, and
            a blinded comparison that meets the pre-agreed criteria.
          </p>
          <p>
            If permission, safety sign-off or a historical comparator is
            unavailable, pause. Do not take an autonomous-control shortcut to
            manufacture value.
          </p>
          <Button to="/request-evaluation" className="button-light">
            Review evaluation readiness
          </Button>
        </div>
      </section>
    </main>
  );
}
export function SolutionsPage() {
  const ref = usePageMotion();
  return (
    <main id="main" ref={ref}>
      <Meta title="Quality investigation workflows" />
      <PageHero
        eyebrow="THE PEOPLE BEHIND THE INVESTIGATION"
        title={
          <>
            A shared case.
            <br />
            Distinct responsibilities.
          </>
        }
        description="The first contracting context is electronics or discrete assembly: a quality director with a manufacturing engineering lead, a named operator and a data/integration owner."
        image="station-fixture"
      >
        <Button to="/request-evaluation">Discuss your workflow</Button>
      </PageHero>
      <BuyerRoles />
      <section className="container solutions-context section-space">
        <div>
          <Eyebrow>FIRST INDUSTRY CONTEXT</Eyebrow>
          <h2>
            Electronics and
            <br />
            discrete assembly.
          </h2>
          <p>
            Inspection images, process settings, serial genealogy and
            incoming-lot records frame the first proposed evaluation. Start at
            one line and product family.
          </p>
          <TextLink to="/solutions/electronics-discrete-assembly">
            Explore the serialized workflow
          </TextLink>
        </div>
        <div>
          <Eyebrow>FUTURE EXPANSION HYPOTHESIS</Eyebrow>
          <h2>
            Supplier quality,
            <br />
            if the first test holds.
          </h2>
          <p>
            Cross-factory supplier investigations and recurring CAPA depend on
            repeatable integrations, permissions and human trust. They are not
            proven demand or one combined buyer market.
          </p>
          <TextLink to="/solutions/supplier-quality">
            Read the expansion hypothesis
          </TextLink>
        </div>
      </section>
    </main>
  );
}
const solutionCopy = {
  "quality-directors": {
    eyebrow: "FOR THE ACCOUNTABLE QUALITY DIRECTOR",
    title: "A defensible review begins with inspectable evidence.",
    description:
      "Grade evidence sufficiency and false leads before a consequential decision. The quality director is the primary budget and accountability owner in the proposed electronics/discrete-assembly evaluation.",
    image: "review-packet",
    points: [
      [
        "Review the whole case",
        "Inspect the accepted sources, rejected explanation, missing genealogy and named next action.",
      ],
      [
        "Own the evaluation standard",
        "Agree the baseline, grader, observation window and failure threshold before the retrospective comparison.",
      ],
      [
        "Keep physical authority explicit",
        "Quarantines and line stops remain decisions for authorized quality and operations staff.",
      ],
    ],
    modules: ["defect-desk", "defect-signal", "defect-report"],
  },
  "manufacturing-engineering": {
    eyebrow: "FOR THE MANUFACTURING ENGINEERING LEAD",
    title: "Challenge the process explanation before narrowing the cause.",
    description:
      "Compare station observations with inspection findings, a same-setting passed unit and alternate-station evidence. Keep interpretations attached to their sources.",
    image: "station-fixture",
    points: [
      [
        "Align the process context",
        "Separate event time from record and import time. Examine the source setting rather than a summary alone.",
      ],
      [
        "Keep the counterexample",
        "A passed unit at the same setting makes the first explanation incomplete. Review the alternative station finding too.",
      ],
      [
        "Name the next evidence task",
        "Request missing mappings and label-consistency checks. Do not fill gaps with confident assumptions.",
      ],
    ],
    modules: ["defect-review", "defect-proof", "defect-report"],
  },
  "electronics-discrete-assembly": {
    eyebrow: "FIRST CONTRACTING CONTEXT",
    title: "One serialized assembly. A source-linked investigation.",
    description:
      "A proposed read-only investigation workflow for electronics and discrete-assembly manufacturers, with a quality director, manufacturing engineering lead, operator and data owner.",
    image: "exploded-assembly",
    points: [
      [
        "Begin with the observed finding",
        "Open the synthetic inspection for SN-24017 and retain the image reference, source locator and timestamp.",
      ],
      [
        "Follow the recorded relations",
        "Read station S04 and incoming lot L88, with the supplier mapping for SN-24018 still missing.",
      ],
      [
        "Prepare a human review",
        "Keep both counterexamples and alternative explanations in the reviewer packet. No root cause or containment action is invented.",
      ],
    ],
    modules: ["defect-desk", "defect-review", "defect-proof"],
  },
  "supplier-quality": {
    eyebrow: "FUTURE EXPANSION HYPOTHESIS",
    title: "Across suppliers, only if the evidence can travel.",
    description:
      "Cross-factory supplier quality and recurring CAPA are expansion hypotheses after a one-line evaluation. Supplier permissions, repeatable integrations and demonstrated fit remain unresolved.",
    image: "evidence-folder",
    points: [
      [
        "Start at one line first",
        "Do not extrapolate one plant’s defect burden into a market figure or treat adjacent buyer segments as one demand count.",
      ],
      [
        "Respect supplier permissions",
        "Proprietary imagery, genealogy gaps and ownership of source records may restrict a cross-factory reconstruction.",
      ],
      [
        "Test repeatable integration",
        "Expansion depends on the cost of data preparation, incumbent MES/QMS integration and an approved human workflow.",
      ],
    ],
    modules: ["defect-review", "defect-signal", "defect-report"],
  },
};
export function SolutionPage() {
  const { solutionId } = useParams();
  const data = solutionCopy[solutionId];
  const ref = usePageMotion();
  if (!data) return <NotFound />;
  return (
    <main id="main" ref={ref}>
      <Meta title={data.eyebrow} />
      <PageHero
        {...data}
        eyebrow={data.eyebrow}
        title={data.title}
        image={data.image}
      >
        <div className="button-row">
          <Button to="/request-evaluation">Discuss this workflow</Button>
          <TextLink to="/demo/cases/DT-103">
            Inspect the synthetic trace
          </TextLink>
        </div>
      </PageHero>
      <section className="container solution-process section-space">
        <SectionHead title="Make the responsibility concrete." />
        <ol className="numbered-process">
          {data.points.map(([title, text], i) => (
            <li key={title}>
              <span>{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="container recommended-modules section-space">
        <SectionHead
          eyebrow="RELEVANT PROPOSED MODULES"
          title="Separate jobs. Relevant evidence."
        />
        {data.modules.map((id) => {
          const p = products.find((p) => p.id === id);
          return (
            <div className="recommended-row" key={id}>
              <h3>{p.name}</h3>
              <p>{p.job}</p>
              <TextLink to={"/products/" + id}>Explore the module</TextLink>
            </div>
          );
        })}
      </section>
      <ReviewBoundary />
      <FinalCTA form={false} />
    </main>
  );
}
export function ResourcesPage() {
  const ref = usePageMotion();
  return (
    <main id="main" ref={ref}>
      <Meta title="Evidence, uncertainty and evaluation resources" />
      <PageHero
        eyebrow="READ THE WORK, NOT A CLAIM"
        title={
          <>
            Evidence, uncertainty,
            <br />
            and the next question.
          </>
        }
        description="Synthetic artifacts, the proposed evaluation method and direct sources. Nothing here is customer proof or evidence of a live integration."
      />
      <section className="container resource-grid">
        {resourceArticles.map((a) => (
          <article key={a.slug} data-reveal>
            <Link to={"/resources/" + a.slug} tabIndex={-1} aria-hidden="true">
              <Art name={a.image} alt="" />
            </Link>
            <Eyebrow>{a.eyebrow}</Eyebrow>
            <h2>
              <Link to={"/resources/" + a.slug}>{a.title}</Link>
            </h2>
            <p>{a.description}</p>
            <TextLink to={"/resources/" + a.slug}>Read the resource</TextLink>
          </article>
        ))}
      </section>
    </main>
  );
}
export function ArticlePage() {
  const { slug } = useParams();
  if (slug === "example-evidence-packet") return <ReportPage sample />;
  if (slug === "pilot-protocol") return <EvaluationPage />;
  if (slug === "research-notes") return <ResearchPage />;
  if (slug !== "evidence-and-uncertainty") return <NotFound />;
  return (
    <main id="main">
      <Meta title="Evidence and uncertainty" />
      <PageHero
        eyebrow="INVESTIGATION PRACTICE"
        title={
          <>
            A useful lead must
            <br />
            survive a counterexample.
          </>
        }
        description="Separate what a source records from what an investigator proposes. The alternatives and missing links belong beside the explanation, not behind a confidence score."
        image="inspection-board"
      />
      <article className="container reading-column section-space">
        <h2>Observation, relationship, interpretation.</h2>
        <p>
          An inspection finding is an observation. A recorded serial-to-lot
          mapping is a relationship. A claim that a station setting caused a
          defect is an interpretation requiring evidence beyond a sequence in
          time.
        </p>
        <p>
          In the synthetic DT-103 case, S04’s setting precedes the inspection
          finding. SN-24016 passed at that same setting and lot. SN-24019 failed
          at an alternate station and setting. These records make a single
          confident cause unsupported.
        </p>
        <h2>Do not silently repair a missing link.</h2>
        <p>
          SN-24018 has no supplier mapping in the fictional record bundle. That
          branch remains unresolved. An absent link affects which conclusions
          the reviewer can reasonably draw; it does not establish a supplier
          fault.
        </p>
        <h2>Make the counterexample easy to inspect.</h2>
        <p>
          Put the contradictory record next to the proposed explanation. Retain
          its reference, locator, event time and source version. Keep a later
          analyst note separate from the original source.
        </p>
        <h2>Make the decision attributable.</h2>
        <p>
          The fictional quality lead rejects the unsupported cause, assigns a
          next evidence task and exports a packet. The local demo records the
          review; it does not issue a quarantine or stop a line.
        </p>
        <div className="button-row">
          <Button to="/demo/cases/DT-103">Inspect this synthetic case</Button>
          <TextLink to="/resources/example-evidence-packet">
            Read the reviewer packet
          </TextLink>
        </div>
      </article>
    </main>
  );
}
export function ResearchPage() {
  return (
    <main id="main">
      <Meta title="Research notes and adjacent capabilities" />
      <PageHero
        eyebrow="SOURCES & UNANSWERED QUESTIONS"
        title={
          <>
            Existing capabilities.
            <br />
            Unproven advantage.
          </>
        }
        description="Traceability, vision inspection, genealogy and CAPA already exist. These official sources frame the workflow; they do not prove a DefectTrail advantage or imply endorsement."
      />
      <section className="container section-space">
        <div className="source-ledger">
          {sources.map((s, i) => (
            <article key={s.url}>
              <span className="source-ledger-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2>
                  <a href={s.url} target="_blank" rel="noreferrer">
                    {s.name}
                    <ArrowUpRight size={19} />
                  </a>
                </h2>
                <p>{s.text}</p>
                <small>
                  Official vendor source · researched 23 October 2026 · no
                  endorsement implied
                </small>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="container editorial-columns section-space">
        <div>
          <h2>Adjacent alternatives</h2>
          <p>
            Tulip, Instrumental, Siemens/MES and QMS suites sit alongside
            existing 8D/CAPA routines, vision inspection, genealogy databases
            and veteran process engineers. Investigation assistance is distinct
            from autonomous defect diagnosis.
          </p>
          <h3>Acquisition hypotheses</h3>
          <p>
            Contract manufacturers, OEM supplier-quality teams, manufacturing
            engineering consultancies, quality associations and plant-specific
            audit engagements may support conversations. They are not achieved
            distribution or a pooled demand count.
          </p>
        </div>
        <div>
          <h2>Evidence strength</h2>
          <ul className="evidence-strength">
            <li>
              <strong>High</strong>Documented existence of adjacent vendor
              capabilities.
            </li>
            <li>
              <strong>Medium</strong>Workflow fit for a proposed investigation
              overlay.
            </li>
            <li>
              <strong>Low</strong>Causal inference and the buyer’s tested
              budget.
            </li>
            <li>
              <strong>Gap</strong>An actual historical-incident reconstruction
              benchmark.
            </li>
          </ul>
        </div>
      </section>
      <section className="container section-space reading-column">
        <h2>The question still to test</h2>
        <p>
          Can a permissioned, independently graded reconstruction locate
          accepted evidence faster, with fewer false leads, while retaining
          contradictory evidence and justified uncertainty?
        </p>
        <p>
          Any future market estimate must use verified buyer counts, tested
          annual contract value and reachable share, accounting for services and
          integration costs. Sector spend, equipment capex or one plant’s defect
          burden are not software revenue.
        </p>
        <TextLink to="/evaluation">Read the proposed comparison</TextLink>
      </section>
    </main>
  );
}
export function FormPage({ kind = "evaluation" }) {
  const cfg = {
    evaluation: [
      "PAID EVALUATION / READINESS",
      "Agree what a useful answer looks like.",
      "Tell us the business context, people and permission readiness for a supervised evaluation. Do not include production records.",
    ],
    demo: [
      "GUIDED WALKTHROUGH REQUEST",
      "Walk through a source-linked case.",
      "Choose a proposed module and review a synthetic case with its provenance, missingness and human decision boundary.",
    ],
    contact: [
      "CONTACT / BUSINESS CONTEXT ONLY",
      "Start with the question.",
      "Product, evaluation, data-access and privacy inquiries. This local preview does not send a message or publish an address.",
    ],
    waitlist: [
      "OPTIONAL RESEARCH UPDATES",
      "Stay close to the evidence.",
      "Explicit-consent research interest is a weak signal, separate from qualified paid-pilot commitment. No signup is sent from this preview.",
    ],
  }[kind];
  return (
    <main id="main" className="form-page">
      <Meta title={cfg[1]} />
      <div className="container form-page-layout">
        <div className="form-page-copy">
          <Eyebrow>{cfg[0]}</Eyebrow>
          <h1>{cfg[1]}</h1>
          <p className="page-lead">{cfg[2]}</p>
          <Art
            name={kind === "demo" ? "exploded-assembly" : "review-packet"}
            alt="Original synthetic investigation packet"
          />
          <div className="form-next-steps">
            <h2>What a real inquiry would lead to</h2>
            <ol>
              <li>Manually reviewed discovery.</li>
              <li>Permission and comparator agreement.</li>
              <li>Three closed-case retrospective review.</li>
              <li>A conditional paid pilot and go/no-go.</li>
            </ol>
            <p className="small">
              No response time, booking, signed scope or export permission is
              implied by this preview.
            </p>
            <TextLink to="/trust">Read data and review boundaries</TextLink>
          </div>
        </div>
        <div className="form-page-form">
          <InquiryForm kind={kind} />
        </div>
      </div>
    </main>
  );
}

const infoConfigs = {
  "/why-change": {
    eyebrow: "THE INVESTIGATION PROBLEM",
    title: (
      <>
        The defect is visible.
        <br />
        Its full story is scattered.
      </>
    ),
    description:
      "Inspection images, station settings and supplier-lot records live in different systems. Correlating them takes investigator attention—and a relationship in time can be mistaken for a cause.",
    image: "factory-panorama",
    sections: [
      [
        "A sequence is not an explanation.",
        "A station change before a finding is worth investigating. A passed unit at the same setting and an alternate-station failure may make the simple explanation incomplete. Keep both supporting and contradicting evidence.",
      ],
      [
        "Missing genealogy changes the question.",
        "An incomplete serial mapping can limit the candidate scope. Proprietary imagery, label drift and supplier permissions are separate data constraints, not reasons to invent a relationship.",
      ],
      [
        "Existing tools and expertise matter.",
        "MES/QMS suites, vision inspection, genealogy databases, existing 8D/CAPA routines and experienced process engineers are legitimate alternatives. A proposed overlay must demonstrate its advantage in a historical comparison.",
      ],
    ],
    link: ["/demo", "Inspect the synthetic workflow"],
  },
  "/integrations": {
    eyebrow: "FUTURE INTEGRATION REQUIREMENTS",
    title: (
      <>
        An authorized export,
        <br />
        before a connector claim.
      </>
    ),
    description:
      "There are no production MES/QMS connections in this concept. The initial demo is isolated; real-data reconstruction requires a separate approved process.",
    image: "evidence-folder",
    sections: [
      [
        "1. Identify the data owner.",
        "Recruit a named integration owner and determine who owns the serial genealogy, station history, inspection imagery and supplier records. Do not assume a buyer’s interest grants access.",
      ],
      [
        "2. Agree the permission and scope.",
        "Appropriate procurement/legal review and any supplier permissions precede real records. Select the minimum anonymized MES/QMS export needed for three closed incidents. Public forms accept no operational uploads.",
      ],
      [
        "3. Assess completeness and provenance.",
        "Preserve source references, versions, timestamps and locators. Record missing genealogy and label inconsistency explicitly. Regulated validation and incumbent integrations may create additional work; none is claimed complete.",
      ],
      [
        "4. Keep the review read-only.",
        "The proposed evaluation prepares source-linked packets. It does not write back, issue commands, dispatch work, stop a line or quarantine material.",
      ],
    ],
    link: ["/request-evaluation", "Discuss dataset readiness"],
  },
  "/company": {
    eyebrow: "ABOUT THE WORKING CONCEPT",
    title: (
      <>
        Follow the evidence.
        <br />
        Keep the uncertainty.
      </>
    ),
    description:
      "DefectTrail is a research-stage concept for accountable quality investigation in electronics and discrete assembly. Product advantage, buyer budget and repeatable integration remain unproven.",
    image: "review-packet",
    sections: [
      [
        "Our vision",
        "Quality teams can trace evidence and counterexamples across incidents before authorized containment and CAPA decisions.",
      ],
      [
        "Our mission",
        "Help quality directors and manufacturing engineering leads move from fragmented evidence to defensible human-approved decisions, with provenance and explicit uncertainty.",
      ],
      [
        "The first job",
        "Reconstruct a defective lot without inventing its root cause. Start at one line and product family, with a named operator, data owner and quality-lead grader.",
      ],
      [
        "What is not established",
        "This is not an operating production product, a verified company/domain or trademark, or evidence of customers, funding, revenue, accepted pricing, published performance or connected integrations. Team details and legal identity will be added only after verification.",
      ],
    ],
    link: ["/contact", "Start a business-context inquiry"],
  },
  "/legal/privacy": {
    eyebrow: "DRAFT PRIVACY NOTICE / LOCAL PREVIEW",
    title: (
      <>
        Keep business context
        <br />
        separate from operational records.
      </>
    ),
    description:
      "This draft describes the actual local preview. It is not a launch-ready notice for a verified legal entity or connected lead service.",
    sections: [
      [
        "Local form behavior",
        "Inquiries remain in the current page’s memory. No form values are sent to a lead service, email provider, calendar or analytics endpoint. Clearing the inquiry or reloading removes the current local form state. A copy action writes only to your clipboard.",
      ],
      [
        "Synthetic demo records",
        "Every demo organization, person, asset and event is fictional. Case review state is memory-only and resets on reload or the explicit reset control. Packet exports are local downloads, with synthetic labels retained.",
      ],
      [
        "Preferences and diagnostics",
        "The motion preference alone may be stored in localStorage. Optional interaction diagnostics require an explicit choice and are memory-only, with no external analytics request. They never include form values or operational records.",
      ],
      [
        "Consent and deletion",
        "Follow-up permission and optional research updates are separate form choices. No message is sent in this preview. For local removal, clear the inquiry, reset the demo and clear site storage. A verified privacy/deletion contact and operational deletion process must exist before a real connected launch.",
      ],
      [
        "Before public data collection",
        "The actual controller/legal entity, contact, processors, hosting, retention periods, consent behavior, security measures and deletion process require review and disclosure. No encryption, regional-residency, regulatory or certification claim is made here.",
      ],
    ],
    link: ["/accessibility", "Review preferences and local diagnostics"],
  },
  "/legal/terms": {
    eyebrow: "DRAFT CONCEPT / DEMO TERMS",
    title: (
      <>
        A synthetic preview.
        <br />
        An explicit boundary.
      </>
    ),
    description:
      "A draft explanation for evaluating a non-operating concept. This page does not create a production-service agreement, accepted commercial quote or verified company identity.",
    sections: [
      [
        "Purpose of the preview",
        "The site explains five proposed quality-investigation offers and an isolated deterministic demonstration. All examples are invented. No production integration, live telemetry, actual customer, signed revenue or achieved result is represented.",
      ],
      [
        "Human decision ownership",
        "The demo offers evidence and draft rationale. Authorized people own consequential decisions, including physical containment, quarantines and line stops. There are no machine commands, live writebacks or dispatches.",
      ],
      [
        "Commercial hypotheses",
        "Prices are test hypotheses for interviews and a conditional paid SOW. They are not accepted current offers, guarantees, market rates or active checkout. No payment is collected.",
      ],
      [
        "Use of source material",
        "The illustrations and fictional text were created for this concept. External sources are attributed for workflow context, without endorsement. No proprietary inspection image, regulator logo or competitor UI is used as product proof.",
      ],
      [
        "Future operating terms",
        "A verified entity, approved name/domain, actual service scope, security/legal review, permissioned data handling and signed evaluation SOW must precede any real pilot. These draft terms must be reviewed before public operational use.",
      ],
    ],
    link: ["/trust", "Read the responsibility boundary"],
  },
  "/access-help": {
    eyebrow: "WORKSPACE ACCESS / HELP",
    title: (
      <>
        Access starts with
        <br />
        an agreed evaluation.
      </>
    ),
    description:
      "Authentication and email delivery are not connected in this concept. You can explore the isolated synthetic workbench without an account.",
    image: "evidence-folder",
    sections: [
      [
        "For an evaluation team",
        "A future permissioned workspace would be arranged after the quality lead, operator and integration owner agree the scope and data process. There is no open self-service production registration.",
      ],
      [
        "No reset email is sent here",
        "The access screen validates a work-email format but does not authenticate, create an account or deliver a secure link. The synthetic demo contains no personal or production records.",
      ],
    ],
    link: ["/demo", "Open the synthetic demo"],
  },
};
export function InfoPage({ path }) {
  const ref = usePageMotion();
  const config = infoConfigs[path];
  if (!config) return <NotFound />;
  return (
    <main id="main" ref={ref}>
      <Meta
        title={typeof config.title === "string" ? config.title : config.eyebrow}
      />
      <PageHero {...config}>
        <TextLink to={config.link[0]}>{config.link[1]}</TextLink>
      </PageHero>
      <article
        className={
          "container editorial-sections section-space " +
          (!config.image ? "reading-column" : "")
        }
      >
        {config.sections.map(([title, body], i) => (
          <section key={title} data-reveal>
            <span className="editorial-index">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h2>{title}</h2>
              <p>{body}</p>
            </div>
          </section>
        ))}
      </article>
      {path === "/why-change" && (
        <section className="container section-space">
          <SectionHead title="The next step is a test, not a promise." />
          <Button to="/evaluation">Read the evaluation protocol</Button>
          <TextLink to="/resources/research-notes">
            Review the adjacent capabilities
          </TextLink>
        </section>
      )}
    </main>
  );
}
export function TrustPage() {
  const ref = usePageMotion();
  return (
    <main id="main" ref={ref}>
      <Meta title="Data access and human review boundaries" />
      <PageHero
        eyebrow="RESPONSIBILITY / DATA / CONTROL"
        title={
          <>
            Evidence can be shared.
            <br />
            Authority cannot be assumed.
          </>
        }
        description="DefectTrail proposes read-only investigation assistance. Data permission and physical decision authority are distinct responsibilities."
        image="evidence-folder"
      >
        <TextLink to="/demo/cases/DT-103">
          Inspect the synthetic boundary
        </TextLink>
      </PageHero>
      <ReviewBoundary standalone />
      <section className="container section-space editorial-columns">
        <div>
          <Eyebrow>DATA ACCESS</Eyebrow>
          <h2>
            The record may
            <br />
            have limits.
          </h2>
          <p>
            Incomplete serial genealogy, proprietary imagery, label drift and
            supplier permission can restrict reconstruction. A data owner and
            appropriate procurement/legal approval are required before real
            records are used.
          </p>
          <p>
            Production MES/QMS connectors and any regulated validation are
            future work. The public preview has no operational upload,
            production read access or live source connection.
          </p>
        </div>
        <div>
          <Eyebrow>PHYSICAL / CONTROL AUTHORITY</Eyebrow>
          <h2>
            The review does not
            <br />
            execute the action.
          </h2>
          <p>
            Quality/operations staff own quarantines, line stops and material
            decisions. Selecting a lot in the synthetic demo only changes a
            local draft suspect scope. A saved review is not an authenticated
            signature.
          </p>
          <p>
            No machine commands, dispatch, automated containment, live
            writeback, safety guarantee or compliance certification is claimed.
          </p>
        </div>
      </section>
      <section className="container section-space">
        <SectionHead title="What the preview actually does." />
        <div className="trust-facts">
          <div>
            <h3>Local synthetic state</h3>
            <p>
              Case review changes stay in memory. Reload or reset restores the
              seed.
            </p>
          </div>
          <div>
            <h3>Labeled local export</h3>
            <p>
              HTML and JSON packets retain demo labels, sources, alternatives
              and the no-control boundary.
            </p>
          </div>
          <div>
            <h3>Unconnected inquiries</h3>
            <p>
              Forms validate and create a local summary; no inquiry, booking or
              email is sent.
            </p>
          </div>
        </div>
        <div className="button-row">
          <TextLink to="/legal/privacy">Read the draft privacy notice</TextLink>
          <TextLink to="/integrations">
            Review future data requirements
          </TextLink>
        </div>
      </section>
    </main>
  );
}
export function AccessibilityPage() {
  const {
    reduceMotion,
    setReduceMotion,
    systemReduce,
    analyticsConsent,
    setAnalyticsConsent,
    events,
  } = usePreferences();
  return (
    <main id="main">
      <Meta title="Accessibility and local preferences" />
      <PageHero
        eyebrow="READABILITY / INPUT / MOTION"
        title={
          <>
            The evidence should
            <br />
            remain accessible.
          </>
        }
        description="A visible reading order, keyboard access, reduced-motion still states and explicit labels are part of this preview’s design. This page does not claim certified conformance."
      />
      <section className="container reading-column section-space">
        <h2>Motion preference</h2>
        <label className="preference-control">
          <input
            type="checkbox"
            checked={reduceMotion || systemReduce}
            disabled={systemReduce}
            onChange={(e) => setReduceMotion(e.target.checked)}
          />
          <span>Reduce nonessential motion</span>
        </label>
        <p>
          {systemReduce
            ? "Your operating system requests reduced motion. That preference takes precedence."
            : "This preference is stored locally. It removes scroll pinning and nonessential reveal motion while retaining complete content."}
        </p>
        <h2>Keyboard and reading order</h2>
        <p>
          Use the skip link to reach content. Navigation menus, mobile dialog,
          source dialogs, case controls, tabs, FAQ disclosures and forms are
          keyboard reachable. Escape closes dialogs. Important source
          information remains visible without hover.
        </p>
        <h2>Local interaction diagnostics</h2>
        <p>
          Off by default. This optional diagnostic records only allowed event
          names and opaque module/case identifiers in page memory. Nothing is
          transmitted, no form values are recorded, and the list clears on
          reload.
        </p>
        <label className="preference-control">
          <input
            type="checkbox"
            checked={analyticsConsent}
            onChange={(e) => setAnalyticsConsent(e.target.checked)}
          />
          <span>Enable memory-only interaction diagnostics</span>
        </label>
        <div className="local-events">
          <h3>Local event log</h3>
          {!events.length ? (
            <p>No diagnostic events recorded.</p>
          ) : (
            <ol>
              {events.slice(-12).map((e, i) => (
                <li key={i}>
                  <code>{e.name}</code>
                  <span>
                    {e.offerId ||
                      e.route ||
                      e.location ||
                      e.caseId ||
                      e.formId ||
                      "Local interaction"}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
        <h2>Alternative formats and questions</h2>
        <p>
          The evidence packet can be read as semantic HTML, exported as JSON, or
          printed. For a future live launch, accessibility questions and
          deletion requests require a verified contact process.
        </p>
        <TextLink to="/contact">Review a business-context inquiry</TextLink>
      </section>
    </main>
  );
}
export function SignInPage() {
  const [email, setEmail] = useState("");
  const [previewed, setPreviewed] = useState(false);
  return (
    <main id="main" className="sign-in-page">
      <Meta title="Workspace access — concept preview" />
      <div className="container sign-in-layout">
        <div>
          <Eyebrow>CONTROLLED WORKSPACE ACCESS</Eyebrow>
          <h1>
            A case with context.
            <br />A team with permission.
          </h1>
          <p className="page-lead">
            Workspace access would follow an agreed evaluation scope. The
            isolated synthetic demo is available without signing in.
          </p>
          <Art
            name="evidence-folder"
            alt="Original fictional evidence case folder"
          />
          <DemoBadge />
        </div>
        <section className="access-panel">
          <LockSimple size={28} weight="light" />
          <h2>Workspace access</h2>
          <p>
            Concept presentation · Authentication and email delivery are not
            connected.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setPreviewed(true);
            }}
          >
            <label className="field">
              <span>Work email</span>
              <input
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setPreviewed(false);
                }}
              />
            </label>
            <Button type="submit">Preview access request</Button>
            {previewed && (
              <Notice>
                Address format accepted. No account was created, no secure link
                was sent, and no authentication occurred.
              </Notice>
            )}
          </form>
          <TextLink to="/access-help">Access or recovery help</TextLink>
          <div className="access-divider">Explore without an account</div>
          <Button to="/demo" secondary>
            Open the synthetic demo
          </Button>
          <p className="small">
            Do not enter credentials or production records.{" "}
            <Link to="/legal/privacy">Privacy notice</Link>.
          </p>
        </section>
      </div>
    </main>
  );
}
export function NotFound() {
  return (
    <main id="main" className="not-found container">
      <Meta title="Page not found" />
      <TreeStructure size={54} weight="thin" />
      <Eyebrow>404 / AN UNRESOLVED PATH</Eyebrow>
      <h1>
        This trail needs
        <br />
        another direction.
      </h1>
      <p>
        The page could not be found. The evidence and proposed modules are still
        available.
      </p>
      <div className="button-row">
        <Button to="/">Return home</Button>
        <TextLink to="/products">Explore the five modules</TextLink>
        <TextLink to="/demo">Open the synthetic demo</TextLink>
      </div>
    </main>
  );
}
