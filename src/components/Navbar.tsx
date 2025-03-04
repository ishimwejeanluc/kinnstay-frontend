
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Search, Menu, X, User, LogIn, UserPlus, LogOut, Home, Building, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDashboardNavigate = () => {
    if (user?.role === 'admin') {
      navigate('/dashboard/admin');
    } else if (user?.role === 'host') {
      navigate('/dashboard/host');
    } else {
      navigate('/dashboard/guest');
    }
  };

  // Determine if we're on a dashboard page
  const isDashboardPage = location.pathname.includes('/dashboard');

  // Role-specific navigation links
  const getRoleSpecificLinks = () => {
    if (!isAuthenticated || !user) return null;
    
    switch (user.role) {
      case 'guest':
        return (
          <>
            <Link to="/dashboard/guest" className="text-sm font-medium hover:text-tertiary transition-colors">
              My Dashboard
            </Link>
            <Link to="/properties" className="text-sm font-medium hover:text-tertiary transition-colors">
              Find Stays
            </Link>
          </>
        );
      case 'host':
        return (
          <>
            <Link to="/dashboard/host" className="text-sm font-medium hover:text-tertiary transition-colors">
              Host Dashboard
            </Link>
            <Link to="/dashboard/host/properties" className="text-sm font-medium hover:text-tertiary transition-colors">
              My Properties
            </Link>
          </>
        );
      case 'admin':
        return (
          <>
            <Link to="/dashboard/admin" className="text-sm font-medium hover:text-tertiary transition-colors">
              Admin Panel
            </Link>
            <Link to="/dashboard/admin/users" className="text-sm font-medium hover:text-tertiary transition-colors">
              User Management
            </Link>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isDashboardPage
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="relative z-10">
          <h1 className={`font-serif font-bold text-2xl transition-colors duration-300 ${
            isScrolled || isDashboardPage ? 'text-primary' : 'text-white'
          }`}>
            Kinnstay
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className={`hidden md:flex items-center gap-8 ${
          isScrolled || isDashboardPage ? 'text-foreground' : 'text-white'
        }`}>
          <Link to="/" className="text-sm font-medium hover:text-tertiary transition-colors">
            Home
          </Link>
          <Link to="/properties" className="text-sm font-medium hover:text-tertiary transition-colors">
            Properties
          </Link>
          {isAuthenticated && getRoleSpecificLinks()}
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
              isScrolled || isDashboardPage ? 'text-foreground hover:bg-secondary' : 'text-white hover:bg-white/10'
            }`}
          >
            <Search size={20} />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`text-sm font-medium rounded-full ${
                  isScrolled || isDashboardPage ? 'text-foreground hover:bg-secondary' : 'text-white hover:bg-white/10'
                }`}
              >
                <User size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center justify-start p-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                      <img src={user?.avatar} alt={user?.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                      <span className="text-xs px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
                        {user?.role}
                      </span>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Dashboard</DropdownMenuLabel>
                  {user?.role === 'guest' && (
                    <>
                      <DropdownMenuItem onClick={() => navigate('/dashboard/guest')} className="cursor-pointer">
                        <Home className="mr-2 h-4 w-4" />
                        <span>My Dashboard</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/dashboard/guest/bookings')} className="cursor-pointer">
                        <Building className="mr-2 h-4 w-4" />
                        <span>My Bookings</span>
                      </DropdownMenuItem>
                    </>
                  )}
                  {user?.role === 'host' && (
                    <>
                      <DropdownMenuItem onClick={() => navigate('/dashboard/host')} className="cursor-pointer">
                        <Home className="mr-2 h-4 w-4" />
                        <span>Host Dashboard</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/dashboard/host/properties')} className="cursor-pointer">
                        <Building className="mr-2 h-4 w-4" />
                        <span>My Properties</span>
                      </DropdownMenuItem>
                    </>
                  )}
                  {user?.role === 'admin' && (
                    <>
                      <DropdownMenuItem onClick={() => navigate('/dashboard/admin')} className="cursor-pointer">
                        <Home className="mr-2 h-4 w-4" />
                        <span>Admin Dashboard</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/dashboard/admin/users')} className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>User Management</span>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile/settings')} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Account Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem onClick={() => navigate('/login')} className="cursor-pointer">
                    <LogIn className="mr-2 h-4 w-4" />
                    <span>Log in</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/signup')} className="cursor-pointer">
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Create account</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            className="bg-primary text-white hover:bg-primary/90 rounded-full px-6"
            onClick={() => navigate(isAuthenticated ? '/dashboard/guest' : '/properties')}
          >
            {isAuthenticated ? 'My Dashboard' : 'Book Now'}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className={`md:hidden ${
            isScrolled || isDashboardPage ? 'text-foreground' : 'text-white'
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
              
              {/* Role-specific mobile links */}
              {isAuthenticated && user?.role === 'guest' && (
                <>
                  <Link 
                    to="/dashboard/guest" 
                    className="py-2 border-b border-gray-100 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Guest Dashboard
                  </Link>
                  <Link 
                    to="/dashboard/guest/bookings" 
                    className="py-2 border-b border-gray-100 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Bookings
                  </Link>
                </>
              )}
              
              {isAuthenticated && user?.role === 'host' && (
                <>
                  <Link 
                    to="/dashboard/host" 
                    className="py-2 border-b border-gray-100 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Host Dashboard
                  </Link>
                  <Link 
                    to="/dashboard/host/properties" 
                    className="py-2 border-b border-gray-100 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Properties
                  </Link>
                </>
              )}
              
              {isAuthenticated && user?.role === 'admin' && (
                <>
                  <Link 
                    to="/dashboard/admin" 
                    className="py-2 border-b border-gray-100 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                  <Link 
                    to="/dashboard/admin/users" 
                    className="py-2 border-b border-gray-100 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    User Management
                  </Link>
                </>
              )}
              
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
              {isAuthenticated ? (
                <Button 
                  className="w-full bg-primary text-white hover:bg-primary/90 rounded-full"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleDashboardNavigate();
                  }}
                >
                  My Dashboard
                </Button>
              ) : (
                <Button 
                  className="w-full bg-primary text-white hover:bg-primary/90 rounded-full"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/properties');
                  }}
                >
                  Book Now
                </Button>
              )}
              
              {isAuthenticated ? (
                <div className="flex flex-col mt-4 gap-2">
                  <div className="flex items-center justify-start p-2 border rounded-md">
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                      <img src={user?.avatar} alt={user?.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                      <span className="text-xs px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
                        {user?.role}
                      </span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-center"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/profile/settings');
                    }}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Account Settings</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-center"
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Button>
                </div>
              ) : (
                <div className="flex justify-between mt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1 mr-2 flex items-center justify-center"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/login');
                    }}
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    <span>Sign In</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 ml-2 flex items-center justify-center"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/signup');
                    }}
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Sign Up</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
