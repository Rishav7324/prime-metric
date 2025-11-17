import { generateMetadata } from "@/components/CalculatorLayout";
import VolumeCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Volume Calculator",
  description: "Calculate the volume of various 3D shapes like cubes, spheres, and cylinders.",
  keywords: "volume calculator, volume of a cube, volume of a sphere, volume of a cylinder",
  canonicalUrl: "/math-calculators/volume-calculator",
});

export default function Page() {
  return <VolumeCalculator />;
}

    