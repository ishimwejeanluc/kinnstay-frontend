
import { Button } from '@/components/ui/button';
import SearchBar from './SearchBar';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center py-20">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80" 
          alt="Luxury villa with pool" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 animate-slide-down">
            Find Your Perfect Stay
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-slide-down" style={{ animationDelay: '0.2s' }}>
            Discover exceptional vacation rentals for unforgettable experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-lg font-medium">
              Browse Properties
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg font-medium">
              Learn More
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <SearchBar />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
