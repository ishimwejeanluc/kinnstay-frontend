import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import HostNavbar from '@/components/HostNavbar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// HostProperties component
const HostProperties = () => {
  const { user } = useAuth();
  const [fetchedProperties, setFetchedProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price_per_night: '',
    pictures: [] as string[],
    latitude: null,
    longitude: null,
  });

  // Fetch properties for the host
  const fetchProperties = async () => {
    if (!user || !user.id) return; // Ensure user is logged in

    const token = localStorage.getItem('authToken'); // Get the token from local storage
    const hostId = user.id; // Store the host ID

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/properties/host/${hostId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          'Content-Type': 'application/json' // Optional, depending on your API
        }
      });
      if (!response.ok) throw new Error('Failed to fetch properties');

      const data = await response.json();
      setFetchedProperties(data); // Set the fetched properties
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  // Fetch properties on component mount
  useEffect(() => {
    fetchProperties();
  }, [user]);

  // Function to handle form submission
  const handleAddProperty = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !user.id) {
      toast.error('You must be logged in to add a property.');
      return;
    }

    const propertyData = {
      ...formData,
      host_id: user.id, // Use the host ID from the user context
    };

    try {
      const token = localStorage.getItem('authToken'); // Get the token from local storage
      const response = await fetch(`${import.meta.env.VITE_API_URL}/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        },
        body: JSON.stringify(propertyData) // Send the property data
      });

      if (!response.ok) {
        throw new Error('Failed to add property');
      }

      const result = await response.json();
      console.log('Property added successfully:', result);
      toast.success('Property added successfully');
      setShowForm(false); // Close the form after successful submission
      setFormData({ title: '', description: '', location: '', price_per_night: '', pictures: [], latitude: null, longitude: null }); // Reset form
      // Re-fetch properties to include the newly added property
      fetchProperties();
    } catch (error) {
      console.error('Error adding property:', error);
      toast.error('Failed to add property. Please try again.');
    }
  };

  // Component to handle map events
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setFormData(prev => ({
          ...prev,
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        }));

        // Fetch address from coordinates
        getAddressFromCoordinates(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  };

  // Function to get address from coordinates
  const getAddressFromCoordinates = async (lat: number, lng: number) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      const city = data.address.city || data.address.town || data.address.village || data.address.suburb || data.address.district || data.address.municipality;
      const country = data.address.country;

      if (city && country) {
        setFormData(prev => ({
          ...prev,
          location: `${city}, ${country}`, // Set the location field
        }));
      } else {
        toast.error('Could not determine location. Please enter it manually.');
      }
    } catch (error) {
      console.error('Error getting address:', error);
      toast.error('Could not get location details. Please enter city and country manually.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <HostNavbar />
      
      <div className="flex-grow bg-gray-50 py-10 pt-24">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Properties</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <PlusCircle size={16} className="mr-2" />
                  Add Property
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">Add New Property</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddProperty} className="space-y-4 p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Title</label>
                      <Input 
                        type="text" 
                        required 
                        className="mt-1" 
                        placeholder="Enter property title"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <Textarea 
                        className="mt-1" 
                        placeholder="Describe your property"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <Input 
                        type="text" 
                        required 
                        className="mt-1" 
                        placeholder="e.g., Kigali, Rwanda"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Price per Night ($)</label>
                      <Input 
                        type="number" 
                        step="0.01" 
                        required 
                        className="mt-1"
                        value={formData.price_per_night}
                        onChange={(e) => setFormData(prev => ({ ...prev, price_per_night: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Pictures</label>
                      <Input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        className="mt-1" 
                        onChange={(e) => {
                          const files = Array.from(e.target.files);
                          setFormData(prev => ({ ...prev, pictures: [...prev.pictures, ...files.map(file => URL.createObjectURL(file))] }));
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">GPS Location</label>
                      <MapContainer center={[1.9441, 30.0619]} zoom={13} className="h-60">
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapEvents />
                        {formData.latitude && formData.longitude && (
                          <Marker position={[formData.latitude, formData.longitude]} />
                        )}
                      </MapContainer>
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      Add Property
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="space-y-4">
            {fetchedProperties.map(property => (
              <Card key={property.id} className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/4">
                    <img 
                      src={property.picture[0]} 
                      alt={property.title} 
                      className="w-full h-36 object-cover rounded-md"
                    />
                  </div>
                  <div className="md:w-3/4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{property.title}</h3>
                      <p className="text-gray-500">{property.location}</p>
                      <div className="flex items-center mt-2">
                        <span className="text-sm font-medium mr-4">${property.price_per_night}/night</span>
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
