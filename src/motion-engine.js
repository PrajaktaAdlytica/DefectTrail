import gsap from "gsap";
let controller = null;
export function setScrollController(value) {
  controller = value;
}
export function scrollToPosition(target, immediate = false, options = {}) {
  if (controller) {
    controller.scrollTo(target, {
      immediate,
      force: true,
      duration: immediate ? 0 : 1.35,
      offset: typeof target === "string" ? -84 : 0,
      ...options,
    });
    return;
  }
  if (options.onComplete) setTimeout(options.onComplete, immediate ? 0 : 1400);
  if (typeof target === "number")
    window.scrollTo({
      top: target,
      behavior: immediate ? "instant" : "smooth",
    });
  else
    document.querySelector(target)?.scrollIntoView({
      behavior: immediate ? "instant" : "smooth",
      block: "start",
    });
}
export function refreshScenes() {
  requestAnimationFrame(() =>
    window.dispatchEvent(new Event("dt:refresh-scenes")),
  );
}
export function magneticMove(element, event) {
  const r = element.getBoundingClientRect();
  gsap.to(element, {
    "--mx": `${(event.clientX - r.left - r.width / 2) * 0.12}px`,
    "--my": `${(event.clientY - r.top - r.height / 2) * 0.16}px`,
    duration: 0.35,
    ease: "power3.out",
    overwrite: "auto",
  });
}
