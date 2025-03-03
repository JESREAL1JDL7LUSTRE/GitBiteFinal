import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Clock, Award, Truck, Users, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const teamMembers = [
    {
      name: "Jesreal D. Lustre",
      role: "Backend and Frontend Logic Programmer",
      image: "public/AuthorsPic/Jesreal.png",
      description: "Jesreal specializes in building and optimizing both backend and frontend logic, ensuring seamless system performance.",
      link:"https://github.com/JESREAL1JDL7LUSTRE"
    },
    {
      name: "Bea Clarise Bacaling",
      role: "Frontend Logic and Frontend Design Programmer",
      image: "public/AuthorsPic/Bea.png",
      description: "Bea focuses on frontend logic and design, crafting user-friendly interfaces with smooth interactions.",
      link:"https://github.com/baeeyuh"
    },
    {
      name: "Angel Janette Taglucop",
      role: "Head Frontend Designer",
      image: "public/AuthorsPic/Angel.png",
      description: "Angel leads the frontend design, ensuring a visually appealing and responsive user experience.",
      link:"https://github.com/angel-jane"
    }
];
  const values = [
    { icon: <ChefHat className="h-8 w-8 text-green-600" />, title: "Quality Ingredients", description: "We source only the freshest, highest quality ingredients for all our dishes." },
    { icon: <Clock className="h-8 w-8 text-green-600" />, title: "Fast Delivery", description: "Our efficient delivery system ensures your food arrives hot and fresh." },
    { icon: <Award className="h-8 w-8 text-green-600" />, title: "Culinary Excellence", description: "Our chefs are trained in various cuisines to bring you authentic flavors." },
    { icon: <Truck className="h-8 w-8 text-green-600" />, title: "Sustainable Packaging", description: "We use eco-friendly packaging to reduce our environmental impact." },
    { icon: <Users className="h-8 w-8 text-green-600" />, title: "Community Focus", description: "We support local farmers and suppliers to strengthen our community." },
    { icon: <Heart className="h-8 w-8 text-green-600" />, title: "Passion for Food", description: "Our love for food drives us to create memorable dining experiences." }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <motion.div 
        className="relative bg-gray-900 text-white py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Food background" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Our Story
          </motion.h1>
          <motion.p 
            className="mt-6 text-xl max-w-3xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            From a small kitchen to your fingertips - how GitCook is revolutionizing the way you experience food.
          </motion.p>
        </div>
      </motion.div>

      {/* Our Journey */}
      <motion.section 
        className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Our Journey</h2>
          <div className="mt-2 h-1 w-20 bg-[#a0c878] mx-auto"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants}>
            <p className="text-lg text-gray-700 leading-relaxed">
              Founded in 2025, GitCook began with a simple mission: to connect food lovers with exceptional culinary experiences without the hassle of waiting in lines or making reservations.
            </p>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed">
              What started as a small team of food enthusiasts has grown into a network of over 200 partner restaurants, delivering thousands of meals daily across the country.
            </p>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed">
              Our platform has evolved from a basic ordering system to an intelligent food discovery service that learns your preferences and suggests dishes you'll love.
            </p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="rounded-lg overflow-hidden shadow-xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
              alt="GitCook journey" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Our Values */}
      <motion.section 
        className="py-16 bg-gray-100"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
            <div className="mt-2 h-1 w-20 bg-[#a0c878] mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-center h-16 w-16 rounded-md bg-green-100 mx-auto">
                  {value.icon}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900 text-center">{value.title}</h3>
                <p className="mt-2 text-gray-600 text-center">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Meet Our Team */}
      <motion.section 
        className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
          <div className="mt-2 h-1 w-20 bg-[#a0c878] mx-auto"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white rounded-lg overflow-hidden shadow-md"
              onClick={() => window.open(member.link, "_blank")}
            >
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-[#a0c878] font-medium">{member.role}</p>
                <p className="mt-3 text-gray-600">{member.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section 
        className="py-16 bg-gray-900 text-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl font-bold">What Our Customers Say</h2>
            <div className="mt-2 h-1 w-20 bg-[#a0c878] mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              variants={itemVariants}
              className="bg-gray-800 p-6 rounded-lg"
            >
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-300 italic">"GitCook has completely changed how I enjoy food. The quality is amazing, and the delivery is always on time!"</p>
              <p className="mt-4 font-semibold">- Emma S.</p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="bg-gray-800 p-6 rounded-lg"
            >
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-300 italic">"As a busy professional, GitCook saves me so much time. The variety of cuisines available is impressive!"</p>
              <p className="mt-4 font-semibold">- James L.</p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="bg-gray-800 p-6 rounded-lg"
            >
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-300 italic">"The app is so intuitive, and the food recommendations are spot on. It's like having a personal chef!"</p>
              <p className="mt-4 font-semibold">- Sophia R.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Join Us CTA */}
      <motion.section 
        className="py-16 bg-[#a0c878] text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl font-bold"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to Experience GitCook?
          </motion.h2>
          <motion.p 
            className="mt-4 text-xl max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join thousands of food lovers who have discovered a better way to enjoy their favorite meals.
          </motion.p>
          <motion.div 
            className="mt-8"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button onClick={() => navigate("/")} className="bg-white text-green-600 px-8 py-3 rounded-md text-lg font-medium shadow-md hover:bg-gray-100 transition-colors duration-300">
              Order Now
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">GitCook</h3>
              <p className="text-gray-400">Feast at Your Fingertips!</p>
              <p className="text-gray-400 mt-2">Dine Without the Line.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white transition-colors duration-300">Home</a></li>
                <li><a href="/about" className="text-gray-400 hover:text-white transition-colors duration-300">About Us</a></li>
                <li><a href="/" className="text-gray-400 hover:text-white transition-colors duration-300">Menu</a></li>
                <li><a href="/" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400">123 Food Street</p>
              <p className="text-gray-400">Cuisine City, CC 12345</p>
              <p className="text-gray-400 mt-2">info@GitCook.com</p>
              <p className="text-gray-400">(123) 456-7890</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">&copy; 2025 GitCook. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;