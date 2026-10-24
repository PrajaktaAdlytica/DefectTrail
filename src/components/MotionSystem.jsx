import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePreferences } from "../lib";
import { setScrollController, magneticMove } from "../motion-engine";

gsap.registerPlugin(ScrollTrigger);
export function MotionSystem() {
  const { reduced } = usePreferences();
  const { pathname } = useLocation();
  const progress = useRef();
  useEffect(() => {
    if (reduced) return;
    const smooth = window.matchMedia("(pointer:fine)").matches;
    let lenis;
    if (smooth) {
      lenis = new Lenis({
        autoRaf: false,
        lerp: 0.09,
        smoothWheel: true,
        syncTouch: false,
        anchors: { offset: -94 },
        prevent: (node) =>
          Boolean(
            node.closest?.(
              "dialog,.table-wrap,[data-lenis-prevent],textarea,select",
            ),
          ),
      });
      setScrollController(lenis);
      lenis.on("scroll", ScrollTrigger.update);
    }
    const tick = (time) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const sync = () =>
      lenis?.scrollTo(window.scrollY, { immediate: true, force: true });
    const refresh = () => {
      lenis?.resize();
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };
    window.addEventListener("dt:scroll-reset", sync);
    window.addEventListener("dt:refresh-scenes", refresh);
    const modalObserver = new MutationObserver(() => {
      if (document.querySelector("dialog[open]")) lenis?.stop();
      else lenis?.start();
    });
    modalObserver.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ["open"],
    });
    const move = (e) => {
      if (!smooth) return;
      const button = e.target.closest?.(".button");
      if (button) magneticMove(button, e);
      const card = e.target.closest?.(
        ".product-row,.offer-panel,.resource-grid article,.role",
      );
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty(
          "--pointer-x",
          `${((e.clientX - r.left) / r.width - 0.5) * 20}px`,
        );
        card.style.setProperty(
          "--pointer-y",
          `${((e.clientY - r.top) / r.height - 0.5) * 12}px`,
        );
      }
    };
    const out = (e) => {
      const b = e.target.closest?.(".button");
      if (b && !b.contains(e.relatedTarget))
        gsap.to(b, {
          "--mx": "0px",
          "--my": "0px",
          duration: 0.5,
          ease: "elastic.out(1,.6)",
          overwrite: "auto",
        });
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerout", out);
    const reading = ScrollTrigger.create({
      start: 0,
      end: () => Math.max(1, ScrollTrigger.maxScroll(window)),
      onUpdate: (self) => {
        progress.current?.style.setProperty("--reading", self.progress);
        document.documentElement.classList.toggle(
          "has-scrolled",
          self.scroll() > 60,
        );
      },
    });
    const refreshId = requestAnimationFrame(refresh);
    return () => {
      cancelAnimationFrame(refreshId);
      reading.kill();
      window.removeEventListener("dt:scroll-reset", sync);
      window.removeEventListener("dt:refresh-scenes", refresh);
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", out);
      modalObserver.disconnect();
      gsap.ticker.remove(tick);
      lenis?.destroy();
      setScrollController(null);
      document.documentElement.classList.remove("has-scrolled");
    };
  }, [reduced, pathname]);
  return <div className="reading-progress" aria-hidden="true" ref={progress} />;
}
