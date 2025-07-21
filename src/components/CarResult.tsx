import { motion } from 'framer-motion';
import { Car, Calendar, MapPin, Save, Share, Star, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CarData {
  make: string;
  model: string;
  year: number;
  confidence: number;
  type: string;
  engine?: string;
  horsepower?: number;
  transmission?: string;
  price?: string;
}

interface CarResultProps {
  image: string;
  carData: CarData;
  onSave?: () => void;
  onShare?: () => void;
  onRetry?: () => void;
}

const CarResult = ({ image, carData, onSave, onShare, onRetry }: CarResultProps) => {
  const confidenceColor = carData.confidence >= 0.8 ? 'text-green-400' : 
                          carData.confidence >= 0.6 ? 'text-yellow-400' : 'text-red-400';

  const specs = [
    { label: 'Type', value: carData.type, icon: Car },
    { label: 'Engine', value: carData.engine, icon: Info },
    { label: 'Power', value: carData.horsepower ? `${carData.horsepower} HP` : undefined, icon: Star },
    { label: 'Transmission', value: carData.transmission, icon: Info },
  ].filter(spec => spec.value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto space-y-6"
    >
      {/* Result Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.4, delay: 0.3 }}
          className="w-16 h-16 rounded-full bg-gradient-primary mx-auto mb-4 p-4 shadow-primary"
        >
          <Car className="w-full h-full text-primary-foreground" />
        </motion.div>
        
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Car Identified!
        </h2>
        
        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="text-muted-foreground">Confidence:</span>
          <span className={`font-bold ${confidenceColor}`}>
            {Math.round(carData.confidence * 100)}%
          </span>
        </div>
      </motion.div>

      {/* Car Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="card-glass overflow-hidden">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <img
              src={image}
              alt="Identified car"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            {/* Car Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-2xl font-bold text-white mb-1">
                {carData.year} {carData.make} {carData.model}
              </h3>
              {carData.price && (
                <Badge variant="secondary" className="bg-white/20 text-white">
                  Est. ${carData.price}
                </Badge>
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Car Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="card-glass">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Vehicle Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {specs.map((spec, index) => {
                const Icon = spec.icon;
                return (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-primary p-2">
                      <Icon className="w-full h-full text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{spec.label}</p>
                      <p className="font-medium text-foreground">{spec.value}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Button
          onClick={onSave}
          className="btn-primary flex-1"
        >
          <Save className="w-4 h-4 mr-2" />
          Save to Collection
        </Button>
        
        <Button
          onClick={onShare}
          variant="outline"
          className="glass border-primary/20 hover:bg-primary/10 flex-1"
        >
          <Share className="w-4 h-4 mr-2" />
          Share Result
        </Button>
      </motion.div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center"
      >
        <p className="text-sm text-muted-foreground mb-4">
          Spotted at <MapPin className="w-4 h-4 inline mx-1" /> Current Location
        </p>
        
        <Button
          onClick={onRetry}
          variant="ghost"
          className="text-muted-foreground hover:text-foreground"
        >
          Try Another Photo
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default CarResult;