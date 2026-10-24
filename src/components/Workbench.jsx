import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CaretRight,
  Check,
  CheckCircle,
  Clock,
  FileText,
  WarningCircle,
  Info,
  ArrowUpRight,
  X,
  Database,
  LinkSimple,
} from "@phosphor-icons/react";
import { Art, Button, DemoBadge, Notice, Status, TextLink } from "../lib";
import {
  cases,
  caseById,
  evidenceCount,
  initialReview,
  fullTime,
  readableDate,
  readableTime,
} from "../data/demo";
const DemoContext = createContext();
export function DemoProvider({ children }) {
  const [resetToken, setResetToken] = useState(0);
  const [reviews, setReviews] = useState(() =>
    Object.fromEntries(cases.map((c) => [c.id, initialReview(c)])),
  );
  const saveReview = (id, review) =>
    setReviews((old) => ({
      ...old,
      [id]: { ...review, savedAt: new Date().toISOString() },
    }));
  const reset = () => {
    setReviews(Object.fromEntries(cases.map((c) => [c.id, initialReview(c)])));
    setResetToken((v) => v + 1);
  };
  return (
    <DemoContext.Provider value={{ reviews, saveReview, reset, resetToken }}>
      {children}
    </DemoContext.Provider>
  );
}
export const useDemo = () => useContext(DemoContext);
export function SourceDialog({ source, c, onClose }) {
  const dialog = useRef();
  useEffect(() => {
    if (source) dialog.current?.showModal();
    else dialog.current?.close();
  }, [source]);
  return (
    <dialog
      className="source-dialog"
      ref={dialog}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === dialog.current) onClose();
      }}
    >
      {source && (
        <>
          <div className="dialog-head">
            <DemoBadge />
            <button
              className="icon-button"
              onClick={onClose}
              aria-label="Close source"
            >
              <X size={23} />
            </button>
          </div>
          <p className="eyebrow">SOURCE RECORD · {source.id}</p>
          <h2>{source.title}</h2>
          <p className="source-observation">{source.detail}</p>
          <Art
            name={
              source.type === "inspection" || source.type === "counterexample"
                ? "inspection-board"
                : source.type === "station"
                  ? "station-fixture"
                  : "evidence-folder"
            }
            alt="Original fictional source illustration"
          />
          <dl className="source-metadata">
            <dt>Source reference</dt>
            <dd>
              {source.ref} · {source.locator} · v1
            </dd>
            <dt>Event time</dt>
            <dd>
              {readableDate(fullTime(c, source))} ·{" "}
              {readableTime(fullTime(c, source))}
            </dd>
            <dt>Recorded time</dt>
            <dd>{readableTime(fullTime(c, source, 5))}</dd>
            <dt>Imported time</dt>
            <dd>{readableTime(fullTime(c, source, 6))}</dd>
            <dt>Observation type</dt>
            <dd>{source.type}</dd>
            <dt>Owner</dt>
            <dd>
              {source.type === "station"
                ? "Tobin Reed"
                : source.type === "inspection"
                  ? "Nia Hart"
                  : "Arden Pike"}{" "}
              — DEMO
            </dd>
            <dt>Environment</dt>
            <dd>DEMO / SIMULATED · No production source</dd>
          </dl>
          <Notice>
            The record is fictional. An observation or recorded relationship is
            not an established root cause. Analyst interpretations belong in
            separate notes.
          </Notice>
          <Button onClick={onClose}>Return to the case</Button>
        </>
      )}
    </dialog>
  );
}
export function Workbench({
  caseId = "DT-103",
  preview = false,
  step = 2,
  filter = "",
  statusFilter = "all",
  onResetFilter,
}) {
  const c = caseById[caseId] || cases[2];
  const [source, setSource] = useState(null);
  const { reviews } = useDemo();
  const navigate = useNavigate();
  const rows = preview
    ? c.sources.filter((s) => ["R04", "R06", "R07"].includes(s.id))
    : c.sources;
  const list = cases.filter(
    (x) =>
      `${x.id} ${x.serial} ${x.title}`
        .toLowerCase()
        .includes(filter.toLowerCase()) &&
      (statusFilter === "all" || x.state === statusFilter),
  );
  useEffect(() => setSource(null), [caseId]);
  return (
    <>
      <div className={"workbench " + (preview ? "preview" : "full")}>
        <div className="workbench-top">
          <DemoBadge />
          <span>Read-only · No production connections</span>
        </div>
        <div className="workbench-grid">
          <aside className="case-queue">
            <h3>3 synthetic cases</h3>
            {list.length ? (
              list.map((item) => (
                <button
                  key={item.id}
                  className={
                    "case-option " + (c.id === item.id ? "selected" : "")
                  }
                  onClick={() =>
                    navigate("/demo/cases/" + item.id, {
                      state: preview ? null : { preserveScroll: true },
                    })
                  }
                >
                  <DemoBadge compact />
                  <strong>
                    {item.id}
                    <CaretRight size={15} />
                  </strong>
                  <span>{item.serial}</span>
                  <small>
                    {reviews[item.id].savedAt
                      ? "Review saved locally"
                      : item.status}
                  </small>
                </button>
              ))
            ) : (
              <div className="queue-empty">
                <p>No matching synthetic cases.</p>
                <button
                  className="text-link"
                  onClick={onResetFilter || (() => navigate("/demo"))}
                >
                  Reset the view
                </button>
              </div>
            )}
            <div className="queue-note">
              <span>3 cases</span>
              <span>{evidenceCount} evidence items</span>
            </div>
          </aside>
          <div className="case-main">
            <div className="case-main-head">
              <div>
                <h3>
                  DEMO {c.id} <span>· {c.serial}</span>
                </h3>
                <p>Owner: {c.owner} — DEMO</p>
              </div>
              <small>
                {readableDate(c.date)}
                <br />
                Event times shown
              </small>
            </div>
            <div className="case-timeline">
              {rows.map((s, i) => (
                <button
                  key={s.id}
                  className={
                    "source-row " +
                    (s.type === "inspection" ? "inspection-row" : "") +
                    " " +
                    (preview &&
                    ((step === 0 && s.type === "inspection") ||
                      (step === 1 && s.type === "station"))
                      ? "active"
                      : "")
                  }
                  onClick={() => setSource(s)}
                >
                  <span className={"timeline-node node-" + s.type}>
                    <Clock size={12} />
                  </span>
                  <div>
                    <time>{s.time} UTC</time>
                    <strong>{s.title}</strong>
                    <span>{s.ref}</span>
                    <small>DEMO / SIMULATED</small>
                    {!preview && <p>{s.detail}</p>}
                  </div>
                  {(preview || s.type === "inspection") && (
                    <Art
                      name={
                        s.type === "station"
                          ? "station-fixture"
                          : s.type === "inspection"
                            ? "inspection-board"
                            : "evidence-folder"
                      }
                      alt=""
                    />
                  )}
                  <ArrowUpRight className="source-open-icon" size={15} />
                </button>
              ))}
            </div>
            {!preview && (
              <div className="observations-note">
                <Info size={16} />
                <p>
                  These are source observations. The proposed explanation and
                  reviewer note are separate from this chronology.
                </p>
              </div>
            )}
          </div>
          <aside
            className={
              "case-exceptions " + (preview && step >= 2 ? "emphasized" : "")
            }
          >
            <h3>Contradictions and gaps</h3>
            {c.sources
              .filter((s) => s.type === "counterexample")
              .map((s) => (
                <button
                  className="exception-card counterexample"
                  key={s.id}
                  onClick={() => setSource(s)}
                >
                  <span className="exception-title">
                    <CheckCircle size={19} />
                    {s.serial && s.serial === "SN-24019"
                      ? "Alternate-station finding"
                      : "Counterexample retained"}
                  </span>
                  <p>{s.detail}</p>
                  <small>
                    {s.time} UTC · {s.ref}
                  </small>
                  <Art name="inspection-board" alt="" />
                  <span className="exception-source">
                    Inspect source <ArrowUpRight size={13} />
                  </span>
                  <DemoBadge compact />
                </button>
              ))}
            <div className="exception-card gap" id="missingness">
              <span className="exception-title">
                <WarningCircle size={19} />
                Missingness
              </span>
              <p>{c.gap}</p>
              <span className="gap-marker">
                <LinkSimple size={32} weight="thin" />
                <span>Unresolved relationship</span>
              </span>
              <DemoBadge compact />
            </div>
            {!preview && (
              <Notice tone="plum">
                No confidence score replaces the missing evidence.
              </Notice>
            )}
          </aside>
        </div>
        <div className="workbench-bottom">
          <Clock size={22} />
          <p>
            <strong>Next: {c.taskOwner} — DEMO</strong> to{" "}
            {c.task.charAt(0).toLowerCase() + c.task.slice(1)}
            <br />
            <small>
              Due {readableDate(c.due)}, {readableTime(c.due)}.
            </small>
          </p>
          <TextLink to={"/demo/cases/" + c.id + (preview ? "" : "/report")}>
            {preview ? "Open synthetic case" : "Open evidence packet"}
          </TextLink>
        </div>
      </div>
      <SourceDialog c={c} source={source} onClose={() => setSource(null)} />
    </>
  );
}
export function ReviewerForm({ c }) {
  const { reviews, saveReview, resetToken } = useDemo();
  const review = reviews[c.id];
  const [decision, setDecision] = useState(review.decision);
  const [rationale, setRationale] = useState(review.rationale);
  const [lots, setLots] = useState(review.suspectLots);
  const [ack, setAck] = useState(false);
  const [saved, setSaved] = useState(false);
  const knownLots = [...new Set(c.sources.map((s) => s.lot).filter(Boolean))];
  useEffect(() => {
    setDecision(review.decision);
    setRationale(review.rationale);
    setLots(review.suspectLots);
    setSaved(false);
    setAck(false);
  }, [c.id, resetToken]);
  const save = (e) => {
    e.preventDefault();
    if (!ack || !rationale.trim()) return;
    saveReview(c.id, {
      ...review,
      status: "Review saved locally",
      decision,
      rationale: rationale.trim(),
      suspectLots: lots,
    });
    setSaved(true);
  };
  return (
    <section className="reviewer-form-section" id="local-review">
      <div>
        <p className="eyebrow">DEMO · HUMAN REVIEW ONLY</p>
        <h2>
          The decision stays
          <br />
          with the reviewer.
        </h2>
        <p>
          A local review records a decision, its rationale and a draft suspect
          scope. It never executes containment.
        </p>
        <Art name="review-packet" alt="Fictional reviewer packet" />
        <Notice>
          Reviewer: Mara Vale — DEMO
          <br />
          Quality-lead role · Fictional participant
        </Notice>
      </div>
      <form className="reviewer-form" onSubmit={save}>
        <DemoBadge />
        <label className="field">
          <span>Review disposition</span>
          <select
            value={decision}
            onChange={(e) => {
              setDecision(e.target.value);
              setSaved(false);
            }}
          >
            <option>Unsupported cause rejected</option>
            <option>More evidence requested</option>
            <option>Chronology reviewed; cause unresolved</option>
          </select>
        </label>
        <fieldset>
          <legend>Draft suspect scope · manual selection</legend>
          {knownLots.length ? (
            knownLots.map((lot) => (
              <label className="checkbox-line" key={lot}>
                <input
                  type="checkbox"
                  checked={lots.includes(lot)}
                  onChange={(e) => {
                    setLots(
                      e.target.checked
                        ? [...lots, lot]
                        : lots.filter((x) => x !== lot),
                    );
                    setSaved(false);
                  }}
                />
                <span>Lot {lot} — DEMO · candidate for review only</span>
              </label>
            ))
          ) : (
            <p className="small">
              Supplier lot is unknown. No supplier scope can be selected.
            </p>
          )}
          <p className="small muted">
            A selected lot is not quarantined. Unresolved mappings are excluded
            from any assumed relationship.
          </p>
        </fieldset>
        <label className="field">
          <span>Reviewer rationale *</span>
          <textarea
            rows="4"
            value={rationale}
            maxLength={2000}
            required
            onChange={(e) => {
              setRationale(e.target.value);
              setSaved(false);
            }}
          />
        </label>
        <label className="checkbox-line">
          <input
            type="checkbox"
            checked={ack}
            required
            onChange={(e) => setAck(e.target.checked)}
          />
          <span>
            I have reviewed the counterevidence and unresolved relationships in
            this synthetic case.
          </span>
        </label>
        <Button type="submit">Save simulated review</Button>
        {saved && (
          <div className="local-save-status" role="status">
            <CheckCircle size={19} />
            <div>
              <strong>Review saved locally.</strong>
              <br />
              No external action or containment was executed. Reset clears this
              demo state.
            </div>
          </div>
        )}
        <p className="small muted">
          Memory-only preview. Reloading or resetting restores the fictional
          seed. No production record, authenticated signature or live system is
          changed.
        </p>
      </form>
    </section>
  );
}
