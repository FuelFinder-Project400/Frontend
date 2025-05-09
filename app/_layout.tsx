import React, { useEffect, useRef } from 'react';
import { ThemeProvider } from '../theme/ThemeContent';
import { Stack } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { StatusBar, useColorScheme } from 'react-native';
enableScreens();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);
  const colourScheme = useColorScheme();
  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification Received:', notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification Clicked:', response);
    });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={colourScheme === 'dark' ? '#0d0d0d' : '#F5F5F5'} barStyle={colourScheme === 'dark' ? 'light-content' : 'dark-content'}/>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false, animation: 'fade', animationDuration: 0 }} />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
