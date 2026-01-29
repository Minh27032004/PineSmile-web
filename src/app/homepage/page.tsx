import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import HeroSection from './components/HeroSection';
import TrustBadges from './components/TrustBadges';
import ImpactStats from './components/ImpactStats';
import ProductShowcase from './components/ProductShowcase';
import SustainabilityJourney from './components/SustainabilityJourney';
import TestimonialCarousel from './components/TestimonialCarousel';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'PineSmile - Revolutionary Dental Care from Pineapple Leaves',
  description: 'Discover PineSmile\'s revolutionary pineapple leaf-based dental care products. Eco-conscious oral health solutions that merge environmental responsibility with innovative dental technology for Vietnamese consumers seeking natural alternatives.',
};

export default function Homepage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Video Background */}
      <HeroSection className="mt-16" />
      
      {/* Trust Badges */}
      <TrustBadges />
      
      {/* Impact Statistics with Animated Counters */}
      <ImpactStats />
      
      {/* Product Showcase with Category Filter */}
      <ProductShowcase />
      
      {/* Sustainability Journey - Interactive Timeline */}
      <SustainabilityJourney />
      
      {/* Customer Testimonials Carousel */}
      <TestimonialCarousel />
      
      {/* Call to Action Section */}
      <CTASection />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}