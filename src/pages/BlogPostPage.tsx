import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NotFoundPage } from './NotFoundPage';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  author: { name: string; avatar?: string; bio?: string };
  published_at: string;
  image?: string;
  excerpt: string;
  content: string;
  tags: string[];
  reading_time?: number;
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3001/api/blog/${slug}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: BlogPost = await response.json();
        setBlogPost(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlogPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-divine-ivory py-12 flex items-center justify-center">
        <p className="text-divine-burgundy">Loading blog post...</p>
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

  if (!blogPost) {
    return <NotFoundPage />;
  }

  return (
    <div className="min-h-screen bg-divine-ivory py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.article initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-5xl font-bold font-divine divine-text-gradient mb-4">{blogPost.title}</h1>
            <div className="flex justify-center items-center gap-4 text-divine-burgundy/70">
              <div className="flex items-center gap-2">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={blogPost.author.avatar} alt={blogPost.author.name} />
                  <AvatarFallback>{blogPost.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{blogPost.author.name}</span>
              </div>
              <span>•</span>
              <span>{new Date(blogPost.published_at).toLocaleDateString()}</span>
              {blogPost.reading_time && (
                <>
                  <span>•</span>
                  <span>{blogPost.reading_time} min read</span>
                </>
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {blogPost.tags && blogPost.tags.map(tag => (
                <Badge key={tag} variant="outline" className="border-divine-gold text-divine-gold">{tag}</Badge>
              ))}
            </div>
          </header>

          {/* Featured Image */}
          {blogPost.image && (
            <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
              <img src={blogPost.image} alt={blogPost.title} className="w-full h-auto object-cover" />
            </div>
          )}

          {/* Content */}
          <div 
            className="prose max-w-none text-lg text-divine-burgundy/90 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blogPost.content.replace(/\n/g, '<br />') }}
          />

          {/* Author Bio */}
          {blogPost.author.bio && (
            <Card className="mt-16 bg-white/40 border-divine-gold/20">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={blogPost.author.avatar} alt={blogPost.author.name} />
                  <AvatarFallback>{blogPost.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold text-divine-purple">About the Author</h3>
                  <p className="text-divine-burgundy/80">{blogPost.author.bio}</p>
                </div>
              </CardHeader>
            </Card>
          )}

        </motion.article>
      </div>
    </div>
  );
}