import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Heart, Eye } from 'lucide-react';

interface ForumPost {
  id: number;
  title: string;
  author: string;
  replies: number;
  views: number;
  last_post: string;
  content: string;
  category?: string;
  pinned?: boolean;
  likes?: number;
}

export function ForumPage() {
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForumPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:3001/api/forum');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ForumPost[] = await response.json();
        setForumPosts(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForumPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-divine-ivory py-12 flex items-center justify-center">
        <p className="text-divine-burgundy">Loading forum topics...</p>
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
            Goddess Community Forum
          </h1>
          <p className="text-divine-burgundy/70 max-w-2xl mx-auto">
            Connect with like-minded souls, share your wisdom, and find support in our sacred community circle.
          </p>
        </motion.div>

        <div className="space-y-8">
          {forumPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white/50 border-divine-gold/20 shadow-lg hover:shadow-divine-gold/20 transition-shadow duration-300">
                <CardHeader className="flex flex-row items-start gap-4">
                  <Avatar>
                    <AvatarImage src={`/public/images/avatars/${post.author.toLowerCase().replace(/ /g, '-')}.jpg`} alt={post.author} />
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <CardTitle className="text-2xl font-bold divine-text-gradient">{post.title}</CardTitle>
                    <p className="text-sm text-divine-burgundy/60 pt-1">
                      By {post.author} {post.category && <>in <span className="font-semibold">{post.category.replace(/_/g, ' ')}</span></>}
                    </p>
                  </div>
                  {post.pinned && <Badge className="bg-divine-purple text-white">Pinned</Badge>}
                </CardHeader>
                <CardContent>
                  <p className="text-divine-burgundy/80 line-clamp-3">{post.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="flex gap-4 text-divine-burgundy/70">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" /> {post.likes || 0}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" /> {post.replies}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" /> {post.views}
                    </div>
                  </div>
                  <Button asChild className="bg-divine-purple hover:bg-divine-purple/90 text-white">
                    <Link to={`/forum/${post.id}`}>View Discussion</Link>
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
