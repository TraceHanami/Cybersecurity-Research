import React from 'react';
import { Hero } from '../components/home/Hero';
import { StatsDashboard } from '../components/home/StatsDashboard';
import { FeaturedResearch } from '../components/home/FeaturedResearch';
import { ResearchDomains } from '../components/home/ResearchDomains';
import { CurrentResearchKanban } from '../components/home/CurrentResearchKanban';
import { MitreCoveragePreview } from '../components/home/MitreCoveragePreview';
import { LabsShowcase } from '../components/home/LabsShowcase';

export const HomePage = () => {
  return (
    <div className="w-full">
      <Hero />
      <StatsDashboard />
      <FeaturedResearch />
      <ResearchDomains />
      <MitreCoveragePreview />
      <CurrentResearchKanban />
      <LabsShowcase />
    </div>
  );
};
