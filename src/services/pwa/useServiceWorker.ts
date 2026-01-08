"use client";

import Cookies from "js-cookie";
import { useDebugValue, useEffect, useRef, useState } from "react";
import { Workbox } from "workbox-window";

type TServiceWorkerConfig = {
  path: string;
  scope: string;
  enable: boolean;
  enableReload: boolean;
  updateCookieName: string;
};
const DEFAULT_CONFIG: TServiceWorkerConfig = {
  path: "/sw.js",
  scope: "/",
  enable: true,
  enableReload: true,
  updateCookieName: "sw_update",
};

export function useServiceWorker({
  path,
  scope,
  enable,
  enableReload,
  updateCookieName,
} = DEFAULT_CONFIG) {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const wb = useRef<Workbox>(null);
  const shouldReload = useRef(false);

  useDebugValue({ enable, enableReload });

  function hideUpdatePrompt() {
    setShowUpdatePrompt(false);
  }

  /* On user click: tell the service worker to skip waiting and activate itself */
  function update() {
    wb.current!.messageSkipWaiting();
    setShowUpdatePrompt(false);
    shouldReload.current = true;
  }

  useEffect(() => {
    let worker: Workbox;

    /**
     * service worker is waiting to be activated
     * show reload prompt if enabled
     *  */
    function swWaiting() {
      if (enableReload) {
        setShowUpdatePrompt(true);
      }
    }

    /**
     * Service worker has taken the control of the page
     * reload the window
     */

    function swControlling(_evt: unknown) {
      if (shouldReload.current) {
        Cookies.set(updateCookieName, "1");
        window.location.reload();
      }
    }

    /**
     * Handle service worker registration errors
     */
    function swError(error: Error) {
      console.warn("Service worker registration failed:", error);
      
      // Check if this is a development environment with HTTPS
      const isDev = process.env.NODE_ENV === 'development';
      const isLocalhost = typeof window !== 'undefined' && 
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
      const isHttps = typeof window !== 'undefined' && window.location.protocol === 'https:';
      
      if (isDev && isLocalhost && isHttps) {
        console.info("Note: Service worker registration failures in development mode with HTTPS are often due to self-signed certificates. This is expected behavior and the app will work normally.");
      }
    }

    if (enable && "serviceWorker" in navigator) {
      try {
        // Check if workbox is available from the PWA plugin
        if (typeof window !== 'undefined' && window.workbox) {
          // Use the workbox instance from the PWA plugin
          worker = window.workbox;
          worker.addEventListener("waiting", swWaiting);
          worker.addEventListener("controlling", swControlling);
          
          // Register using the PWA plugin's workbox
          window.workbox.register().catch((error: Error) => {
            swError(error);
          });
        } else {
          // Fallback to manual Workbox registration
          worker = new Workbox(path, { scope });
          worker.addEventListener("waiting", swWaiting);
          worker.addEventListener("controlling", swControlling);
          
          // Add error handling
          worker.register().catch((error) => {
            swError(error);
          });
        }

        wb.current = worker;
      } catch (error) {
        swError(error as Error);
      }
    }

    return () => {
      if (worker) {
        worker.removeEventListener("waiting", swWaiting);
        worker.removeEventListener("controlling", swControlling);
      }
    };
  }, [path, scope, enable, enableReload, updateCookieName]);

  return [showUpdatePrompt, hideUpdatePrompt, update] as const;
}
