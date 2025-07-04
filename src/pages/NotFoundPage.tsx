import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Heart } from 'lucide-react';
import { Button } from '../components/ui/button';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-divine-ivory via-divine-cream to-divine-soft-pink flex items-center justify-center py-12 px-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8">
            <Heart className="w-24 h-24 text-divine-burgundy/30 mx-auto mb-4" />
            <h1 className="text-6xl font-divine font-bold divine-text-gradient mb-4">
              404
            </h1>
            <h2 className="text-3xl font-divine font-semibold text-divine-burgundy mb-4">
              Sacred Path Not Found
            </h2>
            <p className="text-xl text-divine-burgundy/70 mb-8 max-w-md mx-auto">
              The goddess path you're seeking seems to have wandered into the mystical realm. 
              Let us guide you back to our sacred sanctuary.
            </p>
          </div>
          
          <Button asChild className="bg-gradient-divine hover:opacity-90">
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Return to Sacred Home
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
