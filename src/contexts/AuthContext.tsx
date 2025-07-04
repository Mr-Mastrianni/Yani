import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginForm, RegisterForm } from '../types';

interface AuthContextType extends AuthState {
  login: (credentials: LoginForm) => Promise<void>;
  register: (userData: RegisterForm) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction = 
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_ERROR'; payload: string }
  | { type: 'REGISTER_START' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_PROFILE_SUCCESS'; payload: User }
  | { type: 'VERIFY_EMAIL_SUCCESS' }
  | { type: 'CLEAR_ERROR' };

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return { ...state, loading: true, error: null };
    
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null
      };
    
    case 'LOGIN_ERROR':
    case 'REGISTER_ERROR':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload
      };
    
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null
      };
    
    case 'UPDATE_PROFILE_SUCCESS':
      return {
        ...state,
        user: action.payload
      };
    
    case 'VERIFY_EMAIL_SUCCESS':
      return {
        ...state,
        user: state.user ? { ...state.user, isVerified: true } : null
      };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      // In a real app, you'd verify the token with the backend
      // and fetch user details based on the token.
      // For now, we'll just assume the user is authenticated if a token exists.
      dispatch({ type: 'LOGIN_SUCCESS', payload: { id: '1', email: 'user@example.com', username: 'testuser' } as User }); // Placeholder user
    }
  }, []);

  const login = async (credentials: LoginForm): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      localStorage.setItem('jwtToken', data.token);
      // In a real app, you'd decode the token or fetch user details
      dispatch({ type: 'LOGIN_SUCCESS', payload: { id: '1', email: credentials.email, username: credentials.email.split('@')[0] } as User });
    } catch (error) {
      dispatch({ 
        type: 'LOGIN_ERROR', 
        payload: error instanceof Error ? error.message : 'Login failed' 
      });
      throw error;
    }
  };

  const register = async (userData: RegisterForm): Promise<void> => {
    dispatch({ type: 'REGISTER_START' });
    
    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      localStorage.setItem('jwtToken', data.token);
      // In a real app, you'd decode the token or fetch user details
      dispatch({ type: 'REGISTER_SUCCESS', payload: { id: '1', email: userData.email, username: userData.username } as User });
    } catch (error) {
      dispatch({ 
        type: 'REGISTER_ERROR', 
        payload: error instanceof Error ? error.message : 'Registration failed' 
      });
      throw error;
    }
  };

  const logout = (): void => {
    localStorage.removeItem('jwtToken');
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = async (updates: Partial<User>): Promise<void> => {
    if (!state.user) throw new Error('No user logged in');
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = { ...state.user, ...updates };
      dispatch({ type: 'UPDATE_PROFILE_SUCCESS', payload: updatedUser });
    } catch (error) {
      throw new Error('Failed to update profile');
    }
  };

  const verifyEmail = async (token: string): Promise<void> => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you'd verify the token with the backend
      dispatch({ type: 'VERIFY_EMAIL_SUCCESS' });
    } catch (error) {
      throw new Error('Email verification failed');
    }
  };

  const requestPasswordReset = async (email: string): Promise<void> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists
    // const user = mockUsers.find(u => u.email === email);
    // if (!user) {
    //   throw new Error('User not found');
    // }
    
    // Simulate sending password reset email
    console.log(`Password reset email sent to ${email}`);
  };

  const resetPassword = async (token: string, password: string): Promise<void> => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you'd verify the token and update the password
      console.log('Password reset successful');
    } catch (error) {
      throw new Error('Password reset failed');
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    verifyEmail,
    requestPasswordReset,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
