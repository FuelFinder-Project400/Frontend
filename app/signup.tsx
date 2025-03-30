import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContent';
import Heading from '@/components/headings';
import TextInput from '../components/textInput';
import Checkbox from '../components/checkBox';
import ContinueButton from '../components/continueButton';
import { useRouter } from 'expo-router';

const SignUpScreen = () => {
  const router = useRouter();
  const theme = useTheme();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (newCheckedState: boolean) => {
    setIsChecked(newCheckedState);
  };
  const handleContinueSignUp = () => {
    console.log('Navigate to Set Fuel Type');
    router.replace('./signup_setFuelType');
  };
  const handleLoginInstead = () => {
    router.replace('./login');
  }
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
            <Heading level={1}>Sign Up</Heading>
            <Text style={[styles.text, { color: theme.primaryText }]}>Using Email</Text>
            <TextInput inputTitle="Email" inputType="email" />
            <TextInput inputTitle="Password" inputType="password" />
            <TextInput inputTitle="Confirm Password" inputType="confirmPassword" />
            <Checkbox
              isTermsAndConditions={true}
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={handleLoginInstead}>
              <Text style={{color: theme.primaryText, padding: 48, fontWeight: 'bold', fontSize: 18, textDecorationLine:'underline'}}>Or Login</Text>
            </TouchableOpacity>
          </ScrollView>

          {isChecked && (
            <View style={styles.continueBtn}>
              <ContinueButton onPress={handleContinueSignUp} />
            </View>
          )}
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
  },
  text: {
    fontSize: 16,
    margin: 10,
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
