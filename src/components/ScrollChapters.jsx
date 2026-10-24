import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  WarningCircle,
  FileText,
  Pause,
  Play,
  Clock,
} from "@phosphor-icons/react";
import {
  Art,
  Button,
  DemoBadge,
  Eyebrow,
  TextLink,
  usePreferences,
} from "../lib";
import { products } from "../data/content";
import { caseById } from "../data/demo";
import { MiniArtifact } from "./Marketing";
import { SourceDialog, Workbench } from "./Workbench";
import { scrollToPosition } from "../motion-engine";

gsap.registerPlugin(ScrollTrigger);
function useSceneSequence(
  root,
  stage,
  count,
  { enabled = true, distance = 0.9 } = {},
) {
  const { reduced } = usePreferences();
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const scene = useRef(null);
  useLayoutEffect(() => {
    if (reduced || !enabled) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width:820px) and (min-height:580px)", () => {
      const panels = stage.current.querySelectorAll("[data-scene-panel]");
      stage.current.dataset.pinned = "true";
      setPinned(true);
      const ctx = gsap.context(() => {
        gsap.set(panels, { yPercent: 110, autoAlpha: 1 });
        gsap.set(panels[0], { yPercent: 0 });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage.current,
            start: "top 84px",
            end: () =>
              `+=${Math.max(1800, window.innerHeight * count * distance)}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const t = self.progress * (count * 0.8 + count - 1);
              let next = 0;
              for (let i = 1; i < count; i++)
                if (t > 1.3 + (i - 1) * 1.8) next = i;
              setActive(next);
            },
          },
        });
        scene.current = tl.scrollTrigger;
        tl.to({}, { duration: 0.8 });
        for (let i = 1; i < count; i++) {
          tl.addLabel("panel-" + i)
            .to(
              panels[i - 1],
              { yPercent: -105, scale: 0.96, duration: 1, ease: "none" },
              "panel-" + i,
            )
            .fromTo(
              panels[i],
              { yPercent: 110, scale: 1.03 },
              { yPercent: 0, scale: 1, duration: 1, ease: "none" },
              "panel-" + i,
            )
            .to({}, { duration: 0.8 });
        }
      }, root);
      return () => {
        ctx.revert();
        delete stage.current?.dataset.pinned;
        scene.current = null;
        setPinned(false);
      };
    });
    return () => mm.revert();
  }, [reduced, enabled, count, distance]);
  const jump = (i) => {
    setActive(i);
    const st = scene.current;
    if (st) {
      const total = count * 0.8 + count - 1;
      const fraction = (i * 1.8 + 0.4) / total;
      scrollToPosition(st.start + (st.end - st.start) * fraction);
    } else
      document.getElementById(`${root.current.id}-panel-${i}`)?.scrollIntoView({
        behavior: reduced ? "instant" : "smooth",
        block: "start",
      });
  };
  return { active, pinned, jump };
}
export function ProductScrollChapter() {
  const root = useRef();
  const stage = useRef();
  const { active, pinned, jump } = useSceneSequence(root, stage, 5, {
    distance: 0.78,
  });
  return (
    <section className="offer-chapter" id="products" ref={root}>
      <div className="container offer-chapter-heading" data-reveal>
        <Eyebrow>FIVE PROPOSED MODULES</Eyebrow>
        <h2>
          Five focused offers.
          <br />
          One accountable investigation.
        </h2>
        <p>
          Separate scopes. Shared evidence. Choose one module for a first
          evaluation.
        </p>
      </div>
      <div className="offer-scroll-stage" ref={stage}>
        <div className="offer-stage-top">
          <span>THE INVESTIGATION SUITE</span>
          <span>PROPOSED MODULES · SEPARATELY QUOTABLE</span>
          <span className="offer-counter">
            {pinned ? (
              <>
                <b>{String(active + 1).padStart(2, "0")}</b> / 05
              </>
            ) : (
              <>
                <b>05</b> offers
              </>
            )}
          </span>
        </div>
        <nav className="offer-jump-nav" aria-label="Select an offer">
          {products.map((p, i) => (
            <button
              key={p.id}
              onClick={() => jump(i)}
              className={active === i ? "active" : ""}
              aria-current={active === i ? "step" : undefined}
            >
              <span>{p.number}</span>
              {p.short}
            </button>
          ))}
        </nav>
        <div className="offer-panels">
          {products.map((p, i) => (
            <article
              data-scene-panel
              id={"products-panel-" + i}
              className={
                "offer-panel " + p.tone + (active === i ? " active" : "")
              }
              key={p.id}
              inert={pinned && active !== i ? true : undefined}
              aria-hidden={pinned && active !== i ? true : undefined}
            >
              <div className="offer-panel-copy">
                <span className="offer-watermark" aria-hidden="true">
                  {p.number}
                </span>
                <Eyebrow>{p.eyebrow}</Eyebrow>
                <h3>{p.name}</h3>
                <p className="offer-job">{p.job}</p>
                <p className="offer-detail">{p.description}</p>
                <p className="offer-hypothesis">
                  <strong>{p.price}</strong> {p.unit}
                  <span>Price test hypothesis · no active checkout</span>
                </p>
                <Button to={"/products/" + p.id}>Explore {p.name}</Button>
              </div>
              <div className="offer-visual">
                <span className="offer-visual-kicker">
                  EXAMPLE ARTIFACT / {p.number}
                </span>
                <MiniArtifact type={p.icon} large />
                <p>{p.output}</p>
                <DemoBadge />
              </div>
            </article>
          ))}
        </div>
        <div className="offer-stage-bottom">
          <span>Scroll to follow the next part of the investigation.</span>
          <ArrowDown size={20} />
          <a href="#platform" className="text-link">
            Skip to the shared case <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
export function EvidenceScrollChapter() {
  const root = useRef();
  const stage = useRef();
  const [manual, setManual] = useState(false);
  const [source, setSource] = useState(null);
  const c = caseById["DT-103"];
  const { active, pinned, jump } = useSceneSequence(root, stage, 4, {
    enabled: !manual,
    distance: 0.95,
  });
  const open = (id) => setSource(c.sources.find((s) => s.id === id));
  const steps = [
    "Inspect the finding",
    "Follow the context",
    "Keep the contradiction",
    "Leave a human decision",
  ];
  return (
    <section className="evidence-chapter" id="case-story" ref={root}>
      <div className="container evidence-chapter-heading" data-reveal>
        <Eyebrow>ONE SERIAL. A STORY THAT CAN BE QUESTIONED.</Eyebrow>
        <h2>
          Follow the evidence.
          <br />
          Let the answer stay open.
        </h2>
        <p>
          DEMO SN-24017 · Source-linked observations, not an invented diagnosis.
        </p>
      </div>
      <div className="evidence-scroll-stage" ref={stage}>
        <div className="evidence-stage-top">
          <DemoBadge />
          <div>
            <button onClick={() => setManual(!manual)} className="text-link">
              {manual ? <Play size={15} /> : <Pause size={15} />}{" "}
              {manual ? "Enable scroll sequence" : "Use manual reading"}
            </button>
            <a href="#human-review" className="text-link">
              Skip sequence <ArrowDown size={15} />
            </a>
          </div>
        </div>
        <div className="evidence-panels">
          <article
            data-scene-panel
            id="case-story-panel-0"
            className="evidence-panel inspection-scene"
            inert={pinned && active !== 0 ? true : undefined}
            aria-hidden={pinned && active !== 0 ? true : undefined}
          >
            <div className="evidence-scene-copy">
              <Eyebrow>01 / AN OBSERVATION</Eyebrow>
              <h3>
                Start with
                <br />
                what was seen.
              </h3>
              <p>
                A final inspection finding. A serial number. A record you can
                open.
              </p>
              <button className="text-link" onClick={() => open("R07")}>
                Inspect the original source <ArrowUpRight size={18} />
              </button>
            </div>
            <div className="inspection-object">
              <Art
                name="inspection-board"
                alt="Synthetic serialized electronics board"
                priority
              />
              <span className="serial-tag">DEMO SN-24017</span>
              <div className="inspection-caption">
                <Clock size={18} />
                <span>
                  10 Oct 2026 · 08:27 UTC
                  <br />
                  <small>DEMO-I17 · frame 1 · v1</small>
                </span>
                <span className="finding-pill">Finding</span>
              </div>
            </div>
          </article>
          <article
            data-scene-panel
            id="case-story-panel-1"
            className="evidence-panel context-scene"
            inert={pinned && active !== 1 ? true : undefined}
            aria-hidden={pinned && active !== 1 ? true : undefined}
          >
            <div className="evidence-scene-copy">
              <Eyebrow>02 / THE RECORDED CONTEXT</Eyebrow>
              <h3>
                A setting.
                <br />A lot.
                <br />A relationship.
              </h3>
              <p>
                A recorded link is useful context. It is not proof of cause.
              </p>
            </div>
            <div className="context-constellation">
              <button
                className="context-source lot-record"
                onClick={() => open("R04")}
              >
                <span>07:40 UTC</span>
                <strong>Incoming lot L88</strong>
                <small>DEMO-REC88 · row 12</small>
                <ArrowUpRight size={17} />
              </button>
              <div className="context-station">
                <Art
                  name="station-fixture"
                  alt="Fictional station fixture"
                  priority
                />
                <button className="context-source" onClick={() => open("R06")}>
                  <span>08:18 UTC</span>
                  <strong>Station S04 · A=42</strong>
                  <small>DEMO-LOG04 · row 41</small>
                  <ArrowUpRight size={17} />
                </button>
              </div>
              <button
                className="context-source serial-record"
                onClick={() => open("R05")}
              >
                <span>08:12 UTC</span>
                <strong>Serial → lot</strong>
                <small>SN-24017 is linked to L88</small>
                <ArrowUpRight size={17} />
              </button>
              <p className="context-boundary">A sequence is not a cause.</p>
            </div>
          </article>
          <article
            data-scene-panel
            id="case-story-panel-2"
            className="evidence-panel contradiction-scene"
            inert={pinned && active !== 2 ? true : undefined}
            aria-hidden={pinned && active !== 2 ? true : undefined}
          >
            <div className="evidence-scene-copy">
              <Eyebrow>03 / THE EXPLANATION IS INCOMPLETE</Eyebrow>
              <h3>
                Then comes
                <br />
                the counterexample.
              </h3>
              <p>Keep the records that challenge the simple explanation.</p>
            </div>
            <div className="contradiction-cards">
              <button
                className="contradiction-card passed-record"
                onClick={() => open("R08")}
              >
                <span>
                  <CheckCircle size={21} />
                  Counterexample retained
                </span>
                <Art name="inspection-board" alt="" priority />
                <h4>SN-24016 passed.</h4>
                <p>The same setting. The same recorded lot.</p>
                <small>08:25 UTC · DEMO-I16 · DEMO / SIMULATED</small>
                <ArrowUpRight className="card-corner-arrow" size={21} />
              </button>
              <button
                className="contradiction-card alternate-record"
                onClick={() => open("R09")}
              >
                <span>
                  <WarningCircle size={21} />
                  Alternate-station finding
                </span>
                <h4>
                  SN-24019 failed
                  <br />
                  at S05.
                </h4>
                <p>Setpoint A=40. A recorded link to L88.</p>
                <small>08:31 UTC · DEMO-I19 · DEMO / SIMULATED</small>
                <ArrowUpRight className="card-corner-arrow" size={21} />
              </button>
              <div className="missing-link-card">
                <WarningCircle size={20} />
                <div>
                  <strong>One link is still missing.</strong>
                  <p>Supplier mapping for SN-24018 is absent.</p>
                </div>
              </div>
            </div>
          </article>
          <article
            data-scene-panel
            id="case-story-panel-3"
            className="evidence-panel decision-scene"
            inert={pinned && active !== 3 ? true : undefined}
            aria-hidden={pinned && active !== 3 ? true : undefined}
          >
            <div className="evidence-scene-copy">
              <Eyebrow>04 / AN ACCOUNTABLE REVIEW</Eyebrow>
              <h3>
                A defensible
                <br />
                “not established.”
              </h3>
              <p>
                Quality and operations own the next decision. The demo executes
                no containment.
              </p>
              <Button to="/demo/cases/DT-103">Open the synthetic case</Button>
            </div>
            <div className="decision-paper">
              <DemoBadge />
              <span className="decision-paper-index">REVIEW / DT-103</span>
              <h4>
                Root cause
                <br />
                <em>not established.</em>
              </h4>
              <p>
                Decline the proposed S04 explanation.
                <br />
                Retain both counterexamples.
                <br />
                Request the missing mapping.
              </p>
              <div className="decision-signature">
                <span>
                  Mara Vale — DEMO
                  <br />
                  <small>Quality-lead role · 10 Oct 2026 · 09:10 UTC</small>
                </span>
                <span>
                  Unsupported cause
                  <br />
                  <b>REJECTED</b>
                </span>
              </div>
              <small>
                Simulated review · Not an authenticated signature · No
                containment executed
              </small>
            </div>
          </article>
        </div>
        <nav className="evidence-step-nav" aria-label="Evidence sequence">
          {steps.map((name, i) => (
            <button
              key={name}
              onClick={() => jump(i)}
              className={active === i ? "active" : ""}
              aria-current={active === i ? "step" : undefined}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              {name}
              <span className="step-line" />
            </button>
          ))}
        </nav>
      </div>
      <div className="container complete-case-preview">
        <details>
          <summary>
            Inspect the complete source-linked workbench <ArrowDown size={20} />
          </summary>
          <Workbench preview />
        </details>
        <TextLink to="/demo">Explore all three synthetic incidents</TextLink>
      </div>
      <SourceDialog c={c} source={source} onClose={() => setSource(null)} />
    </section>
  );
}
