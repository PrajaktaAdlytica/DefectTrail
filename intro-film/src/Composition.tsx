import { Composition, staticFile } from "remotion";
import { BeneathSurface } from "./Film";
import "./fonts.css";
export const MyComposition = () => (
  <>
    <Composition
      id="BeneathSurface"
      component={BeneathSurface}
      width={1920}
      height={1080}
      fps={60}
      durationInFrames={540}
      defaultProps={{
        assetBase: staticFile("assets/intro"),
        brandSrc: staticFile("assets/brand-mark.webp"),
      }}
    />
    <Composition
      id="BeneathSurfacePortrait"
      component={BeneathSurface}
      width={1080}
      height={1700}
      fps={60}
      durationInFrames={540}
      defaultProps={{
        assetBase: staticFile("assets/intro"),
        brandSrc: staticFile("assets/brand-mark.webp"),
      }}
    />
  </>
);
