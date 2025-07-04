import { 
  Product, 
  User, 
  BlogPost, 
  ForumPost, 
  Review, 
  GoddessArchetype,
  ProductCategory,
  BlogCategory,
  ForumCategory 
} from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'sophia@example.com',
    firstName: 'Sophia',
    lastName: 'Moon',
    displayName: 'SacredSophia',
    avatar: '/images/avatars/sophia.jpg',
    isVerified: true,
    createdAt: new Date('2024-01-15'),
    lastLogin: new Date(),
    preferences: {
      notifications: {
        email: true,
        push: true,
        marketing: false,
        community: true
      },
      privacy: {
        profileVisibility: 'public',
        showActivity: true,
        allowMessages: true
      },
      theme: 'light',
      language: 'en'
    },
    profile: {
      archetype: 'mystic',
      bio: 'Embracing my divine feminine journey through sacred practices and natural wellness.',
      wellness_goals: ['Hormonal Balance', 'Stress Relief', 'Spiritual Growth'],
      sacred_practices: ['Meditation', 'Moon Rituals', 'Herbalism'],
      moon_phase_preference: 'Full Moon',
      crystal_affinity: ['Amethyst', 'Rose Quartz', 'Moonstone'],
      achievements: [],
      level: 5,
      experience_points: 2500
    }
  },
  {
    id: '2',
    email: 'luna@example.com',
    firstName: 'Luna',
    lastName: 'Rose',
    displayName: 'MoonGoddessLuna',
    avatar: '/images/avatars/luna.jpg',
    isVerified: true,
    createdAt: new Date('2024-02-01'),
    lastLogin: new Date(),
    preferences: {
      notifications: {
        email: true,
        push: false,
        marketing: true,
        community: true
      },
      privacy: {
        profileVisibility: 'public',
        showActivity: true,
        allowMessages: true
      },
      theme: 'dark',
      language: 'en'
    },
    profile: {
      archetype: 'healer',
      bio: 'Natural wellness advocate and herbal enthusiast. Sharing the magic of feminine care.',
      wellness_goals: ['Intimate Health', 'Natural Healing', 'Community Building'],
      sacred_practices: ['Herbalism', 'Energy Healing', 'Breathwork'],
      moon_phase_preference: 'New Moon',
      crystal_affinity: ['Clear Quartz', 'Aventurine', 'Citrine'],
      achievements: [],
      level: 8,
      experience_points: 4200
    }
  }
];

