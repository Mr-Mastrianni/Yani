import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  ratings: { average: number; count: number };
  in_stock: boolean;
  featured: boolean;
  ingredients: string[];
  benefits: string[];
}

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3001/api/products/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-divine-ivory py-12 flex items-center justify-center">
        <p className="text-divine-burgundy">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-divine-ivory py-12 flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-divine-ivory py-12 flex items-center justify-center">
        <p className="text-divine-burgundy">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-divine-ivory py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden md:flex"
        >
          <div className="md:w-1/2">
            <img
              src={product.images[0] || '/public/images/products/default.jpg'}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <h1 className="text-4xl font-divine font-bold text-divine-burgundy mb-4">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-divine-gold mb-4">${product.price.toFixed(2)}</p>

            <div className="flex items-center mb-4">
              <Star className="w-5 h-5 fill-divine-gold text-divine-gold mr-1" />
              <span className="text-divine-burgundy font-medium">{product.ratings.average} ({product.ratings.count} reviews)</span>
            </div>

            <p className="text-divine-burgundy/80 leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="mb-6">
              <h3 className="font-divine font-semibold text-divine-burgundy mb-2">Key Benefits:</h3>
              <div className="flex flex-wrap gap-2">
                {product.benefits.map((benefit, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {benefit}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-divine font-semibold text-divine-burgundy mb-2">Ingredients:</h3>
              <p className="text-divine-burgundy/70 text-sm">{product.ingredients.join(', ')}</p>
            </div>

            <div className="flex items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-divine hover:opacity-90 flex-1"
                disabled={!product.in_stock}
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              <Button variant="outline" size="lg" className="p-3">
                <Heart className="w-5 h-5 text-divine-burgundy" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
