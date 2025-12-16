import React from 'react';
export interface PortalMethods {
    mount: (children: React.ReactNode) => number;
    update: (key: number, children: React.ReactNode) => void;
    unmount: (key: number) => void;
}
export declare const PortalContext: React.Context<PortalMethods | null>;
