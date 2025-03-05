
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Home, Heart, Star, Receipt, CreditCard, History, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

// Sample booking data
const bookings = [
  {
    id: '1',
    property: 'Mountain View Cabin',
    location: 'Aspen, Colorado',
    checkIn: '2023-06-15',
    checkOut: '2023-06-20',
    status: 'completed',
    totalPrice: 850,
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=765&q=80',
  },
  {
    id: '2',
    property: 'Oceanfront Villa',
    location: 'Malibu, California',
    checkIn: '2023-08-10',
    checkOut: '2023-08-15',
    status: 'upcoming',
    totalPrice: 1200,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80',
  }
];

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
  }
];

const GuestDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Dashboard Content */}
      <div className="flex-grow bg-gray-50 py-10 pt-24">
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
                
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">Member since: Jan 2023</p>
                  <Button 
                    variant="outline" 
                    className="w-full"
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
                      onClick={() => navigate('/properties')}
                    >
                      <Home className="mr-2 h-4 w-4" />
                      Browse Properties
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => navigate('/dashboard/guest/bookings')}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      My Bookings
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => navigate('/dashboard/guest/saved')}
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Saved Properties
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => navigate('/profile/settings')}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile Settings
                    </Button>
                  </li>
                </ul>
              </Card>
            </div>
            
            <div className="md:w-3/4">
              <Tabs defaultValue="overview">
                <TabsList className="mb-8">
                  <TabsTrigger value="overview" className="flex items-center gap-2">
                    <Home size={16} />
                    <span>Overview</span>
                  </TabsTrigger>
                  <TabsTrigger value="bookings" className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>My Bookings</span>
                  </TabsTrigger>
                  <TabsTrigger value="saved" className="flex items-center gap-2">
                    <Heart size={16} />
                    <span>Saved Properties</span>
                  </TabsTrigger>
                  <TabsTrigger value="history" className="flex items-center gap-2">
                    <History size={16} />
                    <span>Booking History</span>
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="flex items-center gap-2">
                    <Star size={16} />
                    <span>Reviews</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="p-6 flex flex-col items-center text-center">
                      <div className="bg-blue-100 p-3 rounded-full mb-3">
                        <Calendar className="h-6 w-6 text-blue-700" />
                      </div>
                      <h3 className="text-lg font-medium">{bookings.filter(b => b.status === 'upcoming').length}</h3>
                      <p className="text-gray-500">Upcoming Stays</p>
                    </Card>
                    
                    <Card className="p-6 flex flex-col items-center text-center">
                      <div className="bg-amber-100 p-3 rounded-full mb-3">
                        <Heart className="h-6 w-6 text-amber-700" />
                      </div>
                      <h3 className="text-lg font-medium">{savedProperties.length}</h3>
                      <p className="text-gray-500">Saved Properties</p>
                    </Card>
                    
                    <Card className="p-6 flex flex-col items-center text-center">
                      <div className="bg-green-100 p-3 rounded-full mb-3">
                        <Star className="h-6 w-6 text-green-700" />
                      </div>
                      <h3 className="text-lg font-medium">4</h3>
                      <p className="text-gray-500">Reviews Given</p>
                    </Card>
                  </div>
                  
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-4">Your Upcoming Stay</h3>
                    {bookings.filter(b => b.status === 'upcoming').length > 0 ? (
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/3">
                          <img 
                            src={bookings.filter(b => b.status === 'upcoming')[0].image} 
                            alt={bookings.filter(b => b.status === 'upcoming')[0].property} 
                            className="w-full h-36 object-cover rounded-md"
                          />
                        </div>
                        <div className="md:w-2/3">
                          <h4 className="font-bold text-lg">{bookings.filter(b => b.status === 'upcoming')[0].property}</h4>
                          <p className="text-gray-500">{bookings.filter(b => b.status === 'upcoming')[0].location}</p>
                          <div className="flex flex-wrap gap-4 mt-2">
                            <div>
                              <p className="text-sm text-gray-500">Check-in</p>
                              <p className="font-medium">{bookings.filter(b => b.status === 'upcoming')[0].checkIn}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Check-out</p>
                              <p className="font-medium">{bookings.filter(b => b.status === 'upcoming')[0].checkOut}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Total</p>
                              <p className="font-medium">${bookings.filter(b => b.status === 'upcoming')[0].totalPrice}</p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button 
                              className="bg-primary hover:bg-primary/90"
                              onClick={() => navigate(`/bookings/${bookings.filter(b => b.status === 'upcoming')[0].id}`)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-gray-500 mb-4">You don't have any upcoming bookings.</p>
                        <Button 
                          className="bg-primary hover:bg-primary/90"
                          onClick={() => navigate('/properties')}
                        >
                          Browse Properties
                        </Button>
                      </div>
                    )}
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold">Recently Saved Properties</h3>
                      <Button 
                        variant="outline" 
                        onClick={() => navigate('/dashboard/guest/saved')}
                      >
                        View All
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {savedProperties.slice(0, 2).map(property => (
                        <div key={property.id} className="border rounded-lg overflow-hidden flex flex-col">
                          <img 
                            src={property.image} 
                            alt={property.name} 
                            className="h-48 w-full object-cover"
                          />
                          <div className="p-4">
                            <h4 className="font-bold">{property.name}</h4>
                            <p className="text-gray-500 text-sm">{property.location}</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="font-medium">${property.price}/night</span>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                <span>{property.rating}</span>
                              </div>
                            </div>
                            <Button 
                              className="w-full mt-4 bg-primary hover:bg-primary/90"
                              onClick={() => navigate(`/properties/${property.id}`)}
                            >
                              View Property
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="bookings" className="space-y-4">
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-4">Your Upcoming Bookings</h3>
                    {bookings.filter(b => b.status === 'upcoming').length > 0 ? (
                      <div className="space-y-4">
                        {bookings.filter(b => b.status === 'upcoming').map(booking => (
                          <div key={booking.id} className="border rounded-lg p-4">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/4">
                                <img 
                                  src={booking.image} 
                                  alt={booking.property} 
                                  className="w-full h-36 object-cover rounded-md"
                                />
                              </div>
                              <div className="md:w-3/4 flex flex-col justify-between">
                                <div>
                                  <h4 className="font-bold text-lg">{booking.property}</h4>
                                  <p className="text-gray-500">{booking.location}</p>
                                  <div className="flex flex-wrap gap-4 mt-2">
                                    <div>
                                      <p className="text-sm text-gray-500">Check-in</p>
                                      <p className="font-medium">{booking.checkIn}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">Check-out</p>
                                      <p className="font-medium">{booking.checkOut}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">Total</p>
                                      <p className="font-medium">${booking.totalPrice}</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-2 mt-4">
                                  <Button 
                                    variant="default"
                                    onClick={() => navigate(`/bookings/${booking.id}`)}
                                  >
                                    View Details
                                  </Button>
                                  <Button 
                                    variant="outline"
                                    className="text-red-500 border-red-200 hover:bg-red-50"
                                  >
                                    Cancel Booking
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-gray-500 mb-4">You don't have any upcoming bookings.</p>
                        <Button 
                          className="bg-primary hover:bg-primary/90"
                          onClick={() => navigate('/properties')}
                        >
                          Browse Properties
                        </Button>
                      </div>
                    )}
                    <div className="flex justify-end mt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => navigate('/dashboard/guest/bookings')}
                      >
                        View All Bookings
                      </Button>
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="saved" className="space-y-4">
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-4">Your Saved Properties</h3>
                    {savedProperties.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {savedProperties.map(property => (
                          <div key={property.id} className="border rounded-lg overflow-hidden flex flex-col">
                            <img 
                              src={property.image} 
                              alt={property.name} 
                              className="h-48 w-full object-cover"
                            />
                            <div className="p-4">
                              <h4 className="font-bold">{property.name}</h4>
                              <p className="text-gray-500 text-sm">{property.location}</p>
                              <div className="flex justify-between items-center mt-2">
                                <span className="font-medium">${property.price}/night</span>
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                  <span>{property.rating}</span>
                                </div>
                              </div>
                              <div className="flex gap-2 mt-4">
                                <Button 
                                  className="flex-1 bg-primary hover:bg-primary/90"
                                  onClick={() => navigate(`/properties/${property.id}`)}
                                >
                                  View Property
                                </Button>
                                <Button 
                                  variant="outline"
                                  className="flex-1 text-red-500 border-red-200 hover:bg-red-50"
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-gray-500 mb-4">You haven't saved any properties yet.</p>
                        <Button 
                          className="bg-primary hover:bg-primary/90"
                          onClick={() => navigate('/properties')}
                        >
                          Browse Properties
                        </Button>
                      </div>
                    )}
                    <div className="flex justify-end mt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => navigate('/dashboard/guest/saved')}
                      >
                        View All Saved
                      </Button>
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="history" className="space-y-4">
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-4">Booking History</h3>
                    {bookings.filter(b => b.status === 'completed').length > 0 ? (
                      <div className="space-y-4">
                        {bookings.filter(b => b.status === 'completed').map(booking => (
                          <div key={booking.id} className="border rounded-lg p-4">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/4">
                                <img 
                                  src={booking.image} 
                                  alt={booking.property} 
                                  className="w-full h-36 object-cover rounded-md"
                                />
                              </div>
                              <div className="md:w-3/4 flex flex-col justify-between">
                                <div>
                                  <h4 className="font-bold text-lg">{booking.property}</h4>
                                  <p className="text-gray-500">{booking.location}</p>
                                  <div className="flex flex-wrap gap-4 mt-2">
                                    <div>
                                      <p className="text-sm text-gray-500">Stay dates</p>
                                      <p className="font-medium">{booking.checkIn} - {booking.checkOut}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">Total paid</p>
                                      <p className="font-medium">${booking.totalPrice}</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-2 mt-4">
                                  <Button 
                                    variant="outline"
                                    onClick={() => navigate(`/bookings/${booking.id}`)}
                                  >
                                    <Receipt className="h-4 w-4 mr-2" />
                                    View Receipt
                                  </Button>
                                  <Button 
                                    variant="default"
                                  >
                                    <Star className="h-4 w-4 mr-2" />
                                    Leave Review
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-gray-500">You don't have any completed stays yet.</p>
                      </div>
                    )}
                  </Card>
                </TabsContent>
                
                <TabsContent value="reviews" className="space-y-4">
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-4">Your Reviews</h3>
                    <div className="p-8 text-center">
                      <p className="text-gray-500 mb-4">You haven't left any reviews yet.</p>
                      <Button 
                        className="bg-primary hover:bg-primary/90"
                        onClick={() => navigate('/dashboard/guest/history')}
                      >
                        View Booking History
                      </Button>
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

export default GuestDashboard;
