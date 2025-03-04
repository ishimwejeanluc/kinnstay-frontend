import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Users, HomeIcon, AlertCircle, User } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

// Sample user data
const users = [
  { id: '1', name: 'John Doe', email: 'guest@kinnstay.com', role: 'guest', status: 'active', joined: '2023-01-15' },
  { id: '2', name: 'Sarah Williams', email: 'host@kinnstay.com', role: 'host', status: 'active', joined: '2022-10-05' },
  { id: '3', name: 'Michael Brown', email: 'michael@example.com', role: 'guest', status: 'pending', joined: '2023-04-22' },
];

// Sample property data
const properties = [
  { id: '1', name: 'Luxury Beach Villa', host: 'Sarah Williams', location: 'Malibu, California', status: 'active', bookings: 12 },
  { id: '2', name: 'Mountain Retreat Cabin', host: 'Sarah Williams', location: 'Aspen, Colorado', status: 'active', bookings: 8 },
];

const AdminDashboard = () => {
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
                      src={user?.avatar || "https://randomuser.me/api/portraits/men/68.jpg"} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-bold">{user?.name || "Admin User"}</h2>
                  <p className="text-gray-500">{user?.email || "admin@example.com"}</p>
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mt-2">
                    Admin
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/profile/settings')}
                >
                  Edit Profile
                </Button>
              </Card>
            </div>
            
            <div className="md:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Admin Panel</h1>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card className="p-6 flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-3">
                    <Users className="h-6 w-6 text-blue-700" />
                  </div>
                  <h3 className="text-lg font-medium">{users.length}</h3>
                  <p className="text-gray-500">Total Users</p>
                </Card>
                
                <Card className="p-6 flex flex-col items-center text-center">
                  <div className="bg-green-100 p-3 rounded-full mb-3">
                    <HomeIcon className="h-6 w-6 text-green-700" />
                  </div>
                  <h3 className="text-lg font-medium">{properties.length}</h3>
                  <p className="text-gray-500">Properties</p>
                </Card>
                
                <Card className="p-6 flex flex-col items-center text-center">
                  <div className="bg-amber-100 p-3 rounded-full mb-3">
                    <AlertCircle className="h-6 w-6 text-amber-700" />
                  </div>
                  <h3 className="text-lg font-medium">2</h3>
                  <p className="text-gray-500">Pending Approvals</p>
                </Card>
                
                <Card className="p-6 flex flex-col items-center text-center">
                  <div className="bg-purple-100 p-3 rounded-full mb-3">
                    <BarChart3 className="h-6 w-6 text-purple-700" />
                  </div>
                  <h3 className="text-lg font-medium">$12,450</h3>
                  <p className="text-gray-500">Total Revenue</p>
                </Card>
              </div>
              
              <Tabs defaultValue="users">
                <TabsList className="mb-8">
                  <TabsTrigger value="users" className="flex items-center gap-2">
                    <Users size={16} />
                    <span>User Management</span>
                  </TabsTrigger>
                  <TabsTrigger value="properties" className="flex items-center gap-2">
                    <HomeIcon size={16} />
                    <span>Properties</span>
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="flex items-center gap-2">
                    <BarChart3 size={16} />
                    <span>Analytics</span>
                  </TabsTrigger>
                  <TabsTrigger value="profile" className="flex items-center gap-2">
                    <User size={16} />
                    <span>Admin Profile</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="users" className="space-y-4">
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-4">User Management</h3>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users.slice(0, 3).map(user => (
                            <TableRow key={user.id}>
                              <TableCell className="font-medium">{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                <Badge variant={user.role === 'host' ? 'outline' : 'secondary'}>
                                  {user.role}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                                  {user.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button variant="outline" size="sm">Edit</Button>
                                  {user.status === 'pending' && (
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
                    <div className="flex justify-end mt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => navigate('/dashboard/admin/users')}
                      >
                        View All Users
                      </Button>
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="properties" className="space-y-4">
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-4">Property Management</h3>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Property</TableHead>
                            <TableHead>Host</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Status</TableHead>
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
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button variant="outline" size="sm">View</Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => navigate('/dashboard/admin/properties')}
                      >
                        View All Properties
                      </Button>
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="analytics" className="space-y-4">
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-4">Platform Analytics</h3>
                    <div className="p-8 text-center">
                      <p className="text-gray-500">Analytics charts and data will appear here.</p>
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="profile" className="space-y-4">
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-4">Admin Profile</h3>
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

export default AdminDashboard;
