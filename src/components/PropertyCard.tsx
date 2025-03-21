
import { Button } from '@/components/ui/button';
import { Heart, Star, MapPin } from 'lucide-react';

interface PropertyCardProps {
  propertyId: string;
  title: string;
  location: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
}

const PropertyCard = ({ propertyId, title, location, price, image, rating, reviewCount }: PropertyCardProps) => {
  return (
    <div className="flex flex-col bg-white rounded-xl overflow-hidden card-hover animate-scale-in">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full h-8 w-8 hover:bg-white"
        >
          <Heart size={18} className="text-primary" />
        </Button>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center">
            <Star size={16} className="fill-tertiary text-tertiary mr-1" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-gray-500 text-xs ml-1">({reviewCount} reviews)</span>
          </div>
        </div>
        
        <h3 className="font-medium text-lg mb-1 line-clamp-1">{title}</h3>
        
        <div className="flex items-center text-gray-500 mb-3">
          <MapPin size={14} className="mr-1" />
          <span className="text-sm line-clamp-1">{location}</span>
        </div>
        
        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="font-bold text-lg">${price}</span>
            <span className="text-gray-500 text-sm"> / night</span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full border-primary text-primary hover:bg-primary hover:text-white"
          >
            View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
