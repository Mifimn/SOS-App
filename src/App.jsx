import React, { useState, useEffect } from 'react';
import { 
  Phone, Menu, X, CheckCircle, Shield, Bug, SprayCan, 
  Mouse, Home, MapPin, Mail, ChevronDown, Star, 
  ArrowRight, Play, MessageCircle, Info, Quote 
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// --- Assets & Data ---

// REBRANDED: Professional FOF Logo
const LOGO = (
  <svg width="160" height="45" viewBox="0 0 160 45" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Abstract Shield/Fume Icon */}
    <path d="M25 5L10 15V25C10 35 18 42 25 45C32 42 40 35 40 25V15L25 5Z" fill="#DC2626" fillOpacity="0.1" stroke="#DC2626" strokeWidth="2"/>
    <path d="M25 15V35M18 25H32" stroke="#DC2626" strokeWidth="2" strokeLinecap="round"/>
    
    {/* Text */}
    <text x="50" y="28" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="26" fill="#111827" letterSpacing="-1">FOF</text>
    <text x="50" y="40" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="9" fill="#DC2626" letterSpacing="1" style={{textTransform: 'uppercase'}}>Fumigation Service</text>
  </svg>
);

const SERVICES = [
  {
    id: 1,
    title: "Termite Defense",
    desc: "Subterranean termite elimination using non-invasive baiting systems.",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=600",
    icon: <Bug className="w-6 h-6" />
  },
  {
    id: 2,
    title: "Rodent Control",
    desc: "Complete exclusion services to seal entry points and remove nests.",
    image: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?auto=format&fit=crop&q=80&w=600",
    icon: <Mouse className="w-6 h-6" />
  },
  {
    id: 3,
    title: "Viral Disinfection",
    desc: "Hospital-grade misting to neutralize 99.9% of bacteria and viruses.",
    image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&q=80&w=600",
    icon: <SprayCan className="w-6 h-6" />
  },
  {
    id: 4,
    title: "Bed Bug Heat",
    desc: "Chemical-free thermal remediation. One treatment, zero bugs.",
    image: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&q=80&w=600",
    icon: <Home className="w-6 h-6" />
  }
];

