"use client";

import { useEffect } from "react";

/**
 * Development-specific service worker utilities
 * Handles common development issues like HTTPS certificate problems
 */

export function useServiceWorkerDev() {
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    // Check if we're in a problematic development environment
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const isHttps = window.location.protocol === 'https:';

    if (isLocalhost && isHttps && 'serviceWorker' in navigator) {
      // Try to register service worker with better error handling for dev
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered successfully in dev mode:', registration);
        })
        .catch((error) => {
          console.warn('Service Worker registration failed in dev mode:', error);
          
          // Provide helpful information for developers
          if (error.message?.includes('SSL') || error.message?.includes('certificate') || error.message?.includes('net::ERR_CERT')) {
            console.info(`
Development Mode Service Worker Issue:
- This error is likely due to self-signed HTTPS certificates in development
- The app will continue to work normally without service worker features
- To resolve: Accept the certificate warning or use HTTP in development
- In production, this won't be an issue with proper SSL certificates
            `);
          }
        });
    }
  }, []);
}