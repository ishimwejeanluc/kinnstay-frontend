import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  HomeIcon, 
  MessageSquare, 
  PlusCircle, 
  User, 
  Calendar,
  DollarSign,
  Star,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import HostNavbar from '@/components/HostNavbar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { toast } from 'sonner';
import { cloudinaryConfig } from '@/lib/cloudinary';
import { format } from 'date-fns';

// Fix Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Update the getAddressFromCoordinates function
const getAddressFromCoordinates = async (lat: number, lng: number) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();
    
    // Try to get the most specific city name available
    const city = data.address.city || 
                data.address.town || 
                data.address.village || 
                data.address.suburb ||
                data.address.district ||
                data.address.municipality;
                
    if (!city || !data.address.country) {
      throw new Error('Could not determine both city and country');
    }

    return {
      city: city,
      country: data.address.country,
      fullAddress: data.display_name
    };
  } catch (error) {
    console.error('Error getting address:', error);
    toast.error('Could not determine location. Please ensure you are at the property location.');
    return null;
  }
};

// Update the LocationMarker component
function LocationMarker({ setPosition, setLocationAddress }) {
  const [position, setPositionState] = useState(null);
  const map = useMap();

  useEffect(() => {
    const handleLocationFound = async (e) => {
      const { lat, lng } = e.latlng;
      setPositionState(e.latlng);
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      
      try {
        const address = await getAddressFromCoordinates(lat, lng);
        if (address && address.city && address.country) {
          setLocationAddress(address);
          toast.success(`Location detected: ${address.city}, ${address.country}`);
        } else {
          toast.error('Could not determine city and country from this location. Please enter them manually.');
        }
      } catch (error) {
        console.error('Error getting address:', error);
        toast.error('Could not get location details. Please enter city and country manually.');
      }
    };

    const handleLocationError = (e) => {
      console.error('Location error:', e);
      toast.error('Could not access GPS. Please ensure location access is enabled.');
    };

    const handleLocationTimeout = () => {
      toast.error('Location detection timed out. Please try again or enter location manually.');
    };

    map.on('locationerror', handleLocationError);
    map.on('locationtimeout', handleLocationTimeout);
    map.locate({ timeout: 10000 }).on("locationfound", handleLocationFound);

    return () => {
      map.off("locationfound", handleLocationFound);
      map.off('locationerror', handleLocationError);
      map.off('locationtimeout', handleLocationTimeout);
    };
  }, [map, setPosition, setLocationAddress]);

  return position === null ? null : (
    <Marker position={position} />
  );
}

// Sample property data
const properties = [
  {
    id: '1',
    name: 'Luxury Beach Villa',
    location: 'Malibu, California',
    price: 350,
    bookings: 12,
    rating: 4.9,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&q=80',
  },
  {
    id: '2',
    name: 'Mountain Retreat Cabin',
    location: 'Aspen, Colorado',
    price: 220,
    bookings: 8,
    rating: 4.8,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
  }
];

// Sample booking requests data
const bookingRequests = [
  {
    id: '1',
    guest: 'John Doe',
    property: 'Luxury Beach Villa',
    checkIn: '2023-08-15',
    checkOut: '2023-08-20',
    guests: 4,
    status: 'pending',
    totalAmount: 1750
  },
  {
    id: '2',
    guest: 'Alice Johnson',
    property: 'Mountain Retreat Cabin',
    checkIn: '2023-09-10',
    checkOut: '2023-09-15',
    guests: 2,
    status: 'pending',
    totalAmount: 1100
  }
];

// Sample reviews data
const reviews = [
  {
    id: '1',
    guest: 'Robert Chen',
    property: 'Luxury Beach Villa',
    rating: 5,
    date: '2023-07-28',
    comment: 'Amazing property with stunning ocean views. The host was very responsive and helpful throughout our stay.'
  },
  {
    id: '2',
    guest: 'Emily Wilson',
    property: 'Mountain Retreat Cabin',
    rating: 4,
    date: '2023-06-15',
    comment: 'Great cabin in a beautiful location. Very cozy and well-equipped. Would definitely recommend!'
  }
];

const HostDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // State to hold properties fetched from the API
  const [fetchedProperties, setFetchedProperties] = useState([]);

  // Fetch properties for the host
  const fetchProperties = async () => {
    if (!user || !user.id) return; // Ensure user is logged in

    const token = localStorage.getItem('authToken'); // Get the token from local storage
    const hostId = user.id; // Store the host ID

    console.log('Fetching properties for host ID:', hostId); // Log the host ID

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

  // Calculate earnings
  const sampleTotalEarnings = properties.reduce((sum, property) => sum + (property.price * property.bookings), 0);
  const monthlyEarnings = sampleTotalEarnings / 3; // Assuming the bookings are spread over 3 months

  // Add state to manage form visibility
  const [showForm, setShowForm] = useState(false);

  // Add isUploading state
  const [isUploading, setIsUploading] = useState(false);

  // Update formData state to handle price_per_night
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    latitude: null,
    longitude: null,
    availableFrom: '',
    availableUntil: '',
    price_per_night: '',
    pictures: [] as string[],
    availability: {} // Initialize availability as an empty object
  });

  // Function to handle form submission
  const handleAddProperty = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure user is logged in and has a valid ID
    if (!user || !user.id) {
      toast.error('You must be logged in to add a property.');
      return;
    }

    const propertyData = {
      ...formData,
      picture: formData.pictures.length > 0 ? formData.pictures : null, // Change 'pictures' to 'picture'
      host_id: user.id, // Use the host ID from the user context
      availability: {
        availableFrom: formData.availableFrom,
        availableUntil: formData.availableUntil
      }
    };

    // Log the property data to be sent
    const { availableFrom, availableUntil, ...dataToSend } = propertyData;
    console.log('Property Data to be sent:', JSON.stringify(propertyData, null, 2));

    try {
      const token = localStorage.getItem('authToken'); // Get the token from local storage
      const response = await fetch(`${import.meta.env.VITE_API_URL}/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        },
        body: JSON.stringify(dataToSend) // Send the modified data
      });

      if (!response.ok) {
        throw new Error('Failed to add property');
      }

      const result = await response.json();
      console.log('Property added successfully:', result);
      toast.success('Property added successfully');
      setShowForm(false); // Close the form after successful submission
      setFormData(prev => ({ 
        ...prev, 
        title: '', 
        description: '', 
        location: '', 
        price_per_night: '', 
        pictures: [], 
        latitude: null, 
        longitude: null, 
        availableFrom: '', 
        availableUntil: '', 
        availability: {} 
      })); // Reset form
      fetchProperties(); // Ensure properties are re-fetched after adding
    } catch (error) {
      console.error('Error adding property:', error);
      toast.error('Failed to add property. Please try again.');
    }
  };

  // Toggle form visibility
  const toggleForm = () => setShowForm(!showForm);

  // Update the form content to include the map
  const [position, setPosition] = useState(null);

  // Update the location fields when position changes
  useEffect(() => {
    if (position) {
      setFormData(prev => ({
        ...prev,
        latitude: position.lat,
        longitude: position.lng
      }));

      const fetchAddress = async () => {
        try {
          const address = await getAddressFromCoordinates(position.lat, position.lng);
          if (address && address.city && address.country) {
            setLocationAddress(address);
            const locationString = `${address.city}, ${address.country}`;
            setFormData(prev => ({
              ...prev,
              location: locationString
            }));
          } else {
            toast.error('Location detected but city/country not found. Please enter them manually.');
          }
        } catch (error) {
          console.error('Error updating location:', error);
          toast.error('Error getting location details. Please enter city and country manually.');
        }
      };

      fetchAddress();
    }
  }, [position]);

  // In the main component, add state for location address
  const [locationAddress, setLocationAddress] = useState({
    city: '',
    country: '',
    fullAddress: ''
  });

  // Update the image upload function
  const handleImageUpload = async (files: FileList) => {
    setIsUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const data = await response.json();
        uploadedUrls.push(data.secure_url);
      }

      setFormData(prev => ({
        ...prev,
        pictures: [...prev.pictures, ...uploadedUrls]
      }));
      toast.success('Images uploaded successfully');
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // State to hold booking requests
  const [bookingRequests, setBookingRequests] = useState<any[]>([]);

  // State to hold earnings data
  const [earningsData, setEarningsData] = useState<{
    earnings: Array<{ month: string; totalRevenue: string }>;
    recentTransactions: Array<{
      id: string;
      amount: string;
      created_at: string;
      booking: {
        id: string;
        property: {
          id: string;
          title: string;
        };
      };
    }>;
  }>({
    earnings: [],
    recentTransactions: []
  });

  // Fetch booking requests for the host
  useEffect(() => {
    const fetchBookingRequests = async () => {
      if (!user || !user.id) return; // Ensure user is logged in

      const token = localStorage.getItem('authToken'); // Get the token from local storage
      const hostId = user.id; // Store the host ID

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings/recent-by-host/${hostId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) throw new Error('Failed to fetch booking requests');

        const data = await response.json();
        setBookingRequests(data); // Set the fetched booking requests
      } catch (error) {
        console.error('Error fetching booking requests:', error);
        toast.error('Failed to fetch booking requests.');
      }
    };

    fetchBookingRequests();
  }, [user]);

  // Fetch earnings data for the host
  useEffect(() => {
    const fetchEarningsData = async () => {
      if (!user || !user.id) return; // Ensure user is logged in

      const token = localStorage.getItem('authToken'); // Get the token from local storage
      const hostId = user.id; // Store the host ID

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings/host-earnings/${hostId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) throw new Error('Failed to fetch earnings data');

        const data = await response.json();
        setEarningsData(data); // Set the fetched earnings data
      } catch (error) {
        console.error('Error fetching earnings data:', error);
        toast.error('Failed to fetch earnings data.');
      }
    };

    fetchEarningsData();
  }, [user]);

  // Calculate total earnings from the earnings data
  const totalEarnings = earningsData.earnings.reduce(
    (sum, month) => sum + parseFloat(month.totalRevenue), 
    0
  ).toFixed(2);

  // Get current month's earnings
  const currentMonthEarnings = earningsData.earnings.length > 0 
    ? parseFloat(earningsData.earnings[0].totalRevenue).toFixed(2) 
    : "0.00";

  return (
    <div className="min-h-screen flex flex-col">
      <HostNavbar />
      
      <div className="flex-grow bg-gray-50 py-10 pt-24">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <Card className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                    {user?.profile_picture ? (
                      <img 
                        src={user.profile_picture} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl font-bold">{user?.name || "Host User"}</h2>
                  <p className="text-gray-500">{user?.email || "host@example.com"}</p>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-2">
                    Host
                  </span>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Properties: {fetchedProperties.length}</p>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => navigate('/profile/settings')}
                  >
                    Edit Profile
                  </Button>
                </div>
              </Card>

              <Card className="p-6 mt-4">
                <h3 className="font-medium mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => navigate('/dashboard/host/properties')}
                    >
                      <HomeIcon className="mr-2 h-4 w-4" />
                      My Properties
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => navigate('/dashboard/host/bookings')}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Booking Requests
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => navigate('/dashboard/host/earnings')}
                    >
                      <DollarSign className="mr-2 h-4 w-4" />
                      Earnings
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => navigate('/profile/settings')}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                  </li>
                </ul>
              </Card>
            </div>
            
            <div className="md:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Host Dashboard</h1>
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
                          <p className="text-xs text-gray-500 mt-1">
                            Enter location in format: City, Country (e.g., Kigali, Rwanda)
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">GPS Location</label>
                          <div className="h-[300px] w-full rounded-md overflow-hidden">
                            <MapContainer
                              center={[1.9441, 30.0619]}
                              zoom={13}
                              className="h-full w-full"
                            >
                              <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                              />
                              <LocationMarker setPosition={setPosition} setLocationAddress={setLocationAddress} />
                            </MapContainer>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Use the map to set exact GPS coordinates for your property
                          </p>
                          {position && (
                            <div className="mt-2 space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs text-gray-500">Latitude</label>
                                  <Input type="text" value={position.lat} disabled className="mt-1" />
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-500">Longitude</label>
                                  <Input type="text" value={position.lng} disabled className="mt-1" />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Availability Period</label>
                          <div className="grid grid-cols-2 gap-4 mt-1">
                            <div>
                              <label className="block text-xs text-gray-500">Available From</label>
                              <Input 
                                type="date" 
                                required 
                                className="mt-1"
                                value={formData.availableFrom}
                                onChange={(e) => setFormData(prev => ({ ...prev, availableFrom: e.target.value }))}
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500">Available Until</label>
                              <Input 
                                type="date" 
                                required 
                                className="mt-1"
                                value={formData.availableUntil}
                                onChange={(e) => setFormData(prev => ({ ...prev, availableUntil: e.target.value }))}
                              />
                            </div>
                          </div>
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
                          <label className="block text-sm font-medium text-gray-700">pictures</label>
                          <Input 
                            type="file" 
                            multiple 
                            accept="image/*" 
                            className="mt-1" 
                            onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                            disabled={isUploading}
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            {isUploading ? 'Uploading images...' : 'You can select multiple images'}
                          </p>
                          {formData.pictures.length > 0 && (
                            <div className="mt-2 grid grid-cols-3 gap-2">
                              {formData.pictures.map((url, index) => (
                                <div key={index} className="relative">
                                  <img 
                                    src={url} 
                                    alt={`Property ${index + 1}`} 
                                    className="w-full h-24 object-cover rounded-md"
                                  />
                                  <button
                                    type="button"
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                                    onClick={() => {
                                      setFormData(prev => ({
                                        ...prev,
                                        pictures: prev.pictures.filter((_, i) => i !== index)
                                      }));
                                    }}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                          Add Property
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="p-6 flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-3">
                    <HomeIcon className="h-6 w-6 text-blue-700" />
                  </div>
                  <h3 className="text-lg font-medium">{fetchedProperties.length}</h3>
                  <p className="text-gray-500">Active Listings</p>
                </Card>
                
                <Card className="p-6 flex flex-col items-center text-center">
                  <div className="bg-green-100 p-3 rounded-full mb-3">
                    <DollarSign className="h-6 w-6 text-green-700" />
                  </div>
                  <h3 className="text-lg font-medium">${currentMonthEarnings}</h3>
                  <p className="text-gray-500">Monthly Revenue</p>
                </Card>
                
                <Card className="p-6 flex flex-col items-center text-center">
                  <div className="bg-amber-100 p-3 rounded-full mb-3">
                    <MessageSquare className="h-6 w-6 text-amber-700" />
                  </div>
                  <h3 className="text-lg font-medium">{bookingRequests.length}</h3>
                  <p className="text-gray-500">Booking Requests</p>
                </Card>
              </div>
              
              <Tabs defaultValue="properties">
                <TabsList className="mb-8">
                  <TabsTrigger value="properties" className="flex items-center gap-2">
                    <HomeIcon size={16} />
                    <span>My Properties</span>
                  </TabsTrigger>
                  <TabsTrigger value="requests" className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>Booking Requests</span>
                  </TabsTrigger>
                  <TabsTrigger value="earnings" className="flex items-center gap-2">
                    <BarChart3 size={16} />
                    <span>Earnings</span>
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="flex items-center gap-2">
                    <Star size={16} />
                    <span>Reviews</span>
                  </TabsTrigger>
                  <TabsTrigger value="profile" className="flex items-center gap-2">
                    <User size={16} />
                    <span>Profile</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="properties" className="space-y-4">
                  {fetchedProperties.length === 0 ? (
                    <Card className="p-6">
                      <h3 className="text-xl font-bold">No Properties Available</h3>
                      <p className="text-gray-500">You currently have no properties listed. Please add a property to get started.</p>
                    </Card>
                  ) : (
                    fetchedProperties.map(property => (
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
                              <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold">{property.title}</h3>
                                <Badge variant={property.status === 'active' ? 'secondary' : 'outline'}>
                                  {property.status}
                                </Badge>
                              </div>
                              <p className="text-gray-500">{property.location}</p>
                              <div className="flex items-center mt-2 flex-wrap gap-x-4 gap-y-2">
                                <div className="flex items-center">
                                  <DollarSign className="h-4 w-4 text-gray-500 mr-1" />
                                  <span className="text-sm font-medium">${property.price_per_night}/night</span>
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                                  <span className="text-sm text-gray-500">Available from {property.availability.availableFrom} to {property.availability.availableUntil}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-end mt-4 gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => navigate(`/dashboard/host/properties/${property.id}`)}
                              >
                                View
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => navigate(`/dashboard/host/properties/${property.id}/edit`)}
                              >
                                Edit
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-red-500 border-red-200 hover:bg-red-50"
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                  
                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate('/dashboard/host/properties')}
                    >
                      View All Properties
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="requests" className="space-y-4">
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-4">Booking Requests</h3>
                    {bookingRequests.length > 0 ? (
                      <div className="space-y-4">
                        {bookingRequests.map(request => (
                          <div key={request.id} className="border rounded-lg p-4">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-2/3">
                                <div className="flex justify-between">
                                  <h4 className="font-bold">{request.guest.name}</h4>
                                  <Badge variant="outline">{request.status}</Badge>
                                </div>
                                <p className="text-gray-700">{request.property.title}</p>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                                  <div>
                                    <p className="text-xs text-gray-500">Check-in</p>
                                    <p className="text-sm">{new Date(request.check_in).toLocaleDateString()}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">Check-out</p>
                                    <p className="text-sm">{new Date(request.check_out).toLocaleDateString()}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">Guests</p>
                                    <p className="text-sm">{request.guests}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">Total</p>
                                    <p className="text-sm font-medium">${request.total_price}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="md:w-1/3 flex md:justify-end items-end">
                                <div className="flex gap-2 w-full md:w-auto">
                                  <Button 
                                    className="flex-1 md:flex-initial"
                                    onClick={() => navigate(`/dashboard/host/bookings/${request.id}`)}
                                  >
                                    Accept
                                  </Button>
                                  <Button 
                                    variant="outline"
                                    className="flex-1 md:flex-initial text-red-500 border-red-200 hover:bg-red-50"
                                  >
                                    Decline
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-gray-500">You don't have any pending booking requests.</p>
                      </div>
                    )}
                    <div className="flex justify-end mt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => navigate('/dashboard/host/bookings')}
                      >
                        View All Bookings
                      </Button>
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="earnings" className="space-y-4">
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-4">Earnings Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <Card className="p-4 bg-gray-50">
                        <p className="text-gray-500 text-sm">Total Earnings</p>
                        <p className="text-2xl font-bold">${totalEarnings}</p>
                      </Card>
                      <Card className="p-4 bg-gray-50">
                        <p className="text-gray-500 text-sm">This Month</p>
                        <p className="text-2xl font-bold">${currentMonthEarnings}</p>
                      </Card>
                      <Card className="p-4 bg-gray-50">
                        <p className="text-gray-500 text-sm">Pending Payments</p>
                        <p className="text-2xl font-bold">$0.00</p>
                      </Card>
                    </div>
                    <div className="p-8 bg-gray-50 rounded-lg">
                      <h4 className="font-bold mb-4">Monthly Earnings</h4>
                      <div className="space-y-2">
                        {earningsData.earnings.map((month, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg">
                            <p className="font-medium">
                              {format(new Date(month.month), 'MMMM yyyy')}
                            </p>
                            <span className="font-medium text-green-600">
                              ${parseFloat(month.totalRevenue).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6">
                      <h4 className="font-bold mb-2">Recent Transactions</h4>
                      <div className="space-y-2">
                        {earningsData.recentTransactions.map(transaction => (
                          <div key={transaction.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">{transaction.booking.property.title}</p>
                              <p className="text-sm text-gray-500">
                                {format(new Date(transaction.created_at), 'MMM dd, yyyy')}
                              </p>
                            </div>
                            <span className="font-medium text-green-600">
                              +${parseFloat(transaction.amount).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="reviews" className="space-y-4">
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-4">Guest Reviews</h3>
                    {reviews.length > 0 ? (
                      <div className="space-y-6">
                        {reviews.map(review => (
                          <div key={review.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="font-bold">{review.guest}</p>
                                <p className="text-sm text-gray-500">{review.property} • {review.date}</p>
                              </div>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                            <div className="mt-3 flex justify-end">
                              <Button variant="outline" size="sm">Reply</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-gray-500">You don't have any reviews yet.</p>
                      </div>
                    )}
                  </Card>
                </TabsContent>
                
                <TabsContent value="profile" className="space-y-4">
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-4">Profile Information</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-500">Full Name</label>
                          <p className="font-medium">{user?.name}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Email</label>
                          <p className="font-medium">{user?.email}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Phone</label>
                          <p className="font-medium">+1 (555) 123-4567</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Address</label>
                          <p className="font-medium">123 Main St, City, State</p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button 
                          className="bg-primary hover:bg-primary/90"
                          onClick={() => navigate('/profile/settings')}
                        >
                          Edit Profile
                        </Button>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-4">Payout Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-500">Payout Method</label>
                        <p className="font-medium">Bank Transfer</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Bank Account</label>
                        <p className="font-medium">**** **** **** 4567</p>
                      </div>
                      <div className="flex justify-end">
                        <Button 
                          variant="outline"
                        >
                          Update Payout Info
                        </Button>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
