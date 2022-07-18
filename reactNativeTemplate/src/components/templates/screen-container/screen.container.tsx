import React from 'react';
import { ScrollView } from 'react-native';

type ScreenContainerProps = {
  children: React.ReactNode;
};

export const ScreenContainer: React.FC<ScreenContainerProps> = ({ children }) => {
  return <ScrollView>{children}</ScrollView>;
};
