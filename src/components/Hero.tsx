import { motion } from 'framer-motion';
import { Camera, Zap, MapPin, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-car.jpg';

const Hero = () => {
  const features = [
    {
      icon: Camera,
      title: 'Instant Recognition',
      description: 'Snap a photo and get car details in seconds'
    },
    {
      icon: Zap,
      title: 'AI-Powered',
      description: 'Advanced machine learning for accurate results'
    },
    {
      icon: MapPin,
      title: 'Location Tracking',
      description: 'Save where you spotted each car'
    },
    {
      icon: Share2,
      title: 'Social Sharing',
      description: 'Share your amazing car spots with friends'
    }
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Hero Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Hero car" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background/90" />
      </div>
      
      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center max-w-4xl mx-auto"
      >
        {/* Logo/Brand */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.4, duration: 1 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-primary p-6 shadow-primary">
            <Camera className="w-full h-full text-primary-foreground" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent"
        >
          CarSpotter
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed"
        >
          Discover, identify, and collect cars with the power of AI.
          <br />
          Your ultimate car spotting companion.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button
            size="lg"
            className="btn-primary text-lg px-8 py-6 rounded-2xl"
            onClick={() => window.location.href = '/scan'}
          >
            <Camera className="w-5 h-5 mr-2" />
            Start Scanning
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="glass text-lg px-8 py-6 rounded-2xl border-primary/20 hover:bg-primary/10"
          >
            View Demo
          </Button>
        </motion.div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="card-glass text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-primary p-4 shadow-primary group-hover:shadow-primary">
                <Icon className="w-full h-full text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.4, delay: 1.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fab flex items-center justify-center pulse-glow"
        onClick={() => window.location.href = '/scan'}
      >
        <Camera className="w-8 h-8 text-primary-foreground" />
      </motion.button>
    </div>
  );
};

export default Hero;