// Mock Products
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Sacred Rose Cleansing Bar',
    description: 'A luxurious intimate cleansing bar infused with organic rose petals, calendula, and sacred herbs. Formulated to maintain your natural pH balance while providing gentle, effective cleansing for your most sacred spaces.',
    price: 28.99,
    images: [
      '/images/products/rose-cleansing-bar-1.jpg',
      '/images/products/rose-cleansing-bar-2.jpg',
      '/images/products/rose-cleansing-bar-3.jpg'
    ],
    category: 'cleansing_bars',
    ingredients: [
      'Organic Coconut Oil',
      'Rose Petal Extract',
      'Calendula Extract',
      'Lavender Essential Oil',
      'Shea Butter',
      'Chamomile Extract'
    ],
    benefits: [
      'Maintains natural pH balance',
      'Soothes sensitive skin',
      'Provides gentle cleansing',
      'Contains antimicrobial properties',
      'Promotes healthy intimate flora'
    ],
    usage_instructions: 'Use during your daily cleansing ritual. Create a gentle lather with warm water and apply to external intimate areas. Rinse thoroughly. For best results, use 2-3 times per week.',
    ratings: {
      average: 4.8,
      count: 127
    },
    reviews: [],
    in_stock: true,
    featured: true,
    ritual_associations: ['Self-Love Ritual', 'Moon Cycle Care'],
    moon_phase_optimal: 'Full Moon'
  },
  {
    id: '2',
    name: 'Divine Detox Steam Blend',
    description: 'A powerful therapeutic steam blend featuring organic herbs specially selected for feminine wellness. This sacred blend helps detoxify, soothe, and restore balance to your intimate wellness routine.',
    price: 42.00,
    images: [
      '/images/products/detox-steam-1.jpg',
      '/images/products/detox-steam-2.jpg',
      '/images/products/detox-steam-3.jpg'
    ],
    category: 'therapeutic_steams',
    ingredients: [
      'Organic Mugwort',
      'Red Raspberry Leaf',
      'Nettle Leaf',
      'Rose Petals',
      'Calendula Flowers',
      'Lavender Buds'
    ],
    benefits: [
      'Supports natural detoxification',
      'Promotes circulation',
      'Soothes inflammation',
      'Balances feminine energy',
      'Enhances spiritual connection'
    ],
    usage_instructions: 'Add 2-3 tablespoons to a bowl of steaming water. Sit comfortably over the steam for 15-20 minutes. Use during your menstrual cycle or as needed for wellness support.',
    ratings: {
      average: 4.9,
      count: 89
    },
    reviews: [],
    in_stock: true,
    featured: true,
    ritual_associations: ['Purification Ritual', 'Monthly Renewal'],
    moon_phase_optimal: 'New Moon'
  },
  {
    id: '3',
    name: 'Goddess Glow Intimate Oil',
    description: 'A sensual and nourishing intimate oil blend crafted with precious botanical oils to enhance pleasure, comfort, and connection. This divine elixir celebrates the sacred feminine with every drop.',
    price: 35.50,
    images: [
      '/images/products/intimate-oil-1.jpg',
      '/images/products/intimate-oil-2.jpg',
      '/images/products/intimate-oil-3.jpg'
    ],
    category: 'intimate_oils',
    ingredients: [
      'Organic Jojoba Oil',
      'Sweet Almond Oil',
      'Vitamin E',
      'Ylang Ylang Essential Oil',
      'Rose Geranium Oil',
      'Damiana Extract'
    ],
    benefits: [
      'Enhances natural lubrication',
      'Supports intimate comfort',
      'Promotes healthy tissue',
      'Increases sensitivity',
      'Creates sacred intimacy'
    ],
    usage_instructions: 'Apply a small amount to intimate areas as desired. Safe for internal and external use. Compatible with natural latex condoms.',
    ratings: {
      average: 4.7,
      count: 156
    },
    reviews: [],
    in_stock: true,
    featured: false,
    ritual_associations: ['Sacred Union Ritual', 'Self-Pleasure Practice'],
    moon_phase_optimal: 'Waxing Moon'
  },
  {
    id: '4',
    name: 'Moonlight Body Scrub',
    description: 'A luxurious exfoliating scrub infused with Dead Sea salt, organic sugar, and precious oils. This divine blend removes dead skin while nourishing your body with goddess-like radiance.',
    price: 32.00,
    images: [
      '/images/products/body-scrub-1.jpg',
      '/images/products/body-scrub-2.jpg',
      '/images/products/body-scrub-3.jpg'
    ],
    category: 'scrubs',
    ingredients: [
      'Dead Sea Salt',
      'Organic Cane Sugar',
      'Coconut Oil',
      'Argan Oil',
      'Vanilla Extract',
      'Moonstone Powder'
    ],
    benefits: [
      'Exfoliates dead skin cells',
      'Improves circulation',
      'Moisturizes deeply',
      'Promotes cell renewal',
      'Creates silky smooth skin'
    ],
    usage_instructions: 'In the shower, apply to damp skin in circular motions. Focus on rough areas like elbows and knees. Rinse thoroughly and follow with your favorite moisturizer.',
    ratings: {
      average: 4.6,
      count: 203
    },
    reviews: [],
    in_stock: true,
    featured: false,
    ritual_associations: ['Full Moon Ritual', 'Self-Care Sunday'],
    moon_phase_optimal: 'Full Moon'
  }
];

