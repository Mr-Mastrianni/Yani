import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  author: { name: string };
  published_at: string;
  image?: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:3001/api/blog');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: BlogPost[] = await response.json();
        setBlogPosts(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);
  return (
    <div className="min-h-screen bg-divine-ivory py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-divine font-bold divine-text-gradient mb-4">
            Wisdom & Wellness Blog
          </h1>
          <p className="text-divine-burgundy/70 max-w-2xl mx-auto">
            Explore our collection of articles on sacred rituals, feminine wisdom, and natural wellness to support your divine journey.
          </p>
        </motion.div>

        {loading && (
          <div className="text-center py-12">
            <p className="text-divine-burgundy">Loading blog posts...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-600">Error loading blog posts: {error}</p>
          </div>
        )}

        {!loading && !error && blogPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-divine-burgundy">No blog posts available at the moment.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col bg-white/50 border-divine-gold/20 shadow-lg hover:shadow-divine-gold/20 transition-shadow duration-300">
                <CardHeader>
                  {post.image && (
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                      <img src={post.image} alt={post.title} className="rounded-t-lg object-cover w-full h-full" />
                    </div>
                  )}
                  <CardTitle className="text-2xl font-bold divine-text-gradient">{post.title}</CardTitle>
                  <div className="text-sm text-divine-burgundy/60 pt-2">
                    <span>By {post.author.name}</span> | <span>{new Date(post.published_at).toLocaleDateString()}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-divine-burgundy/80">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="flex flex-col items-start">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="border-divine-gold text-divine-gold">{tag}</Badge>
                    ))}
                  </div>
                  <Button asChild className="mt-auto bg-divine-purple hover:bg-divine-purple/90 text-white">
                    <Link to={`/blog/${post.slug}`}>Read More</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
