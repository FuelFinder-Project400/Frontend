import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert, TextInput as RNTextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContent';
import Heading from '@/components/headings';
import TextInput from '../components/textInput';
import Checkbox from '../components/checkBox';
import ContinueButton from '../components/continueButton';
import { useRouter } from 'expo-router';
import Cognito from '../aws/cognito';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = () => {
  const router = useRouter();
  const theme = useTheme();
  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const isValidEmail = (email:string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password:string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };
  const handleCheckboxChange = (newCheckedState: boolean) => {
    setIsChecked(newCheckedState);
  };

  const handleContinueSignUp = async () => {
    setConfirmPasswordError('');
    setPasswordError('');
    setEmailError('');
    if(!isValidEmail){
      setEmailError('Please enter a valid email address.');
    }
    if(!isValidPassword(password)){
      setPasswordError('Password must contain at least\n1 uppercase letter,\n1 special character,\n1 number,\nand be 8+ characters.')
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }
    try {
      setDisabled(true);
      const result:any = await Cognito.signUp(email, password);
      console.log('SignUp success:', result);
      await AsyncStorage.setItem('email', result.user.username);
      await AsyncStorage.setItem('userID', result.userSub);
      await AsyncStorage.setItem('password', password);
      Keyboard.dismiss();
      router.replace('./signup_verifyAccount');
    } catch (err) {
      console.log('SignUp error:', err);
      setDisabled(false);
      Alert.alert('Error', `${err}`);
    }
  };

  const handleLoginInstead = () => {
    Keyboard.dismiss();
    router.replace('./login');
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: theme.background }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Heading level={1} style={{marginTop: 45}}>Sign Up</Heading>
            <Text style={[styles.text, { color: theme.primaryText }]}>Using Email</Text>

            <TextInput inputTitle="Email" inputType="email" value={email} onChangeText={setEmail} externalError={emailError}/>
            <TextInput inputTitle="Password" inputType="password" value={password} onChangeText={setPassword}/>
            <TextInput
              inputTitle="Confirm Password"
              inputType="confirmPassword"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              externalError={confirmPasswordError}
              />

            <Checkbox
              isTermsAndConditions={true}
              checked={isChecked}
              onChange={handleCheckboxChange}
              />

            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={handleLoginInstead}>
              <Text style={{
                color: theme.primaryText,
                padding: 48,
                fontWeight: 'bold',
                fontSize: 18,
                textDecorationLine: 'underline'
              }}>Or Login</Text>
            </TouchableOpacity>
          </ScrollView>
          </KeyboardAvoidingView>
        <View style={styles.continueBtn}>
          {isChecked && (
            <ContinueButton onPress={handleContinueSignUp} disabled={isDisabled}/>
          )}
        </View>
        </SafeAreaView>
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
    marginTop: -130,
  },
  continueBtn: {
    alignItems: 'flex-end',
    marginTop: -30,
    marginRight: 30,
    marginBottom: 20,
    height: '10%'
  }
});

export default SignUpScreen;