// Mock Reviews
export const mockReviews: Review[] = [
  {
    id: '1',
    user_id: '1',
    user_name: 'SacredSophia',
    user_avatar: '/images/avatars/sophia.jpg',
    product_id: '1',
    rating: 5,
    title: 'Life-changing for my intimate wellness!',
    content: 'I\'ve been using the Sacred Rose Cleansing Bar for 3 months now and I can honestly say it has transformed my intimate care routine. The gentle formula keeps me feeling fresh and balanced without any irritation. The rose scent is divine and makes my self-care ritual feel truly sacred.',
    images: ['/images/reviews/review-1-img.jpg'],
    verified_purchase: true,
    helpful_votes: 23,
    created_at: new Date('2024-05-15'),
    updated_at: new Date('2024-05-15')
  },
  {
    id: '2',
    user_id: '2',
    user_name: 'MoonGoddessLuna',
    user_avatar: '/images/avatars/luna.jpg',
    product_id: '2',
    rating: 5,
    title: 'The most relaxing and healing experience',
    content: 'The Divine Detox Steam Blend is absolutely magical. I use it during my moon cycle and it provides such incredible relief and relaxation. The herbs smell amazing and I always feel so renewed afterwards. This is now an essential part of my monthly wellness routine.',
    verified_purchase: true,
    helpful_votes: 18,
    created_at: new Date('2024-05-20'),
    updated_at: new Date('2024-05-20')
  }
];

