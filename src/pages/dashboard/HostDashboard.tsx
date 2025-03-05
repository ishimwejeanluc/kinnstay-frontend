import React from 'react';
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
import Navbar from '@/components/Navbar';
import { Badge } from '@/components/ui/badge';

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

  // Calculate earnings
  const totalEarnings = properties.reduce((sum, property) => sum + (property.price * property.bookings), 0);
  const monthlyEarnings = totalEarnings / 3; // Assuming the bookings are spread over 3 months

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
                  <p className="text-sm font-medium">Overall Rating: 4.85</p>
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
                <Button 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => navigate('/dashboard/host/properties/new')}
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
                    <DollarSign className="h-6 w-6 text-green-700" />
                  </div>
                  <h3 className="text-lg font-medium">${monthlyEarnings.toFixed(0)}</h3>
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
                            <div className="flex items-center justify-between">
                              <h3 className="text-xl font-bold">{property.name}</h3>
                              <Badge variant={property.status === 'active' ? 'secondary' : 'outline'}>
                                {property.status}
                              </Badge>
                            </div>
                            <p className="text-gray-500">{property.location}</p>
                            <div className="flex items-center mt-2 flex-wrap gap-x-4 gap-y-2">
                              <div className="flex items-center">
                                <DollarSign className="h-4 w-4 text-gray-500 mr-1" />
                                <span className="text-sm font-medium">${property.price}/night</span>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                                <span className="text-sm text-gray-500">{property.bookings} bookings</span>
                              </div>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                <span className="text-sm text-gray-500">{property.rating} rating</span>
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
                                  <h4 className="font-bold">{request.guest}</h4>
                                  <Badge variant="outline">{request.status}</Badge>
                                </div>
                                <p className="text-gray-700">{request.property}</p>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                                  <div>
                                    <p className="text-xs text-gray-500">Check-in</p>
                                    <p className="text-sm">{request.checkIn}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">Check-out</p>
                                    <p className="text-sm">{request.checkOut}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">Guests</p>
                                    <p className="text-sm">{request.guests}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">Total</p>
                                    <p className="text-sm font-medium">${request.totalAmount}</p>
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
                        <p className="text-2xl font-bold">${monthlyEarnings.toFixed(0)}</p>
                      </Card>
                      <Card className="p-4 bg-gray-50">
                        <p className="text-gray-500 text-sm">Pending Payments</p>
                        <p className="text-2xl font-bold">$750</p>
                      </Card>
                    </div>
                    <div className="p-8 text-center bg-gray-50 rounded-lg">
                      <p className="text-gray-500">Earnings chart will appear here</p>
                    </div>
                    <div className="mt-6">
                      <h4 className="font-bold mb-2">Recent Transactions</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">Booking #1234</p>
                            <p className="text-sm text-gray-500">July 15, 2023</p>
                          </div>
                          <span className="font-medium text-green-600">+$350</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">Booking #1235</p>
                            <p className="text-sm text-gray-500">July 20, 2023</p>
                          </div>
                          <span className="font-medium text-green-600">+$220</span>
                        </div>
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
