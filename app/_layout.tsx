import React from 'react';
import { ThemeProvider } from '../theme/ThemeContent'; // Adjust path as needed
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}/>
    </ThemeProvider>
  );
}