// Mock Blog Posts
export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Understanding Your Divine Feminine Cycle',
    slug: 'understanding-divine-feminine-cycle',
    excerpt: 'Explore the sacred wisdom of your menstrual cycle and how to honor each phase with intentional practices and natural care.',
    content: `# Understanding Your Divine Feminine Cycle

Your menstrual cycle is one of the most powerful and sacred aspects of your feminine nature. Far from being something to simply endure, your cycle is a monthly invitation to connect with your inner wisdom, creativity, and divine feminine energy.

## The Four Sacred Phases

### Menstrual Phase (Days 1-5) - The Wise Woman
This is your time of release and renewal. Your body is shedding what no longer serves you, creating space for new possibilities. Honor this phase with:
- Gentle movement like yin yoga or walking
- Warm baths with Epsom salts
- Journaling and reflection
- Using our Divine Detox Steam Blend for comfort

### Follicular Phase (Days 1-13) - The Maiden
As your hormones begin to rise, you enter a time of fresh energy and new beginnings. This is perfect for:
- Setting new intentions
- Starting creative projects
- Planning and strategizing
- Using our Sacred Rose Cleansing Bar as part of your renewal ritual

### Ovulatory Phase (Days 14-21) - The Mother
This is your time of peak energy and connection. You're radiating goddess energy and magnetism. Embrace this phase with:
- Social activities and connection
- Important conversations
- Physical activity and movement
- Celebrating your body with our Goddess Glow Intimate Oil

### Luteal Phase (Days 15-28) - The Wild Woman
As you prepare for your next cycle, this is a time of reflection and completion. Support yourself with:
- Finishing projects
- Decluttering and organizing
- Self-care practices
- Nourishing your body with our Moonlight Body Scrub

## Creating Your Sacred Cycle Ritual

Honor your cycle by creating rituals that support each phase. This might include:
- Tracking your cycle with awareness and intention
- Adjusting your self-care routine to match your energy
- Using natural products that support your body's wisdom
- Connecting with other women in your community

Remember, your cycle is not a weakness - it's your superpower. When you learn to work with your natural rhythms instead of against them, you unlock incredible wisdom and power.

*What practices help you honor your cycle? Share your sacred rituals in our community forum.*`,
    featured_image: '/images/blog/divine-cycle.jpg',
    author: {
      id: '1',
      name: 'Dr. Sarah Moon',
      avatar: '/images/authors/dr-sarah.jpg',
      bio: 'Holistic wellness practitioner and feminine health advocate'
    },
    tags: ['Menstrual Health', 'Feminine Wisdom', 'Self-Care', 'Rituals'],
    category: 'wellness',
    status: 'published',
    published_at: new Date('2024-06-15'),
    created_at: new Date('2024-06-10'),
    updated_at: new Date('2024-06-15'),
    likes: 234,
    comments: [],
    reading_time: 8
  },
  {
    id: '2',
    title: 'The Sacred Art of Yoni Steaming',
    slug: 'sacred-art-yoni-steaming',
    excerpt: 'Discover the ancient practice of yoni steaming and how this gentle therapy can support your feminine wellness and spiritual connection.',
    content: `# The Sacred Art of Yoni Steaming

Yoni steaming, also known as vaginal steaming or chai-yok, is an ancient practice that has been used by women across cultures for thousands of years. This gentle therapy involves sitting over a pot of steaming herbal water, allowing the steam to cleanse and nourish your most sacred space.

## The Benefits of Yoni Steaming

### Physical Benefits
- Supports natural detoxification
- Promotes healthy circulation
- May help regulate menstrual cycles
- Soothes inflammation and discomfort
- Supports postpartum healing

### Emotional and Spiritual Benefits
- Creates a sacred self-care ritual
- Promotes deep relaxation
- Enhances connection to your feminine energy
- Provides time for meditation and reflection
- Honors your body as a temple

## How to Practice Yoni Steaming Safely

### What You'll Need
- A special yoni steam seat or a regular chair with a hole/opening
- A large pot or bowl
- Our Divine Detox Steam Blend or other appropriate herbs
- A large blanket or towel
- Comfortable, loose clothing

### The Ritual
1. Boil water and add your herbal blend
2. Let it steep for 5-10 minutes, then remove from heat
3. Place the pot under your steam seat
4. Sit comfortably over the steam, covered with a blanket
5. Steam for 15-20 minutes while practicing deep breathing or meditation

### Important Safety Considerations
- Never steam while menstruating
- Avoid if you're pregnant or trying to conceive
- Don't steam if you have an active infection
- The steam should be warm, not hot
- Listen to your body and stop if you feel uncomfortable

## When to Steam

### Ideal Times
- A few days after your period ends
- During the follicular phase of your cycle
- Before important ceremonies or rituals
- When you need emotional or spiritual cleansing
- As part of your seasonal wellness routine

### Frequency
Most women benefit from steaming 1-3 times per month, but this can vary based on individual needs and preferences.

## Creating Your Sacred Space

Transform your steaming practice into a beautiful ritual by:
- Lighting candles or burning incense
- Playing soft, meditative music
- Setting intentions or practicing gratitude
- Journaling about your experience
- Using this time for prayer or meditation

## Choosing Your Herbs

Different herbs offer different benefits:
- **Mugwort**: Supports menstrual health and spiritual connection
- **Rose Petals**: Promotes self-love and emotional healing
- **Calendula**: Soothes inflammation and promotes healing
- **Lavender**: Calms the nervous system and promotes relaxation
- **Red Raspberry Leaf**: Tones the reproductive system

Our Divine Detox Steam Blend combines the most beneficial herbs in perfect proportions for a safe and effective steaming experience.

Remember, yoni steaming is a deeply personal practice. What works for one woman may not work for another. Always listen to your body and consult with a healthcare provider if you have any concerns.

*Have you tried yoni steaming? Share your experience in our supportive community.*`,
    featured_image: '/images/blog/yoni-steaming.jpg',
    author: {
      id: '2',
      name: 'Luna Rose',
      avatar: '/images/authors/luna.jpg',
      bio: 'Herbalist and sacred feminine wellness guide'
    },
    tags: ['Yoni Steaming', 'Sacred Practices', 'Feminine Health', 'Herbalism'],
    category: 'rituals',
    status: 'published',
    published_at: new Date('2024-06-10'),
    created_at: new Date('2024-06-05'),
    updated_at: new Date('2024-06-10'),
    likes: 189,
    comments: [],
    reading_time: 10
  }
];

