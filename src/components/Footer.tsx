
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-white pt-16 border-t border-gray-100">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="inline-block mb-6">
              <h2 className="font-serif font-bold text-2xl text-primary">Kinnstay</h2>
            </Link>
            <p className="text-gray-600 mb-6">
              Find and book the perfect vacation rentals, homes, cabins and unique accommodations around the world.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
                <Facebook size={18} className="text-gray-600" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
                <Twitter size={18} className="text-gray-600" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
                <Instagram size={18} className="text-gray-600" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
                <Linkedin size={18} className="text-gray-600" />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-600 hover:text-primary transition-colors">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="text-primary mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-gray-600">
                  123 Vacation Way, Suite 101<br />
                  Paradise City, PC 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-primary mr-3 flex-shrink-0" />
                <a href="tel:+11234567890" className="text-gray-600 hover:text-primary transition-colors">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-primary mr-3 flex-shrink-0" />
                <a href="mailto:info@kinnstay.com" className="text-gray-600 hover:text-primary transition-colors">
                  info@kinnstay.com
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-6">Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="rounded-l-full rounded-r-none border-r-0"
              />
              <Button className="bg-primary hover:bg-primary/90 rounded-l-none rounded-r-full">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="py-6 border-t border-gray-100 text-center md:flex md:justify-between md:text-left">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Kinnstay. All rights reserved.
          </p>
          <div className="space-x-4 text-sm">
            <Link to="/privacy" className="text-gray-600 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-600 hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/faq" className="text-gray-600 hover:text-primary transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
