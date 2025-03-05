
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Users, 
  HomeIcon, 
  AlertCircle, 
  User, 
  DollarSign, 
  Settings,
  Eye,
  AlertTriangle,
  ShieldCheck
} from 'lucide-react';
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
  { id: '4', name: 'Emily Chen', email: 'emily@example.com', role: 'host', status: 'pending', joined: '2023-05-10' },
];

// Sample property data
const properties = [
  { 
    id: '1', 
    name: 'Luxury Beach Villa', 
    host: 'Sarah Williams', 
    location: 'Malibu, California', 
    status: 'active', 
    bookings: 12,
    earnings: 4200,
    lastUpdated: '2023-03-15'
  },
  { 
    id: '2', 
    name: 'Mountain Retreat Cabin', 
    host: 'Sarah Williams', 
    location: 'Aspen, Colorado', 
    status: 'active', 
    bookings: 8,
    earnings: 1760,
    lastUpdated: '2023-02-20'
  },
  { 
    id: '3', 
    name: 'Downtown Apartment', 
    host: 'Robert Johnson', 
    location: 'New York, NY', 
    status: 'pending', 
    bookings: 0,
    earnings: 0,
    lastUpdated: '2023-05-05'
  },
];

// Sample booking data
const bookings = [
  {
    id: '1',
    guest: 'John Doe',
    property: 'Luxury Beach Villa',
    host: 'Sarah Williams',
    checkIn: '2023-07-15',
    checkOut: '2023-07-20',
    status: 'completed',
    amount: 1750
  },
  {
    id: '2',
    guest: 'Alice Johnson',
    property: 'Mountain Retreat Cabin',
    host: 'Sarah Williams',
    checkIn: '2023-08-10',
    checkOut: '2023-08-15',
    status: 'upcoming',
    amount: 1100
  },
  {
    id: '3',
    guest: 'Robert Chen',
    property: 'Downtown Apartment',
    host: 'Robert Johnson',
    checkIn: '2023-09-05',
    checkOut: '2023-09-10',
    status: 'pending',
    amount: 950
  },
];

