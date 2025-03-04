
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

// Example data
const testimonials = [
  {
    id: 1,
    name: 'Emily Johnson',
    location: 'New York, USA',
    rating: 5,
    comment: "Our stay at the beach villa was absolutely perfect. The views were breathtaking, and the amenities were top-notch. We're already planning our next visit!",
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    property: 'Luxury Beach Villa'
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: 'San Francisco, USA',
    rating: 5,
    comment: 'The Mountain Retreat Cabin exceeded all our expectations. Perfect for a weekend getaway with stunning views and great hiking trails nearby.',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    property: 'Mountain Retreat Cabin'
  },
  {
    id: 3,
    name: 'Sarah Williams',
    location: 'London, UK',
    rating: 4,
    comment: 'The city apartment was in the perfect location for exploring. Modern, clean, and the host was incredibly helpful with local recommendations.',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    property: 'Modern City Apartment'
  }
];

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-secondary">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-heading">What Our Guests Say</h2>
          <p className="section-subheading max-w-2xl mx-auto">
            Hear from guests who have experienced our exceptional hospitality and accommodations.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="glass-panel rounded-2xl p-8 md:p-12">
            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-opacity duration-500 ${
                    index === activeIndex ? 'opacity-100' : 'opacity-0 absolute inset-0'
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="flex-shrink-0">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                      />
                    </div>
                    <div className="flex-grow text-center md:text-left">
                      <div className="flex justify-center md:justify-start mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={`${
                              i < testimonial.rating
                                ? 'fill-tertiary text-tertiary'
                                : 'text-gray-300'
                            } mr-1`}
                          />
                        ))}
                      </div>
                      <p className="text-lg md:text-xl font-medium mb-4">"{testimonial.comment}"</p>
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                        <p className="text-sm text-primary mt-1">Stayed at: {testimonial.property}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-primary text-primary hover:bg-primary hover:text-white"
              onClick={prevTestimonial}
            >
              <ChevronLeft size={18} />
            </Button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeIndex
                      ? 'bg-primary w-6'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-primary text-primary hover:bg-primary hover:text-white"
              onClick={nextTestimonial}
            >
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
