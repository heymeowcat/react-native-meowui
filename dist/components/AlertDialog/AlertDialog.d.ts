/**
 * MeowUI AlertDialog Component
 * Modal alert with MeowUI styling
 */
import React from 'react';
export interface AlertDialogProps {
    visible: boolean;
    onDismiss: () => void;
    title: string;
    content?: string;
    children?: React.ReactNode;
    actions?: {
        label: string;
        onPress: () => void;
        variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    }[];
    icon?: string;
}
export declare const AlertDialog: React.FC<AlertDialogProps>;
export default AlertDialog;
