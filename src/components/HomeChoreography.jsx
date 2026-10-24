import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePreferences } from "../lib";
export function HomeChoreography({ root }) {
  const { reduced } = usePreferences();
  useEffect(() => {
    if (reduced || !root.current) return;
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const entry = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });
      entry
        .fromTo(
          ".hero-wordline",
          { yPercent: 115, rotate: 3 },
          { yPercent: 0, rotate: 0, duration: 1.15, stagger: 0.13 },
          0.05,
        )
        .fromTo(
          ".hero .eyebrow,.hero-description,.hero-actions,.hero-disclosure",
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1 },
          0.45,
        )
        .fromTo(
          ".factory-image",
          { y: 100, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.6 },
          0.15,
        );
      ScrollTrigger.create({
        trigger: ".hero-stage",
        start: "top 60%",
        once: true,
        onEnter: () => entry.play(),
      });
      mm.add("(min-width:820px) and (min-height:580px)", () => {
        const paths = root.current.querySelectorAll(".trace-path");
        paths.forEach((p) => {
          const length = p.getTotalLength();
          gsap.set(p, { strokeDasharray: length, strokeDashoffset: length });
        });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero-stage",
            start: "top 84px",
            end: () => `+=${window.innerHeight * 1.8}`,
            pin: true,
            scrub: 0.9,
            anticipatePin: 1,
            refreshPriority: 10,
          },
        });
        tl.to(
          ".hero-copy",
          {
            yPercent: -45,
            autoAlpha: 0,
            scale: 0.94,
            duration: 0.38,
            ease: "none",
          },
          0.04,
        )
          .fromTo(
            ".factory-scene",
            { scale: 1, xPercent: 0, yPercent: 0 },
            {
              scale: 1.2,
              xPercent: 0,
              yPercent: -4,
              duration: 1,
              ease: "none",
            },
            0,
          )
          .fromTo(
            ".source-lot",
            { y: 35, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.1 },
            0.1,
          )
          .fromTo(
            ".source-station",
            { y: 35, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.1 },
            0.27,
          )
          .fromTo(
            ".source-inspection",
            { y: 35, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.1 },
            0.44,
          )
          .fromTo(
            ".source-gap",
            { y: 30, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.12 },
            0.69,
          )
          .to(
            paths,
            {
              strokeDashoffset: 0,
              duration: 0.58,
              stagger: 0.12,
              ease: "none",
            },
            0.16,
          )
          .fromTo(
            ".hero-turn-copy",
            { y: 65, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.24, ease: "none" },
            0.43,
          )
          .to(
            ".hero-turn-copy",
            { y: -35, autoAlpha: 0, duration: 0.13 },
            0.96,
          );
      });
      gsap.fromTo(
        ".folder-art",
        { rotate: -7, x: -70, scale: 0.86 },
        {
          rotate: 0,
          x: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".shared-case",
            start: "top 85%",
            end: "center 45%",
            scrub: 1,
          },
        },
      );
      gsap.from(".platform-layers li", {
        x: 70,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".platform-layers",
          start: "top 78%",
          once: true,
        },
      });
      gsap.fromTo(
        ".review-boundary",
        { clipPath: "inset(10% 4% 8% 4% round 70px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: {
            trigger: ".review-boundary",
            start: "top 95%",
            end: "top 20%",
            scrub: 0.8,
          },
        },
      );
      gsap.fromTo(
        ".review-folio",
        { y: 90, rotateX: 12, rotate: -2, transformPerspective: 1000 },
        {
          y: 0,
          rotateX: 0,
          rotate: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".review-folio",
            start: "top 95%",
            end: "top 42%",
            scrub: 1,
          },
        },
      );
      gsap.utils.toArray(".role-artifact").forEach((el, i) =>
        gsap.fromTo(
          el,
          { y: 60, rotate: i === 1 ? 4 : -4 },
          {
            y: 0,
            rotate: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "top 40%",
              scrub: 1,
            },
          },
        ),
      );
      gsap.from(".scorecard tbody tr", {
        x: 45,
        autoAlpha: 0,
        stagger: 0.17,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: ".scorecard", start: "top 80%", once: true },
      });
      gsap.fromTo(
        ".packet-art",
        { x: 100, y: 50, rotate: 8, scale: 0.9 },
        {
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".final-cta-intro",
            start: "top 90%",
            end: "center 50%",
            scrub: 1,
          },
        },
      );
    }, root);
    const id = requestAnimationFrame(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });
    return () => {
      cancelAnimationFrame(id);
      mm.revert();
      ctx.revert();
    };
  }, [reduced]);
  return null;
}
