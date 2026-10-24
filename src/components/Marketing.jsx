import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  CheckCircle,
  WarningCircle,
  CaretDown,
  Clock,
  FileText,
  Database,
  ShieldCheck,
  ArrowUpRight,
  Plus,
  Minus,
} from "@phosphor-icons/react";
import {
  products,
  faqs,
  platformLayers,
  roles,
  scoreMetrics,
} from "../data/content";
import {
  Art,
  Button,
  DemoBadge,
  Eyebrow,
  SectionHead,
  Status,
  TextLink,
  ModuleIcon,
  useInViewEvent,
  usePreferences,
} from "../lib";
import { InquiryForm } from "./Forms";

export function MiniArtifact({ type, large = false }) {
  return (
    <div
      className={"mini-artifact " + type + " " + (large ? "large" : "")}
      aria-label={"Synthetic " + type + " artifact"}
    >
      <DemoBadge compact />
      {type === "chronology" ? (
        <>
          <Art name="evidence-folder" alt="" />
          <ol className="mini-timeline">
            <li>
              <span>07:40</span>Incoming lot
            </li>
            <li>
              <span>08:18</span>Station history
            </li>
            <li>
              <span>08:27</span>Inspection
            </li>
          </ol>
        </>
      ) : type === "genealogy" ? (
        <>
          <Art name="inspection-board" alt="" />
          <ul className="genealogy-list">
            <li>
              <span>SN-24016</span>
              <Status tone="sage" icon={false}>
                Passed
              </Status>
            </li>
            <li>
              <span>SN-24017</span>
              <Status tone="plum" icon={false}>
                Finding
              </Status>
            </li>
            <li>
              <span>SN-24018</span>
              <Status tone="apricot" icon={false}>
                Mapping missing
              </Status>
            </li>
          </ul>
        </>
      ) : type === "comparison" ? (
        <div className="comparison-mini">
          <div>
            <Art name="station-fixture" alt="" />
            <span>
              <CheckCircle size={15} />
              SN-24016 · Passed
            </span>
          </div>
          <div>
            <Art name="inspection-board" alt="" />
            <span>
              <WarningCircle size={15} />
              SN-24017 · Finding
            </span>
          </div>
        </div>
      ) : type === "scope" ? (
        <div className="scope-mini">
          <p>Draft suspect scope</p>
          <div>
            <span>L88</span>
            <span>Counterexample retained</span>
            <Status icon={false}>Pending</Status>
          </div>
          <small>Manual review only. No containment executed.</small>
        </div>
      ) : (
        <>
          <Art name="review-packet" alt="" />
          <div className="report-mini-label">
            <FileText size={17} />
            <span>
              Follow-up pending
              <br />
              <small>Not measured</small>
            </span>
          </div>
        </>
      )}
    </div>
  );
}
function ProductRow({ product: p }) {
  const ref = useRef();
  useInViewEvent(ref, "offer_card_view", { offerId: p.id });
  return (
    <article className={"product-row " + p.tone} data-reveal ref={ref}>
      <div className="product-row-name">
        <span className="product-number">{p.number}</span>
        <h3>
          <Link to={"/products/" + p.id}>{p.name}</Link>
        </h3>
      </div>
      <p className="product-row-description">{p.job}</p>
      <MiniArtifact type={p.icon} />
      <TextLink to={"/products/" + p.id}>Explore module</TextLink>
    </article>
  );
}
export function ProductSuite({ showHeader = true }) {
  return (
    <section className="product-suite container section-space" id="products">
      {showHeader && (
        <SectionHead
          eyebrow="FIVE PROPOSED MODULES"
          title={<>Five focused offers. One accountable investigation.</>}
          description="Separate scopes. Shared evidence. Choose one module for a first evaluation."
        >
          <p className="small suite-label">
            Proposed modules · Separately quotable
          </p>
        </SectionHead>
      )}
      <div className="product-rows">
        {products.map((p) => (
          <ProductRow key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
export function SharedCase() {
  const [active, setActive] = useState(0);
  return (
    <section className="shared-case container section-space" id="platform">
      <SectionHead
        title="One case, with the source still attached."
        description="Observations stay separate from interpretations. Missing links and alternative explanations remain visible."
      />
      <div className="shared-case-grid">
        <div className="folder-art" data-drift>
          <Art
            name="evidence-folder"
            alt="Original illustration of a source-linked case folder with six translucent evidence layers"
          />
          <span className="art-caption">SOURCE-LINKED CASE · DEMO DT-103</span>
        </div>
        <ol className="platform-layers">
          {platformLayers.map(([name, desc], i) => (
            <li key={name} className={active === i ? "selected" : ""}>
              <button
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-pressed={active === i}
              >
                <span className={"layer-number layer-" + i}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <strong>{name}</strong>
                  <span>{desc}</span>
                </span>
                <ArrowUpRight size={16} />
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className="section-bottom">
        <span>
          Read-only concept · DEMO / SIMULATED DATA · Production connectors are
          future work.
        </span>
        <TextLink to="/platform">Explore the proposed platform</TextLink>
      </div>
    </section>
  );
}
export function ReviewBoundary({ standalone = false }) {
  return (
    <section
      className={"review-boundary " + (standalone ? "standalone" : "")}
      id="human-review"
    >
      <div className="container">
        <div className="review-intro">
          <div data-reveal>
            <Eyebrow light>THE HUMAN REVIEW BOUNDARY</Eyebrow>
            <h2>
              Recommendations
              <br />
              stop at the review desk.
            </h2>
            <p>
              Authorized quality and operations staff
              <br className="desktop-break" /> own containment decisions.
            </p>
          </div>
          <Art
            name="review-packet"
            alt="Original synthetic quality-review paper packet"
            className="review-art"
          />
        </div>
        <div className="review-folio" data-reveal>
          <div>
            <DemoBadge />
            <h3>
              Root-cause statement: <em>unsupported</em>
              <br />
              Decision: <em>rejected</em>
            </h3>
            <p>Retain the counterexample. Request the missing mapping.</p>
          </div>
          <div className="review-signature">
            <p>Mara Vale — DEMO</p>
            <time dateTime="2026-10-10T09:10:00Z">10 Oct 2026 · 09:10 UTC</time>
            <span>
              Draft suspect scope only.
              <br />
              No containment executed.
            </span>
          </div>
        </div>
        <div className="boundary-lanes">
          <div>
            <Database size={34} weight="thin" />
            <div>
              <h3>Data access</h3>
              <p>
                Genealogy gaps, proprietary imagery and supplier permission
                require an authorized export process.
              </p>
            </div>
          </div>
          <div>
            <ShieldCheck size={34} weight="thin" />
            <div>
              <h3>Physical authority</h3>
              <p>
                No machine commands, line stops, quarantine execution or live
                writeback.
              </p>
            </div>
          </div>
        </div>
        <div className="section-bottom">
          <TextLink to="/trust">Read the review boundaries</TextLink>
          <span>Concept preview · Human review required</span>
        </div>
      </div>
    </section>
  );
}
export function BuyerRoles() {
  const [selected, setSelected] = useState("quality-directors");
  return (
    <section className="buyer-roles container section-space">
      <SectionHead
        eyebrow="THE INVESTIGATION TEAM"
        title={
          <>
            Built around the people
            <br />
            who own the decision.
          </>
        }
      />
      <div className="roles-grid">
        {roles.map((r) => (
          <article
            key={r.id}
            className={selected === r.id ? "role active" : "role"}
          >
            <button
              className="role-title"
              onClick={() => setSelected(r.id)}
              aria-pressed={selected === r.id}
            >
              <span className="role-dot" />
              <h3>{r.name}</h3>
            </button>
            <p>{r.description}</p>
            <div className="role-artifact">
              <Art name={r.image} alt={"Synthetic " + r.artifact} />
              <div className="role-artifact-label">
                <DemoBadge compact />
                <strong>{r.artifact}</strong>
                <span>{selected === r.id ? r.checks[0] : r.checks[1]}</span>
              </div>
            </div>
            <TextLink
              to={
                r.id === "operator"
                  ? "/solutions/electronics-discrete-assembly"
                  : "/solutions/" + r.id
              }
            >
              Explore the workflow
            </TextLink>
          </article>
        ))}
      </div>
      <div className="role-footnote">
        <p>
          <strong>Data / integration owner:</strong> permissioned export and
          provenance.
        </p>
        <p>
          First evaluation: electronics or discrete assembly.
          <br />
          Supplier-quality expansion remains a hypothesis.
        </p>
      </div>
    </section>
  );
}
export function EvaluationSection({ standalone = false }) {
  return (
    <section
      className={
        "evaluation-section container section-space " +
        (standalone ? "standalone" : "")
      }
      id="evaluation"
    >
      <SectionHead
        eyebrow="PROOF BEFORE PROMISES"
        title="Three closed cases. A pre-agreed test."
        description="Agree the baseline before reviewing permissioned anonymized records."
      />
      <div className="scorecard-layout">
        <Art
          name="evidence-folder"
          alt="Original illustration of blank synthetic evaluation files"
        />
        <div className="scorecard">
          <p className="eyebrow">PROPOSED PILOT SCORECARD · NO RESULTS YET</p>
          <div
            className="table-wrap"
            tabIndex="0"
            role="region"
            aria-label="Three-case evaluation scorecard; horizontally scrollable"
          >
            <table>
              <caption className="sr-only">
                Proposed evaluation of three historical cases. No results are
                measured.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Evaluation metric</th>
                  {["Case H1", "Case H2", "Case H3"].map((x, i) => (
                    <th className={"case-head case-" + i} scope="col" key={x}>
                      {x}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scoreMetrics.map((x) => (
                  <tr key={x}>
                    <th scope="row">{x}</th>
                    {[0, 1, 2].map((i) => (
                      <td key={i}>Not measured</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="table-scroll-hint">
            Scroll the scorecard to see all three cases.
          </p>
        </div>
      </div>
      <p className="evaluation-rule">
        Fail on invented causal claims
        <br className="mobile-break" /> or missed contradictory evidence.
      </p>
      <ol className="protocol-steps">
        {[
          ["Permission", "Agree scope, data sources and export permissions."],
          [
            "Baseline",
            "Confirm the three cases and success criteria in advance.",
          ],
          [
            "Blinded comparison",
            "Review anonymized records using the pre-agreed method.",
          ],
          [
            "Quality-lead grading",
            "Assess evidence sufficiency, alternatives and reasoning.",
          ],
          [
            "Paid pilot / go-no-go",
            "Decide against pre-agreed criteria and a signed scope.",
          ],
        ].map(([name, desc], i) => (
          <li key={name}>
            <span className={"protocol-number tone-" + i}>{i + 1}</span>
            <div>
              <h3>{name}</h3>
              <p>{desc}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="evaluation-gate">
        Proceed beyond demo only with quality-lead sign-off, approved anonymized
        export, and a comparator that meets pre-agreed criteria.
      </p>
      <div className="section-bottom">
        <span>Customer outcomes have not been demonstrated.</span>
        <TextLink to="/evaluation">Read the evaluation protocol</TextLink>
      </div>
    </section>
  );
}
export function PricingTable() {
  return (
    <div className="table-wrap">
      <table className="pricing-table">
        <caption className="sr-only">
          Five indicative pilot price hypotheses, not accepted prices or an
          active checkout.
        </caption>
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Service scope</th>
            <th scope="col">Price hypothesis (USD)</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <th scope="row">
                <Link to={"/products/" + p.id}>{p.name}</Link>
              </th>
              <td>{p.scope}</td>
              <td>
                <span>{p.price}</span> {p.unit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function PricingSection() {
  return (
    <section className="pricing-section container section-space" id="pricing">
      <SectionHead title="Start with one line, one module, a defined scope." />
      <div className="pricing-layout">
        <div>
          <Eyebrow>INDICATIVE PILOT PRICE HYPOTHESES</Eyebrow>
          <p className="small pricing-disclaimer">
            Interview prompts, not validated market rates or active checkout.
          </p>
          <PricingTable />
          <div className="pricing-action">
            <Button to="/request-evaluation">Discuss a paid evaluation</Button>
            <p>
              Select one proposed module first. Scope, permissions and
              procurement are agreed in a conditional SOW. No savings guarantee.
            </p>
          </div>
        </div>
        <div className="pricing-art">
          <Art
            name="review-packet"
            alt="Original illustrative pilot-quote packet"
          />
          <span>
            PILOT QUOTE
            <br />
            <small>(ILLUSTRATIVE)</small>
          </span>
        </div>
      </div>
    </section>
  );
}
export function FAQ({ all = false }) {
  return (
    <section className="faq-section container section-space" id="faq">
      <div className="faq-heading">
        <SectionHead
          eyebrow="BEFORE AN EVALUATION"
          title={
            <>
              Questions worth asking
              <br />
              before a pilot.
            </>
          }
        />
        <Art name="station-fixture" alt="" />
      </div>
      <div className="faq-list">
        {faqs.slice(0, all ? faqs.length : 5).map(([q, a], i) => (
          <details key={q} open={i === 0}>
            <summary>
              {q}
              <Plus className="faq-plus" aria-hidden="true" />
              <Minus className="faq-minus" aria-hidden="true" />
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
      <TextLink to="/resources/pilot-protocol">
        Read the evaluation and data-access guide
      </TextLink>
    </section>
  );
}
export function FinalCTA({ form = true }) {
  const { track } = usePreferences();
  return (
    <section
      className="final-cta container section-space"
      id="request-evaluation"
    >
      <div className="about-strip" data-reveal>
        <Eyebrow>ABOUT DEFECTTRAIL</Eyebrow>
        <p>
          We are exploring how quality teams can trace evidence
          <br className="desktop-break" /> and counterexamples before
          human-approved containment and CAPA.
        </p>
      </div>
      <div className="final-cta-intro">
        <div data-reveal>
          <Eyebrow>FINAL EVALUATION</Eyebrow>
          <h2>
            Bring a closed case.
            <br />
            Agree what a useful
            <br className="desktop-break" /> answer looks like.
          </h2>
          <p>
            Identify your quality lead, day-to-day operator and data owner.
            Discuss a supervised evaluation using three closed historical
            incidents.
          </p>
        </div>
        <div className="packet-art" data-drift>
          <Art
            name="review-packet"
            alt="Original synthetic evidence packet with unresolved-items dividers"
          />
          <span className="packet-label">
            DEMO DT-103
            <br />
            <small>Unresolved items retained</small>
          </span>
        </div>
      </div>
      {form ? (
        <InquiryForm compact />
      ) : (
        <div className="button-row">
          <Button
            to="/request-evaluation"
            onClick={() => track("pilot_cta", { location: "final" })}
          >
            Request paid evaluation
          </Button>
          <TextLink to="/demo">Explore the synthetic demo</TextLink>
        </div>
      )}
    </section>
  );
}
