import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  CaretDown,
  List,
  X,
  ArrowUpRight,
  LinkedinLogo,
  ArrowRight,
  Database,
  ShieldCheck,
  FileText,
  TreeStructure,
  Clock,
  Eye,
} from "@phosphor-icons/react";
import { products, resourceArticles } from "../data/content";
import { Button, ModuleIcon, TextLink, usePreferences } from "../lib";

export function Brand({ light = false, compact = false }) {
  return (
    <Link
      to="/"
      aria-label="DefectTrail home"
      className={"brand " + (light ? "brand-light" : "")}
    >
      <img
        src={
          light
            ? "/assets/brand/defecttrail-mark-reverse.svg"
            : "/assets/brand/defecttrail-mark-primary.svg"
        }
        alt=""
        width="36"
        height="36"
      />
      {!compact && <span>DefectTrail</span>}
    </Link>
  );
}
const navGroups = {
  Products: () => (
    <>
      <div className="mega-title">
        <span>FIVE PROPOSED MODULES</span>
        <Link to="/products">
          Compare the suite <ArrowRight size={15} />
        </Link>
      </div>
      <div className="mega-products">
        {products.map((p) => (
          <Link key={p.id} to={"/products/" + p.id}>
            <span className={"module-mark " + p.tone}>
              <ModuleIcon type={p.icon} />
            </span>
            <div>
              <strong>{p.name}</strong>
              <small>{p.job}</small>
            </div>
            <ArrowUpRight className="mega-arrow" size={16} />
          </Link>
        ))}
      </div>
      <div className="mega-foot">
        Separate scopes. One source-linked case.{" "}
        <Link to="/demo">
          Explore the synthetic demo <ArrowRight size={15} />
        </Link>
      </div>
    </>
  ),
  Platform: () => (
    <div className="mega-links">
      {[
        [
          "/platform",
          "The shared case",
          "Sources, timestamps, gaps, review and export.",
        ],
        [
          "/why-change",
          "Why investigations stall",
          "The defect is visible. Its context is scattered.",
        ],
        [
          "/trust",
          "Review boundaries",
          "Data permissions and physical authority.",
        ],
        [
          "/integrations",
          "Future connections",
          "Permissioned exports before production connectors.",
        ],
      ].map(([href, name, desc]) => (
        <Link key={href} to={href}>
          <strong>{name}</strong>
          <small>{desc}</small>
        </Link>
      ))}
    </div>
  ),
  Solutions: () => (
    <div className="mega-links">
      {[
        [
          "quality-directors",
          "Quality directors",
          "Accountability, evidence sufficiency and evaluation.",
        ],
        [
          "manufacturing-engineering",
          "Manufacturing engineering",
          "Process comparison and alternative explanations.",
        ],
        [
          "electronics-discrete-assembly",
          "Electronics & discrete assembly",
          "One serialized assembly and a concrete review.",
        ],
        [
          "supplier-quality",
          "Supplier quality",
          "A clearly labeled expansion hypothesis.",
        ],
      ].map(([slug, title, desc]) => (
        <Link key={slug} to={"/solutions/" + slug}>
          <strong>{title}</strong>
          <small>{desc}</small>
        </Link>
      ))}
    </div>
  ),
  Resources: () => (
    <div className="mega-links">
      {resourceArticles.map((a) => (
        <Link key={a.slug} to={"/resources/" + a.slug}>
          <strong>{a.title}</strong>
          <small>{a.eyebrow}</small>
        </Link>
      ))}
      <Link to="/results">
        <strong>How value would be measured</strong>
        <small>Baseline, false leads and contradiction coverage.</small>
      </Link>
    </div>
  ),
  Company: () => (
    <div className="mega-links">
      <Link to="/company">
        <strong>Our approach</strong>
        <small>Evidence before a confident answer.</small>
      </Link>
      <Link to="/contact">
        <strong>Contact</strong>
        <small>Product, evaluation and privacy inquiries.</small>
      </Link>
      <Link to="/evaluation">
        <strong>Evaluation protocol</strong>
        <small>Three closed cases. A pre-agreed test.</small>
      </Link>
    </div>
  ),
};
export function Header() {
  const [open, setOpen] = useState(null);
  const [mobile, setMobile] = useState(false);
  const dialog = useRef();
  const location = useLocation();
  const root = useRef();
  const trigger = useRef();
  useEffect(() => {
    setOpen(null);
    setMobile(false);
    dialog.current?.close();
  }, [location.pathname]);
  useEffect(() => {
    const on = (e) => {
      if (e.key === "Escape" && document.getElementById("desktop-menu")) {
        setOpen(null);
        trigger.current?.focus();
      }
    };
    const click = (e) => {
      if (root.current && !root.current.contains(e.target)) setOpen(null);
    };
    document.addEventListener("keydown", on);
    document.addEventListener("pointerdown", click);
    return () => {
      document.removeEventListener("keydown", on);
      document.removeEventListener("pointerdown", click);
    };
  }, []);
  useEffect(() => {
    if (mobile) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header" ref={root}>
        <div className="nav-shell">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            {[
              "Products",
              "Platform",
              "Solutions",
              "Pricing",
              "Resources",
              "Company",
            ].map((label) =>
              label === "Pricing" ? (
                <Link className="nav-link" key={label} to="/pricing">
                  Pricing
                </Link>
              ) : (
                <button
                  className={"nav-link " + (open === label ? "active" : "")}
                  key={label}
                  aria-expanded={open === label}
                  aria-controls="desktop-menu"
                  onClick={(e) => {
                    trigger.current = e.currentTarget;
                    setOpen(open === label ? null : label);
                  }}
                >
                  {label}
                  <CaretDown size={11} />
                </button>
              ),
            )}
          </nav>
          <div className="nav-actions">
            <Link className="sign-in" to="/sign-in">
              Sign in
            </Link>
            <Button to="/request-evaluation" className="nav-cta">
              Request evaluation
            </Button>
            <button
              className="mobile-toggle icon-button"
              aria-label="Open navigation"
              onClick={() => setMobile(true)}
            >
              <List size={25} />
            </button>
          </div>
        </div>
        {open && (
          <div
            className={"mega-menu " + (open === "Products" ? "mega-wide" : "")}
            id="desktop-menu"
          >
            {React.createElement(navGroups[open])}
          </div>
        )}
      </header>
      <dialog
        ref={dialog}
        className="mobile-menu"
        onCancel={() => setMobile(false)}
        onClick={(e) => {
          if (e.target === dialog.current) setMobile(false);
        }}
      >
        <div className="mobile-menu-top">
          <Brand />
          <button
            className="icon-button"
            aria-label="Close navigation"
            onClick={() => setMobile(false)}
          >
            <X size={25} />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {Object.entries(navGroups).map(([name, Content]) => (
            <details key={name}>
              <summary>
                {name}
                <CaretDown size={17} />
              </summary>
              <Content />
            </details>
          ))}
          <Link className="mobile-price" to="/pricing">
            Pricing <ArrowRight size={20} />
          </Link>
          <Link className="mobile-price" to="/sign-in">
            Sign in <ArrowRight size={20} />
          </Link>
          <Button to="/request-evaluation">Request paid evaluation</Button>
        </nav>
        <p className="mobile-menu-note">
          Research-stage concept. Synthetic demo. No production connections.
        </p>
      </dialog>
    </>
  );
}
export function Footer() {
  const { reduceMotion, setReduceMotion, systemReduce } = usePreferences();
  const cols = [
    ["Products", ...products.map((p) => [p.name, "/products/" + p.id])],
    [
      "Explore",
      ["Platform", "/platform"],
      ["Solutions", "/solutions"],
      ["Why change", "/why-change"],
      ["Pricing", "/pricing"],
    ],
    [
      "Evaluate",
      ["Synthetic demo", "/demo"],
      ["Evidence packet", "/resources/example-evidence-packet"],
      ["Pilot protocol", "/evaluation"],
      ["Request evaluation", "/request-evaluation"],
    ],
    [
      "Company",
      ["About", "/company"],
      ["Contact", "/contact"],
      ["Resources", "/resources"],
      ["Sign in", "/sign-in"],
    ],
    [
      "Trust",
      ["Data boundaries", "/trust"],
      ["Privacy", "/legal/privacy"],
      ["Terms", "/legal/terms"],
      ["Accessibility", "/accessibility"],
    ],
  ];
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Brand />
            <p>
              Evidence, alternatives,
              <br />
              and a decision owned by people.
            </p>
            <small>
              Research-stage concept.
              <br />
              No production control.
            </small>
          </div>
          {cols.map(([name, ...links]) => (
            <div className="footer-column" key={name}>
              <h3>{name}</h3>
              {links.map(([label, to]) => (
                <Link key={to} to={to}>
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <div className="source-note">
            Workflow context:{" "}
            <a
              href="https://support.tulip.co/docs/genealogy-and-traceability-use-case"
              target="_blank"
              rel="noreferrer"
            >
              Tulip traceability
            </a>{" "}
            ·{" "}
            <a
              href="https://instrumental.com/accelerate-your-npi-programs/"
              target="_blank"
              rel="noreferrer"
            >
              Instrumental inspection
            </a>
            .<br />
            No endorsement implied.
          </div>
          <div className="socials">
            <span
              aria-label="LinkedIn profile not published"
              title="LinkedIn profile not published"
            >
              <LinkedinLogo size={24} />
              <small>
                Profile not
                <br />
                published
              </small>
            </span>
            <span
              aria-label="Crunchbase profile not published"
              title="Crunchbase profile not published"
            >
              <img
                src="/assets/crunchbase.svg"
                width="24"
                height="24"
                alt="Crunchbase"
              />
              <small>
                Profile not
                <br />
                published
              </small>
            </span>
          </div>
          <div className="copyright">
            © {new Date().getFullYear()} DefectTrail
            <br />
            <small>Name & domain verification pending.</small>
          </div>
          <button
            className="motion-switch"
            aria-pressed={reduceMotion || systemReduce}
            onClick={() => setReduceMotion(!reduceMotion)}
          >
            {reduceMotion || systemReduce ? "Motion reduced" : "Reduce motion"}
            <Eye size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
export function ConceptStrip() {
  return (
    <div className="concept-strip">
      <span className="status-dot" />
      <span>Concept preview</span>
      <span className="strip-sep">/</span>
      <span>Synthetic records. Human decisions.</span>
      <Link to="/trust">
        Read the boundaries <ArrowUpRight size={12} />
      </Link>
    </div>
  );
}
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  children,
  compact = false,
}) {
  return (
    <section
      className={
        "page-hero container " +
        (image ? "illustrated" : "") +
        " " +
        (compact ? "compact" : "")
      }
    >
      <div data-reveal>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p className="page-lead">{description}</p>}
        {children}
      </div>
      {image && (
        <img
          className="art"
          src={"/assets/" + image + ".webp"}
          alt="Original synthetic manufacturing evidence illustration"
        />
      )}
    </section>
  );
}
