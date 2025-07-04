import React, { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ChatWidget } from '../features/chat/ChatWidget';
import { ScrollToTop } from './ScrollToTop';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 relative">
        {children}
      </main>
      <Footer />
      
      {/* Floating Chat Widget */}
      <ChatWidget />
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
