import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { ChatMessage, ChatSession, ChatState } from '../types';
import { mockProducts } from '../data/mockData';

interface ChatContextType extends ChatState {
  sendMessage: (content: string) => Promise<void>;
  startNewSession: () => void;
  clearChat: () => void;
  escalateToHuman: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

type ChatAction = 
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'SET_CONNECTED'; payload: boolean }
  | { type: 'START_NEW_SESSION'; payload: ChatSession }
  | { type: 'CLEAR_CHAT' }
  | { type: 'UPDATE_SESSION'; payload: ChatSession };

const initialState: ChatState = {
  sessions: [],
  activeSession: null,
  isTyping: false,
  connected: true
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'ADD_MESSAGE': {
      if (!state.activeSession) return state;
      
      const updatedSession = {
        ...state.activeSession,
        messages: [...state.activeSession.messages, action.payload],
        updated_at: new Date()
      };
      
      return {
        ...state,
        activeSession: updatedSession,
        sessions: state.sessions.map(session => 
          session.id === updatedSession.id ? updatedSession : session
        )
      };
    }
    
    case 'SET_TYPING':
      return { ...state, isTyping: action.payload };
    
    case 'SET_CONNECTED':
      return { ...state, connected: action.payload };
    
    case 'START_NEW_SESSION':
      return {
        ...state,
        activeSession: action.payload,
        sessions: [...state.sessions, action.payload]
      };
    
    case 'CLEAR_CHAT':
      return {
        ...state,
        activeSession: null,
        sessions: []
      };
    
    case 'UPDATE_SESSION':
      return {
        ...state,
        activeSession: action.payload,
        sessions: state.sessions.map(session => 
          session.id === action.payload.id ? action.payload : session
        )
      };
    
    default:
      return state;
  }
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedSessions = localStorage.getItem('prettyYaniChatSessions');
    if (savedSessions) {
      try {
        const sessions = JSON.parse(savedSessions);
        if (sessions.length > 0) {
          const activeSession = sessions[sessions.length - 1];
          dispatch({ type: 'START_NEW_SESSION', payload: activeSession });
        }
      } catch (error) {
        console.error('Failed to load chat history:', error);
      }
    }
  }, []);

  // Save sessions to localStorage
  useEffect(() => {
    if (state.sessions.length > 0) {
      localStorage.setItem('prettyYaniChatSessions', JSON.stringify(state.sessions));
    }
  }, [state.sessions]);

  const generateAIResponse = async (userMessage: string): Promise<ChatMessage> => {
    // Simulate thinking delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const messageContent = userMessage.toLowerCase();
    let response = '';
    let type: ChatMessage['type'] = 'text';
    const metadata: ChatMessage['metadata'] = {};

    // AI response logic based on keywords and context
    if (messageContent.includes('product') || messageContent.includes('recommend')) {
      const relevantProducts = mockProducts.filter(product => 
        messageContent.includes(product.name.toLowerCase()) ||
        messageContent.includes(product.category.toLowerCase()) ||
        product.benefits.some(benefit => 
          messageContent.includes(benefit.toLowerCase())
        )
      );

      if (relevantProducts.length > 0) {
        response = `Based on your needs, I'd recommend these divine products:\n\n${relevantProducts.map(product => 
          `✨ **${product.name}** - ${product.description.slice(0, 100)}...`
        ).join('\n\n')}\n\nWould you like more details about any of these sacred offerings?`;
        type = 'product_recommendation';
        metadata.products = relevantProducts.map(p => p.id);
      } else {
        response = `I'd be happy to help you find the perfect products for your goddess journey! Our collection includes:\n\n🌹 Sacred cleansing bars for gentle intimate care\n🌿 Therapeutic steam blends for healing rituals\n💧 Intimate oils for sacred union\n🌙 Luxurious body scrubs for goddess radiance\n\nWhat specific wellness goals are you focusing on?`;
      }
    } else if (messageContent.includes('yoni steam') || messageContent.includes('steam')) {
      response = `Yoni steaming is a beautiful ancient practice! Our Divine Detox Steam Blend is perfect for beginners and experienced practitioners alike. 🌿\n\n**Benefits:**\n• Supports natural detoxification\n• Promotes circulation\n• Soothes inflammation\n• Enhances spiritual connection\n\n**Safety tips:**\n• Never steam during menstruation\n• Ensure comfortable temperature\n• Steam for 15-20 minutes max\n• Create a sacred space for your ritual\n\nWould you like guidance on how to perform your first steaming ritual?`;
      type = 'educational';
    } else if (messageContent.includes('cycle') || messageContent.includes('period') || messageContent.includes('menstrual')) {
      response = `Your menstrual cycle is a sacred gift, beautiful goddess! 🌙 Each phase offers unique wisdom and power:\n\n**Menstrual Phase (Days 1-5)** - Time for rest and reflection\n**Follicular Phase (Days 1-13)** - Energy for new beginnings\n**Ovulatory Phase (Days 14-21)** - Peak power and magnetism\n**Luteal Phase (Days 15-28)** - Completion and preparation\n\nOur products can support each phase of your divine cycle. Would you like personalized recommendations based on where you are in your cycle?`;
      type = 'educational';
    } else if (messageContent.includes('goddess') || messageContent.includes('archetype')) {
      response = `Every woman embodies a unique goddess archetype! 🌟 Discovering yours can deepen your self-understanding and spiritual practice.\n\n**The 8 Goddess Archetypes:**\n• Warrior - Bold and fearless\n• Nurturing - Caring and supportive\n• Wise - Thoughtful and intuitive\n• Creative - Artistic and expressive\n• Mystic - Spiritual and mysterious\n• Healer - Compassionate and service-oriented\n• Guardian - Protective and loyal\n• Wild - Free-spirited and authentic\n\nWhich archetype resonates most with you? I can help you explore products and practices aligned with your divine essence!`;
      type = 'educational';
    } else if (messageContent.includes('help') || messageContent.includes('support')) {
      response = `I'm here to support your divine feminine journey in every way! 💕 I can help you with:\n\n🌟 Product recommendations for your wellness goals\n🌿 Education about feminine health and sacred practices\n🌙 Guidance on rituals and self-care routines\n📚 Information about our community and resources\n🛍️ Order assistance and product details\n\nIf you need more personalized support, I can connect you with one of our wellness advocates. What would be most helpful for you today?`;
      type = 'support';
    } else if (messageContent.includes('price') || messageContent.includes('cost') || messageContent.includes('buy')) {
      response = `Our sacred products are lovingly crafted with the finest organic ingredients and priced to honor their quality:\n\n🌹 Sacred Rose Cleansing Bar - $28.99\n🌿 Divine Detox Steam Blend - $42.00\n💧 Goddess Glow Intimate Oil - $35.50\n🌙 Moonlight Body Scrub - $32.00\n\nWe offer free shipping on orders over $75 and our Goddess Circle members receive 15% off all products. Would you like to learn more about our membership program?`;
    } else if (messageContent.includes('order') || messageContent.includes('shipping')) {
      response = `We process orders with divine care! 📦✨\n\n**Shipping Information:**\n• Free shipping on orders $75+\n• Standard shipping: 3-5 business days\n• Express shipping: 1-2 business days\n• Sacred packaging with love notes included\n\n**Order Processing:**\n• Orders placed by 2 PM ship same day\n• Weekend orders ship Monday\n• Track your order through your goddess dashboard\n\nDo you have questions about a specific order or need help placing one?`;
    } else {
      // Default friendly response
      const responses = [
        `Welcome to Pretty Yani, beautiful goddess! 🌹 I'm here to guide you on your divine feminine wellness journey. How can I support you today?`,
        `Hello, sacred sister! ✨ I'm delighted you're here. Whether you're seeking product recommendations, wellness guidance, or just want to chat about your goddess journey, I'm here for you.`,
        `Greetings, divine one! 🌙 Your presence here shows your commitment to honoring your sacred feminine essence. What brings you to our magical realm today?`,
        `Beautiful soul, welcome! 💕 I'm here to help you discover the perfect products and practices for your unique goddess path. What's calling to your heart today?`
      ];
      response = responses[Math.floor(Math.random() * responses.length)];
    }

    return {
      id: `ai_${Date.now()}`,
      content: response,
      sender: 'ai',
      timestamp: new Date(),
      type,
      metadata
    };
  };

  const sendMessage = async (content: string): Promise<void> => {
    if (!state.activeSession) {
      startNewSession();
    }

    // Add user message
    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
    dispatch({ type: 'SET_TYPING', payload: true });

    try {
      // Generate AI response
      const aiResponse = await generateAIResponse(content);
      dispatch({ type: 'SET_TYPING', payload: false });
      dispatch({ type: 'ADD_MESSAGE', payload: aiResponse });
    } catch (error) {
      dispatch({ type: 'SET_TYPING', payload: false });
      const errorMessage: ChatMessage = {
        id: `error_${Date.now()}`,
        content: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment, or feel free to contact our support team directly.',
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
      dispatch({ type: 'ADD_MESSAGE', payload: errorMessage });
    }
  };

  const startNewSession = (): void => {
    const newSession: ChatSession = {
      id: `session_${Date.now()}`,
      messages: [{
        id: `welcome_${Date.now()}`,
        content: 'Welcome to Pretty Yani, beautiful goddess! 🌹 I\'m Luna, your AI wellness guide. I\'m here to help you discover sacred products, learn about feminine wellness, and support your divine journey. How can I assist you today?',
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      }],
      created_at: new Date(),
      updated_at: new Date(),
      status: 'active'
    };

    dispatch({ type: 'START_NEW_SESSION', payload: newSession });
  };

  const clearChat = (): void => {
    dispatch({ type: 'CLEAR_CHAT' });
    localStorage.removeItem('prettyYaniChatSessions');
  };

  const escalateToHuman = (): void => {
    if (!state.activeSession) return;

    const escalationMessage: ChatMessage = {
      id: `escalation_${Date.now()}`,
      content: 'I\'ve connected you with one of our wellness advocates who will be with you shortly. They\'ll have access to our conversation so far. In the meantime, feel free to continue asking questions!',
      sender: 'ai',
      timestamp: new Date(),
      type: 'support'
    };

    dispatch({ type: 'ADD_MESSAGE', payload: escalationMessage });

    const updatedSession = {
      ...state.activeSession,
      status: 'escalated' as const
    };

    dispatch({ type: 'UPDATE_SESSION', payload: updatedSession });
  };

  const value: ChatContextType = {
    ...state,
    sendMessage,
    startNewSession,
    clearChat,
    escalateToHuman
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat(): ChatContextType {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
