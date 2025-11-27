
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, 
  X, 
  Phone, 
  Settings, 
  Wheat, 
  Package, 
  MapPin, 
  Clock,
  MessageCircle,
  Facebook,
  Instagram,
  Fish
} from 'lucide-react';
import './App.css';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-xl sm:text-2xl font-bold text-ocean">
                TJ FEED & FISHERIES
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-slate-text hover:text-ocean transition">
                Home
              </button>
              <button onClick={() => scrollToSection('services')} className="text-slate-text hover:text-ocean transition">
                Services
              </button>
              <button onClick={() => scrollToSection('facility')} className="text-slate-text hover:text-ocean transition">
                Our Facility
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-slate-text hover:text-ocean transition">
                Contact
              </button>
              <a 
                href="tel:+2348012345678" 
                className="bg-leaf text-white px-6 py-2 rounded-lg font-semibold hover:bg-leaf-dark transition flex items-center gap-2"
              >
                <Phone size={18} />
                Call Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-ocean"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden pb-4"
            >
              <div className="flex flex-col space-y-4">
                <button onClick={() => scrollToSection('home')} className="text-left text-slate-text hover:text-ocean transition">
                  Home
                </button>
                <button onClick={() => scrollToSection('services')} className="text-left text-slate-text hover:text-ocean transition">
                  Services
                </button>
                <button onClick={() => scrollToSection('facility')} className="text-left text-slate-text hover:text-ocean transition">
                  Our Facility
                </button>
                <button onClick={() => scrollToSection('contact')} className="text-left text-slate-text hover:text-ocean transition">
                  Contact
                </button>
                <a 
                  href="tel:+2348012345678" 
                  className="bg-leaf text-white px-6 py-2 rounded-lg font-semibold hover:bg-leaf-dark transition flex items-center gap-2 justify-center"
                >
                  <Phone size={18} />
                  Call Now
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        id="home" 
        className="relative h-screen flex items-center justify-center bg-gradient-to-br from-ocean-light to-ocean pt-16"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1600)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-ocean/80"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 text-shadow"
          >
            Premium Fish Feed Milling & Production in Ilorin
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl text-gray-100 mb-8"
          >
            The Hub for Aquaculture in Ilorin. We offer professional feed milling, raw materials, and fresh catfish sales directly from our ponds.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-leaf text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-leaf-dark transition shadow-lg"
            >
              Get Directions
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-ocean transition shadow-lg"
            >
              View Services
            </button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-ocean mb-6">
                Your Partner in Aquaculture Success
              </h2>
              <p className="text-lg text-slate-text mb-6 leading-relaxed">
                Located in Ilorin, TJ Feed and Fisheries is your full-cycle aquaculture hub—from producing the feed to rearing the fish. We combine industrial capacity with precision. Whether you need raw materials, custom crushing based on your specific formula, ready-made floating feed, or fresh catfish from our ponds, we're equipped to handle your needs.
              </p>
              <div className="inline-block bg-leaf text-white px-6 py-3 rounded-lg font-bold text-xl">
                10+ Tons Daily Capacity
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-96 bg-gray-200 rounded-lg overflow-hidden shadow-xl"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-ocean mb-4">Our Services</h2>
            <p className="text-xl text-slate-text">Comprehensive solutions for your fish farming needs</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Service Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <div className="w-16 h-16 bg-ocean rounded-full flex items-center justify-center mb-6">
                <Settings size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-ocean mb-4">Custom Milling & Grinding</h3>
              <p className="text-slate-text leading-relaxed">
                Bring your resources. Our operators weigh, grind, mix, and pelletize your formula to your exact specifications using industrial-grade machines.
              </p>
            </motion.div>

            {/* Service Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <div className="w-16 h-16 bg-ocean rounded-full flex items-center justify-center mb-6">
                <Wheat size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-ocean mb-4">Raw Material Sales</h3>
              <p className="text-slate-text leading-relaxed">
                Short on ingredients? We stock high-quality Maize, Soya Meal, Groundnut Cake, and Fish Meal available for direct purchase at our warehouse.
              </p>
            </motion.div>

            {/* Service Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <div className="w-16 h-16 bg-ocean rounded-full flex items-center justify-center mb-6">
                <Package size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-ocean mb-4">TJ Brand Feed</h3>
              <p className="text-slate-text leading-relaxed">
                Don't have a formula? Buy our scientifically formulated TJ Brand Fish Feed. Available in Starter (2mm), Grower (4mm), and Finisher sizes.
              </p>
            </motion.div>

            {/* Service Card 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <div className="w-16 h-16 bg-ocean rounded-full flex items-center justify-center mb-6">
                <Fish size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-ocean mb-4">Fresh Catfish Sales</h3>
              <p className="text-slate-text leading-relaxed">
                We rear healthy, fast-growing catfish. Available for purchase: Fingerlings for stocking, Juveniles, Table Size (dried or fresh), and Broodstock.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Facility Gallery Section */}
      <section id="facility" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-ocean mb-4">Our Facility</h2>
            <p className="text-xl text-slate-text">State-of-the-art equipment for premium quality feed</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Grinding Machine', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600' },
              { title: 'The Mixer', img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600' },
              { title: 'The Pelletizer', img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600' },
              { title: 'Finished Feed Bags', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600' },
              { title: 'Concrete Fish Ponds', img: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=600' },
              { title: 'Harvesting Fresh Catfish', img: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=600' },
              { title: 'Loading Bay', img: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600' },
              { title: 'Warehouse Interior', img: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=600' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative h-64 bg-gray-200 rounded-lg overflow-hidden shadow-lg cursor-pointer"
                style={{
                  backgroundImage: `url(${item.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-ocean/40 hover:bg-ocean/20 transition flex items-end">
                  <div className="p-4 text-white font-semibold text-lg">
                    {item.title}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Hours Section */}
      <section id="contact" className="py-20 bg-ocean text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-8">Visit Us Today</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="flex items-center justify-center gap-4">
                <Clock size={32} />
                <div className="text-left">
                  <p className="text-xl font-semibold">Operating Hours</p>
                  <p className="text-gray-200">Monday - Saturday: 8:00 AM - 6:00 PM</p>
                  <p className="text-gray-300 text-sm">(No Milling on Sundays)</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-4">
                <MapPin size={32} />
                <div className="text-left">
                  <p className="text-xl font-semibold">Location</p>
                  <p className="text-gray-200">Oko Erin, Ilorin</p>
                  <p className="text-gray-200">Kwara State, Nigeria</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-300 h-96 rounded-lg overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.1234567890123!2d4.5!3d8.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMzAnMDAuMCJOIDTCsDMwJzAwLjAiRQ!5e0!3m2!1sen!2sng!4v1234567890123!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="TJ Feed & Fisheries Location"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">TJ FEED & FISHERIES</h3>
              <p className="text-gray-400">Premium fish feed solutions for Nigerian farmers</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('home')} className="block text-gray-400 hover:text-white transition">
                  Home
                </button>
                <button onClick={() => scrollToSection('services')} className="block text-gray-400 hover:text-white transition">
                  Services
                </button>
                <button onClick={() => scrollToSection('contact')} className="block text-gray-400 hover:text-white transition">
                  Contact
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex gap-4">
                <a href="https://wa.me/2348012345678" className="w-10 h-10 bg-leaf rounded-full flex items-center justify-center hover:bg-leaf-dark transition">
                  <MessageCircle size={20} />
                </a>
                <a href="https://instagram.com" className="w-10 h-10 bg-leaf rounded-full flex items-center justify-center hover:bg-leaf-dark transition">
                  <Instagram size={20} />
                </a>
                <a href="https://facebook.com" className="w-10 h-10 bg-leaf rounded-full flex items-center justify-center hover:bg-leaf-dark transition">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p className="mb-2">© 2025 TJ Feed and Fisheries. All rights reserved.</p>
            <p className="text-sm">Website Developed by ~mifimn (SIWES Project)</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/2348012345678"
        className="fixed bottom-8 right-8 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all hover:scale-110 z-50"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={32} className="text-white" />
      </a>
    </div>
  );
}
