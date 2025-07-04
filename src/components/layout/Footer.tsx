import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Instagram, Facebook, Twitter, MapPin, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    products: [
      { name: 'Cleansing Bars', href: '/products?category=cleansing_bars' },
      { name: 'Therapeutic Steams', href: '/products?category=therapeutic_steams' },
      { name: 'Intimate Oils', href: '/products?category=intimate_oils' },
      { name: 'Body Scrubs', href: '/products?category=scrubs' },
    ],
    resources: [
      { name: 'Wellness Blog', href: '/blog' },
      { name: 'Goddess Community', href: '/forum' },
      { name: 'Sacred Practices', href: '/blog?category=rituals' },
      { name: 'Product Education', href: '/blog?category=product_education' },
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
    ],
    company: [
      { name: 'About Pretty Yani', href: '/about' },
      { name: 'Our Mission', href: '/mission' },
      { name: 'Sustainability', href: '/sustainability' },
      { name: 'Careers', href: '/careers' },
    ]
  };

  return (
    <footer className="bg-divine-deep-purple text-divine-ivory">
      {/* Newsletter Section */}
      <div className="border-b border-divine-mystic-purple/30">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-divine font-bold mb-4">
              Join Our Sacred Circle
            </h3>
            <p className="text-divine-ivory/80 mb-8">
              Receive goddess wisdom, exclusive offers, and sacred wellness tips delivered to your inbox with love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your sacred email..."
                className="flex-1 bg-divine-mystic-purple/30 border-divine-mystic-purple text-divine-ivory placeholder:text-divine-ivory/60"
              />
              <Button className="bg-gradient-divine hover:opacity-90 whitespace-nowrap">
                Join Circle
              </Button>
            </div>
            <p className="text-xs text-divine-ivory/60 mt-4">
              ✨ No spam, only sacred wisdom and special offers for our goddess community
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-divine rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-divine-ivory fill-current" />
              </div>
              <div>
                <h3 className="text-2xl font-divine font-bold">Pretty Yani</h3>
                <p className="text-sm text-divine-ivory/60">Divine Feminine Wellness</p>
              </div>
            </Link>
            <p className="text-divine-ivory/80 mb-6 leading-relaxed">
              Honoring the sacred feminine through natural wellness products, ancient wisdom, 
              and a supportive community of goddesses on their divine journey.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-divine-mystic-purple/30 rounded-full flex items-center justify-center hover:bg-divine-gold transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-divine-mystic-purple/30 rounded-full flex items-center justify-center hover:bg-divine-gold transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-divine-mystic-purple/30 rounded-full flex items-center justify-center hover:bg-divine-gold transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products Links */}
          <div>
            <h4 className="text-lg font-divine font-semibold mb-4 text-divine-gold">
              Sacred Products
            </h4>
            <ul className="space-y-3">
              {links.products.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-divine-ivory/80 hover:text-divine-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-lg font-divine font-semibold mb-4 text-divine-gold">
              Wisdom & Resources
            </h4>
            <ul className="space-y-3">
              {links.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-divine-ivory/80 hover:text-divine-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-divine font-semibold mb-4 text-divine-gold">
              Support
            </h4>
            <ul className="space-y-3">
              {links.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-divine-ivory/80 hover:text-divine-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-divine font-semibold mb-4 text-divine-gold">
              Company
            </h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-divine-ivory/80 hover:text-divine-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-divine-mystic-purple/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-divine-gold" />
              <div>
                <p className="font-medium">Sacred Sanctuary</p>
                <p className="text-divine-ivory/80 text-sm">123 Goddess Way, Wellness Valley, CA 90210</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-divine-gold" />
              <div>
                <p className="font-medium">Goddess Helpline</p>
                <p className="text-divine-ivory/80 text-sm">1-800-GODDESS (1-800-463-3377)</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-divine-gold" />
              <div>
                <p className="font-medium">Sacred Support</p>
                <p className="text-divine-ivory/80 text-sm">hello@prettyyani.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-divine-mystic-purple/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-divine-ivory/80 text-sm">
              © {currentYear} Pretty Yani. All rights reserved. Made with ♥ for the divine feminine.
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy" className="text-divine-ivory/80 hover:text-divine-gold transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-divine-ivory/80 hover:text-divine-gold transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-divine-ivory/80 hover:text-divine-gold transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
