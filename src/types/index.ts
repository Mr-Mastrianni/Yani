// Pretty Yani Platform Types

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar?: string;
  isVerified: boolean;
  createdAt: Date;
  lastLogin: Date;
  preferences: UserPreferences;
  profile: GoddessProfile;
  subscription?: Subscription;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
    community: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends';
    showActivity: boolean;
    allowMessages: boolean;
  };
  theme: 'light' | 'dark' | 'auto';
  language: string;
}

export interface GoddessProfile {
  archetype: GoddessArchetype;
  bio?: string;
  wellness_goals: string[];
  sacred_practices: string[];
  moon_phase_preference?: string;
  crystal_affinity?: string[];
  achievements: Achievement[];
  level: number;
  experience_points: number;
}

export type GoddessArchetype = 
  | 'warrior' 
  | 'nurturing' 
  | 'wise' 
  | 'creative' 
  | 'mystic' 
  | 'healer' 
  | 'guardian' 
  | 'wild';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned_at: Date;
  category: 'wellness' | 'community' | 'learning' | 'ritual' | 'special';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: ProductCategory;
  ingredients: string[];
  benefits: string[];
  usage_instructions: string;
  ratings: {
    average: number;
    count: number;
  };
  reviews: Review[];
  in_stock: boolean;
  featured: boolean;
  ritual_associations?: string[];
  moon_phase_optimal?: string;
}

export type ProductCategory = 
  | 'cleansing_bars' 
  | 'therapeutic_steams' 
  | 'intimate_oils' 
  | 'scrubs' 
  | 'ritual_tools' 
  | 'supplements';

export interface Review {
  id: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  product_id: string;
  rating: number;
  title: string;
  content: string;
  images?: string[];
  verified_purchase: boolean;
  helpful_votes: number;
  created_at: Date;
  updated_at: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    bio?: string;
  };
  tags: string[];
  category: BlogCategory;
  status: 'draft' | 'published' | 'archived';
  published_at?: Date;
  created_at: Date;
  updated_at: Date;
  likes: number;
  comments: Comment[];
  reading_time: number;
}

export type BlogCategory = 
  | 'wellness' 
  | 'rituals' 
  | 'self_care' 
  | 'feminine_wisdom' 
  | 'product_education' 
  | 'community_stories';

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    archetype: GoddessArchetype;
    level: number;
  };
  category: ForumCategory;
  tags: string[];
  likes: number;
  replies: ForumReply[];
  views: number;
  pinned: boolean;
  locked: boolean;
  created_at: Date;
  updated_at: Date;
}

export type ForumCategory = 
  | 'general_wellness' 
  | 'intimate_health' 
  | 'rituals_practices' 
  | 'product_discussion' 
  | 'support_circle' 
  | 'goddess_wisdom' 
  | 'new_member_intro';

export interface ForumReply {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    archetype: GoddessArchetype;
    level: number;
  };
  post_id: string;
  parent_reply_id?: string;
  likes: number;
  created_at: Date;
  updated_at: Date;
}

export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  post_id: string;
  parent_comment_id?: string;
  likes: number;
  created_at: Date;
  updated_at: Date;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type: 'text' | 'product_recommendation' | 'educational' | 'support';
  metadata?: {
    products?: string[];
    links?: string[];
    confidence?: number;
  };
}

export interface ChatSession {
  id: string;
  user_id?: string;
  messages: ChatMessage[];
  created_at: Date;
  updated_at: Date;
  status: 'active' | 'resolved' | 'escalated';
  topic_category?: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: SubscriptionPlan;
  status: 'active' | 'paused' | 'cancelled' | 'expired';
  current_period_start: Date;
  current_period_end: Date;
  created_at: Date;
  updated_at: Date;
}

export type SubscriptionPlan = 
  | 'goddess_circle' 
  | 'divine_feminine' 
  | 'sacred_sisterhood';

export interface Order {
  id: string;
  user_id: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  shipping_address: Address;
  billing_address: Address;
  created_at: Date;
  updated_at: Date;
  tracking_number?: string;
}

export type OrderStatus = 
  | 'pending' 
  | 'processing' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled' 
  | 'refunded';

export interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  created_at: Date;
  action_url?: string;
  metadata?: Record<string, any>;
}

export type NotificationType = 
  | 'order_update' 
  | 'community_activity' 
  | 'blog_update' 
  | 'product_restock' 
  | 'achievement' 
  | 'welcome' 
  | 'reminder';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface ChatState {
  sessions: ChatSession[];
  activeSession: ChatSession | null;
  isTyping: boolean;
  connected: boolean;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  archetype: GoddessArchetype;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  category: 'support' | 'business' | 'feedback' | 'other';
}

export interface ProfileUpdateForm {
  firstName: string;
  lastName: string;
  displayName: string;
  bio?: string;
  wellness_goals: string[];
  sacred_practices: string[];
  archetype: GoddessArchetype;
}

// UI Component types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

export interface FilterOptions {
  categories?: ProductCategory[];
  priceRange?: [number, number];
  rating?: number;
  inStock?: boolean;
  featured?: boolean;
  sortBy?: 'name' | 'price' | 'rating' | 'newest' | 'oldest';
  sortOrder?: 'asc' | 'desc';
}
