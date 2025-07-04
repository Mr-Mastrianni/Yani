import { Router } from 'express';

const router = Router();

const mockForumTopics = [
  {
    id: 1,
    title: 'General Discussion: Share Your Wellness Journey',
    author: 'Moon Maven',
    replies: 15,
    views: 230,
    last_post: '2024-07-01T10:30:00Z',
    content: 'Welcome to the general discussion forum! Feel free to share your personal wellness journey, tips, and experiences. Let us support each other on this path to holistic well-being.'
  },
  {
    id: 2,
    title: 'Product Reviews & Recommendations',
    author: 'New Goddess',
    replies: 8,
    views: 150,
    last_post: '2024-06-28T14:00:00Z',
    content: 'Looking for honest reviews of our products or want to recommend your favorites? This is the place! Share your thoughts and help others discover their perfect sacred tools.'
  },
  {
    id: 3,
    title: 'Sacred Rituals & Practices',
    author: 'Sophia',
    replies: 22,
    views: 300,
    last_post: '2024-07-03T09:15:00Z',
    content: 'Dive deep into the world of sacred rituals. Discuss moon ceremonies, meditation techniques, yoni steaming practices, and more. Share your wisdom and learn from others.'
  }
];

router.get('/', (req, res) => {
  res.json(mockForumTopics);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const topic = mockForumTopics.find(t => t.id === parseInt(id));
  if (topic) {
    res.json(topic);
  } else {
    res.status(404).json({ message: 'Forum topic not found' });
  }
});

export default router;
