
import { Card } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

// Example data
const destinations = [
  {
    id: 1,
    name: 'Santorini',
    country: 'Greece',
    properties: 42,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
  },
  {
    id: 2,
    name: 'Bali',
    country: 'Indonesia',
    properties: 67,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
  },
  {
    id: 3,
    name: 'Tulum',
    country: 'Mexico',
    properties: 35,
    image: 'https://images.unsplash.com/photo-1682553064441-b3a2de732315?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1856&q=80'
  },
  {
    id: 4,
    name: 'Maldives',
    country: 'Maldives',
    properties: 28,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1365&q=80'
  }
];

const FeaturedDestinations = () => {
  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-heading">Popular Destinations</h2>
          <p className="section-subheading max-w-2xl mx-auto">
            Explore our most sought-after locations with the finest selection of properties
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <Card 
              key={destination.id} 
              className="overflow-hidden card-hover border-0 shadow-lg group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                  <div className="flex items-center mb-2">
                    <MapPin size={14} className="mr-1" />
                    <span className="text-sm">{destination.country}</span>
                  </div>
                  <span className="text-xs bg-primary/90 px-2 py-1 rounded-full">
                    {destination.properties} Properties
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
