import React from "react";
import {
  AbsoluteFill,
  CanvasImage,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const ease = Easing.bezier(0.22, 0.6, 0.32, 1);
const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
  easing: ease,
};
/** One shared frame-accurate composition for Studio and the website Player. */
export function BeneathSurface({
  assetBase = "/assets/intro",
  brandSrc = "/assets/brand-mark.webp",
}) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const portrait = height > width;
  const u = width / 1920;
  return (
    <AbsoluteFill
      data-film-frame={frame}
      style={{
        backgroundColor: "#F7F4ED",
        fontFamily: "Manrope, sans-serif",
        overflow: "hidden",
      }}
    >
      <CanvasImage
        src={assetBase + "/surface.webp"}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: portrait ? "62% center" : "center",
          scale: interpolate(frame, [0, 8 * fps], [1.18, 1.015], clamp),
          translate: `${interpolate(frame, [0, 8 * fps], [-35 * u, 0], clamp)}px 0`,
          opacity: interpolate(
            frame,
            [0, 6.9 * fps, 8.3 * fps],
            [1, 1, 0],
            clamp,
          ),
        }}
      />
      <CanvasImage
        src={assetBase + "/lens.webp"}
        style={{
          position: "absolute",
          width: portrait ? width * 1.35 : width * 0.69,
          height: "auto",
          maxWidth: "none",
          right: portrait ? -width * 0.25 : -width * 0.085,
          top: portrait ? height * 0.1 : height * 0.1,
          scale: interpolate(frame, [0.7 * fps, 6.8 * fps], [1.18, 1], clamp),
          translate: `${interpolate(frame, [0.7 * fps, 5.8 * fps], [width * 0.24, 0], clamp)}px ${interpolate(frame, [0.7 * fps, 6.8 * fps], [height * 0.12, -height * 0.025], clamp)}px`,
          rotate:
            interpolate(frame, [0.7 * fps, 6.8 * fps], [-6, 0], clamp) + "deg",
          opacity: interpolate(
            frame,
            [0.5 * fps, 2.8 * fps, 6.7 * fps, 8.2 * fps],
            [0, 1, 1, 0],
            clamp,
          ),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: width * 0.072,
          top: portrait ? height * 0.56 : height * 0.3,
          right: width * 0.055,
          color: "#22232A",
          opacity: interpolate(
            frame,
            [1.1 * fps, 2 * fps, 6.2 * fps, 7.4 * fps],
            [0, 1, 1, 0],
            clamp,
          ),
          translate: `0 ${interpolate(frame, [1.1 * fps, 2.4 * fps], [38 * u, 0], clamp)}px`,
        }}
      >
        <div
          style={{
            fontSize: portrait ? width * 0.13 : width * 0.071,
            lineHeight: 1.05,
            letterSpacing: "-.065em",
            fontFamily: "Fraunces,Georgia,serif",
            fontWeight: 400,
          }}
        >
          Look closer.
        </div>
        <div
          style={{
            fontSize: portrait ? width * 0.112 : width * 0.057,
            lineHeight: 1.14,
            letterSpacing: "-.055em",
            fontFamily: "Fraunces,Georgia,serif",
            fontWeight: 400,
            color: "#765263",
            maxWidth: portrait ? width * 0.86 : width * 0.59,
            marginTop: 12 * u,
            opacity: interpolate(frame, [2.8 * fps, 4 * fps], [0, 1], clamp),
            translate: `0 ${interpolate(frame, [2.8 * fps, 4 * fps], [24 * u, 0], clamp)}px`,
          }}
        >
          Keep questioning.
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 22 * u,
          color: "#22232A",
          opacity: interpolate(
            frame,
            [7.3 * fps, 8 * fps, 8.45 * fps, 9 * fps],
            [0, 1, 1, 0],
            clamp,
          ),
          translate: `0 ${interpolate(frame, [7.3 * fps, 8 * fps], [25 * u, 0], clamp)}px`,
        }}
      >
        <CanvasImage
          src={brandSrc}
          style={{
            width: portrait ? width * 0.1 : width * 0.04,
            height: portrait ? width * 0.1 : width * 0.04,
          }}
        />
        <div
          style={{
            fontFamily: "Fraunces,Georgia,serif",
            fontSize: portrait ? width * 0.14 : width * 0.055,
            letterSpacing: "-.055em",
          }}
        >
          DefectTrail
        </div>
      </div>
    </AbsoluteFill>
  );
}
