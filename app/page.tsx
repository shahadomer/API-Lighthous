import * as React from "react";
import { SiteHeader } from "@/components/product/SiteHeader";
import { SiteFooter } from "@/components/product/SiteFooter";
import { HeroSection } from "@/components/marketing/HeroSection";
import { TrustStrip } from "@/components/marketing/TrustStrip";
import { ThreeDoors } from "@/components/marketing/ThreeDoors";
import { ExploreUseCases } from "@/components/marketing/ExploreUseCases";
import { FeaturedApisSection } from "@/components/marketing/FeaturedApisSection";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Trust Strip */}
        <TrustStrip />

        {/* Section 3: Three Doors */}
        <ThreeDoors />

        {/* Section 4: Explore by Use Case */}
        <ExploreUseCases />

        {/* Section 5: Featured APIs */}
        <FeaturedApisSection />
      </main>
      <SiteFooter />
    </div>
  );
}
