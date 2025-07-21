import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { MapPin, Calendar, Search, Filter, Car, Plus, Eye, Heart, Share2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Car3DShowcase from './Car3DShowcase';
// import * as anime from 'animejs';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Mock data with more stunning examples
const mockSpots = [
  {
    id: 1,
    make: 'Tesla',
    model: 'Cybertruck',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1617654112329-3285c7b83acd?w=800&h=600&fit=crop',
    location: 'Silicon Valley',
    date: '2024-01-15',
    confidence: 0.98,
    notes: 'First Cybertruck spotted in the wild! The angular design is absolutely mind-blowing.',
    rarity: 'legendary',
    views: 1247,
    likes: 324
  },
  {
    id: 2,
    make: 'McLaren',
    model: 'P1',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop',
    location: 'Monaco',
    date: '2024-01-12',
    confidence: 0.94,
    notes: 'Hybrid supercar with butterfly doors. The sound is otherworldly.',
    rarity: 'epic',
    views: 892,
    likes: 156
  },
  {
    id: 3,
    make: 'Koenigsegg',
    model: 'Regera',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop',
    location: 'Beverly Hills',
    date: '2024-01-10',
    confidence: 0.96,
    notes: 'Direct drive transmission. Engineering perfection.',
    rarity: 'legendary',
    views: 2341,
    likes: 567
  },
  {
    id: 4,
    make: 'Bugatti',
    model: 'Chiron',
    year: 2022,
    image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=600&fit=crop',
    location: 'Dubai',
    date: '2024-01-08',
    confidence: 0.99,
    notes: '1500hp of pure luxury. The attention to detail is insane.',
    rarity: 'legendary',
    views: 3456,
    likes: 892
  },
  {
    id: 5,
    make: 'Lamborghini',
    model: 'Revuelto',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=800&h=600&fit=crop',
    location: 'Los Angeles',
    date: '2024-01-05',
    confidence: 0.93,
    notes: 'First V12 hybrid Lambo. The future of supercars.',
    rarity: 'epic',
    views: 1876,
    likes: 423
  },
  {
    id: 6,
    make: 'Porsche',
    model: '918 Spyder',
    year: 2021,
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=600&fit=crop',
    location: 'Nürburgring',
    date: '2024-01-03',
    confidence: 0.91,
    notes: 'Holy trinity member. Track-focused hybrid perfection.',
    rarity: 'epic',
    views: 1234,
    likes: 298
  }
];

const rarityColors = {
  common: 'from-slate-500 to-slate-600',
  rare: 'from-blue-500 to-blue-600',
  epic: 'from-purple-500 to-purple-600',
  legendary: 'from-yellow-400 to-orange-500'
};

const StunningSpots = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('all');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // GSAP Scroll-triggered animations
  useEffect(() => {
    if (!containerRef.current) return;

    // Header parallax effect
    gsap.fromTo(headerRef.current, 
      { y: 0 },
      {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      }
    );

    // Stats cards stagger animation
    gsap.fromTo(statsRef.current?.children || [], 
      { 
        y: 100, 
        opacity: 0,
        scale: 0.8 
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Grid cards reveal animation
    gsap.fromTo(gridRef.current?.children || [], 
      { 
        y: 150, 
        opacity: 0,
        rotationX: 45,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        scale: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Enhanced micro-interactions with CSS
  const handleButtonHover = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget;
    target.style.transform = 'scale(1.05)';
    setTimeout(() => {
      target.style.transform = 'scale(1)';
    }, 150);
  };

  const handleCardClick = (cardId: number) => {
    const card = document.querySelector(`[data-card-id="${cardId}"]`) as HTMLElement;
    if (card) {
      card.style.transform = 'scale(0.95)';
      setTimeout(() => {
        card.style.transform = 'scale(1)';
      }, 100);
    }
  };

  const filteredSpots = mockSpots.filter(spot => {
    const matchesSearch = spot.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         spot.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRarity = selectedRarity === 'all' || spot.rarity === selectedRarity;
    return matchesSearch && matchesRarity;
  });

  const totalStats = {
    spots: mockSpots.length,
    thisMonth: mockSpots.filter(spot => new Date(spot.date) > new Date('2024-01-01')).length,
    locations: new Set(mockSpots.map(spot => spot.location)).size,
    avgConfidence: Math.round(mockSpots.reduce((acc, spot) => acc + spot.confidence, 0) / mockSpots.length * 100)
  };

  return (
    <Layout>
      <div ref={containerRef} className="min-h-screen px-4 py-8 relative">
        {/* Stunning animated background */}
        <div className="fixed inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur-3xl floating" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full blur-3xl floating" style={{ animationDelay: '3s' }} />
        </div>

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 relative z-10"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <motion.h1 
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent glow-text"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Sparkles className="inline w-8 h-8 mr-3 text-primary" />
                My Car Spots
              </motion.h1>
              <motion.p 
                className="text-muted-foreground mt-2 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {mockSpots.length} legendary machines in your collection
              </motion.p>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                className="btn-primary pulse-glow"
                onClick={() => window.location.href = '/scan'}
                onMouseEnter={handleButtonHover}
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Spot
              </Button>
            </motion.div>
          </div>

          {/* Search and Filter */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary z-10" />
              <Input
                placeholder="Search your legendary spots..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="glass pl-12 h-14 border-primary/30 text-lg neon-border"
              />
            </div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="glass border-primary/30 hover:bg-primary/20 h-14 px-6"
                onMouseEnter={handleButtonHover}
              >
                <Filter className="w-5 h-5 mr-2" />
                Filter by Rarity
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {[
            { label: 'Total Spots', value: totalStats.spots, icon: Car, gradient: 'from-blue-500 to-blue-600' },
            { label: 'This Month', value: totalStats.thisMonth, icon: Calendar, gradient: 'from-green-500 to-green-600' },
            { label: 'Locations', value: totalStats.locations, icon: MapPin, gradient: 'from-purple-500 to-purple-600' },
            { label: 'Avg Confidence', value: `${totalStats.avgConfidence}%`, icon: Sparkles, gradient: 'from-yellow-500 to-orange-500' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  rotateY: 5 
                }}
                className="card-glass text-center relative overflow-hidden parallax-container"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.gradient} p-4 mx-auto mb-4 shadow-2xl`}>
                  <Icon className="w-full h-full text-white" />
                </div>
                <motion.p 
                  className="text-3xl font-bold text-foreground glow-text"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, type: "spring", bounce: 0.5 }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Car Spots Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            ref={gridRef}
            key={searchTerm + selectedRarity}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredSpots.map((spot, index) => (
              <motion.div
                key={spot.id}
                data-card-id={spot.id}
                layout
                initial={{ opacity: 0, y: 100, rotateX: 45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -100, rotateX: -45 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  type: "spring",
                  bounce: 0.3
                }}
                whileHover={{ 
                  scale: 1.03, 
                  y: -10,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                onMouseEnter={() => setHoveredCard(spot.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleCardClick(spot.id)}
                className="group cursor-pointer"
              >
                <Card className="card-glass overflow-hidden border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-2xl">
                  {/* Car Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <motion.img
                      src={spot.image}
                      alt={`${spot.year} ${spot.make} ${spot.model}`}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    
                    {/* Animated overlay */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
                      initial={{ opacity: 0.6 }}
                      whileHover={{ opacity: 0.8 }}
                    />
                    
                    {/* Rarity badge */}
                    <motion.div
                      className="absolute top-4 right-4"
                      initial={{ scale: 0, rotate: 180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, type: "spring", bounce: 0.6 }}
                    >
                      <Badge className={`bg-gradient-to-r ${rarityColors[spot.rarity as keyof typeof rarityColors]} text-white border-0 px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-lg`}>
                        {spot.rarity}
                      </Badge>
                    </motion.div>
                    
                    {/* Confidence badge */}
                    <motion.div
                      className="absolute top-4 left-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1, type: "spring", bounce: 0.6 }}
                    >
                      <Badge className="bg-primary/90 text-primary-foreground border-0 px-3 py-1 text-xs font-bold shadow-lg">
                        {Math.round(spot.confidence * 100)}% AI
                      </Badge>
                    </motion.div>
                    
                    {/* Car Info Overlay */}
                    <motion.div 
                      className="absolute bottom-4 left-4 right-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <h3 className="text-xl font-bold text-white mb-1 glow-text">
                        {spot.year} {spot.make}
                      </h3>
                      <p className="text-sm text-white/90 font-medium">{spot.model}</p>
                    </motion.div>

                    {/* Hover stats overlay */}
                    <AnimatePresence>
                      {hoveredCard === spot.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-2"
                        >
                          <div className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 text-white text-xs">
                            <Eye className="w-3 h-3" />
                            {spot.views}
                          </div>
                          <div className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 text-white text-xs">
                            <Heart className="w-3 h-3" />
                            {spot.likes}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Card Content */}
                  <motion.div 
                    className="p-6 space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {/* Location and Date */}
                    <div className="flex items-center justify-between text-sm">
                      <motion.div 
                        className="flex items-center gap-2 text-primary"
                        whileHover={{ scale: 1.05 }}
                      >
                        <MapPin className="w-4 h-4" />
                        <span className="font-medium">{spot.location}</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center gap-2 text-muted-foreground"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(spot.date).toLocaleDateString()}</span>
                      </motion.div>
                    </div>

                    {/* Notes */}
                    {spot.notes && (
                      <motion.p 
                        className="text-sm text-foreground/80 line-clamp-2 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                      >
                        {spot.notes}
                      </motion.p>
                    )}

                    {/* Action buttons */}
                    <motion.div 
                      className="flex gap-2 pt-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex-1 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 rounded-xl py-2 px-4 text-sm font-medium transition-all duration-300"
                      >
                        View Details
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-secondary/20 hover:bg-secondary/30 text-secondary border border-secondary/30 rounded-xl p-2 transition-all duration-300"
                      >
                        <Share2 className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* 3D Car Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 mb-8"
        >
          <Car3DShowcase />
        </motion.div>

        {/* Empty State */}
        {filteredSpots.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            className="text-center py-16"
          >
            <motion.div 
              className="w-32 h-32 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 mx-auto mb-8 flex items-center justify-center floating"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Car className="w-16 h-16 text-primary" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-4 glow-text">No spots found</h3>
            <p className="text-muted-foreground mb-8 text-lg">
              Try adjusting your search or scan some legendary cars
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="btn-primary text-lg px-8 py-4"
                onClick={() => window.location.href = '/scan'}
              >
                <Plus className="w-5 h-5 mr-2" />
                Start Your Collection
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Stunning FAB with enhanced effects */}
        <motion.button
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", bounce: 0.5, delay: 2 }}
          whileHover={{ 
            scale: 1.1, 
            rotate: 5,
            boxShadow: "0 0 30px rgba(59, 130, 246, 0.6)"
          }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary shadow-2xl border-2 border-primary/30 flex items-center justify-center z-50 pulse-glow"
          onClick={() => window.location.href = '/scan'}
        >
          <Plus className="w-8 h-8 text-white" />
          
          {/* Ripple effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/50"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        </motion.button>
      </div>
    </Layout>
  );
};

export default StunningSpots;