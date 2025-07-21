import { motion } from 'framer-motion';
import { User, Car, MapPin, Calendar, Settings, Trophy, Target, Camera, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';

// Mock user data - replace with Supabase data
const userData = {
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  joinDate: '2024-01-01',
  stats: {
    totalSpots: 15,
    thisMonth: 5,
    favoriteMake: 'Tesla',
    locations: 8
  },
  achievements: [
    { id: 1, name: 'First Spot', description: 'Spotted your first car', icon: Target, unlocked: true },
    { id: 2, name: 'Speed Demon', description: 'Spotted 10 sports cars', icon: Car, unlocked: true },
    { id: 3, name: 'Explorer', description: 'Spotted cars in 5 different locations', icon: MapPin, unlocked: true },
    { id: 4, name: 'Photo Pro', description: 'Upload 25 high-quality photos', icon: Camera, unlocked: false },
    { id: 5, name: 'Century Club', description: 'Spot 100 different cars', icon: Trophy, unlocked: false }
  ]
};

const Profile = () => {
  return (
    <Layout>
      <div className="min-h-screen px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Profile
            </h1>
            
            <Button
              variant="outline"
              size="icon"
              className="glass w-12 h-12 rounded-full border-primary/20"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* User Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="card-glass">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.4, delay: 0.3 }}
                  >
                    <Avatar className="w-24 h-24 ring-4 ring-primary/20">
                      <AvatarImage src={userData.avatar} alt={userData.name} />
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl">
                        {userData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-2xl font-bold mb-2">{userData.name}</h2>
                    <p className="text-muted-foreground mb-4">{userData.email}</p>
                    
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        Car Spotter
                      </Badge>
                      <Badge variant="outline" className="border-primary/20">
                        Joined {new Date(userData.joinDate).toLocaleDateString()}
                      </Badge>
                    </div>
                  </div>
                  
                  <Button className="btn-primary">
                    Edit Profile
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              { label: 'Total Spots', value: userData.stats.totalSpots, icon: Car, color: 'text-blue-400' },
              { label: 'This Month', value: userData.stats.thisMonth, icon: Calendar, color: 'text-green-400' },
              { label: 'Locations', value: userData.stats.locations, icon: MapPin, color: 'text-purple-400' },
              { label: 'Favorite Make', value: userData.stats.favoriteMake, icon: Trophy, color: 'text-yellow-400' }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="card-glass text-center"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-primary p-3 mx-auto mb-3`}>
                    <Icon className="w-full h-full text-primary-foreground" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="card-glass">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-6 text-foreground">Achievements</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userData.achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-xl border transition-all ${
                          achievement.unlocked 
                            ? 'bg-gradient-primary/10 border-primary/20' 
                            : 'bg-muted/10 border-muted/20 opacity-60'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-xl p-3 mb-3 ${
                          achievement.unlocked 
                            ? 'bg-gradient-primary' 
                            : 'bg-muted/20'
                        }`}>
                          <Icon className={`w-full h-full ${
                            achievement.unlocked 
                              ? 'text-primary-foreground' 
                              : 'text-muted-foreground'
                          }`} />
                        </div>
                        
                        <h4 className={`font-semibold mb-1 ${
                          achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {achievement.name}
                        </h4>
                        
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
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
              variant="outline"
              className="glass border-primary/20 hover:bg-primary/10 flex-1"
            >
              <Settings className="w-4 h-4 mr-2" />
              Account Settings
            </Button>
            
            <Button
              variant="outline"
              className="glass border-destructive/20 hover:bg-destructive/10 text-destructive flex-1"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;