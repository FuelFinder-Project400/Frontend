import React from 'react';
import { ThemeProvider } from '../theme/ThemeContent';
import { Stack } from 'expo-router';
export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false, animation: 'fade', animationDuration: 0 }}/>
    </ThemeProvider>
  );
}
