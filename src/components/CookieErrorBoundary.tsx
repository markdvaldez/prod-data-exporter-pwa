'use client';

import { Component, ReactNode } from 'react';
import { clearAllCookies } from '@/services/aws/simplifiedCookieStorage';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class CookieErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Check if the error is related to cookie/header size issues
    const isCookieError = 
      error.message.includes('400') ||
      error.message.includes('Bad Request') ||
      error.message.includes('Cookie') ||
      error.message.includes('Header') ||
      error.message.includes('Too Large');

    return { hasError: isCookieError, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Cookie Error Boundary caught an error:', error, errorInfo);
    
    // If it's a cookie-related error, try to clean up cookies
    if (this.state.hasError) {
      this.handleCookieCleanup();
    }
  }

  handleCookieCleanup = async () => {
    try {
      await clearAllCookies();
      console.log('Cookies cleared due to error. Please refresh the page.');
      
      // Show user-friendly message
      if (typeof window !== 'undefined') {
        window.alert('There was an issue with stored data. Please refresh the page to continue.');
        window.location.reload();
      }
    } catch (cleanupError) {
      console.error('Failed to clean up cookies:', cleanupError);
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-xl font-semibold mb-4">Something went wrong</h1>
            <p className="text-center mb-4">
              There was an issue with stored authentication data. 
              Please refresh the page to continue.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Refresh Page
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}