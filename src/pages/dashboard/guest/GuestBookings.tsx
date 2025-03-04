
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';

const GuestBookings = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-gray-50 py-10 pt-24">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Bookings</h1>
          </div>
          
          <Card className="p-6">
            <div className="flex items-center justify-center p-8 flex-col">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <Calendar className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No upcoming bookings</h3>
              <p className="text-gray-500 mb-4">You don't have any upcoming or past bookings yet.</p>
              <a href="/properties" className="text-primary hover:underline">
                Browse properties to book your next stay
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GuestBookings;
