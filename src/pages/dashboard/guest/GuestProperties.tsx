import React, { useState, useEffect } from 'react';
import GuestNavbar from '@/components/GuestNavbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useNavigate } from 'react-router-dom';

const GuestProperties = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]); // Assuming a max price of 500
  const [properties, setProperties] = useState([]); // State to hold fetched properties
  const navigate = useNavigate();

  // Fetch properties from the API
  const fetchProperties = async () => {
    const token = localStorage.getItem('authToken'); // Get the token from local storage

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/properties`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          'Content-Type': 'application/json' // Optional, depending on your API
        }
      });

      if (!response.ok) throw new Error('Failed to fetch properties');

      const data = await response.json();
      console.log('Fetched properties:', data); // Log the fetched data
      setProperties(data); // Set the fetched properties
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  // Fetch properties on component mount
  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <GuestNavbar />
      <div className="flex-grow bg-gray-50 py-10 pt-24">
        <div className="container px-4 mx-auto">
          <h1 className="text-3xl font-bold mb-6">Available Properties</h1>
          <div className="glass-panel p-4 md:p-6 rounded-xl flex flex-col md:flex-row items-stretch gap-4 mb-4">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search properties..."
                className="pl-10 pr-4 py-3 h-12 rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              className="bg-primary hover:bg-primary/90 h-12 px-6 rounded-lg"
            >
              Search
            </Button>
          </div>
          <div className="glass-panel p-6 rounded-xl mt-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map(property => (
              <div key={property.id} className="border rounded-lg overflow-hidden flex flex-col">
                <img 
                  src={property.picture[0]}
                  alt={property.title} 
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h4 className="font-bold">{property.title}</h4>
                  <p className="text-gray-500">{property.location}</p>
                  <p className="font-medium">${property.price_per_night}/night</p>
                  <Button 
                    className="mt-4 bg-primary hover:bg-primary/90"
                    onClick={() => navigate(`/properties/${property.id}`)} // Ensure this is correct
                  >
                    View Property
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestProperties; 