
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Phone, MapPin, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        {/* Hero Section */}
        <div className="relative bg-secondary pt-24 pb-16">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">Contact Us</h1>
              <p className="text-lg md:text-xl text-gray-600">
                Have questions or need assistance? We're here to help you with anything related to your stays or hosting experience.
              </p>
            </div>
          </div>
        </div>
        
        {/* Contact Info & Form Section */}
        <div className="py-16">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <div className="glass-panel p-8 rounded-xl h-full">
                  <h2 className="text-2xl font-bold mb-6 font-serif">Get in Touch</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mr-4 flex-shrink-0">
                        <MapPin className="text-primary" size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Our Location</h3>
                        <p className="text-gray-600">
                          123 Vacation Way, Suite 101<br />
                          Paradise City, PC 12345<br />
                          United States
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mr-4 flex-shrink-0">
                        <Mail className="text-primary" size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Email Us</h3>
                        <p className="text-gray-600">
                          <a href="mailto:info@kinnstay.com" className="hover:text-primary transition-colors">
                            info@kinnstay.com
                          </a><br />
                          <a href="mailto:support@kinnstay.com" className="hover:text-primary transition-colors">
                            support@kinnstay.com
                          </a>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mr-4 flex-shrink-0">
                        <Phone className="text-primary" size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Call Us</h3>
                        <p className="text-gray-600">
                          <a href="tel:+11234567890" className="hover:text-primary transition-colors">
                            +1 (123) 456-7890
                          </a><br />
                          <a href="tel:+18005551234" className="hover:text-primary transition-colors">
                            +1 (800) 555-1234
                          </a>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mr-4 flex-shrink-0">
                        <Clock className="text-primary" size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Working Hours</h3>
                        <p className="text-gray-600">
                          Monday - Friday: 9:00 AM - 8:00 PM<br />
                          Saturday: 10:00 AM - 6:00 PM<br />
                          Sunday: 12:00 PM - 4:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="glass-panel p-8 rounded-xl">
                  <h2 className="text-2xl font-bold mb-6 font-serif">Send Us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your email"
                          required
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        required
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message..."
                        required
                        rows={6}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="bg-primary hover:bg-primary/90 px-8 py-6"
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="py-12 bg-secondary">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold font-serif">Our Location</h2>
              <p className="text-gray-600">Come visit our office or send us your inquiries anytime.</p>
            </div>
            
            <div className="bg-gray-300 h-[400px] rounded-xl flex items-center justify-center">
              <div className="text-gray-500 text-center">
                <MapPin className="w-12 h-12 mx-auto mb-4" />
                <p className="font-medium">Map Integration Placeholder</p>
                <p>123 Vacation Way, Paradise City</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="py-16">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold font-serif mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find quick answers to common questions. If you can't find what you're looking for, don't hesitate to contact us.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              {[
                {
                  question: "How do I book a property on Kinnstay?",
                  answer: "Booking a property on Kinnstay is easy! Browse our listings, select the property you're interested in, check availability for your dates, and click the 'Book Now' button. You'll be guided through the payment process, and once confirmed, you'll receive all the details for your stay."
                },
                {
                  question: "What is the cancellation policy?",
                  answer: "Cancellation policies vary by property. Each listing clearly displays the specific policy that applies. Generally, we offer flexible, moderate, and strict cancellation options. You can find the details on the property page before booking."
                },
                {
                  question: "How can I become a host on Kinnstay?",
                  answer: "To become a host, create an account, click on 'Become a Host' in your dashboard, and follow the steps to list your property. Our team will review your listing, and once approved, it will be visible to potential guests."
                },
                {
                  question: "Is there a security deposit for bookings?",
                  answer: "Security deposits vary by property and are set by the host. If applicable, the deposit amount will be clearly displayed on the property listing before you book. Deposits are fully refundable if no damage occurs during your stay."
                },
              ].map((item, index) => (
                <div key={index} className="glass-panel p-6 rounded-xl mb-4">
                  <h3 className="text-lg font-bold mb-2">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
