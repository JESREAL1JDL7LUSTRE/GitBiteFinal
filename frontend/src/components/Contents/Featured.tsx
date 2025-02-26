import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import useFetchDishes, { Dish } from "../../utils/Hooks/FetchHooks/useFetchDishes";
import PaymentButton from '../Buttons/PaymentButton';

function Featured() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { dishes, loading, error } = useFetchDishes();
  const featuredDishes = dishes.filter((dish) => dish.featured);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredDishes.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featuredDishes.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredDishes.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredDishes.length) % featuredDishes.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-emerald-600 text-xl">Loading featured dishes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600 text-xl">Error loading dishes: {error}</div>
      </div>
    );
  }

  if (featuredDishes.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-xl">No featured dishes available</div>
      </div>
    );
  }

  return (
    <div className=" bg-gray-50 border-emerald-500">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Delicious Food,
              <span className="text-emerald-600"> Delivered Fresh</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the finest cuisine
            </p>
          </div>

          {/* Featured Dishes Carousel */}
          <div className="relative max-w-5xl mx-auto">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredDishes.map((dish) => (
                  <div key={dish.id} className="w-full flex-shrink-0">
                    <div className="relative h-[400px] md:h-[500px] bg-white">
                      <div className="absolute inset-0">
                        <img 
                          src={dish.image} 
                          alt={dish.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <div className="flex items-center space-x-4 mb-2">
                          <span className="flex items-center">
                          </span>
                        </div>
                        <h2 className="text-3xl font-bold mb-2">{dish.name}</h2>
                        <p className="text-gray-200 mb-4">{dish.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold">${dish.price}</span>
                          <PaymentButton dishDetails={[dish]} />
                         
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-emerald-600" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
            >
              <ChevronRight className="w-6 h-6 text-emerald-600" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            
              {featuredDishes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index ? 'bg-emerald-500 w-6' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;