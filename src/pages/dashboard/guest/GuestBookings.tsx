
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Calendar, Star, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

// Sample bookings data
const allBookings = [
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
  },
  {
    id: '3',
    property: 'City Apartment',
    location: 'New York, NY',
    checkIn: '2023-05-05',
    checkOut: '2023-05-10',
    status: 'completed',
    totalPrice: 950,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: '4',
    property: 'Lakefront Cottage',
    location: 'Lake Tahoe, Nevada',
    checkIn: '2023-09-20',
    checkOut: '2023-09-25',
    status: 'upcoming',
    totalPrice: 780,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80',
  }
];

const GuestBookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Filter bookings based on selected tab
  const filteredBookings = filterStatus === 'all' 
    ? allBookings 
    : allBookings.filter(booking => booking.status === filterStatus);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Dashboard Content */}
      <div className="flex-grow bg-gray-50 py-10 pt-24">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Bookings</h1>
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={() => navigate('/properties')}
            >
              Browse Properties
            </Button>
          </div>
          
          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger 
                value="all" 
                onClick={() => setFilterStatus('all')}
              >
                All Bookings
              </TabsTrigger>
              <TabsTrigger 
                value="upcoming" 
                onClick={() => setFilterStatus('upcoming')}
              >
                Upcoming
              </TabsTrigger>
              <TabsTrigger 
                value="completed" 
                onClick={() => setFilterStatus('completed')}
              >
                Past Stays
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          {filteredBookings.length > 0 ? (
            <div className="space-y-6">
              {filteredBookings.map(booking => (
                <Card key={booking.id} className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3 lg:w-1/4">
                      <img 
                        src={booking.image} 
                        alt={booking.property} 
                        className="w-full h-48 object-cover rounded-md"
                      />
                    </div>
                    <div className="md:w-2/3 lg:w-3/4 flex flex-col">
                      <div className="flex justify-between flex-wrap">
                        <h3 className="text-xl font-bold">{booking.property}</h3>
                        <Badge variant={booking.status === 'upcoming' ? 'default' : 'secondary'}>
                          {booking.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                        </Badge>
                      </div>
                      <p className="text-gray-500 mb-4">{booking.location}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
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
                      
                      <div className="flex flex-wrap gap-3 mt-auto">
                        <Button 
                          variant="default"
                          onClick={() => navigate(`/bookings/${booking.id}`)}
                        >
                          Booking Details
                        </Button>
                        
                        {booking.status === 'upcoming' && (
                          <Button 
                            variant="outline"
                            className="text-red-500 border-red-200 hover:bg-red-50"
                          >
                            Cancel Booking
                          </Button>
                        )}
                        
                        {booking.status === 'completed' && (
                          <>
                            <Button 
                              variant="outline"
                              onClick={() => navigate(`/bookings/${booking.id}/receipt`)}
                            >
                              <Receipt className="h-4 w-4 mr-2" />
                              View Receipt
                            </Button>
                            <Button 
                              variant="outline"
                            >
                              <Star className="h-4 w-4 mr-2" />
                              Leave Review
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-6">
              <div className="flex items-center justify-center p-8 flex-col">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                  <Calendar className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No bookings found</h3>
                <p className="text-gray-500 mb-4">You don't have any {filterStatus !== 'all' ? filterStatus : ''} bookings yet.</p>
                <Button 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => navigate('/properties')}
                >
                  Browse properties to book your next stay
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestBookings;