// Mock Forum Posts
export const mockForumPosts: ForumPost[] = [
  {
    id: '1',
    title: 'New to yoni steaming - any tips for beginners?',
    content: 'Hi beautiful goddesses! I\'m new to the community and really interested in trying yoni steaming. I\'ve read about it but I\'m a bit nervous about starting. Does anyone have tips for beginners? What herbs should I start with? Any mistakes to avoid?\n\nI have the Divine Detox Steam Blend but I want to make sure I\'m doing everything safely. Thank you for any guidance! 💕',
    author: {
      id: '3',
      name: 'NewGoddess23',
      avatar: '/images/avatars/new-goddess.jpg',
      archetype: 'nurturing',
      level: 1
    },
    category: 'rituals_practices',
    tags: ['Yoni Steaming', 'Beginner', 'Help'],
    likes: 15,
    replies: [
      {
        id: '1',
        content: 'Welcome to the community! 🌙 I started steaming about 6 months ago and it\'s been such a beautiful addition to my self-care routine. My top tips for beginners:\n\n1. Start with shorter sessions (10-15 minutes)\n2. Make sure the steam isn\'t too hot - it should be comfortably warm\n3. The Divine Detox blend is perfect for beginners!\n4. Create a sacred space with candles or soft music\n5. Don\'t steam during your period or if you\'re trying to conceive\n\nTrust your intuition and listen to your body. You\'ve got this, sister! ✨',
        author: {
          id: '1',
          name: 'SacredSophia',
          avatar: '/images/avatars/sophia.jpg',
          archetype: 'mystic',
          level: 5
        },
        post_id: '1',
        likes: 8,
        created_at: new Date('2024-06-20'),
        updated_at: new Date('2024-06-20')
      },
      {
        id: '2',
        content: 'Such wonderful advice from Sophia! I\'d also add - don\'t feel like you need to steam frequently when starting. Once a month is perfect to begin with. And remember, this is YOUR sacred practice, so do what feels right for your body. The Pretty Yani steam blend is gentle and perfect for beginners. Enjoy your journey into this ancient practice! 🌸',
        author: {
          id: '2',
          name: 'MoonGoddessLuna',
          avatar: '/images/avatars/luna.jpg',
          archetype: 'healer',
          level: 8
        },
        post_id: '1',
        likes: 6,
        created_at: new Date('2024-06-20'),
        updated_at: new Date('2024-06-20')
      }
    ],
    views: 47,
    pinned: false,
    locked: false,
    created_at: new Date('2024-06-19'),
    updated_at: new Date('2024-06-20')
  },
  {
    id: '2',
    title: 'Sharing my moon cycle ritual - would love to hear yours!',
    content: 'Hello beautiful souls! 🌙\n\nI wanted to share my monthly moon cycle ritual because it has been so transformative for me, and I\'d love to hear about yours too!\n\n**New Moon (Day 1-3 of cycle):**\n- Gentle yoni steam with the Divine Detox blend\n- Journaling intentions for the new cycle\n- Meditation with my moonstone\n- Using the Sacred Rose cleansing bar for purification\n\n**Waxing Moon (Days 4-13):**\n- Energy work and manifestation\n- Creative projects\n- Social connection with my goddess circle\n- Daily affirmations\n\n**Full Moon (Day 14-16):**\n- Celebration and gratitude ceremony\n- Full body exfoliation with Moonlight scrub\n- Dancing and movement\n- Charging my crystals\n\n**Waning Moon (Days 17-28):**\n- Reflection and release work\n- Decluttering physical and emotional space\n- Preparing for the next cycle\n- Self-massage with the Goddess Glow oil\n\nThis rhythm has helped me feel so much more connected to my natural cycles and feminine energy. What rituals support you during your moon time? I\'d love to learn from all of you! ✨',
    author: {
      id: '4',
      name: 'MoonRitual_Maven',
      avatar: '/images/avatars/moon-maven.jpg',
      archetype: 'mystic',
      level: 7
    },
    category: 'rituals_practices',
    tags: ['Moon Rituals', 'Menstrual Cycle', 'Sacred Practices', 'Self-Care'],
    likes: 32,
    replies: [],
    views: 89,
    pinned: true,
    locked: false,
    created_at: new Date('2024-06-18'),
    updated_at: new Date('2024-06-18')
  }
];

