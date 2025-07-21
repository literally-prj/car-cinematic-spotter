import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, X, RotateCcw, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CameraCaptureProps {
  onImageCapture: (image: string) => void;
  isAnalyzing?: boolean;
}

const CameraCapture = ({ onImageCapture, isAnalyzing = false }: CameraCaptureProps) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      
      setStream(mediaStream);
      setIsActive(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError('Camera access denied. Please enable camera permissions.');
      console.error('Camera error:', err);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsActive(false);
    }
  }, [stream]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    ctx.drawImage(video, 0, 0);
    
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    setCapturedImage(imageData);
    stopCamera();
    onImageCapture(imageData);
  }, [onImageCapture, stopCamera]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setCapturedImage(result);
      onImageCapture(result);
    };
    reader.readAsDataURL(file);
  }, [onImageCapture]);

  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    startCamera();
  }, [startCamera]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="card-glass overflow-hidden">
        <div className="relative aspect-[4/3] bg-muted/20 rounded-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            {!isActive && !capturedImage && (
              <motion.div
                key="start-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.4 }}
                  className="w-20 h-20 rounded-full bg-gradient-primary p-4 mb-6 shadow-primary"
                >
                  <Camera className="w-full h-full text-primary-foreground" />
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-2 text-foreground">
                  Ready to Scan?
                </h3>
                <p className="text-muted-foreground mb-8">
                  Take a photo or upload an image to identify any car
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                  <Button
                    onClick={startCamera}
                    className="btn-primary flex-1"
                    disabled={isAnalyzing}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Open Camera
                  </Button>
                  
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="glass border-primary/20 hover:bg-primary/10 flex-1"
                    disabled={isAnalyzing}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-destructive text-sm mt-4"
                  >
                    {error}
                  </motion.p>
                )}
              </motion.div>
            )}

            {isActive && (
              <motion.div
                key="camera-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                
                {/* Scan Line Animation */}
                <div className="absolute inset-0 pointer-events-none">
                  <motion.div
                    className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent scan-line"
                    initial={{ y: 0 }}
                    animate={{ y: "100%" }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>

                {/* Camera Controls */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                  <Button
                    onClick={stopCamera}
                    variant="outline"
                    size="icon"
                    className="glass w-12 h-12 rounded-full border-white/20"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={capturePhoto}
                    className="w-16 h-16 rounded-full bg-gradient-primary shadow-primary flex items-center justify-center"
                    disabled={isAnalyzing}
                  >
                    <Camera className="w-8 h-8 text-primary-foreground" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {capturedImage && (
              <motion.div
                key="captured-image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                <img
                  src={capturedImage}
                  alt="Captured car"
                  className="w-full h-full object-cover"
                />

                {/* Analysis Overlay */}
                {isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"
                      />
                      <p className="text-white font-medium">Analyzing car...</p>
                    </div>
                  </motion.div>
                )}

                {/* Retake Button */}
                {!isAnalyzing && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <Button
                      onClick={retakePhoto}
                      className="btn-secondary"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Retake Photo
                    </Button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <canvas ref={canvasRef} className="hidden" />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </Card>
    </div>
  );
};

export default CameraCapture;