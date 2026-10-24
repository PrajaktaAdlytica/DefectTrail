import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { useLocation, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  WarningCircle,
  Info,
  Clock,
  FileText,
  TreeStructure,
  ArrowsLeftRight,
  Selection,
  ClipboardText,
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);
const PreferenceContext = createContext(null);
export function Preferences({ children }) {
  const [reduceMotion, setReduceMotion] = useState(() => {
    try {
      return localStorage.getItem("dt-motion") === "reduce";
    } catch {
      return false;
    }
  });
  const [systemReduce, setSystemReduce] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setSystemReduce(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  const reduced = reduceMotion || systemReduce;
  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? "reduce" : "full";
    try {
      localStorage.setItem("dt-motion", reduceMotion ? "reduce" : "system");
    } catch {}
  }, [reduceMotion, reduced]);
  const track = (name, properties = {}) => {
    if (!analyticsConsent) return;
    const allowed = Object.fromEntries(
      Object.entries(properties).filter(([key]) =>
        ["offerId", "route", "location", "caseId", "formId"].includes(key),
      ),
    );
    setEvents((old) => [
      ...old.slice(-99),
      { name, ...allowed, time: new Date().toISOString(), localOnly: true },
    ]);
  };
  return (
    <PreferenceContext.Provider
      value={{
        reduced,
        reduceMotion,
        setReduceMotion,
        systemReduce,
        analyticsConsent,
        setAnalyticsConsent,
        events,
        track,
      }}
    >
      {children}
    </PreferenceContext.Provider>
  );
}
export const usePreferences = () => useContext(PreferenceContext);
export function usePageMotion() {
  const ref = useRef(null);
  const { reduced } = usePreferences();
  const { pathname } = useLocation();
  useEffect(() => {
    if (reduced || !ref.current || pathname !== "/") return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 26, opacity: 0.15 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 94%", once: true },
          },
        );
      });
      gsap.utils.toArray("[data-drift]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 18 },
          {
            y: -18,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          },
        );
      });
    }, ref);
    return () => ctx.revert();
  }, [reduced, pathname]);
  return ref;
}
export function ScrollReset() {
  useEffect(() => {
    const previous = history.scrollRestoration;
    history.scrollRestoration = "manual";
    return () => {
      history.scrollRestoration = previous;
    };
  }, []);
  const { pathname, hash, state } = useLocation();
  const { track } = usePreferences();
  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => {
        document
          .getElementById(decodeURIComponent(hash.slice(1)))
          ?.scrollIntoView({ behavior: "instant" });
        window.dispatchEvent(new Event("dt:scroll-reset"));
      });
    } else if (!state?.preserveScroll)
      window.scrollTo({ top: 0, behavior: "instant" });
    window.dispatchEvent(new Event("dt:scroll-reset"));
    track("page_view", { route: pathname });
    const heading = document.querySelector("main h1");
    document.title =
      (heading?.innerText?.replace(/\s+/g, " ").trim() ||
        "Factory quality investigation") + " · DefectTrail";
  }, [pathname, hash]);
  return null;
}
export function Button({
  to,
  children,
  secondary = false,
  quiet = false,
  external = false,
  className = "",
  ...props
}) {
  const cls = `button ${secondary ? "button-secondary" : ""} ${quiet ? "button-quiet" : ""} ${className}`;
  const content = (
    <>
      <span className="button-label">{children}</span>
      <span className="button-arrow-slot">
        {external ? (
          <ArrowUpRight size={18} />
        ) : (
          <>
            <ArrowRight className="button-arrow" size={19} />
            <ArrowRight className="button-arrow-echo" size={19} />
          </>
        )}
      </span>
    </>
  );
  return to ? (
    <Link className={cls} to={to} {...props}>
      {content}
    </Link>
  ) : (
    <button className={cls} {...props}>
      {content}
    </button>
  );
}
export function TextLink({ to, children, className = "", ...props }) {
  return (
    <Link to={to} className={"text-link " + className} {...props}>
      {children}
      <ArrowRight size={17} />
    </Link>
  );
}
export function Eyebrow({ children, light = false }) {
  return (
    <p className={"eyebrow " + (light ? "eyebrow-light" : "")}>{children}</p>
  );
}
export function DemoBadge({ compact = false }) {
  return (
    <span className={"demo-badge " + (compact ? "compact" : "")}>
      {compact ? "DEMO / SIMULATED" : "DEMO · SIMULATED DATA"}
      {!compact && <span className="badge-divider">CONCEPT PREVIEW</span>}
    </span>
  );
}
export function Status({ children, tone = "plum", icon = true }) {
  const I =
    tone === "apricot" || tone === "danger"
      ? WarningCircle
      : tone === "sage"
        ? Check
        : Clock;
  return (
    <span className={"status " + tone}>
      {icon && <I size={14} />} {children}
    </span>
  );
}
const artSizes = {
  "factory-panorama": [2048, 768],
  "exploded-assembly": [1070, 1470],
  "evidence-folder": [1448, 1086],
  "review-packet": [1360, 1156],
  "inspection-board": [1476, 1066],
  "station-fixture": [1556, 1011],
};
export function Art({
  name,
  alt = "",
  className = "",
  priority = false,
  ...props
}) {
  const [width, height] = artSizes[name] || [1000, 1000];
  return (
    <img
      width={width}
      height={height}
      className={"art " + className}
      src={"/assets/" + name + ".webp"}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      {...(priority ? { fetchPriority: "high" } : {})}
      {...props}
    />
  );
}
export function Notice({ children, tone = "apricot", className = "" }) {
  return (
    <div className={"notice " + tone + " " + className}>
      <Info size={19} />
      <div>{children}</div>
    </div>
  );
}
export function SectionHead({
  eyebrow,
  title,
  description,
  children,
  align = "left",
}) {
  return (
    <div className={"section-head " + align} data-reveal>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
      {children}
    </div>
  );
}
export const moduleIcons = {
  chronology: ClipboardText,
  genealogy: TreeStructure,
  comparison: ArrowsLeftRight,
  scope: Selection,
  packet: FileText,
};
export function ModuleIcon({ type, size = 24, ...props }) {
  const Icon = moduleIcons[type] || FileText;
  return <Icon size={size} weight="light" {...props} />;
}
export function useInViewEvent(ref, name, properties) {
  const { track, analyticsConsent } = usePreferences();
  useEffect(() => {
    if (!ref.current || !analyticsConsent) return;
    let timer;
    let done = false;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !done) {
            timer = setTimeout(() => {
              done = true;
              track(name, properties);
              obs.disconnect();
            }, 1000);
          } else clearTimeout(timer);
        });
      },
      { threshold: 0.5 },
    );
    obs.observe(ref.current);
    return () => {
      clearTimeout(timer);
      obs.disconnect();
    };
  }, [analyticsConsent]);
}
export function Meta({ title, description }) {
  useEffect(() => {
    document.title = title + " · DefectTrail";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        description ||
          "Research-stage read-only quality investigation. Explore source-linked evidence, contradictions and a human-reviewed synthetic demo.",
      );
  }, [title, description]);
  return null;
}
