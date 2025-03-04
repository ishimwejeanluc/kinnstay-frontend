
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Star, Calendar as CalendarIcon, MapPin, Users, Wifi, Tv, Car, Utensils, ShowerHead, Heart, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

// Sample data for properties (same as in Properties.tsx)
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
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1464146072230-91cabc968266?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    ],
    amenities: ['Pool', 'Beach Access', 'WiFi', 'Air Conditioning', 'Kitchen', 'Free Parking', 'TV', 'Washer', 'Dryer'],
    description: "Experience luxury living in this stunning beachfront villa in Malibu. This spacious 4-bedroom property offers breathtaking ocean views from every room, a private pool, and direct beach access. Perfect for family vacations or a getaway with friends, this villa provides all the comforts of home with the luxury of a 5-star resort.",
    host: {
      name: 'Sarah Williams',
      joinedDate: 'January 2018',
      responseRate: 99,
      responseTime: 'Within an hour',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
    }
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
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
      'https://images.unsplash.com/photo-1464146072230-91cabc968266?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    ],
    amenities: ['Fireplace', 'Mountain View', 'Hiking Trails', 'WiFi', 'Heating', 'Free Parking', 'Kitchen', 'TV'],
    description: "Escape to this cozy mountain cabin in Aspen, surrounded by breathtaking mountain views and lush forest. This charming 3-bedroom retreat features a stone fireplace, spacious deck, and easy access to hiking trails. In winter, enjoy world-class skiing just minutes away. Perfect for nature lovers and outdoor enthusiasts.",
    host: {
      name: 'Michael Chen',
      joinedDate: 'March 2019',
      responseRate: 98,
      responseTime: 'Within a few hours',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
    }
  },
  // ... add similar detailed data for other properties
];

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const property = properties.find(p => p.id === id);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 7))
  );
  const [guests, setGuests] = useState(2);
  const { user, isAuthenticated } = useAuth();
  
  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Property Not Found</h2>
            <p className="mb-4">We couldn't find the property you're looking for.</p>
            <Link to="/properties">
              <Button>View All Properties</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleBooking = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to book this property', {
        action: {
          label: 'Login',
          onClick: () => window.location.href = '/login'
        }
      });
      return;
    }
    
    toast.success('Booking successful! Check your dashboard for details.');
  };

  const calculateTotalPrice = () => {
    if (!date || !endDate) return 0;
    const days = Math.ceil((endDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    return property.price * days;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-24 pb-12">
        <div className="container px-4 mx-auto">
          {/* Property title and actions */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">{property.title}</h1>
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center text-sm md:text-base mb-2 md:mb-0">
                <div className="flex items-center mr-4">
                  <Star className="h-4 w-4 text-tertiary mr-1 fill-tertiary" />
                  <span className="font-medium">{property.rating}</span>
                  <span className="text-gray-500 ml-1">({property.reviews} reviews)</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                  <span>{property.location}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Heart className="w-4 h-4 mr-1" />
                  Save
                </Button>
              </div>
            </div>
          </div>
          
          {/* Property images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="md:col-span-2">
              <img 
                src={property.images[0]} 
                alt={property.title} 
                className="w-full h-[300px] md:h-[400px] object-cover rounded-t-xl md:rounded-t-2xl"
              />
            </div>
            {property.images.slice(1, 4).map((image, index) => (
              <img 
                key={index} 
                src={image} 
                alt={`${property.title} ${index + 1}`} 
                className={`w-full h-[200px] object-cover ${index === 0 ? 'rounded-bl-xl md:rounded-bl-2xl' : index === 2 ? 'rounded-br-xl md:rounded-br-2xl' : ''}`}
              />
            ))}
          </div>
          
          {/* Property details and booking */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="glass-panel rounded-xl p-6 mb-8">
                <div className="flex justify-between items-start border-b pb-6 mb-6">
                  <div>
                    <h2 className="text-xl font-medium mb-2">
                      {property.type.charAt(0).toUpperCase() + property.type.slice(1)} hosted by {property.host.name}
                    </h2>
                    <div className="flex text-gray-600">
                      <span className="mr-2">{property.bedrooms} bedrooms</span>
                      <span className="mr-2">•</span>
                      <span className="mr-2">{property.bathrooms} bathrooms</span>
                    </div>
                  </div>
                  <img 
                    src={property.host.image}
                    alt={property.host.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white"
                  />
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Description</h3>
                  <p className="text-gray-600">{property.description}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        {amenity === 'WiFi' && <Wifi className="w-5 h-5 text-gray-600 mr-2" />}
                        {amenity === 'TV' && <Tv className="w-5 h-5 text-gray-600 mr-2" />}
                        {amenity === 'Free Parking' && <Car className="w-5 h-5 text-gray-600 mr-2" />}
                        {amenity === 'Kitchen' && <Utensils className="w-5 h-5 text-gray-600 mr-2" />}
                        {amenity === 'Washer' && <ShowerHead className="w-5 h-5 text-gray-600 mr-2" />}
                        {/* Add more amenity icons as needed */}
                        <span className="text-gray-600">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Location</h3>
                  <div className="bg-gray-200 rounded-lg h-[250px] flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary mr-2" />
                    <span className="text-gray-600">{property.location}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="glass-panel rounded-xl p-6 sticky top-24">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-2xl font-bold">${property.price} <span className="text-sm font-normal text-gray-600">/ night</span></div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-tertiary fill-tertiary mr-1" />
                    <span className="font-medium">{property.rating}</span>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden mb-4">
                  <div className="grid grid-cols-2">
                    <div className="p-4 border-r border-b">
                      <div className="text-sm font-medium mb-1">Check-in</div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, 'PPP') : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="p-4 border-b">
                      <div className="text-sm font-medium mb-1">Check-out</div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="text-sm font-medium mb-1">Guests</div>
                    <div className="flex items-center">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setGuests(prev => (prev > 1 ? prev - 1 : 1))}
                      >
                        -
                      </Button>
                      <span className="mx-4">{guests} {guests === 1 ? 'guest' : 'guests'}</span>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setGuests(prev => prev + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mb-4 py-6 text-lg" onClick={handleBooking}>
                  Book Now
                </Button>
                
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span>${property.price} x 7 nights</span>
                    <span>${property.price * 7}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cleaning fee</span>
                    <span>$75</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>$42</span>
                  </div>
                  <div className="flex justify-between font-bold pt-4 border-t">
                    <span>Total</span>
                    <span>${calculateTotalPrice() + 75 + 42}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;
