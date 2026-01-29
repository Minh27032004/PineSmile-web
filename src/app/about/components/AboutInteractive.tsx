'use client';

import { useEffect, useState } from 'react';
import HeroSection from './HeroSection';
import TimelineSection from './TimelineSection';
import ScienceSection from './ScienceSection';
import SustainabilitySection from './SustainabilitySection';
import TeamSection from './TeamSection';
import CertificationsSection from './CertificationsSection';

const AboutInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-20">
          <div className="animate-pulse space-y-8">
            <div className="h-96 bg-card rounded-2xl"></div>
            <div className="h-64 bg-card rounded-2xl"></div>
            <div className="h-64 bg-card rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <TimelineSection />
      <ScienceSection />
      <SustainabilitySection />
      <TeamSection />
      <CertificationsSection />
    </div>
  );
};

export default AboutInteractive;