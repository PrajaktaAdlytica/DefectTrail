import React, { useEffect, useState, useRef } from "react";
import { Player } from "@remotion/player";
import { BeneathSurface } from "../../intro-film/src/Film";
export default function FilmPlayer({
  playerRef,
  onEnded,
  onPlaying,
  onReady,
  onTime,
}) {
  const box = useRef();
  const [size, setSize] = useState({ width: 1920, height: 1080 });
  useEffect(() => {
    const o = new ResizeObserver(([e]) => {
      const r = e.contentRect;
      if (r.width)
        setSize({
          width: 1920,
          height: Math.round((1920 * r.height) / r.width),
        });
    });
    o.observe(box.current);
    return () => o.disconnect();
  }, []);
  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    const play = () => onPlaying(true);
    const pause = () => onPlaying(false);
    p.addEventListener("ended", onEnded);
    p.addEventListener("play", play);
    p.addEventListener("pause", pause);
    p.addEventListener("timeupdate", onTime);
    onReady();
    return () => {
      p.removeEventListener("ended", onEnded);
      p.removeEventListener("play", play);
      p.removeEventListener("pause", pause);
      p.removeEventListener("timeupdate", onTime);
    };
  }, [onEnded, onPlaying, onReady, onTime, playerRef]);
  return (
    <div className="intro-player" ref={box}>
      <Player
        ref={playerRef}
        component={BeneathSurface}
        durationInFrames={540}
        fps={60}
        compositionWidth={size.width}
        compositionHeight={size.height}
        controls={false}
        clickToPlay={false}
        doubleClickToFullscreen={false}
        spaceKeyToPlayOrPause={false}
        moveToBeginningWhenEnded={false}
        initiallyMuted
        style={{ width: "100%", height: "100%" }}
        aria-label="Beneath the surface — DefectTrail opening film"
      />
    </div>
  );
}
