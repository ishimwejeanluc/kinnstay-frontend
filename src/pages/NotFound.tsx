
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-9xl font-serif font-bold text-primary mb-4 animate-float">404</h1>
            <h2 className="text-2xl font-medium mb-6">Page Not Found</h2>
            <p className="text-gray-600 mb-8">
              The page you're looking for doesn't exist or has been moved. 
              Please check the URL or return to the homepage.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-2 inline-flex items-center">
              <Home size={18} className="mr-2" />
              Return to Home
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
