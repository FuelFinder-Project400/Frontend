import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView
import { useTheme } from '../theme/ThemeContent';
import Heading from '@/components/headings';
import TextInput from '../components/textInput';
import ContinueButton from '../components/continueButton';

const SignUpScreen = () => {
  const theme = useTheme();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (newCheckedState: boolean) => {
    setIsChecked(newCheckedState); // Update the state based on checkbox change
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: theme.background }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <SafeAreaView style={styles.safeAreaContainer}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Image
              source={require('../assets/images/FuelFinerIconTransparent.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Heading level={1}>Login</Heading>
            <TextInput inputTitle="Email" inputType="email" />
            <TextInput inputTitle="Password" inputType="loginPassword" /> 
          </ScrollView>  
          <View style={styles.continueBtn}>
              <ContinueButton onPress={() => { /* Navigate to the next screen */ }} />
            </View>   
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100, // Add padding to the bottom to ensure button is visible
  },
  logo: {
    width: 250,
    marginBottom: -100,
    marginTop: -150,
  },
  continueBtn: {
    alignItems: 'flex-end',
    marginTop: -30,
    marginRight: 30,
    marginBottom: 20,
  },
});

export default SignUpScreen;
