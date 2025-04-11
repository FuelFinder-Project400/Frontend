import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useTheme } from '../theme/ThemeContent';
import Heading from '@/components/headings';
import { useRouter } from 'expo-router';
import ContinueButton from '@/components/continueButton';
import Cognito from '../aws/cognito';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SignUpScreenSetFuelType = () => {
  const router = useRouter();


  const theme = useTheme();


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
  const [confirmationCode, setConfirmationCode] = useState('');
  const handleSignUpVerifyAccount = async () => {
    const email = await AsyncStorage.getItem('email');
    try {
      const verified = await Cognito.verifyAccount(confirmationCode, email);
      if (verified) {
        router.replace('/signup_setFuelType');
      }
    } catch (error) {
      console.error("Verification failed:", error);
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
            Verify Account
        </Heading>
        <Text style={styles.text}>Please Check Your Email For A Verification Code.</Text>
        <TextInput
          placeholder="Enter confirmation code"
          placeholderTextColor={'#000'}
          value={confirmationCode}
          onChangeText={setConfirmationCode}
          keyboardType="numeric"
          style={styles.textInput}
          maxLength={6}
        />
        </View>
        <View style={styles.continueBtn}>
        <ContinueButton onPress={handleSignUpVerifyAccount} />
        </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreenSetFuelType;
