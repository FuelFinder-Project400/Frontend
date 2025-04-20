import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { Image, SafeAreaView,StyleSheet } from 'react-native';
import { router } from "expo-router";
import { useTheme } from '../theme/ThemeContent';


export default function OnboardingScreen() {
    const theme = useTheme();
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.background
        },
    });
  return (
    <SafeAreaView style={styles.container}>

    <Onboarding
      onDone={() => router.replace('./findfuel')}
      onSkip={() => router.replace('./findfuel')}
      pages={[
          {
              backgroundColor: theme.background,
              image: (
                  <Image
                  source={require('../assets/images/OnboardingScreen1.png')}
                  style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'cover',
                    }}
                    />
                ),
                title: 'Welcome to FuelFinder',
                subtitle: 'The smartest way to find the cheapest fuel near you',
            },

    {
        backgroundColor: theme.background,
        image: (
            <Image
            source={require('../assets/images/OnboardingScreen2.png')}
            style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
            }}
            />
        ),
        title: 'Get Notified',
        subtitle: 'Be the first to know when fuel prices drop',
    },
    {
        backgroundColor: theme.background,
        image: (
            <Image
            source={require('../assets/images/OnboardingScreen5.png')}
            style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
            }}
            />
        ),
        title: 'Get Notified',
        subtitle: 'Be the first to know when fuel prices drop',
    },
    {
        backgroundColor: theme.background,
        image: (
            <Image
            source={require('../assets/images/OnboardingScreen6.png')}
            style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
            }}
            />
        ),
        title: 'Get Notified',
        subtitle: 'Be the first to know when fuel prices drop',
    },
    {
        backgroundColor: theme.background,
        image: (
            <Image
            source={require('../assets/images/OnboardingScreen7.png')}
            style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
            }}
            />
        ),
        title: 'Get Notified',
        subtitle: 'Be the first to know when fuel prices drop',
    },
    {
        backgroundColor: theme.background,
        image: (
            <Image
            source={require('../assets/images/OnboardingScreen4.png')}
            style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
            }}
            />
        ),
        title: 'Let’s Get Started',
        subtitle: 'Sign in and start saving today!',
    }
]}
/>
</SafeAreaView>
  );
}
