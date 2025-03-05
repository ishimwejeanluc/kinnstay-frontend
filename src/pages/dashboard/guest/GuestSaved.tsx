
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

// Sample saved properties
const savedProperties = [
  {
    id: '1',
    name: 'Luxury Beachfront Condo',
    location: 'Miami, Florida',
    price: 230,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: '2',
    name: 'Downtown Penthouse Loft',
    location: 'New York, NY',
    price: 350,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: '3',
    name: 'Mountain Chalet with Hot Tub',
    location: 'Aspen, Colorado',
    price: 275,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1482192505345-5655af888cc4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
  }
];

const GuestSaved = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-gray-50 py-10 pt-24">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Saved Properties</h1>
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={() => navigate('/properties')}
            >
              Browse Properties
            </Button>
          </div>
          
          {savedProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProperties.map(property => (
                <Card key={property.id} className="overflow-hidden flex flex-col h-full">
                  <div className="relative">
                    <img 
                      src={property.image} 
                      alt={property.name} 
                      className="h-48 w-full object-cover"
                    />
                    <button 
                      className="absolute top-4 right-4 bg-white p-1.5 rounded-full"
                      aria-label="Remove from saved"
                    >
                      <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                    </button>
                  </div>
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="text-lg font-bold">{property.name}</h3>
                    <p className="text-gray-500 text-sm mb-2">{property.location}</p>
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm">{property.rating} (32 reviews)</span>
                    </div>
                    <p className="font-medium mb-4">${property.price} <span className="text-gray-500 text-sm">night</span></p>
                    <div className="mt-auto flex gap-2">
                      <Button 
                        className="flex-1 bg-primary hover:bg-primary/90"
                        onClick={() => navigate(`/properties/${property.id}`)}
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="outline"
                        className="flex-1"
                        onClick={() => navigate(`/properties/${property.id}?book=true`)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-6">
              <div className="flex items-center justify-center p-8 flex-col">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                  <Heart className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No saved properties</h3>
                <p className="text-gray-500 mb-4">You haven't saved any properties yet.</p>
                <Button 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => navigate('/properties')}
                >
                  Browse properties and save your favorites
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestSaved;
