
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Sample property data
const properties = [
  { id: '1', name: 'Luxury Beach Villa', host: 'Sarah Williams', location: 'Malibu, California', status: 'active', bookings: 12 },
  { id: '2', name: 'Mountain Retreat Cabin', host: 'Sarah Williams', location: 'Aspen, Colorado', status: 'active', bookings: 8 },
  { id: '3', name: 'Downtown Apartment', host: 'Emily Johnson', location: 'New York, NY', status: 'pending', bookings: 0 }
];

const AdminProperties = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-gray-50 py-10 pt-24">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Property Management</h1>
          </div>
          
          <Card className="p-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Host</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {properties.map(property => (
                    <TableRow key={property.id}>
                      <TableCell className="font-medium">{property.name}</TableCell>
                      <TableCell>{property.host}</TableCell>
                      <TableCell>{property.location}</TableCell>
                      <TableCell>
                        <Badge variant={property.status === 'active' ? 'default' : 'secondary'}>
                          {property.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{property.bookings}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          {property.status === 'pending' && (
                            <Button variant="outline" size="sm" className="text-green-500 border-green-200 hover:bg-green-50">
                              Approve
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminProperties;
