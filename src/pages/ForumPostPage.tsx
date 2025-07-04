import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NotFoundPage } from './NotFoundPage';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageSquare } from 'lucide-react';

interface ForumPost {
  id: number;
  title: string;
  author: string;
  replies: number;
  views: number;
  last_post: string;
  content: string;
}

export function ForumPostPage() {
  const { id } = useParams<{ id: string }>();
  const [forumPost, setForumPost] = useState<ForumPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForumPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3001/api/forum/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ForumPost = await response.json();
        setForumPost(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchForumPost();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-divine-ivory py-12 flex items-center justify-center">
        <p className="text-divine-burgundy">Loading forum post...</p>
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

  if (!forumPost) {
    return <NotFoundPage />;
  }

  return (
    <div className="min-h-screen bg-divine-ivory py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Post Card */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Card className="bg-white/50 border-divine-gold/20 shadow-lg mb-8">
            <CardHeader className="flex flex-row items-start gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={`/public/images/avatars/${forumPost.author.toLowerCase().replace(/ /g, '-')}.jpg`} alt={forumPost.author} />
                <AvatarFallback>{forumPost.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <CardTitle className="text-3xl font-bold divine-text-gradient">{forumPost.title}</CardTitle>
                <p className="text-sm text-divine-burgundy/60 pt-1">
                  By {forumPost.author} • {new Date(forumPost.last_post).toLocaleDateString()}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none text-divine-burgundy/90">
                {forumPost.content.split('\n').map((paragraph, i) => <p key={i}>{paragraph}</p>)}
              </div>
            </CardContent>
            <CardFooter className="flex items-center gap-4 text-divine-burgundy/70">
              <Button variant="ghost" className="flex items-center gap-2">
                <Heart className="w-5 h-5" /> {0} {/* Likes not in mock backend data */}
              </Button>
              <Button variant="ghost" className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" /> {forumPost.replies} Replies
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Replies Section - Placeholder as backend mock doesn't provide replies array */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }}>
          <h2 className="text-2xl font-bold divine-text-gradient mb-6">Replies</h2>
          <div className="space-y-6">
            <p className="text-divine-burgundy/70">No replies yet. Be the first to comment!</p>
          </div>
        </motion.div>

        {/* Reply Form */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}>
          <Card className="mt-8 bg-white/50 border-divine-gold/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold divine-text-gradient">Leave a Reply</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Share your wisdom..."
                rows={5}
                className="bg-divine-cream border-divine-rose-gold focus:border-divine-burgundy"
              />
            </CardContent>
            <CardFooter>
              <Button className="bg-divine-purple hover:bg-divine-purple/90 text-white">Post Reply</Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}