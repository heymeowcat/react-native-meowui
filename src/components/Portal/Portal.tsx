import React, { useContext, useEffect, useState, useRef } from 'react';
import { PortalContext } from './PortalContext';
import { PortalHost } from './PortalHost';

export interface PortalProps {
  children: React.ReactNode;
}

export const Portal = ({ children }: PortalProps) => {
  const manager = useContext(PortalContext);
  const keyRef = useRef<number | null>(null);

  useEffect(() => {
    if (!manager) {
      console.warn('Portal: Context is missing. Make sure you are wrapping your app in MeowProvider or PortalHost.');
      return;
    }

    if (keyRef.current === null) {
      // Mount
      keyRef.current = manager.mount(children);
    } else {
      // Update
      manager.update(keyRef.current, children);
    }

    return () => {
      // Unmount
      if (keyRef.current !== null) {
        manager.unmount(keyRef.current);
        keyRef.current = null;
      }
    };
  }, [manager, children]);

  return null;
};

// attach Host to Portal for convenient access like Portal.Host
(Portal as any).Host = PortalHost;
