
import type { Metadata } from "next";
import AllCalculatorsClient from "./client-page";

export const metadata: Metadata = {
  title: "All Calculators - Complete Collection",
  description: "Browse our complete collection of 100+ free online calculators. Find financial, health, math, and conversion calculators all in one place.",
  keywords: "all calculators, online calculator list, calculator collection, free tools",
  alternates: {
    canonical: "https://primemetric.online/all-calculators",
  }
};

export default function AllCalculatorsPage() {
  return <AllCalculatorsClient />;
}
