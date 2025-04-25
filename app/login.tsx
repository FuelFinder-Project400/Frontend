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
import { useFuelStations } from '@/googleAPI/placesAPI';

const LoginScreen = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setDisabled] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { stations: searchedStations, errorMsg, refreshStations  } = useFuelStations();
  const handleLogin = async () => {
    Keyboard.dismiss();
    try {
      setDisabled(true);
      const login: any = await Cognito.signIn(email, password).catch(error => {

        setLoginError(error.message);

      });
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('userID', login.session.accessToken.payload.username);
      await AsyncStorage.setItem('idToken', login.idToken);
      await AsyncStorage.setItem('refreshToken', login.refreshToken);
      await GetUserToStorage(login.session.accessToken.payload.username);
      console.log(login.idToken);
      refreshStations();
      router.replace('./findfuel');
    } catch (error: any) {
      console.log('Login failed:', error);
      setDisabled(false);
    }
  };
  const handleSignUpInstead = () => {
    router.replace('./signup')
  }
  const handleForgotPassword = () => {
    router.push('./signup_forgot_password');
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: theme.background }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Heading level={1}>Login</Heading>
            <TextInput inputTitle="Email" inputType="email" value={email} onChangeText={setEmail}/>
            <TextInput inputTitle="Password" inputType="login-password" value={password} onChangeText={setPassword} externalError={loginError}/>
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={handleForgotPassword}>
              <Text style={{color: theme.primaryText, padding: 20, fontWeight: 'bold', fontSize: 18, textDecorationLine:'underline'}}>Forgot Password?</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={handleSignUpInstead}>
              <Text style={{color: theme.primaryText, padding: 30, fontWeight: 'bold', fontSize: 18, textDecorationLine:'underline'}}>Or Sign Up</Text>
            </TouchableOpacity>
          </ScrollView>  
        </KeyboardAvoidingView>
          <View style={styles.continueBtn}>
            <ContinueButton onPress={handleLogin} disabled={isDisabled}/>
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
    paddingBottom: 100,
  },
  logo: {
    width: 250,
    marginBottom: -100,
    marginTop: -173,
  },
  continueBtn: {
    alignItems: 'flex-end',
    marginTop: -30,
    marginRight: 30,
    marginBottom: 20,
    height:'10%'
  },
});

export default LoginScreen;
