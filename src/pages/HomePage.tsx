import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Heart, Sparkles, Moon, Flower } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { mockProducts, mockBlogPosts } from '../data/mockData';

export function HomePage() {
  const featuredProducts = mockProducts.filter(product => product.featured);
  const latestPosts = mockBlogPosts.slice(0, 3);

  const features = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Sacred Self-Care",
      description: "Nurture your divine feminine essence with products crafted for your sacred temple"
    },
    {
      icon: <Moon className="w-8 h-8" />,
      title: "Moon Cycle Support",
      description: "Honor your natural rhythms with rituals and care aligned to your lunar cycles"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Goddess Community",
      description: "Connect with sisters on their wellness journey in our supportive sacred circle"
    },
    {
      icon: <Flower className="w-8 h-8" />,
      title: "Natural Wellness",
      description: "Pure, organic ingredients that honor your body's wisdom and natural healing"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      text: "Pretty Yani has transformed my self-care routine into a sacred ritual. I feel more connected to my feminine power than ever.",
      rating: 5,
      archetype: "Mystic Goddess"
    },
    {
      name: "Luna R.",
      text: "The yoni steaming experience was life-changing. I finally found products that truly understand women's needs.",
      rating: 5,
      archetype: "Healer Goddess"
    },
    {
      name: "Maya K.",
      text: "Being part of this community has helped me embrace my divine feminine journey with confidence and joy.",
      rating: 5,
      archetype: "Wild Goddess"
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-divine-ivory via-divine-cream to-divine-soft-pink">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-divine-rose-gold/20 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-divine-gold/20 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-divine-mystic-purple/20 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Sacred Symbol */}
            <motion.div 
              className="mx-auto mb-8 w-20 h-20 bg-gradient-divine rounded-full flex items-center justify-center animate-portal"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <Heart className="w-10 h-10 text-divine-ivory fill-current" />
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-divine font-bold mb-6 divine-text-gradient"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Embrace Your
              <br />
              Divine Feminine
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl text-divine-burgundy/80 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Sacred wellness products crafted for your divine feminine journey. 
              Honor your body, celebrate your cycles, and join a community of goddesses.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <Button asChild size="lg" className="bg-gradient-divine hover:opacity-90 text-lg px-8 py-6">
                <Link to="/products">
                  Explore Sacred Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-divine-burgundy text-divine-burgundy hover:bg-divine-burgundy hover:text-divine-ivory text-lg px-8 py-6">
                <Link to="/forum">
                  Join Our Circle
                </Link>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="mt-12 flex flex-wrap items-center justify-center gap-6 text-divine-burgundy/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-divine-gold text-divine-gold" />
                  ))}
                </div>
                <span className="text-sm">4.9/5 from 2,847 goddesses</span>
              </div>
              <div className="text-sm">✨ Organic & Natural</div>
              <div className="text-sm">🌙 Moon-Cycle Aligned</div>
              <div className="text-sm">💕 Community Supported</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-divine-ivory">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-divine font-bold mb-6 divine-text-gradient">
              Your Sacred Wellness Journey
            </h2>
            <p className="text-xl text-divine-burgundy/70 max-w-2xl mx-auto">
              Discover products and practices designed to honor your divine feminine essence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center border-divine-rose-gold/20 hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2 bg-divine-ivory">
                  <CardContent className="p-8">
                    <div className="mx-auto mb-4 w-16 h-16 bg-gradient-divine rounded-full flex items-center justify-center text-divine-ivory">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-divine font-semibold mb-3 text-divine-burgundy">
                      {feature.title}
                    </h3>
                    <p className="text-divine-burgundy/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gradient-to-br from-divine-cream to-divine-soft-pink">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-divine font-bold mb-6 divine-text-gradient">
              Sacred Product Collection
            </h2>
            <p className="text-xl text-divine-burgundy/70 max-w-2xl mx-auto">
              Carefully crafted with organic ingredients to support your divine feminine wellness
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group overflow-hidden border-divine-rose-gold/20 hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2 bg-divine-ivory">
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-divine-burgundy text-divine-ivory">
                        Featured
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-1 bg-divine-ivory/90 rounded-full px-2 py-1">
                        <Star className="w-3 h-3 fill-divine-gold text-divine-gold" />
                        <span className="text-xs font-medium">{product.ratings.average}</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-divine font-semibold mb-2 text-divine-burgundy">
                      {product.name}
                    </h3>
                    <p className="text-divine-burgundy/70 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-divine-burgundy">
                        ${product.price}
                      </span>
                      <Button asChild className="bg-gradient-divine hover:opacity-90">
                        <Link to={`/products/${product.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Button asChild size="lg" variant="outline" className="border-divine-burgundy text-divine-burgundy hover:bg-divine-burgundy hover:text-divine-ivory">
              <Link to="/products">
                View All Sacred Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-divine-ivory">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-divine font-bold mb-6 divine-text-gradient">
              Goddess Testimonials
            </h2>
            <p className="text-xl text-divine-burgundy/70 max-w-2xl mx-auto">
              Hear from our sacred sisterhood about their transformative wellness journeys
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-divine-rose-gold/20 hover:shadow-lg transition-all duration-300 bg-divine-ivory">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-divine-gold text-divine-gold" />
                      ))}
                    </div>
                    <p className="text-divine-burgundy/80 mb-6 italic leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div>
                      <p className="font-semibold text-divine-burgundy">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-divine-burgundy/60">
                        {testimonial.archetype}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 bg-gradient-to-br from-divine-soft-pink to-divine-cream">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-divine font-bold mb-6 divine-text-gradient">
              Wisdom & Wellness
            </h2>
            <p className="text-xl text-divine-burgundy/70 max-w-2xl mx-auto">
              Discover sacred knowledge to support your divine feminine journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group overflow-hidden border-divine-rose-gold/20 hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2 bg-divine-ivory">
                  <div className="relative overflow-hidden">
                    <img 
                      src={post.featured_image} 
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-divine-mystic-purple text-divine-ivory">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-divine font-semibold mb-3 text-divine-burgundy group-hover:text-divine-gold transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-divine-burgundy/70 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-divine-burgundy/60">
                      <span>{post.reading_time} min read</span>
                      <span>{post.likes} ♥</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Button asChild size="lg" variant="outline" className="border-divine-burgundy text-divine-burgundy hover:bg-divine-burgundy hover:text-divine-ivory">
              <Link to="/blog">
                Explore All Wisdom
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-divine">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-divine font-bold mb-6 text-divine-ivory">
              Join Our Sacred Circle
            </h2>
            <p className="text-xl text-divine-ivory/90 mb-8 max-w-2xl mx-auto">
              Begin your divine feminine wellness journey with exclusive access to products, 
              wisdom, and a supportive community of goddesses.
            </p>
            <Button asChild size="lg" className="bg-divine-ivory text-divine-burgundy hover:bg-divine-cream text-lg px-8 py-6">
              <Link to="/register">
                Start Your Sacred Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
