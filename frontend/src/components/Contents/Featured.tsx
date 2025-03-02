import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import useFetchDishes, { Dish } from "../../utils/Hooks/FetchHooks/useFetchDishes";
import PaymentButton from '../Buttons/PaymentButton';
import { useNavigate } from "react-router-dom"; 
import { motion, AnimatePresence } from 'framer-motion';


function Featured() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { dishes, loading, error } = useFetchDishes();
  const featuredDishes = dishes.filter((dish) => dish.featured);
  const navigate = useNavigate();

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
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gray-50 flex items-center justify-center"
      >
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-[#a0c878] text-xl font-medium"
        >
          Loading featured dishes...
        </motion.div>
      </motion.div>
    );
  }
  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 flex items-center justify-center"
      >
        <motion.div 
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          className="text-red-600 text-xl"
        >
          Error loading dishes: {error}
        </motion.div>
      </motion.div>
    );
  }
  if (featuredDishes.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 flex items-center justify-center"
      >
        <motion.div 
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="text-gray-600 text-xl"
        >
          No featured dishes available
        </motion.div>
      </motion.div>
    );
  }
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 border-[#a0c878] rounded-lg"
    >
      <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              <motion.span>Delicious Food,</motion.span>{" "}
              <motion.span
                initial={{ color: "#000000" }}
                animate={{ color: "#a0c878" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-[#a0c878]"
              >
                Delivered Fresh
              </motion.span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Experience the finest cuisine
            </motion.p>
          </motion.div>
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative max-w-5xl mx-auto"
          >
            <motion.div 
              className="overflow-hidden rounded-2xl shadow-2xl"
              whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <div 
                    className="relative h-[400px] md:h-[500px] bg-white"
                  >
                    <motion.div 
                      className="absolute inset-0"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 7 }}
                    >
                      <motion.img 
                        src={featuredDishes[currentSlide].image} 
                        alt={featuredDishes[currentSlide].name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    </motion.div>
                    
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 p-8 text-white"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <div className="flex items-center space-x-4 mb-2">
                        <span className="flex items-center">
                        </span>
                      </div>
                      <motion.h2 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-3xl font-bold mb-2"
                      >
                        {featuredDishes[currentSlide].name}
                      </motion.h2>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-gray-200 mb-4"
                      >
                        {featuredDishes[currentSlide].description}
                      </motion.p>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex items-center justify-between"
                      >
                        <motion.span 
                          className="text-2xl font-bold"
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.5 }}
                        >
                          ${featuredDishes[currentSlide].price}
                        </motion.span>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <PaymentButton dishDetails={[featuredDishes[currentSlide]]} />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
            {/* Navigation Buttons */}
            <motion.button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6 text-[#a0c878]" />
            </motion.button>
            <motion.button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6 text-[#a0c878]" />
            </motion.button>
            {/* Dots */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10"
            >
              {featuredDishes.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    currentSlide === index ? 'bg-[#a0c878] w-6' : 'bg-white/50 w-2'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
export default Featured;