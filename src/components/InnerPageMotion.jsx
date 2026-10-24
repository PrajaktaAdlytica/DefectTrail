import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePreferences } from "../lib";

// Marketing narrative moves; task surfaces keep their controls in normal flow.
export function InnerPageMotion() {
  const { pathname } = useLocation();
  const { reduced } = usePreferences();
  useEffect(() => {
    if (pathname === "/" || reduced) return;
    const root = document.querySelector("main");
    if (!root) return;
    root.dataset.innerMotion = "true";
    const task = root.matches(
      ".demo-page,.demo-evaluation-page,.form-page,.sign-in-page,.report-page",
    );
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const headline = root.querySelector("h1");
      if (headline)
        gsap.fromTo(
          headline,
          { y: 55, clipPath: "inset(100% 0% 0% 0%)" },
          {
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.05,
            ease: "power3.out",
            clearProps: "clipPath",
          },
        );
      const intro = root.querySelectorAll(
        ".page-hero .eyebrow,.page-hero .page-lead,.page-hero .button-row,.page-hero .product-hero-price,.form-page-copy>.eyebrow,.form-page-copy>.page-lead,.access-panel,.demo-page-heading,.demo-filter-bar,.report-heading .button-row",
      );
      gsap.fromTo(
        intro,
        { y: 25, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.85,
          stagger: 0.07,
          ease: "power3.out",
        },
      );
      // The existing content is the sequence: no invented activity or animated metrics.
      const items = root.querySelectorAll(
        ".editorial-sections>section,.reading-column>section,.report-document>section,.source-ledger>article,.source-ledger>div,.recommended-row,.resource-grid>article,.trust-facts>div,.editorial-columns>div,.form-next-steps li,.evaluation-stages>li,.workbench,.eval-deal",
      );
      items.forEach((el, i) =>
        gsap.fromTo(
          el,
          {
            y: task ? 18 : 55,
            autoAlpha: 0.2,
            rotateX: task ? 0 : 3,
            transformPerspective: 1000,
          },
          {
            y: 0,
            autoAlpha: 1,
            rotateX: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 94%", once: true },
          },
        ),
      );
      root
        .querySelectorAll("section:not(.page-hero) h2,.report-document h2")
        .forEach((el) =>
          gsap.fromTo(
            el,
            { clipPath: "inset(0% 100% 0% 0%)", x: -12 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              x: 0,
              duration: 0.85,
              ease: "power2.out",
              clearProps: "clipPath",
              scrollTrigger: { trigger: el, start: "top 94%", once: true },
            },
          ),
        );
      root.querySelectorAll("tbody tr,.numbered-process>li").forEach((el) => {
        gsap.fromTo(
          el,
          { x: task ? 0 : 35, autoAlpha: 0.35 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 94%", once: true },
          },
        );
        ScrollTrigger.create({
          trigger: el,
          start: "top 65%",
          end: "bottom 38%",
          toggleClass: "motion-current",
        });
      });
      mm.add("(min-width:820px) and (min-height:580px)", () => {
        root
          .querySelectorAll(
            ".page-hero.illustrated>.art,.folder-art>.art,.form-page-copy>.art,.sign-in-layout .art,.resource-grid article .art,.review-art,.report-heading .art",
          )
          .forEach((el, i) =>
            gsap.fromTo(
              el,
              { y: 65, rotate: i % 2 ? 3 : -3, scale: 0.91 },
              {
                y: -35,
                rotate: 0,
                scale: 1.04,
                ease: "none",
                scrollTrigger: {
                  trigger: el.closest("section") || el.parentElement,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              },
            ),
          );
        root
          .querySelectorAll(".module-output,.decision-gate,.review-boundary")
          .forEach((el) =>
            gsap.fromTo(
              el,
              { clipPath: "inset(8% 3% 8% 3% round 55px)" },
              {
                clipPath: "inset(0% 0% 0% 0% round 0px)",
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top bottom",
                  end: "top 18%",
                  scrub: 0.8,
                },
              },
            ),
          );
        root.querySelectorAll(".shared-case-grid").forEach((section) => {
          const art = section.querySelector(".folder-art");
          const legend = section.querySelector(".platform-layers");
          section.dataset.sourceChapter = "true";
          ScrollTrigger.create({
            trigger: art,
            start: "top 115px",
            endTrigger: legend,
            end: () =>
              `bottom ${Math.min(innerHeight - 30, 115 + art.offsetHeight)}px`,
            pin: true,
            pinSpacing: false,
            invalidateOnRefresh: true,
          });
          gsap.fromTo(
            legend.children,
            { x: 55, autoAlpha: 0.15 },
            {
              x: 0,
              autoAlpha: 1,
              duration: 0.8,
              stagger: 0.12,
              scrollTrigger: { trigger: legend, start: "top 85%", once: true },
            },
          );
        });
        root.querySelectorAll(".module-process").forEach((section) => {
          const visual = section.firstElementChild;
          const steps = section.querySelectorAll(".numbered-process>li");
          section.dataset.scrollChapter = "true";
          ScrollTrigger.create({
            trigger: visual,
            start: "top 110px",
            endTrigger: section,
            end: () =>
              `bottom ${Math.min(innerHeight - 30, 110 + visual.offsetHeight)}px`,
            pin: true,
            pinSpacing: false,
            invalidateOnRefresh: true,
          });
          steps.forEach((el, i) =>
            ScrollTrigger.create({
              trigger: el,
              start: "top 60%",
              end: "bottom 40%",
              onEnter: () => section.style.setProperty("--chapter-step", i),
              onEnterBack: () => section.style.setProperty("--chapter-step", i),
            }),
          );
          const art = visual.querySelector(".art");
          if (art)
            gsap.fromTo(
              art,
              { rotate: -5, scale: 0.9, y: 30 },
              {
                rotate: 3,
                scale: 1.06,
                y: -15,
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top 65%",
                  end: "bottom bottom",
                  scrub: 1,
                },
              },
            );
        });
        root
          .querySelectorAll(".solution-process,.editorial-sections")
          .forEach((section) => (section.dataset.progressiveReading = "true"));
      });
    }, root);
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });
    return () => {
      cancelAnimationFrame(frame);
      mm.revert();
      ctx.revert();
      delete root.dataset.innerMotion;
      root
        .querySelectorAll(
          "[data-scroll-chapter],[data-progressive-reading],[data-source-chapter]",
        )
        .forEach((el) => {
          delete el.dataset.scrollChapter;
          delete el.dataset.sourceChapter;
          delete el.dataset.progressiveReading;
        });
    };
  }, [pathname, reduced]);
  return null;
}
