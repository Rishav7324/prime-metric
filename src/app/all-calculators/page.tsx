
import type { Metadata } from "next";
import AllCalculatorsClient from "./client-page";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "All Calculators - Complete Collection",
  description: "Browse our complete collection of 100+ free online calculators. Find financial, health, math, and conversion calculators all in one place.",
  keywords: "all calculators, online calculator list, calculator collection, free tools",
  alternates: {
    canonical: "https://primemetric.online/all-calculators",
  }
};

function AllCalculatorsPage() {
  return <AllCalculatorsClient />;
}

export default function AllCalculatorsPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AllCalculatorsPage />
    </Suspense>
  )
}
