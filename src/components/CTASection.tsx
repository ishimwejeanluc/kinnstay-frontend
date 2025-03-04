
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary/90 to-primary" />
      
      {/* Add decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-tertiary/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 animate-fade-in">
            Find Your Perfect Getaway
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            From mountain retreats to beachfront villas, discover exceptional properties
            tailored to your dream vacation experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-lg font-medium">
              Book Your Stay Now
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg font-medium">
              Explore Properties
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
