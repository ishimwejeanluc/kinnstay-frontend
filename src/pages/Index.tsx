
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedProperties from '@/components/FeaturedProperties';
import FeaturedDestinations from '@/components/FeaturedDestinations';
import TestimonialSection from '@/components/TestimonialSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedDestinations />
      <FeaturedProperties />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
