import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';

// Sample property data
const properties = [
  {
    id: '1',
    name: 'Luxury Beach Villa',
    location: 'Malibu, California',
    price: 350,
    bookings: 12,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&q=80',
  },
  {
    id: '2',
    name: 'Mountain Retreat Cabin',
    location: 'Aspen, Colorado',
    price: 220,
    bookings: 8,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
  }
];

const HostProperties = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-gray-50 py-10 pt-24">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Properties</h1>
            <Button className="bg-primary hover:bg-primary/90">
              <PlusCircle size={16} className="mr-2" />
              Add Property
            </Button>
          </div>
          
          <div className="space-y-4">
            {properties.map(property => (
              <Card key={property.id} className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/4">
                    <img 
                      src={property.image} 
                      alt={property.name} 
                      className="w-full h-36 object-cover rounded-md"
                    />
                  </div>
                  <div className="md:w-3/4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{property.name}</h3>
                      <p className="text-gray-500">{property.location}</p>
                      <div className="flex items-center mt-2">
                        <span className="text-sm font-medium mr-4">${property.price}/night</span>
                        <span className="text-sm text-gray-500">{property.bookings} bookings</span>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4 gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">Delete</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostProperties;
