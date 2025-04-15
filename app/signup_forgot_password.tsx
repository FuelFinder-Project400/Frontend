import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useTheme } from '../theme/ThemeContent';
import Heading from '@/components/headings';
import { useRouter } from 'expo-router';
import ContinueButton from '@/components/continueButton';
import Cognito from '../aws/cognito';
import TextInput from '@/components/textInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ForgotPassword = () => {
  const router = useRouter();
  const [isDisabled, setDisabled] = useState(false);
  const theme = useTheme();
  const [emailError, setEmailError] = useState('');
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
    textInput: {
      margin: 10,
      padding: 10,
      backgroundColor: '#FFF',
      fontSize: 20,
      color: '#000',
      width: 300,
      borderRadius: 10
    },
  });
  const [email, setEmail] = useState('');
  const isValidEmail = (email:string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };
  const handleForgotPassword = async () => {
    setEmailError('');
    if(!isValidEmail){
      setEmailError('Please enter a valid email address.');
      return;
    }
    try {
      setDisabled(true);
      await Cognito.forgotPassword(email);
      await AsyncStorage.setItem('email', email);
      router.replace('./signup_confirm_new_password');

    } catch (error:any) {
      console.error("Error:", error);
      Alert.alert('Request Failed', error.message || 'Something went wrong. Please try again.');
      setDisabled(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={[styles.container, { alignItems: 'center' }]}>
        <Image
            source={require('../assets/images/FuelFinerIconTransparent.png')}
            style={styles.logo}
            resizeMode="contain"
        />
        <Heading level={1} style={{ marginTop: 10 }}>
            Forgot Password
        </Heading>
        <Text style={styles.text}>Step (1/2)</Text>
        <TextInput inputTitle="Email" inputType="email" value={email} onChangeText={setEmail} externalError={emailError}/>
        </View>
        <View style={styles.continueBtn}>
        <ContinueButton onPress={handleForgotPassword} disabled={isDisabled}/>
        </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPassword;
