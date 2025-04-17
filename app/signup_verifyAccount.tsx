import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useTheme } from '../theme/ThemeContent';
import Heading from '@/components/headings';
import { useRouter } from 'expo-router';
import ContinueButton from '@/components/continueButton';
import Cognito from '../aws/cognito';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SignUpScreenVerifyAccount = () => {
  const router = useRouter();
  const [isDisabled, setDisabled] = useState(false);
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
    textInput: {
        height: 50,
        marginBottom: 12,
        paddingVertical: 10,
        paddingHorizontal: 15, 
        borderWidth: 1,
        borderRadius: 10,
        borderColor: theme.primaryText,
        backgroundColor: '#bab8b8',
        fontSize: 16,
        textAlign: 'left',
        maxWidth: 250,
        width: 250,
        zIndex: 1,
      },
      inputText:{
        margin: 5,
      },
  });
  const [confirmationCode, setConfirmationCode] = useState('');
  const handleSignUpVerifyAccount = async () => {
    const email = await AsyncStorage.getItem('email');
    try {
      setDisabled(true);
      const verified = await Cognito.verifyAccount(confirmationCode, email);
      if (verified) {
        const password = await AsyncStorage.getItem('password');
        const login:any = await Cognito.signIn(email, password);
        console.log(login);
        AsyncStorage.setItem('idToken', login.idToken);
        AsyncStorage.setItem('userID', login.session.accessToken.payload.username);
        AsyncStorage.removeItem('password');
        console.log(login.idToken);
        router.replace('/signup_setFuelType');
      }
    } catch (error:any) {
      console.error("Verification failed:", error);
      Alert.alert('Login Failed', error.message || 'Something went wrong. Please try again.');
      setDisabled(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={[styles.container, { alignItems: 'center' }]}>
         
        <Heading level={1} style={{ marginTop: 97 }}>
            Verify Account
        </Heading>
        <Text style={styles.text}>Please Check Your Email For A Verification Code.</Text>
         <View>
            <Text style={[styles.inputText, { color: theme.primaryText }]}>Confirmation Code</Text>
            <TextInput
                    placeholder="Enter confirmation code"
                    value={confirmationCode}
                    onChangeText={setConfirmationCode}
                    keyboardType="numeric"
                    style={styles.textInput}
                    maxLength={6}
                    textContentType='oneTimeCode'
                  />
            </View>
        </View>
        <View style={styles.continueBtn}>
        <ContinueButton onPress={handleSignUpVerifyAccount} disabled={isDisabled}/>
        </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreenVerifyAccount;
