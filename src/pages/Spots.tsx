import { motion } from 'framer-motion';
import { MapPin, Calendar, Search, Filter, Car, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';

// Mock data - replace with Supabase data
const mockSpots = [
  {
    id: 1,
    make: 'Tesla',
    model: 'Model S',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop',
    location: 'Downtown Seattle',
    date: '2024-01-15',
    confidence: 0.92,
    notes: 'Spotted outside the Space Needle. Beautiful white color!'
  },
  {
    id: 2,
    make: 'Porsche',
    model: '911 Turbo S',
    year: 2022,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop',
    location: 'Beverly Hills',
    date: '2024-01-12',
    confidence: 0.88,
    notes: 'Amazing sound system and performance'
  },
  {
    id: 3,
    make: 'Ferrari',
    model: 'F8 Tributo',
    year: 2021,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop',
    location: 'Miami Beach',
    date: '2024-01-10',
    confidence: 0.95,
    notes: 'Stunning red color, perfect condition'
  }
];

const Spots = () => {
  return (
    <Layout>
      <div className="min-h-screen px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                My Car Spots
              </h1>
              <p className="text-muted-foreground mt-1">
                {mockSpots.length} cars in your collection
              </p>
            </div>
            
            <Button
              className="btn-primary"
              onClick={() => window.location.href = '/scan'}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Spot
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search your spots..."
                className="glass pl-10 border-primary/20"
              />
            </div>
            
            <Button
              variant="outline"
              className="glass border-primary/20 hover:bg-primary/10"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Total Spots', value: mockSpots.length, icon: Car },
            { label: 'This Month', value: '3', icon: Calendar },
            { label: 'Locations', value: '3', icon: MapPin },
            { label: 'Avg Confidence', value: '92%', icon: Filter }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="card-glass text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-primary p-3 mx-auto mb-3">
                  <Icon className="w-full h-full text-primary-foreground" />
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Car Spots Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {mockSpots.map((spot, index) => (
            <motion.div
              key={spot.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group"
            >
              <Card className="card-glass overflow-hidden cursor-pointer">
                {/* Car Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={spot.image}
                    alt={`${spot.year} ${spot.make} ${spot.model}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Confidence Badge */}
                  <Badge 
                    className="absolute top-3 right-3 bg-primary/90 text-primary-foreground"
                  >
                    {Math.round(spot.confidence * 100)}%
                  </Badge>
                  
                  {/* Car Info Overlay */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {spot.year} {spot.make}
                    </h3>
                    <p className="text-sm text-white/80">{spot.model}</p>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 space-y-3">
                  {/* Location and Date */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{spot.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(spot.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Notes */}
                  {spot.notes && (
                    <p className="text-sm text-foreground line-clamp-2">
                      {spot.notes}
                    </p>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {mockSpots.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 rounded-full bg-muted/20 mx-auto mb-6 flex items-center justify-center">
              <Car className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No car spots yet</h3>
            <p className="text-muted-foreground mb-6">
              Start scanning cars to build your collection
            </p>
            <Button
              className="btn-primary"
              onClick={() => window.location.href = '/scan'}
            >
              <Plus className="w-4 h-4 mr-2" />
              Scan Your First Car
            </Button>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Spots;