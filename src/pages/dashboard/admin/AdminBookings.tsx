import React from 'react';
import AdminNavbar from '@/components/AdminNavbar';

const AdminBookings = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavbar />
      
      <div className="flex-grow bg-gray-50 py-10 pt-24">
        <div className="container px-4 mx-auto">
          <h1 className="text-2xl font-bold">Admin Bookings</h1>
          {/* ... existing bookings content ... */}
        </div>
      </div>
    </div>
  );
};

export default AdminBookings; 