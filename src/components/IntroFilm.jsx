import React, {
  Suspense,
  lazy,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { ArrowDown, Pause, Play, ArrowClockwise } from "@phosphor-icons/react";
import { usePreferences } from "../lib";
import { scrollToPosition } from "../motion-engine";
const FilmPlayer = lazy(() => import("./FilmPlayer"));
function markSeen() {
  try {
    sessionStorage.setItem("dt-intro-seen", "1");
  } catch {}
}
export function IntroFilm() {
  const { reduced } = usePreferences();
  const root = useRef();
  const player = useRef();
  const progress = useRef();
  const allowAdvance = useRef(true);
  const mounted = useRef(true);
  const pausedByUser = useRef(false);
  const moving = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [assetsReady, setAssetsReady] = useState(false);
  const [assetError, setAssetError] = useState(false);
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    mounted.current = true;
    if (reduced) return;
    let cancelled = false;
    setAssetError(false);
    Promise.all(
      ["surface", "lens"].map(
        (name) =>
          new Promise((resolve, reject) => {
            const im = new Image();
            im.onload = resolve;
            im.onerror = reject;
            im.src = `/assets/intro/${name}.webp`;
          }),
      ),
    )
      .then(() => document.fonts.ready)
      .then(() => {
        if (!cancelled && mounted.current) setAssetsReady(true);
      })
      .catch(() => {
        if (!cancelled && mounted.current) setAssetError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [reduced]);
  useEffect(
    () => () => {
      mounted.current = false;
    },
    [],
  );
  const toHero = useCallback(() => {
    markSeen();
    pausedByUser.current = true;
    allowAdvance.current = false;
    player.current?.pause();
    setEnded(true);
    moving.current = true;
    setLeaving(true);
    const target = document.querySelector(".hero-stage");
    const y =
      target.getBoundingClientRect().top +
      window.scrollY -
      (innerWidth < 820 ? 70 : 84);
    scrollToPosition(y, reduced, {
      duration: 1.8,
      onComplete: () => {
        if (!mounted.current) return;
        moving.current = false;
        setLeaving(false);
        document
          .querySelector(".hero-actions a")
          ?.focus({ preventScroll: true });
      },
    });
  }, [reduced]);
  const onEnded = useCallback(() => {
    setEnded(true);
    markSeen();
    const r = root.current?.getBoundingClientRect();
    if (
      allowAdvance.current &&
      r &&
      r.bottom > 150 &&
      r.top < innerHeight * 0.5 &&
      !document.hidden
    )
      toHero();
  }, [toHero]);
  const onTime = useCallback((e) => {
    if (progress.current) progress.current.value = e.detail.frame;
  }, []);
  const onReady = useCallback(() => {
    if (location.hash === "#intro" && allowAdvance.current)
      scrollToPosition(0, true);
    setLoaded(true);
    const r = root.current?.getBoundingClientRect();
    if (
      r &&
      r.bottom > 150 &&
      r.top < innerHeight * 0.5 &&
      !reduced &&
      (!location.hash || location.hash === "#intro") &&
      !pausedByUser.current
    ) {
      player.current?.play();
    }
  }, [reduced]);
  const replay = useCallback(() => {
    allowAdvance.current = false;
    pausedByUser.current = false;
    moving.current = true;
    setEnded(false);
    setLeaving(false);
    player.current?.pause();
    player.current?.seekTo(0);
    scrollToPosition("#intro", reduced, {
      duration: 1.5,
      onComplete: () => {
        if (!mounted.current) return;
        moving.current = false;
        allowAdvance.current = true;
        if (!reduced) player.current?.play();
      },
    });
  }, [reduced]);
  useEffect(() => {
    // Explicit hashes bypass the opening. Returning visitors land on the hero.
    let seen = false;
    try {
      seen = sessionStorage.getItem("dt-intro-seen") === "1";
    } catch {}
    if (seen && !location.hash) {
      allowAdvance.current = false;
      pausedByUser.current = true;
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (mounted.current) scrollToPosition(".hero-stage", true);
        }),
      );
      return () => cancelAnimationFrame(id);
    }
  }, []);
  useEffect(() => {
    if (reduced) player.current?.pause();
  }, [reduced]);
  useEffect(() => {
    const interrupt = () => {
      if (!moving.current) allowAdvance.current = false;
    };
    const key = (e) => {
      if (
        [
          "ArrowDown",
          "ArrowUp",
          "PageDown",
          "PageUp",
          "End",
          "Home",
          " ",
        ].includes(e.key)
      )
        interrupt();
    };
    const visibility = () => {
      if (document.hidden) player.current?.pause();
    };
    const observer = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting && !moving.current) {
          player.current?.pause();
          allowAdvance.current = false;
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(root.current);
    window.addEventListener("wheel", interrupt, { passive: true });
    window.addEventListener("touchmove", interrupt, { passive: true });
    window.addEventListener("keydown", key);
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("dt:replay-intro", replay);
    return () => {
      observer.disconnect();
      window.removeEventListener("wheel", interrupt);
      window.removeEventListener("touchmove", interrupt);
      window.removeEventListener("keydown", key);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("dt:replay-intro", replay);
    };
  }, [replay]);
  const toggle = (e) => {
    if (ended) {
      replay();
      return;
    }
    pausedByUser.current = playing;
    if (playing) player.current?.pause();
    else {
      allowAdvance.current = true;
      player.current?.play(e);
    }
  };
  return (
    <section
      ref={root}
      id="intro"
      className={
        "intro-film" + (reduced ? " reduced" : "") + (ended ? " ended" : "")
      }
      aria-label="DefectTrail opening film"
      data-playing={playing}
      data-ended={ended}
    >
      {(reduced || !loaded || (ended && !leaving)) && (
        <div className={"intro-poster" + (ended ? " finished" : "")}>
          <img
            src="/assets/intro/poster.webp"
            alt="An optical disc magnifies a fine seam in an ivory porcelain surface"
          />
          <div>
            {ended ? (
              <>
                <p>DefectTrail</p>
                <small>Look closer. Keep questioning.</small>
              </>
            ) : (
              <>
                <p>Look closer.</p>
                <p>Keep questioning.</p>
              </>
            )}
          </div>
        </div>
      )}
      {!reduced && assetsReady && (
        <Suspense fallback={null}>
          <FilmPlayer
            playerRef={player}
            onEnded={onEnded}
            onPlaying={setPlaying}
            onReady={onReady}
            onTime={onTime}
          />
        </Suspense>
      )}
      {!reduced && (
        <input
          ref={progress}
          className="intro-seek"
          type="range"
          min="0"
          max="539"
          step="1"
          defaultValue="0"
          aria-label="Opening film position"
          onChange={(e) => {
            allowAdvance.current = false;
            pausedByUser.current = true;
            player.current?.pause();
            player.current?.seekTo(Number(e.target.value));
            setEnded(false);
          }}
        />
      )}
      <div className="intro-meta">
        <span>BENEATH THE SURFACE</span>
        <span>CONCEPT FILM · SYNTHETIC EXAMPLE</span>
      </div>
      <div className="intro-controls">
        <span role={assetError ? "status" : undefined}>
          {assetError
            ? "FILM UNAVAILABLE · CONTINUE BELOW"
            : reduced
              ? "A STILL MOMENT"
              : "A CLOSER LOOK / 00:09"}
        </span>
        <div>
          {!reduced && !assetError && (
            <button
              onClick={toggle}
              disabled={!loaded}
              aria-label={
                ended ? "Replay intro" : playing ? "Pause intro" : "Play intro"
              }
            >
              {ended ? <ArrowClockwise /> : playing ? <Pause /> : <Play />}
              {ended ? "Replay" : playing ? "Pause" : "Play"}
            </button>
          )}
          <button onClick={toHero}>
            {reduced || assetError
              ? "Continue to DefectTrail"
              : "Skip to DefectTrail"}
            <ArrowDown />
          </button>
        </div>
      </div>
    </section>
  );
}
export function ReplayIntro() {
  return (
    <button
      className="hero-replay"
      onClick={() => window.dispatchEvent(new Event("dt:replay-intro"))}
    >
      <Play size={12} /> Replay opening film
    </button>
  );
}
