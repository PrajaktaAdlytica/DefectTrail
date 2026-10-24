import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowsClockwise,
  DownloadSimple,
  FileText,
  MagnifyingGlass,
  Printer,
  CheckCircle,
  WarningCircle,
  Info,
} from "@phosphor-icons/react";
import {
  Art,
  Button,
  DemoBadge,
  Eyebrow,
  Meta,
  Notice,
  Status,
  TextLink,
} from "../lib";
import {
  cases,
  caseById,
  demoAccount,
  evidenceCount,
  makePacket,
  packetHtml,
  downloadFile,
  readableDate,
  readableTime,
  fullTime,
} from "../data/demo";
import {
  Workbench,
  ReviewerForm,
  SourceDialog,
  useDemo,
} from "../components/Workbench";
import { NotFound } from "./Editorial";

export function DemoPage() {
  const { caseId } = useParams();
  const [params] = useSearchParams();
  const c = caseId ? caseById[caseId] : cases[2];
  const { reset, reviews } = useDemo();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [notice, setNotice] = useState(false);
  const [source, setSource] = useState(null);
  const [disclosed, setDisclosed] = useState(false);
  useEffect(() => {
    if (c && params.get("source"))
      setSource(c.sources.find((s) => s.id === params.get("source")) || null);
  }, [c?.id, params.get("source")]);
  if (!c) return <NotFound />;
  return (
    <main id="main" className="demo-page">
      <Meta title="Synthetic quality investigation workbench" />
      <div className="demo-persistent">
        <DemoBadge />
        <span>No machine control · No real records</span>
        <TextLink to="/demo/evaluation">Evaluation workspace</TextLink>
      </div>
      <section className="demo-page-heading container-wide">
        <div>
          <Eyebrow>ISOLATED PRODUCT PREVIEW</Eyebrow>
          <h1>Follow the evidence.</h1>
          <p>
            One fictional serialized case. The sources, counterexamples and next
            evidence task stay visible.
          </p>
        </div>
        <button
          className="button button-secondary"
          onClick={() => {
            reset();
            setSearch("");
            setFilter("all");
            setNotice(true);
          }}
        >
          <ArrowsClockwise size={18} />
          Reset synthetic demo
        </button>
      </section>
      <div className="container-wide">
        <Notice>
          This is a deterministic, memory-only demonstration. Every
          organization, person, source and event is fictional. No live
          integration, production asset or operating customer is represented.
        </Notice>
        {!disclosed && (
          <div className="demo-orientation">
            <div>
              <h2>Inspect. Compare. Review locally.</h2>
              <p>
                Open a source to see event, recorded and import times. Review
                the counterevidence before saving a simulated decision. Export
                the labeled packet or reset the seed.
              </p>
            </div>
            <button className="text-link" onClick={() => setDisclosed(true)}>
              Start exploring <ArrowRight size={17} />
            </button>
          </div>
        )}
        <div className="demo-filter-bar">
          <label className="search-field">
            <MagnifyingGlass size={18} />
            <span className="sr-only">Search synthetic cases</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search case, serial or finding"
            />
          </label>
          <label className="filter-field">
            <span>Case state</span>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All states</option>
              <option value="pending">Awaiting review</option>
              <option value="blocked">Blocked</option>
              <option value="reviewed">Reviewed in demo</option>
            </select>
          </label>
          <span className="small muted">
            3 cases · {evidenceCount} evidence items
          </span>
        </div>
        {notice && (
          <p className="local-reset-status" role="status">
            <CheckCircle size={17} />
            The fictional seed has been restored. No external record was
            changed.
          </p>
        )}
        <Workbench
          caseId={c.id}
          filter={search}
          statusFilter={filter}
          onResetFilter={() => {
            setSearch("");
            setFilter("all");
          }}
        />
        <div className="demo-scope-note">
          <DemoBadge compact />
          <p>
            Recorded relation ≠ causal conclusion. All three cases and their
            fourteen evidence items are synthetic. A missing relationship stays
            unresolved; a reviewer owns the next question.
          </p>
        </div>
        <ReviewerForm c={c} />
        <div className="demo-packet-link">
          <FileText size={32} weight="thin" />
          <div>
            <h2>Take the evidence, with its limits.</h2>
            <p>
              Export the current synthetic case, local review, source times and
              unresolved items. Every exported page retains the demo label.
            </p>
          </div>
          <Button to={"/demo/cases/" + c.id + "/report"}>
            Open evidence packet
          </Button>
        </div>
      </div>
      <SourceDialog source={source} c={c} onClose={() => setSource(null)} />
    </main>
  );
}
export function ReportPage({ sample = false }) {
  const { caseId } = useParams();
  const c = caseById[caseId || "DT-103"];
  const { reviews } = useDemo();
  const [status, setStatus] = useState("");
  if (!c) return <NotFound />;
  const p = makePacket(c, reviews[c.id]);
  const exportPacket = (type) => {
    const html = type === "html";
    downloadFile(
      `DEMO-SIMULATED-${c.id}-packet.${html ? "html" : "json"}`,
      html ? packetHtml(p) : JSON.stringify(p, null, 2),
      html ? "text/html;charset=utf-8" : "application/json",
    );
    setStatus(
      "Labeled synthetic " +
        type.toUpperCase() +
        " packet downloaded. No data was transmitted.",
    );
  };
  return (
    <main id="main" className="report-page">
      <Meta title={"DEMO " + c.id + " — Evidence packet"} />
      <div className="demo-persistent">
        <DemoBadge />
        <span>
          Every source and review is fictional · No containment executed
        </span>
      </div>
      <section className="container report-heading">
        <TextLink to={"/demo/cases/" + c.id}>
          Back to the synthetic case
        </TextLink>
        <Eyebrow>EXPORTABLE EVIDENCE PACKET</Eyebrow>
        <h1>
          {c.id}
          <br />
          Serialized investigation review.
        </h1>
        <p className="page-lead">
          {c.serial} · Lot {c.lot} · {p.version}
        </p>
        <div className="button-row">
          <Button onClick={() => exportPacket("html")}>
            Download labeled HTML
          </Button>
          <button
            className="button button-secondary"
            onClick={() => exportPacket("json")}
          >
            <DownloadSimple size={18} />
            Download JSON
          </button>
          <button className="text-link" onClick={() => window.print()}>
            <Printer size={18} />
            Print / save PDF
          </button>
        </div>
        {status && (
          <p role="status" className="download-status">
            <CheckCircle size={17} />
            {status}
          </p>
        )}
        <Notice>
          Concept preview. This packet uses synthetic records only. It is not a
          working integration, authenticated signature or executed containment
          decision.
        </Notice>
      </section>
      <article className="container report-document">
        <div className="print-watermark">
          DEMO · SIMULATED DATA · CONCEPT PREVIEW · NO MACHINE CONTROL
        </div>
        <section>
          <Eyebrow>01 / QUESTION UNDER REVIEW</Eyebrow>
          <h2>What does the evidence support?</h2>
          <p>{p.question}</p>
          <p>
            These records establish a sequence and recorded relationships. They
            do not establish a root cause.
          </p>
        </section>
        <section>
          <Eyebrow>02 / SOURCE CHRONOLOGY</Eyebrow>
          <h2>Keep the source attached.</h2>
          {p.observations.map((s) => (
            <div className="report-source" key={s.id}>
              <div>
                <DemoBadge compact />
                <h3>{s.title}</h3>
                <p>{s.detail}</p>
                <span className="source-ref">
                  {s.id} · {s.ref} · {s.locator} · v1
                </span>
              </div>
              <dl>
                <dt>Event</dt>
                <dd>
                  {readableDate(s.eventAt)} · {readableTime(s.eventAt)}
                </dd>
                <dt>Recorded</dt>
                <dd>{readableTime(s.recordedAt)}</dd>
                <dt>Imported</dt>
                <dd>{readableTime(s.importedAt)}</dd>
              </dl>
            </div>
          ))}
        </section>
        <section>
          <Eyebrow>03 / ALTERNATIVES & COUNTEREXAMPLES</Eyebrow>
          <h2>The explanation remains open.</h2>
          {p.alternatives.map((a) => (
            <div className="alternative-row" key={a.name}>
              <h3>{a.name}</h3>
              <Status tone="apricot">{a.status}</Status>
              <p>{a.reason}</p>
            </div>
          ))}
          <Notice>{p.missingness}</Notice>
        </section>
        <section>
          <Eyebrow>04 / SIMULATED REVIEW</Eyebrow>
          <h2>{p.review.decision}</h2>
          <blockquote>{p.review.rationale}</blockquote>
          <p>
            <strong>Mara Vale — DEMO</strong> · Quality-lead role
            <br />
            <small>
              Seed review: {readableDate(c.reviewAt)},{" "}
              {readableTime(c.reviewAt)}.{" "}
              {p.review.savedAt
                ? "Local review saved: " +
                  readableDate(p.review.savedAt) +
                  ", " +
                  readableTime(p.review.savedAt) +
                  "."
                : "No later local review saved."}
            </small>
          </p>
          <div className="draft-scope">
            <h3>Draft suspect scope</h3>
            <p>
              {p.review.suspectLots.length
                ? p.review.suspectLots.join(", ")
                : "Not selected"}
              . This is a draft review set only. {p.containment}
            </p>
          </div>
        </section>
        <section>
          <Eyebrow>05 / NEXT ACTION & FOLLOW-UP</Eyebrow>
          <h2>A named owner. A dated question.</h2>
          <p>{p.nextAction.task}</p>
          <p>
            {p.nextAction.owner} · Due {readableDate(c.due)},{" "}
            {readableTime(c.due)}.
          </p>
          <Status>CAPA effectiveness: Not measured</Status>
        </section>
        <footer className="report-footer">
          <DemoBadge />
          <p>{p.boundary}</p>
          <small>
            Export version {p.version} · {readableDate(p.exportedAt)},{" "}
            {readableTime(p.exportedAt)}.<br />
            The reviewer identity and signature are simulated, not
            authenticated.
          </small>
        </footer>
      </article>
    </main>
  );
}
export function EvaluationWorkspace() {
  return (
    <main id="main" className="demo-evaluation-page">
      <Meta title="Simulated evaluation workspace" />
      <div className="demo-persistent">
        <DemoBadge />
        <span>Illustrative CRM states · No real pipeline or revenue</span>
      </div>
      <section className="container page-hero compact">
        <Eyebrow>SECONDARY EVALUATION WORKSPACE</Eyebrow>
        <h1>
          A real evaluation
          <br />
          starts with permission.
        </h1>
        <p className="page-lead">
          A fictional account and pilot-stage proposal, separate from the
          quality investigation workbench.
        </p>
        <TextLink to="/demo">Return to the investigation demo</TextLink>
      </section>
      <div className="container">
        <section className="account-overview">
          <div>
            <DemoBadge compact />
            <h2>{demoAccount.name}</h2>
            <p>
              Fictional manufacturer · {demoAccount.industry}
              <br />
              {demoAccount.line} · {demoAccount.family}
            </p>
          </div>
          <Status tone="apricot">Permission pending</Status>
        </section>
        <section className="evaluation-team">
          <h2>The people and their responsibilities.</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Fictional owner</th>
                  <th>Environment</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Budget owner / quality-lead grader",
                    demoAccount.qualityLead,
                  ],
                  ["Manufacturing engineering lead", demoAccount.engineer],
                  ["Named day-to-day operator", demoAccount.operator],
                  [
                    "Data / integration and QMS export owner",
                    demoAccount.dataOwner,
                  ],
                ].map(([role, name]) => (
                  <tr key={role}>
                    <th scope="row">{role}</th>
                    <td>{name} — DEMO</td>
                    <td>
                      <DemoBadge compact />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="historical-slots">
          <h2>Three historical-case evaluation slots.</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Slot</th>
                  <th>Synthetic example</th>
                  <th>Baseline / grade</th>
                  <th>Environment</th>
                </tr>
              </thead>
              <tbody>
                {cases.map((c, i) => (
                  <tr key={c.id}>
                    <th scope="row">H{i + 1}</th>
                    <td>
                      <Link to={"/demo/cases/" + c.id}>
                        {c.id} · {c.title}
                      </Link>
                    </td>
                    <td>Not measured / Not graded</td>
                    <td>
                      <DemoBadge compact />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="proposal-card">
          <DemoBadge />
          <Eyebrow>PILOT-STAGE DEAL · ILLUSTRATIVE ONLY</Eyebrow>
          <h2>{demoAccount.proposal}</h2>
          <p>{demoAccount.sow}</p>
          <dl>
            <dt>Permission</dt>
            <dd>{demoAccount.permission}</dd>
            <dt>Quality lead</dt>
            <dd>Mara Vale — DEMO</dd>
            <dt>Next task</dt>
            <dd>
              Arden Pike — DEMO to review fictional anonymized export scope.
            </dd>
            <dt>Due</dt>
            <dd>12 Oct 2026 · 10:00 UTC</dd>
            <dt>Containment</dt>
            <dd>Never auto-executed.</dd>
          </dl>
          <Notice>
            There is no signed customer, committed revenue or access to
            production assets. The stages are invented to illustrate
            qualification and permission gates.
          </Notice>
        </section>
        <div className="button-row section-space">
          <Button to="/request-evaluation">
            Discuss a permissioned evaluation
          </Button>
          <TextLink to="/evaluation">Read the real proposed protocol</TextLink>
        </div>
      </div>
    </main>
  );
}
