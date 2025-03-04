import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, HomeIcon, MessageSquare, PlusCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
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

const HostDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-gray-50 py-10 pt-24">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <Card className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                    <img 
                      src={user?.avatar || "https://randomuser.me/api/portraits/women/44.jpg"} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-bold">{user?.name || "Host User"}</h2>
                  <p className="text-gray-500">{user?.email || "host@example.com"}</p>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-2">
                    Host
                  </span>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Host since: Oct 2022</p>
                  <p className="text-sm font-medium">Properties: {properties.length}</p>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => navigate('/profile/settings')}
                  >
                    Edit Profile
                  </Button>
                </div>
              </Card>
            </div>
            
            <div className="md:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Host Dashboard</h1>
                <Button 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => navigate('/dashboard/host/properties')}
                >
                  <PlusCircle size={16} className="mr-2" />
                  Add Property
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="p-6 flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-3">
                    <HomeIcon className="h-6 w-6 text-blue-700" />
                  </div>
                  <h3 className="text-lg font-medium">{properties.length}</h3>
                  <p className="text-gray-500">Active Listings</p>
                </Card>
                
                <Card className="p-6 flex flex-col items-center text-center">
                  <div className="bg-green-100 p-3 rounded-full mb-3">
                    <BarChart3 className="h-6 w-6 text-green-700" />
                  </div>
                  <h3 className="text-lg font-medium">$5,720</h3>
                  <p className="text-gray-500">Monthly Revenue</p>
                </Card>
                
                <Card className="p-6 flex flex-col items-center text-center">
                  <div className="bg-amber-100 p-3 rounded-full mb-3">
                    <MessageSquare className="h-6 w-6 text-amber-700" />
                  </div>
                  <h3 className="text-lg font-medium">2</h3>
                  <p className="text-gray-500">New Messages</p>
                </Card>
              </div>
              
              <Tabs defaultValue="properties">
                <TabsList className="mb-8">
                  <TabsTrigger value="properties" className="flex items-center gap-2">
                    <HomeIcon size={16} />
                    <span>My Properties</span>
                  </TabsTrigger>
                  <TabsTrigger value="bookings" className="flex items-center gap-2">
                    <BarChart3 size={16} />
                    <span>Bookings & Revenue</span>
                  </TabsTrigger>
                  <TabsTrigger value="messages" className="flex items-center gap-2">
                    <MessageSquare size={16} />
                    <span>Messages</span>
                  </TabsTrigger>
                  <TabsTrigger value="profile" className="flex items-center gap-2">
                    <User size={16} />
                    <span>Profile</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="properties" className="space-y-4">
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
                  
                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate('/dashboard/host/properties')}
                    >
                      View All Properties
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="bookings" className="space-y-4">
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-4">Revenue Overview</h3>
                    <div className="p-8 text-center">
                      <p className="text-gray-500">Your revenue charts will appear here.</p>
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        variant="outline" 
                        onClick={() => navigate('/dashboard/host/bookings')}
                      >
                        View All Bookings
                      </Button>
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="messages" className="space-y-4">
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-4">Messages from Guests</h3>
                    <div className="p-8 text-center">
                      <p className="text-gray-500">You have 2 unread messages from guests.</p>
                    </div>
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
