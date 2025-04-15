import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContent';
import Heading from '@/components/headings';
import TextInput from '../components/textInput';
import ContinueButton from '../components/continueButton';
import { router } from 'expo-router';
import Cognito from '../aws/cognito';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetUserToStorage } from '@/aws/api';

const LoginScreen = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setDisabled] = useState(false);
  const handleLogin = async () => {
    Keyboard.dismiss();
    try {
      setDisabled(true);
      const login: any = await Cognito.signIn(email, password);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('userID', login.session.accessToken.payload.username);
      await AsyncStorage.setItem('idToken', login.idToken);
      await AsyncStorage.setItem('refreshToken', login.refreshToken);
      await GetUserToStorage(login.session.accessToken.payload.username);
      console.log(login.idToken);
      router.replace('./findfuel');
    } catch (error: any) {
      console.error('Login failed:', error);
      Alert.alert('Login Failed', error.message || 'Something went wrong. Please try again.');
      setDisabled(false);
    }
  };
  const handleSignUpInstead = () => {
    router.replace('./signup')
  }
  const handleForgotPassword = () => {
    router.replace('./signup_forgot_password');
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
            <Heading level={1}>Login</Heading>
            <TextInput inputTitle="Email" inputType="email" value={email} onChangeText={setEmail} />
            <TextInput inputTitle="Password" inputType="login-password" value={password} onChangeText={setPassword} />
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={handleForgotPassword}>
              <Text style={{color: theme.primaryText, padding: 20, fontWeight: 'bold', fontSize: 18, textDecorationLine:'underline'}}>Forgot Password?</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={handleSignUpInstead}>
              <Text style={{color: theme.primaryText, padding: 48, fontWeight: 'bold', fontSize: 18, textDecorationLine:'underline'}}>Or Sign Up</Text>
            </TouchableOpacity>
          </ScrollView>  
          <View style={styles.continueBtn}>
              <ContinueButton onPress={handleLogin} disabled={isDisabled}/>
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
    paddingBottom: 100,
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

export default LoginScreen;
