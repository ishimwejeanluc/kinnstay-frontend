
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Home, MessageSquare, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const GuestDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-gray-50 py-10">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <Card className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                    <img 
                      src={user?.avatar || "https://randomuser.me/api/portraits/men/32.jpg"} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-bold">{user?.name || "Guest User"}</h2>
                  <p className="text-gray-500">{user?.email || "guest@example.com"}</p>
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full mt-2">
                    Guest
                  </span>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Member since: Jan 2023</p>
                </div>
              </Card>
            </div>
            
            <div className="md:w-3/4">
              <Tabs defaultValue="bookings">
                <TabsList className="mb-8">
                  <TabsTrigger value="bookings" className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>My Bookings</span>
                  </TabsTrigger>
                  <TabsTrigger value="saved" className="flex items-center gap-2">
                    <Home size={16} />
                    <span>Saved Properties</span>
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
                
                <TabsContent value="bookings" className="space-y-4">
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-4">Your Upcoming Stays</h3>
                    <div className="p-8 text-center">
                      <p className="text-gray-500 mb-4">You don't have any upcoming bookings.</p>
                      <a href="/properties" className="text-primary hover:underline">
                        Browse properties to book your next stay
                      </a>
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="saved" className="space-y-4">
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-4">Properties You've Saved</h3>
                    <div className="p-8 text-center">
                      <p className="text-gray-500 mb-4">You haven't saved any properties yet.</p>
                      <a href="/properties" className="text-primary hover:underline">
                        Browse properties to save your favorites
                      </a>
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="messages" className="space-y-4">
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-4">Messages</h3>
                    <div className="p-8 text-center">
                      <p className="text-gray-500 mb-4">You don't have any messages.</p>
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
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default GuestDashboard;