// Sample system alerts
const systemAlerts = [
  {
    id: '1',
    type: 'payment',
    message: 'Failed payment attempt by user John Doe',
    severity: 'high',
    time: '2 hours ago'
  },
  {
    id: '2',
    type: 'security',
    message: 'Multiple failed login attempts from IP 192.168.1.1',
    severity: 'high',
    time: '5 hours ago'
  },
  {
    id: '3',
    type: 'system',
    message: 'Database backup completed successfully',
    severity: 'low',
    time: '12 hours ago'
  },
];

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Calculate total stats
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.amount, 0);
  const platformFee = totalRevenue * 0.1; // Assuming 10% platform fee

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

              <Card className="p-6 mt-4">
                <h3 className="font-medium mb-4">Admin Controls</h3>
                <ul className="space-y-2">
                  <li>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => navigate('/dashboard/admin/users')}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      User Management
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => navigate('/dashboard/admin/properties')}
                    >
                      <HomeIcon className="mr-2 h-4 w-4" />
                      Property Management
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => navigate('/dashboard/admin/bookings')}
                    >
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Booking Reports
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => navigate('/dashboard/admin/settings')}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      System Settings
                    </Button>
                  </li>
                </ul>
              </Card>
            </div>
            
            <div className="md:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Admin Panel</h1>
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/dashboard/admin/reports')}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generate Reports
                  </Button>
                  <Button 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => navigate('/dashboard/admin/settings')}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    System Settings
                  </Button>
                </div>
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
                  <h3 className="text-lg font-medium">{users.filter(u => u.status === 'pending').length + properties.filter(p => p.status === 'pending').length}</h3>
                  <p className="text-gray-500">Pending Approvals</p>
                </Card>
                
                <Card className="p-6 flex flex-col items-center text-center">
                  <div className="bg-purple-100 p-3 rounded-full mb-3">
                    <DollarSign className="h-6 w-6 text-purple-700" />
                  </div>
                  <h3 className="text-lg font-medium">${platformFee.toFixed(0)}</h3>
                  <p className="text-gray-500">Platform Revenue</p>
                </Card>
              </div>
              
              <Tabs defaultValue="overview">
                <TabsList className="mb-8">
                  <TabsTrigger value="overview" className="flex items-center gap-2">
                    <BarChart3 size={16} />
                    <span>Overview</span>
                  </TabsTrigger>
                  <TabsTrigger value="users" className="flex items-center gap-2">
                    <Users size={16} />
                    <span>Users</span>
                  </TabsTrigger>
                  <TabsTrigger value="properties" className="flex items-center gap-2">
                    <HomeIcon size={16} />
                    <span>Properties</span>
                  </TabsTrigger>
                  <TabsTrigger value="bookings" className="flex items-center gap-2">
                    <BarChart3 size={16} />
                    <span>Bookings</span>
                  </TabsTrigger>
                  <TabsTrigger value="system" className="flex items-center gap-2">
                    <AlertTriangle size={16} />
                    <span>System Alerts</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-6">
                      <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <User className="h-4 w-4 text-blue-700" />
                          </div>
                          <div>
                            <p className="text-sm">New user registered: <span className="font-medium">Emily Chen</span></p>
                            <p className="text-xs text-gray-500">2 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-green-100 p-2 rounded-full">
                            <HomeIcon className="h-4 w-4 text-green-700" />
                          </div>
                          <div>
                            <p className="text-sm">New property listed: <span className="font-medium">Downtown Apartment</span></p>
                            <p className="text-xs text-gray-500">5 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-amber-100 p-2 rounded-full">
                            <BarChart3 className="h-4 w-4 text-amber-700" />
                          </div>
                          <div>
                            <p className="text-sm">New booking: <span className="font-medium">Mountain Retreat Cabin</span></p>
                            <p className="text-xs text-gray-500">12 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="p-6">
                      <h3 className="text-xl font-bold mb-4">Pending Approvals</h3>
                      <div className="space-y-4">
                        {users.filter(u => u.status === 'pending').map(user => (
                          <div key={user.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-gray-500">New {user.role} account</p>
                            </div>
                            <Button size="sm">
                              Approve
                            </Button>
                          </div>
                        ))}
                        
                        {properties.filter(p => p.status === 'pending').map(property => (
                          <div key={property.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">{property.name}</p>
                              <p className="text-sm text-gray-500">New property by {property.host}</p>
                            </div>
                            <Button size="sm">
                              Review
                            </Button>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                  
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-4">Revenue Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Total Bookings</p>
                        <p className="text-2xl font-bold">{totalBookings}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Total Revenue</p>
                        <p className="text-2xl font-bold">${totalRevenue}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Platform Fee</p>
                        <p className="text-2xl font-bold">${platformFee.toFixed(0)}</p>
                      </div>
                    </div>
                    <div className="p-8 text-center bg-gray-50 rounded-lg">
                      <p className="text-gray-500">Revenue chart will appear here</p>
                    </div>
                  </Card>
                </TabsContent>
                
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
                            <TableHead>Joined</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users.map(user => (
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
                              <TableCell>{user.joined}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => navigate(`/dashboard/admin/users/${user.id}`)}
                                  >
                                    <Eye className="h-3 w-3 mr-1" />
                                    View
                                  </Button>
                                  {user.status === 'pending' && (
                                    <Button 
                                      size="sm" 
                                      className="bg-green-600 hover:bg-green-700 text-white"
                                    >
                                      <ShieldCheck className="h-3 w-3 mr-1" />
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
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => navigate(`/dashboard/admin/properties/${property.id}`)}
                                  >
                                    <Eye className="h-3 w-3 mr-1" />
                                    View
                                  </Button>
                                  {property.status === 'pending' && (
                                    <Button 
                                      size="sm" 
                                      className="bg-green-600 hover:bg-green-700 text-white"
                                    >
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
                        onClick={() => navigate('/dashboard/admin/properties')}
                      >
                        View All Properties
                      </Button>
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="bookings" className="space-y-4">
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-4">Booking Reports</h3>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Guest</TableHead>
                            <TableHead>Property</TableHead>
                            <TableHead>Host</TableHead>
                            <TableHead>Dates</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {bookings.map(booking => (
                            <TableRow key={booking.id}>
                              <TableCell className="font-medium">{booking.guest}</TableCell>
                              <TableCell>{booking.property}</TableCell>
                              <TableCell>{booking.host}</TableCell>
                              <TableCell>{booking.checkIn} - {booking.checkOut}</TableCell>
                              <TableCell>
                                <Badge 
                                  variant={
                                    booking.status === 'completed' 
                                      ? 'default' 
                                      : booking.status === 'upcoming' 
                                        ? 'outline' 
                                        : 'secondary'
                                  }
                                >
                                  {booking.status}
                                </Badge>
                              </TableCell>
                              <TableCell>${booking.amount}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => navigate('/dashboard/admin/bookings')}
                      >
                        View All Bookings
                      </Button>
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="system" className="space-y-4">
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-4">System Alerts</h3>
                    <div className="space-y-4">
                      {systemAlerts.map(alert => (
                        <div 
                          key={alert.id} 
                          className={`border-l-4 ${
                            alert.severity === 'high' 
                              ? 'border-red-500 bg-red-50' 
                              : 'border-yellow-500 bg-yellow-50'
                          } p-4 rounded-r-lg`}
                        >
                          <div className="flex justify-between">
                            <h4 className="font-bold capitalize">{alert.type} Alert</h4>
                            <Badge variant={alert.severity === 'high' ? 'destructive' : 'outline'}>
                              {alert.severity} priority
                            </Badge>
                          </div>
                          <p className="text-gray-700 my-1">{alert.message}</p>
                          <p className="text-xs text-gray-500">{alert.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg mt-4">
                      <h4 className="font-medium mb-2">System Health</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <p className="text-sm">Server Status</p>
                          <Badge variant="outline" className="bg-green-50 text-green-700">Operational</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm">Database Status</p>
                          <Badge variant="outline" className="bg-green-50 text-green-700">Operational</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm">Payment Gateway</p>
                          <Badge variant="outline" className="bg-green-50 text-green-700">Operational</Badge>
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
    </div>
  );
};

export default AdminDashboard;
