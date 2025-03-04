
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PropertyCard from './PropertyCard';

// Example data
const properties = [
  {
    id: 1,
    name: 'Luxury Beach Villa',
    location: 'Malibu, California',
    price: 350,
    rating: 4.9,
    reviewCount: 27,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    type: 'Villa'
  },
  {
    id: 2,
    name: 'Mountain Retreat Cabin',
    location: 'Aspen, Colorado',
    price: 250,
    rating: 4.8,
    reviewCount: 42,
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80',
    type: 'Cabin'
  },
  {
    id: 3,
    name: 'Modern City Apartment',
    location: 'New York, NY',
    price: 180,
    rating: 4.7,
    reviewCount: 35,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    type: 'Apartment'
  },
  {
    id: 4,
    name: 'Seaside Cottage',
    location: 'Cape Cod, Massachusetts',
    price: 220,
    rating: 4.6,
    reviewCount: 18,
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    type: 'Cottage'
  },
  {
    id: 5,
    name: 'Desert Oasis Villa',
    location: 'Sedona, Arizona',
    price: 280,
    rating: 4.8,
    reviewCount: 31,
    image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    type: 'Villa'
  },
  {
    id: 6,
    name: 'Lakefront Retreat',
    location: 'Lake Tahoe, Nevada',
    price: 310,
    rating: 4.9,
    reviewCount: 24,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    type: 'House'
  }
];

const FeaturedProperties = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      
      // Initial check
      handleScroll();
      
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div>
            <h2 className="section-heading">Featured Properties</h2>
            <p className="section-subheading max-w-2xl">
              Discover handpicked properties that offer exceptional experiences,
              from beachfront villas to mountain retreats.
            </p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-opacity ${
                showLeftButton ? 'opacity-100' : 'opacity-0 cursor-default'
              }`}
              onClick={scrollLeft}
              disabled={!showLeftButton}
            >
              <ChevronLeft size={18} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-opacity ${
                showRightButton ? 'opacity-100' : 'opacity-0 cursor-default'
              }`}
              onClick={scrollRight}
              disabled={!showRightButton}
            >
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>

        <div 
          className="overflow-x-auto hide-scrollbar" 
          ref={scrollRef}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-6 min-w-max pb-4">
            {properties.map((property, index) => (
              <div 
                key={property.id} 
                className="w-[300px]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PropertyCard
                  propertyId={property.id.toString()}
                  title={property.name}
                  location={property.location}
                  price={property.price}
                  image={property.image}
                  rating={property.rating}
                  reviewCount={property.reviewCount}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
