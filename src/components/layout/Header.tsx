import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  User, 
  ShoppingBag, 
  Menu, 
  X, 
  Search,
  Moon,
  Sun,
  Bell
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Blog', href: '/blog' },
    { name: 'Community', href: '/forum' },
    { name: 'About', href: '/about' },
  ];

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-divine-ivory/95 backdrop-blur-md border-b border-divine-rose-gold/20 shadow-sm">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-2 text-sm text-divine-burgundy/70">
            <div className="hidden md:block">
              <span>✨ Free shipping on orders over $75 • Sacred products, blessed journey</span>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={toggleTheme} className="hover:text-divine-burgundy transition-colors">
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
              {isAuthenticated && (
                <button className="relative hover:text-divine-burgundy transition-colors">
                  <Bell className="w-4 h-4" />
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-divine-burgundy text-divine-ivory text-xs">
                    3
                  </Badge>
                </button>
              )}
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-divine rounded-full flex items-center justify-center group-hover:animate-glow transition-all duration-300">
                  <Heart className="w-6 h-6 text-divine-ivory fill-current" />
                </div>
                <div className="absolute -inset-1 bg-gradient-divine rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              </div>
              <div>
                <h1 className="text-2xl font-divine font-bold divine-text-gradient">
                  Pretty Yani
                </h1>
                <p className="text-xs text-divine-burgundy/60">Divine Feminine Wellness</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative py-2 px-1 transition-colors ${
                    isActiveRoute(item.href)
                      ? 'text-divine-burgundy font-medium'
                      : 'text-divine-burgundy/70 hover:text-divine-burgundy'
                  }`}
                >
                  {item.name}
                  {isActiveRoute(item.href) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-divine"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Search and Actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <AnimatePresence>
                  {isSearchOpen ? (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 300, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute right-0 top-1/2 -translate-y-1/2"
                    >
                      <Input
                        type="search"
                        placeholder="Search products, articles..."
                        className="w-full pr-10 bg-divine-cream border-divine-rose-gold focus:border-divine-burgundy"
                        autoFocus
                        onBlur={() => setIsSearchOpen(false)}
                      />
                      <button
                        onClick={() => setIsSearchOpen(false)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-divine-burgundy/50 hover:text-divine-burgundy"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ) : (
                    <button
                      onClick={() => setIsSearchOpen(true)}
                      className="p-2 hover:bg-divine-cream rounded-full transition-colors"
                    >
                      <Search className="w-5 h-5 text-divine-burgundy/70" />
                    </button>
                  )}
                </AnimatePresence>
              </div>

              {/* Shopping Cart */}
              <button className="relative p-2 hover:bg-divine-cream rounded-full transition-colors">
                <ShoppingBag className="w-5 h-5 text-divine-burgundy/70" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-divine-burgundy text-divine-ivory text-xs">
                  2
                </Badge>
              </button>

              {/* User Menu */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 p-1 hover:bg-divine-cream rounded-full transition-colors">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback className="bg-gradient-divine text-divine-ivory text-sm">
                          {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span>{user?.displayName || `${user?.firstName} ${user?.lastName}`}</span>
                        <span className="text-sm font-normal text-muted-foreground">
                          {user?.profile.archetype} Goddess • Level {user?.profile.level}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Goddess Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Orders & Subscriptions</DropdownMenuItem>
                    <DropdownMenuItem>Favorites</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" asChild className="hidden sm:inline-flex">
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button asChild className="bg-gradient-divine hover:opacity-90">
                    <Link to="/register">Join Circle</Link>
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-divine-cream rounded-full transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-divine-burgundy" />
                ) : (
                  <Menu className="w-5 h-5 text-divine-burgundy" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-divine-ivory border-b border-divine-rose-gold/20 shadow-lg"
          >
            <div className="container mx-auto px-4 py-6">
              {/* Mobile Search */}
              <div className="mb-6">
                <Input
                  type="search"
                  placeholder="Search products, articles..."
                  className="w-full bg-divine-cream border-divine-rose-gold focus:border-divine-burgundy"
                />
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-2 px-1 text-lg transition-colors ${
                      isActiveRoute(item.href)
                        ? 'text-divine-burgundy font-medium'
                        : 'text-divine-burgundy/70'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile Auth Actions */}
              {!isAuthenticated && (
                <div className="mt-6 space-y-3">
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild className="w-full bg-gradient-divine">
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                      Join Sacred Circle
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
