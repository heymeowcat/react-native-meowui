/**
 * MeowUI AlertDialog
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
    /** Custom icon node instead of emoji */
    icon?: React.ReactNode;
}
export declare const AlertDialog: React.FC<AlertDialogProps>;
export default AlertDialog;
