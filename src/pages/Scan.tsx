import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CameraCapture from '@/components/CameraCapture';
import CarResult from '@/components/CarResult';
import Layout from '@/components/Layout';

// Mock car recognition function - replace with actual API
const recognizeCar = async (image: string): Promise<any> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Mock response
  return {
    make: 'Tesla',
    model: 'Model S',
    year: 2023,
    confidence: 0.92,
    type: 'Electric Sedan',
    engine: 'Dual Motor',
    horsepower: 670,
    transmission: 'Single-Speed',
    price: '89,990'
  };
};

const Scan = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [carData, setCarData] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageCapture = async (image: string) => {
    setCapturedImage(image);
    setIsAnalyzing(true);
    
    try {
      const result = await recognizeCar(image);
      setCarData(result);
    } catch (error) {
      console.error('Recognition failed:', error);
      // Handle error state
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRetry = () => {
    setCapturedImage(null);
    setCarData(null);
    setIsAnalyzing(false);
  };

  const handleSave = () => {
    // TODO: Implement save to Supabase
    console.log('Saving car to collection...');
  };

  const handleShare = () => {
    // TODO: Implement sharing functionality
    console.log('Sharing car result...');
  };

  return (
    <Layout>
      <div className="min-h-screen px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.history.back()}
            className="glass w-12 h-12 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Car Scanner
          </h1>
          
          <div className="w-12" /> {/* Spacer for center alignment */}
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {!carData ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CameraCapture 
                onImageCapture={handleImageCapture}
                isAnalyzing={isAnalyzing}
              />
              
              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mt-8"
                >
                  <div className="glass rounded-2xl p-6 max-w-md mx-auto">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"
                    />
                    <h3 className="text-lg font-semibold mb-2">Analyzing Vehicle</h3>
                    <p className="text-muted-foreground text-sm">
                      Our AI is identifying the car's make, model, and specifications...
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <CarResult
              image={capturedImage!}
              carData={carData}
              onSave={handleSave}
              onShare={handleShare}
              onRetry={handleRetry}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Scan;