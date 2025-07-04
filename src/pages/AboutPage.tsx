import React from 'react';
import { motion } from 'framer-motion';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-divine-ivory py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl font-divine font-bold divine-text-gradient mb-4">
            About Pretty Yani
          </h1>
          <p className="text-divine-burgundy/70">
            Coming soon...
          </p>
        </motion.div>
      </div>
    </div>
  );
}
