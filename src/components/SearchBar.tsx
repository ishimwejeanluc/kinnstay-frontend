
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Calendar, Users, MapPin } from 'lucide-react';

const SearchBar = () => {
  const [location, setLocation] = useState('');
  
  return (
    <div className="w-full max-w-4xl mx-auto glass-panel rounded-xl shadow-lg overflow-hidden animate-slide-up">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-gray-200 relative">
          <div className="flex items-center">
            <MapPin size={18} className="text-primary mr-2" />
            <label htmlFor="location" className="text-sm font-medium text-gray-600">
              Location
            </label>
          </div>
          <Input
            id="location"
            type="text"
            placeholder="Where are you going?"
            className="border-none shadow-none text-base mt-1 p-0 h-8 focus-visible:ring-0 placeholder:text-gray-400"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-gray-200">
          <div className="flex items-center">
            <Calendar size={18} className="text-primary mr-2" />
            <label htmlFor="check-in" className="text-sm font-medium text-gray-600">
              Check In
            </label>
          </div>
          <Input
            id="check-in"
            type="date"
            className="border-none shadow-none text-base mt-1 p-0 h-8 focus-visible:ring-0 placeholder:text-gray-400"
          />
        </div>

        <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-gray-200">
          <div className="flex items-center">
            <Calendar size={18} className="text-primary mr-2" />
            <label htmlFor="check-out" className="text-sm font-medium text-gray-600">
              Check Out
            </label>
          </div>
          <Input
            id="check-out"
            type="date"
            className="border-none shadow-none text-base mt-1 p-0 h-8 focus-visible:ring-0 placeholder:text-gray-400"
          />
        </div>

        <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-gray-200">
          <div className="flex items-center">
            <Users size={18} className="text-primary mr-2" />
            <label htmlFor="guests" className="text-sm font-medium text-gray-600">
              Guests
            </label>
          </div>
          <select 
            id="guests"
            className="w-full border-none shadow-none text-base mt-1 p-0 h-8 focus:ring-0 bg-transparent"
          >
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests</option>
            <option value="5+">5+ Guests</option>
          </select>
        </div>

        <div className="p-4 flex items-center justify-center">
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-full h-12 w-12 flex items-center justify-center">
            <Search size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
