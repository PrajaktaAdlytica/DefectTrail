import React, { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowUpRight,
  LinkSimple,
  WarningCircle,
} from "@phosphor-icons/react";
import {
  Art,
  Button,
  DemoBadge,
  Eyebrow,
  Meta,
  TextLink,
  usePageMotion,
  usePreferences,
} from "../lib";
import {
  SharedCase,
  ReviewBoundary,
  BuyerRoles,
  EvaluationSection,
  PricingSection,
  FAQ,
  FinalCTA,
} from "../components/Marketing";
import {
  ProductScrollChapter,
  EvidenceScrollChapter,
} from "../components/ScrollChapters";
import { IntroFilm, ReplayIntro } from "../components/IntroFilm";
import { HomeChoreography } from "../components/HomeChoreography";

export function HeroFactory() {
  const { track } = usePreferences();
  return (
    <section className="hero cinematic-hero" id="top">
      <div className="hero-stage">
        <div className="hero-copy container">
          <Eyebrow>FACTORY QUALITY INVESTIGATION · CONCEPT PREVIEW</Eyebrow>
          <h1>
            {[
              "Reconstruct a",
              "defective lot without",
              "inventing its root cause.",
            ].map((line) => (
              <span className="headline-mask" key={line}>
                <span className="hero-wordline">{line}</span>
              </span>
            ))}
          </h1>
          <p className="hero-description">
            A proposed source-linked workspace for quality directors and
            manufacturing engineering leads in electronics and discrete
            assembly.
          </p>
          <div className="hero-actions">
            <Button
              to="/request-evaluation"
              onClick={() => track("pilot_cta", { location: "hero" })}
            >
              Request paid evaluation
            </Button>
            <TextLink to="/demo">Explore synthetic demo</TextLink>
          </div>
          <p className="hero-disclosure">
            DEMO · SIMULATED DATA. Research-stage concept. No production systems
            connected.
          </p>
        </div>
        <div className="hero-turn-copy">
          <Eyebrow>THE FIRST OBSERVATION IS NOT THE WHOLE STORY.</Eyebrow>
          <h2>
            A finding is only
            <br />
            the beginning.
          </h2>
          <p>Follow the serial. Challenge the explanation.</p>
        </div>
        <div
          className="factory-scene"
          aria-label="Illustrated synthetic electronics assembly line"
        >
          <Art
            name="factory-panorama"
            className="factory-image"
            priority
            alt="Original graphite illustration of incoming component trays, an electronics assembly fixture and an inspection bench"
          />
          <svg
            className="factory-trace"
            viewBox="0 0 1440 540"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="trace-path trace-lot"
              d="M170 150 C300 150 350 310 670 310"
            />
            <path
              className="trace-path trace-station"
              d="M690 310 C830 310 870 190 1170 190"
            />
            <path
              className="trace-path trace-missing"
              d="M700 330 C1020 330 840 480 1240 470"
            />
          </svg>
          <div className="factory-sources">
            <Link
              className="source-tag source-lot"
              to="/demo/cases/DT-103?source=R04"
            >
              <span className="source-pin" />
              Incoming lot L88
              <ArrowUpRight size={13} />
            </Link>
            <Link
              className="source-tag source-station"
              to="/demo/cases/DT-103?source=R06"
            >
              <span className="source-pin" />
              Station S04
              <ArrowUpRight size={13} />
            </Link>
            <Link
              className="source-tag source-inspection"
              to="/demo/cases/DT-103?source=R07"
            >
              <span className="source-pin" />
              Inspection SN-24017
              <ArrowUpRight size={13} />
            </Link>
            <Link
              className="source-tag source-gap"
              to="/demo/cases/DT-103#missingness"
            >
              <WarningCircle size={14} />
              SN-24018 · Mapping missing
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
        <div className="hero-scene-footer">
          <ReplayIntro />
          <a className="scroll-cue" href="#assembly">
            <span>SCROLL TO FOLLOW THE TRAIL</span>
            <ArrowDown size={21} />
          </a>
          <a className="hero-skip text-link" href="#assembly">
            Skip intro <ArrowDown size={16} />
          </a>
          <span className="hero-scene-index">01 / THE FINDING</span>
        </div>
      </div>
    </section>
  );
}
function AssemblyChapter() {
  const root = useRef();
  const art = useRef();
  const [active, setActive] = useState("inspection");
  const { reduced } = usePreferences();
  const entries = [
    ["inspection", "Inspection finding", "DEMO-I17 · 10 Oct 2026 · 08:27 UTC"],
    ["station", "Station history", "DEMO-S04 · 08:18 UTC"],
    ["lot", "Incoming lot", "DEMO-L88 · 07:40 UTC"],
  ];
  useLayoutEffect(() => {
    if (reduced) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width:820px) and (min-height:580px)", () => {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: art.current,
          start: "top 108px",
          endTrigger: root.current.querySelector(".assembly-ending"),
          end: "top bottom-=24",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          refreshPriority: 8,
        });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            end: "bottom 70%",
            scrub: 0.8,
          },
        });
        tl.fromTo(
          ".assembly-slice-whole",
          { y: 40, rotate: -4, scale: 0.94 },
          { y: -20, rotate: 1, scale: 1.04, ease: "none" },
          0,
        );
        const items = root.current.querySelectorAll(".assembly-sources li");
        items.forEach((el, i) =>
          ScrollTrigger.create({
            trigger: el,
            start: "top 60%",
            end: "bottom 45%",
            onEnter: () => setActive(entries[i][0]),
            onEnterBack: () => setActive(entries[i][0]),
          }),
        );
      }, root);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [reduced]);
  return (
    <section
      className="assembly-section container section-space"
      id="assembly"
      ref={root}
    >
      <div className="assembly-copy" data-reveal>
        <Eyebrow>ONE SERIAL · SOURCE BY SOURCE</Eyebrow>
        <h2>
          From one assembly
          <br />
          to a defensible review.
        </h2>
        <p className="section-description">
          The defect is visible. Its full story is scattered.
          <br />
          Inspect the original record. Follow the lot link.
          <br className="desktop-break" /> Keep the counterexample in view.
        </p>
        <ol className="assembly-sources">
          {entries.map(([id, name, ref]) => (
            <li key={id}>
              <button
                className={active === id ? "selected" : ""}
                onClick={() => setActive(id)}
                aria-pressed={active === id}
              >
                <span className={"source-node " + id} />
                <span>
                  <strong>{name}</strong>
                  <small>{ref}</small>
                </span>
                <ArrowUpRight size={15} />
              </button>
            </li>
          ))}
        </ol>
        <div className="assembly-exceptions">
          <Link
            to="/demo/cases/DT-103?source=R08"
            className="assembly-counterexample"
          >
            <Art
              name="inspection-board"
              alt="Fictional passed-unit illustration"
            />
            <div>
              <strong>Counterexample:</strong>
              <p>SN-24016 passed at the same station setting.</p>
              <small>10 Oct 2026 · 08:25 UTC</small>
            </div>
            <ArrowUpRight size={15} />
          </Link>
          <div className="assembly-gap">
            <LinkSimple size={29} weight="thin" />
            <span>
              Supplier mapping for SN-24018
              <br />
              is missing.
            </span>
          </div>
        </div>
      </div>
      <div className={"assembly-art active-" + active} ref={art}>
        <div
          className="assembly-object"
          role="img"
          aria-label="Original graphite electronics assembly separated into housing, circuit-board and base layers"
        >
          <Art
            name="exploded-assembly"
            alt=""
            className="assembly-slice assembly-slice-whole"
          />
        </div>
        <div className="assembly-serial">DEMO SN-24017</div>
        <div className="assembly-focus-label">
          <span>{entries.find((x) => x[0] === active)?.[1]}</span>
          <small>Selected source context · DEMO</small>
        </div>
      </div>
      <div className="assembly-ending">
        <span className="ending-node" />
        <h3>Root cause not established.</h3>
        <p>Human review required. No machine control.</p>
        <TextLink to="/demo/cases/DT-103">Explore the synthetic case</TextLink>
        <DemoBadge />
      </div>
    </section>
  );
}
export function Home() {
  const ref = usePageMotion();
  return (
    <main id="main" className="home-page motion-home" ref={ref}>
      <Meta
        title="Reconstruct a defective lot without inventing its root cause"
        description="DefectTrail is a research-stage factory quality investigation concept for electronics and discrete assembly. Explore five proposed modules and a source-linked synthetic demo."
      />
      <IntroFilm />
      <HeroFactory />
      <AssemblyChapter />
      <ProductScrollChapter />
      <SharedCase />
      <EvidenceScrollChapter />
      <ReviewBoundary />
      <BuyerRoles />
      <EvaluationSection />
      <PricingSection />
      <FAQ />
      <FinalCTA />
      <HomeChoreography root={ref} />
    </main>
  );
}
