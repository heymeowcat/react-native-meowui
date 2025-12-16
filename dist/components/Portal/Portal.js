import { useContext, useEffect, useRef } from 'react';
import { PortalContext } from './PortalContext';
import { PortalHost } from './PortalHost';
export const Portal = ({ children }) => {
    const manager = useContext(PortalContext);
    const keyRef = useRef(null);
    useEffect(() => {
        if (!manager) {
            console.warn('Portal: Context is missing. Make sure you are wrapping your app in MeowProvider or PortalHost.');
            return;
        }
        if (keyRef.current === null) {
            // Mount
            keyRef.current = manager.mount(children);
        }
        else {
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
Portal.Host = PortalHost;
