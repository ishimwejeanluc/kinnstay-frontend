
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Menu, X, User } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="relative z-10">
          <h1 className={`font-serif font-bold text-2xl transition-colors duration-300 ${
            isScrolled ? 'text-primary' : 'text-white'
          }`}>
            Kinnstay
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className={`hidden md:flex items-center gap-8 ${
          isScrolled ? 'text-foreground' : 'text-white'
        }`}>
          <Link to="/" className="text-sm font-medium hover:text-tertiary transition-colors">
            Home
          </Link>
          <Link to="/properties" className="text-sm font-medium hover:text-tertiary transition-colors">
            Properties
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-tertiary transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:text-tertiary transition-colors">
            Contact
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`text-sm font-medium rounded-full ${
              isScrolled ? 'text-foreground hover:bg-secondary' : 'text-white hover:bg-white/10'
            }`}
          >
            <Search size={20} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`text-sm font-medium rounded-full ${
              isScrolled ? 'text-foreground hover:bg-secondary' : 'text-white hover:bg-white/10'
            }`}
          >
            <User size={20} />
          </Button>
          <Button 
            className="bg-primary text-white hover:bg-primary/90 rounded-full px-6"
          >
            Book Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className={`md:hidden ${
            isScrolled ? 'text-foreground' : 'text-white'
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}>
          <div className="flex flex-col h-full p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="font-serif font-bold text-2xl text-primary">
                Kinnstay
              </h1>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsMenuOpen(false)}
              >
                <X size={24} />
              </Button>
            </div>
            
            <nav className="flex flex-col gap-6 text-lg font-medium">
              <Link 
                to="/" 
                className="py-2 border-b border-gray-100 hover:text-primary transition-colors" 
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/properties" 
                className="py-2 border-b border-gray-100 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Properties
              </Link>
              <Link 
                to="/about" 
                className="py-2 border-b border-gray-100 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="py-2 border-b border-gray-100 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
            
            <div className="mt-auto">
              <Button 
                className="w-full bg-primary text-white hover:bg-primary/90 rounded-full"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Now
              </Button>
              <div className="flex justify-between mt-4">
                <Button 
                  variant="outline" 
                  className="flex-1 mr-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 ml-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
