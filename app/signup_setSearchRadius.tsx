import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { useTheme } from '../theme/ThemeContent';
import Heading from '@/components/headings';
import { useRouter } from 'expo-router';
import Slider from '@react-native-community/slider';
import ContinueButton from '@/components/continueButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SignUpScreenSetFuelType = () => {
  const router = useRouter();
  const theme = useTheme();

  const [searchRadius, setSearchRadius] = useState(5);
  const [isDisabled, setIsDisabled] = useState(false);
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
      marginTop: -149,
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
        height:'10%'
      },
    infoText: {
      margin: 20,
      marginBottom:40,
      textAlign: 'center',
      color: theme.primaryText + '66',
    },
  });

  const handleSetSearchRadius = () => {
    console.log({ searchRadius });
    AsyncStorage.setItem('searchRadius', `${searchRadius}`);
    router.replace('./signup_complete');
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={[styles.container, { alignItems: 'center' }]}>
         
        <Heading level={1} style={{ marginTop: 97 }}>
            Set your search radius
        </Heading>
        <Text style={styles.text}>Choose the maximum distance the app will search for nearby fuel stations.</Text>
        <Slider
            style={{ width: 300, height: 40 }}
            minimumValue={1}
            maximumValue={30}
            minimumTrackTintColor="#ffac36"
            maximumTrackTintColor="#c7c5c5"
            step={1}
            value={searchRadius}
            onValueChange={(value) => setSearchRadius(value)}
        />
        <Text style={styles.text}>Search Radius: {searchRadius} km</Text>
        </View>
        <Heading level={5} style={styles.infoText}>Please Note That All Preferences Can Be Changed Later.</Heading>
        <View style={styles.continueBtn}>
        <ContinueButton onPress={handleSetSearchRadius} disabled={isDisabled}/>
        </View>
    </SafeAreaView>
  );
};

export default SignUpScreenSetFuelType;
