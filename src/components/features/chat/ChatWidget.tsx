import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Minimize2,
  Maximize2,
  Star,
  Heart
} from 'lucide-react';
import { useChat } from '../../../contexts/ChatContext';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { ScrollArea } from '../../ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Badge } from '../../ui/badge';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { 
    activeSession, 
    isTyping, 
    connected, 
    sendMessage, 
    startNewSession, 
    escalateToHuman 
  } = useChat();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeSession?.messages, isTyping]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleOpenChat = () => {
    setIsOpen(true);
    if (!activeSession) {
      startNewSession();
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const messageContent = message;
    setMessage('');
    await sendMessage(messageContent);
  };

  const formatMessageContent = (content: string) => {
    // Simple markdown-like formatting
    return content
      .split('\n')
      .map((line, index) => {
        // Bold text
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Bullet points
        if (line.startsWith('•') || line.startsWith('-')) {
          line = `<li class="ml-4">${line.substring(1).trim()}</li>`;
        }
        return <div key={index} dangerouslySetInnerHTML={{ __html: line }} />;
      });
  };

  if (!isOpen) {
    return (
      <motion.button
        onClick={handleOpenChat}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-divine rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <MessageCircle className="w-6 h-6 text-divine-ivory" />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-divine-gold rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-divine-ivory rounded-full animate-pulse"></div>
        </div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-divine-burgundy text-divine-ivory text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat with Luna, your wellness guide ✨
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-divine-burgundy"></div>
        </div>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, x: 100, y: 100 }}
      animate={{ 
        scale: 1, 
        opacity: 1, 
        x: 0, 
        y: 0,
        width: isMinimized ? 320 : 400,
        height: isMinimized ? 60 : 600
      }}
      className="fixed bottom-6 right-6 z-50 bg-divine-ivory rounded-2xl shadow-2xl border border-divine-rose-gold/20 overflow-hidden"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Header */}
      <div className="bg-gradient-divine text-divine-ivory p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="w-10 h-10 border-2 border-divine-ivory">
              <AvatarImage src="/images/avatars/luna-ai.jpg" />
              <AvatarFallback className="bg-divine-gold text-divine-burgundy">
                <Bot className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-divine-ivory ${
              connected ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
          </div>
          <div>
            <h3 className="font-divine font-semibold">Luna</h3>
            <p className="text-xs text-divine-ivory/80">
              {connected ? 'Your Wellness Guide' : 'Reconnecting...'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-divine-ivory/20 rounded"
          >
            {isMinimized ? (
              <Maximize2 className="w-4 h-4" />
            ) : (
              <Minimize2 className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-divine-ivory/20 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex flex-col h-[520px]"
          >
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {activeSession?.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.sender === 'ai' && (
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarFallback className="bg-gradient-divine text-divine-ivory">
                          <Bot className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.sender === 'user'
                          ? 'bg-gradient-divine text-divine-ivory'
                          : 'bg-divine-cream text-divine-burgundy'
                      }`}
                    >
                      <div className="text-sm leading-relaxed">
                        {formatMessageContent(msg.content)}
                      </div>
                      
                      {msg.type === 'product_recommendation' && msg.metadata?.products && (
                        <div className="mt-3 space-y-2">
                          {msg.metadata.products.slice(0, 2).map((productId) => (
                            <div 
                              key={productId}
                              className="bg-divine-ivory/20 rounded-lg p-2 text-xs"
                            >
                              <div className="flex items-center gap-2">
                                <Heart className="w-3 h-3" />
                                <span>Product recommendation</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="text-xs opacity-70 mt-2">
                        {new Date(msg.timestamp).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>

                    {msg.sender === 'user' && (
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarFallback className="bg-divine-burgundy text-divine-ivory">
                          <User className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback className="bg-gradient-divine text-divine-ivory">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-divine-cream text-divine-burgundy rounded-2xl px-4 py-3">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-divine-burgundy rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-divine-burgundy rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-divine-burgundy rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Quick Actions */}
            <div className="px-4 py-2 border-t border-divine-rose-gold/20">
              <div className="flex gap-2 flex-wrap">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => sendMessage("I need product recommendations")}
                  className="text-xs"
                >
                  Product Help
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => sendMessage("Tell me about yoni steaming")}
                  className="text-xs"
                >
                  Wellness Info
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={escalateToHuman}
                  className="text-xs"
                >
                  Human Support
                </Button>
              </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-divine-rose-gold/20">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask Luna about wellness, products, or sacred practices..."
                  className="flex-1 bg-divine-cream border-divine-rose-gold focus:border-divine-burgundy"
                  disabled={!connected}
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  className="bg-gradient-divine hover:opacity-90"
                  disabled={!message.trim() || !connected}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-divine-burgundy/60 mt-2">
                Luna is here to help with wellness guidance and product recommendations ✨
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
