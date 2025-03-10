import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import HostNavbar from '@/components/HostNavbar';

// Sample bookings data
const bookings = [
  {
    id: '1',
    property: 'Luxury Beach Villa',
    guest: 'John Doe',
    checkIn: '2023-07-15',
    checkOut: '2023-07-20',
    status: 'confirmed',
    amount: 1750,
  },
  {
    id: '2',
    property: 'Mountain Retreat Cabin',
    guest: 'Alice Johnson',
    checkIn: '2023-08-10',
    checkOut: '2023-08-15',
    status: 'pending',
    amount: 1100,
  },
];

const HostBookings = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <HostNavbar />
      
      <div className="flex-grow bg-gray-50 py-10 pt-24">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Bookings</h1>
          </div>
          
          <Card className="p-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Guest</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map(booking => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.property}</TableCell>
                      <TableCell>{booking.guest}</TableCell>
                      <TableCell>{booking.checkIn}</TableCell>
                      <TableCell>{booking.checkOut}</TableCell>
                      <TableCell>
                        <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell>${booking.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HostBookings;
