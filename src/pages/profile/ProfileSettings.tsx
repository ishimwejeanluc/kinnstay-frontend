
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import GuestNavbar from '@/components/GuestNavbar';


const ProfileSettings = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate profile update
    setTimeout(() => {
      toast.success('Profile updated successfully');
      setIsLoading(false);
      // Reset password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      }));
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <GuestNavbar />
      
      <div className="flex-grow bg-gray-50 py-10 pt-24">
        <div className="container px-4 mx-auto">
          <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                    <img 
                      src={user?.avatar || "https://randomuser.me/api/portraits/men/32.jpg"} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-bold">{user?.name}</h2>
                  <p className="text-gray-500">{user?.email}</p>
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full mt-2">
                    {user?.role}
                  </span>
                  <Button className="mt-4 w-full" variant="outline">
                    Change Photo
                  </Button>
                </div>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Profile Information</h3>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name</label>
                      <Input 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email Address</label>
                      <Input 
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-4 mt-8">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Current Password</label>
                      <Input 
                        name="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">New Password</label>
                      <Input 
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                      <Input 
                        name="confirmNewPassword"
                        type="password"
                        value={formData.confirmNewPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button 
                      type="submit" 
                      className="bg-primary hover:bg-primary/90"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
    
    </div>
  );
};

export default ProfileSettings;
