import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Filter, 
  Search, 
  Star, 
  Heart, 
  ShoppingBag,
  Grid3X3,
  List,
  SlidersHorizontal
} from 'lucide-react';
import { ProductCategory, FilterOptions } from '../types';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../components/ui/sheet';
import { Checkbox } from '../components/ui/checkbox';
import { Slider } from '../components/ui/slider';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: ProductCategory;
  ratings: { average: number; count: number };
  in_stock: boolean;
  featured: boolean;
  ingredients: string[];
  benefits: string[];
}

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: [0, 100],
    rating: 0,
    inStock: true,
    featured: false,
    sortBy: 'name',
    sortOrder: 'asc'
  });

  // Get category from URL params
  const categoryParam = searchParams.get('category') as ProductCategory;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:3001/api/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this runs once on mount

  const categories = [
    { value: 'cleansing_bars', label: 'Cleansing Bars', icon: '🌹' },
    { value: 'therapeutic_steams', label: 'Therapeutic Steams', icon: '🌿' },
    { value: 'intimate_oils', label: 'Intimate Oils', icon: '💧' },
    { value: 'scrubs', label: 'Body Scrubs', icon: '🌙' },
    { value: 'ritual_tools', label: 'Ritual Tools', icon: '✨' },
    { value: 'supplements', label: 'Supplements', icon: '💊' }
  ];

  const sortOptions = [
    { value: 'name-asc', label: 'Name A-Z' },
    { value: 'name-desc', label: 'Name Z-A' },
    { value: 'price-asc', label: 'Price Low to High' },
    { value: 'price-desc', label: 'Price High to Low' },
    { value: 'rating-desc', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' }
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!product.name.toLowerCase().includes(query) &&
            !product.description.toLowerCase().includes(query) &&
            !product.ingredients.some(ing => ing.toLowerCase().includes(query))) {
          return false;
        }
      }

      // Category filter (from URL or filters)
      const selectedCategories = categoryParam ? [categoryParam] : filters.categories;
      if (selectedCategories && selectedCategories.length > 0) {
        if (!selectedCategories.includes(product.category)) {
          return false;
        }
      }

      // Price range filter
      if (filters.priceRange) {
        if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
          return false;
        }
      }

      // Rating filter
      if (filters.rating && product.ratings.average < filters.rating) {
        return false;
      }

      // Stock filter
      if (filters.inStock && !product.in_stock) {
        return false;
      }

      // Featured filter
      if (filters.featured && !product.featured) {
        return false;
      }

      return true;
    });

    // Sort products
    const [sortField, sortOrder] = (filters.sortBy || 'name-asc').split('-');
    filtered.sort((a, b) => {
      let aValue: any = a[sortField as keyof typeof a];
      let bValue: any = b[sortField as keyof typeof b];

      if (sortField === 'rating') {
        aValue = a.ratings.average;
        bValue = b.ratings.average;
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'desc') {
        return bValue > aValue ? 1 : -1;
      }
      return aValue > bValue ? 1 : -1;
    });

    return filtered;
  }, [products, searchQuery, filters, categoryParam]);

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 100],
      rating: 0,
      inStock: true,
      featured: false,
      sortBy: 'name',
      sortOrder: 'asc'
    });
    setSearchQuery('');
    setSearchParams({});
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-divine font-semibold mb-3 text-divine-burgundy">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.value} className="flex items-center space-x-2">
              <Checkbox
                id={category.value}
                checked={filters.categories?.includes(category.value as ProductCategory)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateFilters({
                      categories: [...(filters.categories || []), category.value as ProductCategory]
                    });
                  } else {
                    updateFilters({
                      categories: filters.categories?.filter(c => c !== category.value)
                    });
                  }
                }}
              />
              <label 
                htmlFor={category.value}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {category.icon} {category.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-divine font-semibold mb-3 text-divine-burgundy">Price Range</h3>
        <div className="px-2">
          <Slider
            value={filters.priceRange || [0, 100]}
            onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
            max={100}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-divine-burgundy/70 mt-2">
            <span>${filters.priceRange?.[0] || 0}</span>
            <span>${filters.priceRange?.[1] || 100}</span>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-divine font-semibold mb-3 text-divine-burgundy">Minimum Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.rating === rating}
                onCheckedChange={(checked) => {
                  updateFilters({ rating: checked ? rating : 0 });
                }}
              />
              <label 
                htmlFor={`rating-${rating}`}
                className="flex items-center gap-1 text-sm cursor-pointer"
              >
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3 h-3 ${
                      i < rating ? 'fill-divine-gold text-divine-gold' : 'text-gray-300'
                    }`} 
                  />
                ))}
                <span>& Up</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Other Filters */}
      <div>
        <h3 className="font-divine font-semibold mb-3 text-divine-burgundy">Other Options</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={filters.inStock}
              onCheckedChange={(checked) => updateFilters({ inStock: checked as boolean })}
            />
            <label htmlFor="in-stock" className="text-sm cursor-pointer">
              In Stock Only
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={filters.featured}
              onCheckedChange={(checked) => updateFilters({ featured: checked as boolean })}
            />
            <label htmlFor="featured" className="text-sm cursor-pointer">
              Featured Products
            </label>
          </div>
        </div>
      </div>

      <Button onClick={clearFilters} variant="outline" className="w-full">
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-divine-ivory">
      {/* Header */}
      <div className="bg-gradient-to-br from-divine-cream to-divine-soft-pink py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-divine font-bold mb-6 divine-text-gradient">
              Sacred Product Collection
            </h1>
            <p className="text-xl text-divine-burgundy/70 max-w-2xl mx-auto">
              Discover divine wellness products crafted with love for your sacred feminine journey
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <SlidersHorizontal className="w-5 h-5 text-divine-burgundy" />
                  <h2 className="text-lg font-divine font-semibold text-divine-burgundy">
                    Filters
                  </h2>
                </div>
                <FilterContent />
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-divine-burgundy/50 w-4 h-4" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, ingredients, benefits..."
                  className="pl-10 bg-divine-cream border-divine-rose-gold focus:border-divine-burgundy"
                />
              </div>

              {/* Mobile Filters */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="font-divine">Filters</SheetTitle>
                    <SheetDescription>
                      Refine your search to find the perfect sacred products
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort */}
              <Select
                value={filters.sortBy}
                onValueChange={(value) => updateFilters({ sortBy: value as any })}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex items-center gap-1 border border-divine-rose-gold rounded-md p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="p-2"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="p-2"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-divine-burgundy/70">
                Showing {filteredProducts.length} of {products.length} products
              </p>
              {(searchQuery || filters.categories?.length || categoryParam) && (
                <Button onClick={clearFilters} variant="ghost" size="sm">
                  Clear all filters
                </Button>
              )}
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className={`group overflow-hidden border-divine-rose-gold/20 hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2 bg-divine-ivory ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}>
                    <div className={`relative overflow-hidden ${
                      viewMode === 'list' ? 'w-48 flex-shrink-0' : ''
                    }`}>
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                          viewMode === 'list' ? 'w-full h-full' : 'w-full h-64'
                        }`}
                      />
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.featured && (
                          <Badge className="bg-divine-burgundy text-divine-ivory">
                            Featured
                          </Badge>
                        )}
                        {!product.in_stock && (
                          <Badge variant="destructive">
                            Out of Stock
                          </Badge>
                        )}
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center gap-1 bg-divine-ivory/90 rounded-full px-2 py-1">
                          <Star className="w-3 h-3 fill-divine-gold text-divine-gold" />
                          <span className="text-xs font-medium">{product.ratings.average}</span>
                        </div>
                      </div>
                      <button className="absolute bottom-4 right-4 p-2 bg-divine-ivory/90 rounded-full hover:bg-divine-ivory transition-colors">
                        <Heart className="w-4 h-4 text-divine-burgundy" />
                      </button>
                    </div>
                    
                    <CardContent className={`${viewMode === 'list' ? 'flex-1' : ''} p-6`}>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-divine font-semibold text-divine-burgundy group-hover:text-divine-gold transition-colors">
                          {product.name}
                        </h3>
                        <span className="text-2xl font-bold text-divine-burgundy">
                          ${product.price}
                        </span>
                      </div>
                      
                      <p className={`text-divine-burgundy/70 mb-4 ${
                        viewMode === 'list' ? 'line-clamp-3' : 'line-clamp-2'
                      }`}>
                        {product.description}
                      </p>

                      {viewMode === 'list' && (
                        <div className="mb-4">
                          <p className="text-sm text-divine-burgundy/60 mb-2">Key Benefits:</p>
                          <div className="flex flex-wrap gap-1">
                            {product.benefits.slice(0, 3).map((benefit, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-divine-burgundy/60">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-divine-gold text-divine-gold" />
                            <span>{product.ratings.average}</span>
                          </div>
                          <span>•</span>
                          <span>{product.ratings.count} reviews</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button asChild variant="outline" size="sm">
                            <Link to={`/products/${product.id}`}>
                              View Details
                            </Link>
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-gradient-divine hover:opacity-90"
                            disabled={!product.in_stock}
                          >
                            <ShoppingBag className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <Heart className="w-16 h-16 text-divine-burgundy/30 mx-auto mb-4" />
                <h3 className="text-2xl font-divine font-semibold text-divine-burgundy mb-2">
                  No products found
                </h3>
                <p className="text-divine-burgundy/70 mb-6">
                  Try adjusting your filters or search terms to find your perfect sacred products.
                </p>
                <Button onClick={clearFilters} className="bg-gradient-divine hover:opacity-90">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
