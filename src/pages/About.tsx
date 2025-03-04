
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        {/* Hero Section */}
        <div className="relative bg-secondary pt-24 pb-16">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">About Kinnstay</h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Discover our story, our mission, and the team behind the perfect vacation experience.
              </p>
            </div>
          </div>
        </div>
        
        {/* Our Story Section */}
        <div className="py-16 bg-white">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold font-serif mb-6">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  Founded in 2018, Kinnstay began with a simple idea: to create a platform where travelers could find unique, comfortable, and memorable places to stay during their journeys.
                </p>
                <p className="text-gray-600 mb-4">
                  What started as a small collection of handpicked properties has grown into a global network of exceptional stays, connecting travelers with hosts who are passionate about providing outstanding hospitality experiences.
                </p>
                <p className="text-gray-600">
                  Today, Kinnstay offers thousands of carefully curated properties across the globe, from beachfront villas to mountain cabins, city apartments to countryside retreats – each one meeting our high standards of quality, comfort, and character.
                </p>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="About Kinnstay" 
                  className="rounded-lg shadow-xl h-[400px] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Our Mission Section */}
        <div className="py-16 bg-secondary">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl font-bold font-serif mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              "To connect travelers with exceptional spaces that inspire, refresh, and create lasting memories, while empowering hosts to share their unique properties with the world."
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-panel p-6 rounded-xl">
                <div className="bg-primary/10 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Quality</h3>
                <p className="text-gray-600">
                  We curate only the finest properties that meet our strict standards for comfort, cleanliness, and amenities.
                </p>
              </div>
              
              <div className="glass-panel p-6 rounded-xl">
                <div className="bg-primary/10 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"/>
                    <line x1="18" x2="12" y1="9" y2="15"/>
                    <line x1="12" x2="18" y1="9" y2="15"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Authenticity</h3>
                <p className="text-gray-600">
                  We believe in real experiences and unique stays that reflect local culture and character.
                </p>
              </div>
              
              <div className="glass-panel p-6 rounded-xl">
                <div className="bg-primary/10 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Community</h3>
                <p className="text-gray-600">
                  We foster meaningful connections between hosts and guests, creating a global community of travelers.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Team Section */}
        <div className="py-16 bg-white">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-serif mb-4">Meet Our Team</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The passionate individuals behind Kinnstay are dedicated to creating exceptional experiences for both hosts and guests.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: 'Emma Thompson',
                  role: 'CEO & Founder',
                  image: 'https://randomuser.me/api/portraits/women/23.jpg',
                  description: 'Travel enthusiast with 15+ years in hospitality and tech.'
                },
                {
                  name: 'David Chen',
                  role: 'CTO',
                  image: 'https://randomuser.me/api/portraits/men/32.jpg',
                  description: 'Tech innovator focused on creating seamless user experiences.'
                },
                {
                  name: 'Maria Rodriguez',
                  role: 'Head of Operations',
                  image: 'https://randomuser.me/api/portraits/women/44.jpg',
                  description: 'Expert in scaling operations while maintaining quality standards.'
                },
                {
                  name: 'James Wilson',
                  role: 'Customer Experience',
                  image: 'https://randomuser.me/api/portraits/men/62.jpg',
                  description: 'Dedicated to ensuring exceptional service for every guest and host.'
                },
              ].map((member, index) => (
                <div key={index} className="glass-panel p-6 rounded-xl text-center">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-md"
                  />
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="py-16 bg-secondary">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl font-bold font-serif mb-4">Join the Kinnstay Community</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Whether you're looking for the perfect stay or want to list your property, we're here to help you create unforgettable experiences.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/properties">
                <Button className="text-lg px-8 py-6 bg-primary hover:bg-primary/90">
                  Find a Stay
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary hover:text-white">
                  Become a Host
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
