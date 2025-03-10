import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const AdminNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm py-3">
      <div className="container px-4 mx-auto flex items-center justify-between">
        <h1 className="font-serif font-bold text-2xl text-primary">Kinnstay</h1>
        <div className="flex items-center">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard/admin')}
            className="mr-4"
          >
            Dashboard
          </Button>
          <Button 
            variant="outline" 
            onClick={handleLogout}
          >
            Log out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar; 