import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { useTheme } from '../theme/ThemeContent';
import Heading from '@/components/headings';
import { useRouter } from 'expo-router';
import Slider from '@react-native-community/slider';
import ContinueButton from '@/components/continueButton';
const SignUpScreenSetFuelType = () => {
  const router = useRouter();
  const theme = useTheme();

  const [searchRadius, setSearchRadius] = useState(5); // Initialize state for the search radius

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 20,
    },
    text: {
      color: theme.primaryText,
      textAlign: 'center',
      fontSize: 16,
      margin: 20,
    },
    logo: {
      width: 250,
      marginBottom: -100,
      marginTop: -100,
    },
    buttonContainer: {
      marginTop: 20,
      width: '100%',
      alignItems: 'center',
    },
    continueBtn: {
        alignItems: 'flex-end',
        marginTop: -30,
        marginRight: 30,
        marginBottom: 20,
      },
  });

  const handleSignUpComplete = () => {
    console.log("Navigating to Home Screen");
    router.push('./homescreen');
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={[styles.container, { alignItems: 'center' }]}>
        <Image
            source={require('../assets/images/FuelFinerIconTransparent.png')}
            style={styles.logo}
            resizeMode="contain"
        />
        <Heading level={1} style={{ marginTop: 40 }}>
            Sign Up Complete
        </Heading>
        </View>
        <View style={styles.continueBtn}>
        <ContinueButton onPress={handleSignUpComplete} />
        </View>
    </SafeAreaView>
  );
};

export default SignUpScreenSetFuelType;