const PEST_LIBRARY = [
  { name: "Termites", risk: "Structural Damage", img: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=400" },
  { name: "Cockroaches", risk: "Disease Vector", img: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=400" },
  { name: "Rodents", risk: "Fire Hazard", img: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?auto=format&fit=crop&q=80&w=400" },
  { name: "Mosquitoes", risk: "Malaria Risk", img: "https://images.unsplash.com/photo-1595434091143-b375ced5fe5c?auto=format&fit=crop&q=80&w=400" },
  { name: "Ants", risk: "Food Contamination", img: "https://images.unsplash.com/photo-1530023367847-a683933f4172?auto=format&fit=crop&q=80&w=400" },
];

const REVIEWS = [
  { 
    name: "Mr. Adebayo", 
    role: "Hotel Manager", 
    text: "FOF saved our business license. The cockroach infestation was gone in 48 hours.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  { 
    name: "Mrs. Okonjo", 
    role: "Homeowner", 
    text: "Professional, discreet, and very effective. I haven't seen a single rat since FOF visited.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" 
  },
  { 
    name: "Engr. David", 
    role: "Real Estate Dev", 
    text: "We use FOF for all our pre-construction termite treatments. Zero complaints.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200" 
  },
];

const AnimatedCounter = ({ value, label }) => (
  <div className="text-center group">
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-extrabold text-red-600 mb-2 group-hover:scale-110 transition-transform"
    >
      {value}
    </motion.div>
    <div className="text-gray-500 text-sm uppercase tracking-widest font-semibold">{label}</div>
  </div>
);

const FloatingWhatsApp = () => (
  <motion.a
    href="https://wa.me/2348012345678"
    target="_blank"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    whileHover={{ scale: 1.1 }}
    className="fixed bottom-8 right-8 z-50 bg-red-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors border-4 border-white"
  >
    <MessageCircle size={28} />
  </motion.a>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans text-gray-900 bg-white overflow-x-hidden selection:bg-red-600 selection:text-white">
      <FloatingWhatsApp />

      {/* Navigation */}
      <motion.nav 
        className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'}`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="cursor-pointer">{LOGO}</div>
          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Services', 'Process', 'Reviews'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className={`text-sm font-bold uppercase tracking-wide hover:text-red-600 transition-colors ${isScrolled ? 'text-gray-800' : 'text-white'}`}>{item}</a>
            ))}
            <button className="bg-red-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-red-600/30 hover:bg-red-700 hover:scale-105 transition-all">Get Quote</button>
          </div>
          <button className="md:hidden z-50 text-red-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            className="fixed inset-0 bg-white z-30 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['Home', 'Services', 'Process', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-gray-900">{item}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center overflow-hidden bg-black">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1920" 
            alt="Pest Control" 
            className="w-full h-full object-cover opacity-60 grayscale" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-red-950/50" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center mt-16">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="text-white space-y-6">
            <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 rounded-full px-4 py-1.5 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-sm font-medium text-red-100">FOF Emergency Response Team</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-tight tracking-tight">
              Total <span className="text-red-600">Pest</span> <br /> Elimination.
            </h1>
            <p className="text-lg text-gray-300 max-w-xl">
              Professional, discreet, and effective fumigation solutions for homes and businesses in Nigeria. FOF ensures a pest-free environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors">
                Start Treatment <ArrowRight size={20} />
              </button>
              <button className="border-2 border-gray-600 text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-colors">
                <Play size={20} fill="currentColor" /> Our Process
              </button>
            </div>
          </motion.div>

          {/* Quote Form */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block bg-gray-900/80 backdrop-blur-xl border border-red-500/20 p-8 rounded-2xl shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-2">Get a Fast Quote</h3>
            <p className="text-gray-400 text-sm mb-6">Stop the infestation before it spreads.</p>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Name" className="bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-red-600 outline-none transition-colors" />
                <input type="tel" placeholder="Phone" className="bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-red-600 outline-none transition-colors" />
              </div>
              <select className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-red-600 outline-none">
                <option>Select Pest Issue...</option>
                <option>Termites</option>
                <option>Rodents</option>
                <option>General Fumigation</option>
              </select>
              <button className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-red-600 hover:text-white transition-colors shadow-lg">
                Request Callback
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-red-600 font-bold uppercase tracking-wider text-sm">Services</span>
            <h2 className="text-4xl font-black text-gray-900 mt-2">Targeted Solutions</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer bg-gray-900"
              >
                <img src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-6 text-white transform transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-4">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us with Image */}
      <section id="process" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
              >
                <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800" alt="Worker" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" />
              </motion.div>
              <div className="absolute -bottom-6 -right-6 z-20 bg-red-600 text-white p-8 rounded-xl shadow-xl hidden md:block">
                <Shield size={32} className="mb-2" />
                <p className="font-bold text-2xl">100%</p>
                <p className="text-sm font-medium">Safe & Certified</p>
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-gray-900">Modern Science. <span className="text-red-600">Total Safety.</span></h2>
              <p className="text-lg text-gray-600">FOF uses integrated pest management (IPM) techniques to eliminate pests safely, protecting your family, pets, and the environment.</p>
              <div className="grid gap-6">
                {[
                  { title: "Rapid Response", desc: "Same-day service for emergencies." },
                  { title: "Licensed Experts", desc: "Background-checked and certified team." },
                  { title: "Satisfaction Guarantee", desc: "If pests return, so do we. For free." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="bg-red-100 p-2 rounded-lg text-red-600"><CheckCircle size={20} /></div>
                    <div>
                      <h4 className="font-bold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pest Library */}
      <section className="py-24 bg-gray-950 text-white overflow-hidden">
        <div className="container mx-auto px-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Identify Your <span className="text-red-600">Threat</span></h2>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-12 px-6 no-scrollbar snap-x">
          {PEST_LIBRARY.map((pest, i) => (
            <div key={i} className="flex-shrink-0 w-72 bg-gray-900 rounded-xl overflow-hidden border border-gray-800 group hover:border-red-600 transition-colors">
              <div className="h-48 overflow-hidden relative">
                <img src={pest.img} alt={pest.name} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold mb-1">{pest.name}</h4>
                <div className="flex items-center gap-2 text-red-500 text-sm font-medium"><Info size={14} /> Risk: {pest.risk}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials with Images */}
      <section id="reviews" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
             <Star className="w-10 h-10 text-red-500 mx-auto mb-4 fill-current" />
             <h2 className="text-4xl font-bold text-gray-900">Client Stories</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((review, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all"
              >
                <Quote className="text-red-200 mb-4" size={40} />
                <p className="text-gray-600 mb-6 italic leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover border-2 border-red-200" />
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                    <p className="text-red-500 text-sm font-medium">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with Background Image */}
      <section id="contact" className="relative py-24 bg-black flex items-center">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=1920" alt="Office" className="w-full h-full object-cover opacity-30 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-l from-black via-black/90 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-end">
          <div className="md:w-1/2 bg-white/10 backdrop-blur-md p-10 rounded-2xl border border-white/10 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6">Start Your Pest-Free Life</h2>
            <div className="space-y-6 text-gray-300 mb-8">
              <div className="flex items-center gap-4"><Phone className="text-red-500" /> <span>+234 80 1234 5678</span></div>
              <div className="flex items-center gap-4"><Mail className="text-red-500" /> <span>hello@fofservice.com</span></div>
              <div className="flex items-center gap-4"><MapPin className="text-red-500" /> <span>123 Ikeja Way, Lagos</span></div>
            </div>
            <button className="w-full bg-red-600 text-white font-bold py-4 rounded-lg hover:bg-red-700 transition-colors">
              Schedule Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-500 py-12 border-t border-gray-900">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="opacity-75 grayscale hover:grayscale-0 transition-all">{LOGO}</div>
          <div className="text-sm">© {new Date().getFullYear()} FOF Fumigation Service.</div>
          <div className="flex gap-4">
            {[1,2,3].map(i => <div key={i} className="w-8 h-8 bg-gray-900 rounded-full hover:bg-red-600 transition-colors cursor-pointer" />)}
          </div>
        </div>
      </footer>
    </div>
  );
}