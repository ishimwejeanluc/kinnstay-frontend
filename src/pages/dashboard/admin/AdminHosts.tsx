import React from 'react';
import AdminNavbar from '@/components/AdminNavbar'; // Import AdminNavbar
import { Card } from '@/components/ui/card';

const AdminHosts = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavbar />
      
      <div className="flex-grow bg-gray-50 py-10 pt-24">
        <div className="container px-4 mx-auto">
          <h1 className="text-2xl font-bold">Manage Hosts</h1>
          {/* Add host management logic here */}
        </div>
      </div>
    </div>
  );
};

export default AdminHosts; 