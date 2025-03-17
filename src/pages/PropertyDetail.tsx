import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Star, Calendar as CalendarIcon, MapPin, Users, Wifi, Tv, Car, Utensils, ShowerHead, Heart, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import GuestNavbar from '@/components/GuestNavbar';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ totalPrice, onClose, date, endDate, property }: { totalPrice: number, onClose: () => void, date: Date, endDate: Date, property: any }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please log in to book this property');
      return;
    }

    if (!stripe || !elements) {
      toast.error('Stripe has not loaded yet.');
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      toast.error('Card element not found');
      return;
    }

    setLoading(true);

    // Retrieve the token from local storage
    const token = localStorage.getItem('authToken'); // Ensure this token is valid

    try {
      // Fetch the client secret from your backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/payments/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token here
        },
        body: JSON.stringify({ 
          amount: totalPrice * 100, // amount in cents
          currency: 'usd' // Specify the currency here
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: user?.name,
            email: user?.email,
          },
        },
      });

      if (error) {
        setLoading(false);
        toast.error(`Payment failed: ${error.message}`);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        // Payment was successful, now create booking and payment records
        const bookingResponse = await fetch(`${import.meta.env.VITE_API_URL}/bookings/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            guest_id: user.id,
            property_id: property.id,
            check_in: date.toISOString(),
            check_out: endDate.toISOString(),
            total_price: totalPrice,
            status: 'confirmed',
          }),
        });

        if (!bookingResponse.ok) {
          throw new Error('Failed to create booking');
        }

        const paymentResponse = await fetch(`${import.meta.env.VITE_API_URL}/payments/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            booking_id: (await bookingResponse.json()).id,
            guest_id: user.id,
            amount: totalPrice,
            payment_method: 'stripe',
            status: 'paid',
          }),
        });

        if (!paymentResponse.ok) {
          throw new Error('Failed to record payment');
        }

        setLoading(false);
        toast.success('Payment and booking successful!');
        onClose();
      }
    } catch (error) {
      setLoading(false);
      toast.error('An error occurred while processing the payment.');
    }
  };

  return (
    <form onSubmit={handlePayment} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <Input type="text" placeholder="Your Name" defaultValue={user?.name || ''} required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <Input type="email" placeholder="Your Email" defaultValue={user?.email || ''} required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Card Details</label>
        <CardElement
          className="p-2 border rounded-md"
          options={{
            hidePostalCode: true,
          }}
        />
      </div>
      <Button type="submit" className="w-full py-2 mt-4" disabled={!stripe || loading}>
        {loading ? 'Processing...' : `Pay $${totalPrice}`}
      </Button>
    </form>
  );
};

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<any>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 7))
  );
  const [guests, setGuests] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { user, isAuthenticated } = useAuth();
  
  // Fetch property details from the API
  const fetchPropertyDetails = async () => {
    const token = localStorage.getItem('authToken');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/properties/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch property details');

      const data = await response.json();
      setProperty(data);
    } catch (error) {
      console.error('Error fetching property details:', error);
      toast.error('Failed to load property details. Please try again later.');
    }
  };

  useEffect(() => {
    fetchPropertyDetails();
  }, [id]);
  
  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <GuestNavbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Property Not Found</h2>
            <p className="mb-4">We couldn't find the property you're looking for.</p>
            <Link to="/properties">
              <Button>View All Properties</Button>
            </Link>
          </div>
        </div>
        
      </div>
    );
  }

  const calculateTotalPrice = () => {
    if (!date || !endDate) return 0;
    const days = Math.ceil((endDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    return property.price_per_night * days * guests;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <GuestNavbar />
      
      <div className="flex-grow pt-24 pb-12">
        <div className="container px-4 mx-auto">
          {/* Property title and actions */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">{property.title}</h1>
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center text-sm md:text-base mb-2 md:mb-0">
                <div className="flex items-center mr-4">
                  <Star className="h-4 w-4 text-tertiary mr-1 fill-tertiary" />
                  <span className="font-medium">{property.rating}</span>
                  <span className="text-gray-500 ml-1">({property.reviews} reviews)</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                  <span>{property.location}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Property images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {property.picture && property.picture.map((image, index) => (
              <img 
                key={index} 
                src={image} 
                alt={`${property.title} ${index + 1}`} 
                className="w-full h-[300px] object-cover rounded-xl"
              />
            ))}
          </div>
          
          {/* Property details and booking */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="glass-panel rounded-xl p-6 mb-8">
                <div className="flex justify-between items-start border-b pb-6 mb-6">
                  <div>
                    <h2 className="text-xl font-medium mb-2">
                      Property hosted by {property.host_id}
                    </h2>
                    <div className="flex text-gray-600">
                      <span className="mr-2">{property.bedrooms} bedrooms</span>
                      <span className="mr-2">•</span>
                      <span className="mr-2">{property.bathrooms} bathrooms</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Description</h3>
                  <p className="text-gray-600">{property.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Location</h3>
                  <MapContainer center={[property.latitude, property.longitude]} zoom={13} style={{ height: "250px", width: "100%" }}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[property.latitude, property.longitude]}>
                      <Popup>{property.location}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="glass-panel rounded-xl p-6 sticky top-24">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-2xl font-bold">${property.price_per_night} <span className="text-sm font-normal text-gray-600">/ night</span></div>
                </div>
                
                <div className="border rounded-lg overflow-hidden mb-4">
                  <div className="grid grid-cols-2">
                    <div className="p-4 border-r border-b">
                      <div className="text-sm font-medium mb-1">Check-in</div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, 'PPP') : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="p-4 border-b">
                      <div className="text-sm font-medium mb-1">Check-out</div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="text-sm font-medium mb-1">Guests</div>
                    <div className="flex items-center">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setGuests(prev => (prev > 1 ? prev - 1 : 1))}
                      >
                        -
                      </Button>
                      <span className="mx-4">{guests} {guests === 1 ? 'guest' : 'guests'}</span>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setGuests(prev => prev + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mb-4 py-6 text-lg" onClick={() => setShowPaymentModal(true)}>
                  Book Now
                </Button>
                
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span>${property.price_per_night} x {Math.ceil((endDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))} nights</span>
                    <span>${calculateTotalPrice()}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-4 border-t">
                    <span>Total</span>
                    <span>${calculateTotalPrice()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Payment Details</h2>
            <Elements stripe={stripePromise}>
              <CheckoutForm 
                totalPrice={calculateTotalPrice()} 
                onClose={() => setShowPaymentModal(false)} 
                date={date}
                endDate={endDate}
                property={property}
              />
            </Elements>
            <Button className="mt-4" onClick={() => setShowPaymentModal(false)}>Cancel</Button>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;
