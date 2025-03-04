
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const GuestSaved = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-gray-50 py-10 pt-24">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Saved Properties</h1>
          </div>
          
          <Card className="p-6">
            <div className="flex items-center justify-center p-8 flex-col">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <Heart className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No saved properties</h3>
              <p className="text-gray-500 mb-4">You haven't saved any properties yet.</p>
              <a href="/properties" className="text-primary hover:underline">
                Browse properties and save your favorites
              </a>
            </div>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default GuestSaved;
