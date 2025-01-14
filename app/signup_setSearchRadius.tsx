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

  const handleSetSearchRadius = () => {
    console.log({ searchRadius });
    router.replace('./signup_complete');
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={[styles.container, { alignItems: 'center' }]}>
        <Image
            source={require('../assets/images/FuelFinerIconTransparent.png')}
            style={styles.logo}
            resizeMode="contain"
        />
        <Heading level={1} style={{ marginTop: 20 }}>
            Set your search radius
        </Heading>
        <Text style={styles.text}>Choose the maximum distance the app will search for nearby fuel stations.</Text>
        <Slider
            style={{ width: 300, height: 40 }}
            minimumValue={5}
            maximumValue={100}
            minimumTrackTintColor="#2b93cf"
            maximumTrackTintColor="#c7c5c5"
            step={1} // Optional: Ensures the value changes in whole numbers
            value={searchRadius} // Set initial slider value
            onValueChange={(value) => setSearchRadius(value)} // Update state dynamically
        />
        <Text style={styles.text}>Search Radius: {searchRadius} km</Text>
        </View>
        <View style={styles.continueBtn}>
        <ContinueButton onPress={handleSetSearchRadius} />
        </View>
    </SafeAreaView>
  );
};

export default SignUpScreenSetFuelType;