// Mock Goddess Archetypes
export const goddessArchetypes = {
  warrior: {
    name: 'Warrior Goddess',
    description: 'Bold, fearless, and action-oriented. You face challenges head-on and inspire others with your courage.',
    traits: ['Courageous', 'Determined', 'Protective', 'Strong-willed'],
    sacred_practices: ['Martial Arts', 'Power Meditation', 'Goal Setting', 'Boundary Work'],
    crystal_affinities: ['Tiger\'s Eye', 'Red Jasper', 'Hematite', 'Carnelian'],
    colors: ['Deep Red', 'Black', 'Gold', 'Orange']
  },
  nurturing: {
    name: 'Nurturing Goddess',
    description: 'Compassionate, caring, and naturally supportive. You create safe spaces for others to grow and heal.',
    traits: ['Empathetic', 'Gentle', 'Supportive', 'Intuitive'],
    sacred_practices: ['Healing Arts', 'Gardening', 'Cooking', 'Community Care'],
    crystal_affinities: ['Rose Quartz', 'Green Aventurine', 'Prehnite', 'Amazonite'],
    colors: ['Soft Pink', 'Green', 'Cream', 'Lavender']
  },
  wise: {
    name: 'Wise Goddess',
    description: 'Thoughtful, knowledgeable, and deeply intuitive. You seek understanding and share wisdom with others.',
    traits: ['Intelligent', 'Reflective', 'Patient', 'Insightful'],
    sacred_practices: ['Study', 'Teaching', 'Divination', 'Philosophy'],
    crystal_affinities: ['Amethyst', 'Sodalite', 'Fluorite', 'Labradorite'],
    colors: ['Deep Purple', 'Indigo', 'Silver', 'Midnight Blue']
  },
  creative: {
    name: 'Creative Goddess',
    description: 'Artistic, expressive, and imaginative. You bring beauty into the world through your unique vision.',
    traits: ['Artistic', 'Expressive', 'Original', 'Passionate'],
    sacred_practices: ['Art', 'Music', 'Dance', 'Writing'],
    crystal_affinities: ['Citrine', 'Sunstone', 'Orange Calcite', 'Carnelian'],
    colors: ['Sunset Orange', 'Golden Yellow', 'Turquoise', 'Magenta']
  },
  mystic: {
    name: 'Mystic Goddess',
    description: 'Spiritual, intuitive, and connected to the unseen realms. You bridge the physical and spiritual worlds.',
    traits: ['Intuitive', 'Spiritual', 'Mysterious', 'Perceptive'],
    sacred_practices: ['Meditation', 'Astrology', 'Tarot', 'Energy Work'],
    crystal_affinities: ['Moonstone', 'Clear Quartz', 'Selenite', 'Lepidolite'],
    colors: ['Deep Purple', 'Silver', 'Iridescent', 'Starry Black']
  },
  healer: {
    name: 'Healer Goddess',
    description: 'Naturally gifted in healing arts and supporting others\' wellness journeys through compassion and knowledge.',
    traits: ['Healing', 'Compassionate', 'Knowledgeable', 'Service-oriented'],
    sacred_practices: ['Herbalism', 'Energy Healing', 'Yoga', 'Aromatherapy'],
    crystal_affinities: ['Green Jade', 'Malachite', 'Turquoise', 'Aquamarine'],
    colors: ['Healing Green', 'Ocean Blue', 'Pure White', 'Soft Yellow']
  },
  guardian: {
    name: 'Guardian Goddess',
    description: 'Protective, loyal, and dedicated to safeguarding what matters most. You are a fierce defender of love and justice.',
    traits: ['Protective', 'Loyal', 'Just', 'Steadfast'],
    sacred_practices: ['Protection Rituals', 'Community Service', 'Activism', 'Shield Work'],
    crystal_affinities: ['Black Tourmaline', 'Obsidian', 'Smoky Quartz', 'Pyrite'],
    colors: ['Deep Black', 'Silver', 'Royal Blue', 'Forest Green']
  },
  wild: {
    name: 'Wild Goddess',
    description: 'Free-spirited, untamed, and connected to natural rhythms. You embrace your primal feminine power.',
    traits: ['Free-spirited', 'Spontaneous', 'Natural', 'Authentic'],
    sacred_practices: ['Nature Connection', 'Shamanic Journey', 'Wild Swimming', 'Moon Dancing'],
    crystal_affinities: ['Raw Garnet', 'Moss Agate', 'Bloodstone', 'Tree Agate'],
    colors: ['Earth Brown', 'Forest Green', 'Sunset Red', 'Ocean Blue']
  }
};

// goddessArchetypes is already exported above
