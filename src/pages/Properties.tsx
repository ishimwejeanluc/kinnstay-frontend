
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Search, MapPin, Filter } from 'lucide-react';

// Sample data for properties
const properties = [
  {
    id: '1',
    title: 'Luxury Beach Villa',
    location: 'Malibu, California',
    price: 350,
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&q=80',
    type: 'villa',
    bedrooms: 4,
    bathrooms: 3,
    amenities: ['Pool', 'Beach Access', 'WiFi', 'Air Conditioning', 'Kitchen'],
    host: 'Sarah Williams'
  },
  {
    id: '2',
    title: 'Mountain Retreat Cabin',
    location: 'Aspen, Colorado',
    price: 220,
    rating: 4.8,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
    type: 'cabin',
    bedrooms: 3,
    bathrooms: 2,
    amenities: ['Fireplace', 'Mountain View', 'Hiking Trails', 'WiFi', 'Heating'],
    host: 'Michael Chen'
  },
  {
    id: '3',
    title: 'Modern City Apartment',
    location: 'New York, New York',
    price: 180,
    rating: 4.7,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 1,
    amenities: ['City View', 'WiFi', 'Gym Access', 'Public Transport', 'Air Conditioning'],
    host: 'Emily Johnson'
  },
  {
    id: '4',
    title: 'Lakefront Cottage',
    location: 'Lake Tahoe, Nevada',
    price: 275,
    rating: 4.9,
    reviews: 86,
    image: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    type: 'cottage',
    bedrooms: 3,
    bathrooms: 2,
    amenities: ['Lake View', 'Private Dock', 'Kayaks', 'WiFi', 'BBQ Grill'],
    host: 'David Wilson'
  },
  {
    id: '5',
    title: 'Desert Oasis Villa',
    location: 'Palm Springs, California',
    price: 310,
    rating: 4.8,
    reviews: 74,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    type: 'villa',
    bedrooms: 4,
    bathrooms: 3,
    amenities: ['Private Pool', 'Hot Tub', 'Mountain View', 'WiFi', 'Air Conditioning'],
    host: 'Jessica Martinez'
  },
  {
    id: '6',
    title: 'Historic Townhouse',
    location: 'Boston, Massachusetts',
    price: 195,
    rating: 4.7,
    reviews: 68,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    type: 'townhouse',
    bedrooms: 3,
    bathrooms: 2.5,
    amenities: ['Historic District', 'Garden', 'WiFi', 'Washer/Dryer', 'Heating'],
    host: 'Robert Brown'
  }
];

const propertyTypes = ['All', 'Villa', 'Cabin', 'Apartment', 'Cottage', 'Townhouse'];

const PropertiesPage = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedType, setSelectedType] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProperties = properties.filter(property => {
    const matchesLocation = property.location.toLowerCase().includes(searchLocation.toLowerCase());
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
    const matchesType = selectedType === 'All' || property.type.toLowerCase() === selectedType.toLowerCase();
    
    return matchesLocation && matchesPrice && matchesType;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-secondary py-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Find Your Perfect Stay</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our hand-picked selection of beautiful properties around the world.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="glass-panel p-4 md:p-6 rounded-xl flex flex-col md:flex-row items-stretch gap-4">
              <div className="relative flex-grow">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Where are you going?"
                  className="pl-10 pr-4 py-3 h-12 rounded-lg"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
              <Button
                className="bg-primary hover:bg-primary/90 h-12 px-6 rounded-lg"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="mr-2" size={18} />
                Filters
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90 h-12 px-6 rounded-lg"
              >
                <Search className="mr-2" size={18} />
                Search
              </Button>
            </div>
            
            {showFilters && (
              <div className="glass-panel p-6 rounded-xl mt-4 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-4">Price Range (per night)</h3>
                    <Slider
                      defaultValue={[0, 500]}
                      max={500}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="my-6"
                    />
                    <div className="flex justify-between text-sm">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4">Property Type</h3>
                    <div className="flex flex-wrap gap-2">
                      {propertyTypes.map((type) => (
                        <Button
                          key={type}
                          variant={selectedType === type ? "default" : "outline"}
                          className={selectedType === type ? "bg-primary hover:bg-primary/90" : ""}
                          onClick={() => setSelectedType(type)}
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex-grow bg-gray-50 py-12">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" className="hidden md:flex">
                Sort: Recommended
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                title={property.title}
                location={property.location}
                price={property.price}
                image={property.image}
                rating={property.rating}
                reviewCount={property.reviews}
              />
            ))}
          </div>
          
          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No properties found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PropertiesPage;
