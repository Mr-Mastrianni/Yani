import { Router } from 'express';

const router = Router();

const mockBlogPosts = [
  {
    id: 1,
    slug: 'divine-cycle',
    title: 'Embracing the Divine Feminine Cycle',
    author: 'Luna',
    date: '2024-06-15',
    image: '/public/images/blog/divine-cycle.jpg',
    excerpt: 'Understanding and honoring your natural feminine rhythms.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    id: 2,
    slug: 'yoni-steaming',
    title: 'The Ancient Art of Yoni Steaming',
    author: 'Dr. Sarah',
    date: '2024-05-20',
    image: '/public/images/blog/yoni-steaming.jpg',
    excerpt: 'Exploring the benefits and practices of this sacred ritual.',
    content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  }
];

router.get('/', (req, res) => {
  res.json(mockBlogPosts);
});

router.get('/:slug', (req, res) => {
  const { slug } = req.params;
  const post = mockBlogPosts.find(p => p.slug === slug);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Blog post not found' });
  }
});

export default router;
