import React from 'react';
import { Text } from 'react-native';

interface LabelProps {
  children: React.ReactNode;
  className?: string;
}

export const Label = ({ children, className = '' }: LabelProps) => (
  <Text className={`text-[10px] uppercase tracking-widest font-mono text-neutral-500 ${className}`}>
    {children}
  </Text>
);
