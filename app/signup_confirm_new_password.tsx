import React, { useState } from 'react';
import { View, TextInput as RNTextInput , Text, StyleSheet, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useTheme } from '../theme/ThemeContent';
import Heading from '@/components/headings';
import { useRouter } from 'expo-router';
import ContinueButton from '@/components/continueButton';
import Cognito from '../aws/cognito';
import TextInput from '@/components/textInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ConfirmNewPassword = () => {
  const router = useRouter();
  const [isDisabled, setDisabled] = useState(false);
  const theme = useTheme();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
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
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  const [email, setEmail] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [password, setPassword] = useState('');
  const isValidEmail = (email:string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };
  const isValidPassword = (password:string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };
  const handleConfirmNewPassword = async () => {
    setEmailError('');
    if(!isValidEmail){
      setEmailError('Please enter a valid email address.');
      return;
    }
    if(!isValidPassword(password)){
      setPasswordError('Password must contain at least\n1 uppercase letter,\n1 special character,\n1 number,\nand be 8+ characters.');
      return;
    }
    try {
      setDisabled(true);
      await Cognito.confirmPassword(email, confirmationCode, password);
      await AsyncStorage.clear();
      router.replace('./login');

    } catch (error:any) {
      console.error("Error:", error);
      Alert.alert('Request Failed', error.message || 'Something went wrong. Please try again.');
      setDisabled(false);
    }
  };

  return (
 <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: theme.background }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Image
              source={require('../assets/images/FuelFinerIconTransparent.png')}
              style={styles.logo}
              resizeMode="contain"
            />
              <Heading level={1} style={{ marginTop: 10 }}>
                  Forgot Password
              </Heading>
              <Text style={styles.text}>Step (2/2)</Text>
              <TextInput inputTitle="Email" inputType="email" value={email} onChangeText={setEmail} externalError={emailError}/>
              <View>
                <Text style={[styles.inputText, { color: theme.primaryText }]}>Confirmation Code</Text>
                <RNTextInput
                        placeholder="Enter confirmation code"
                        value={confirmationCode}
                        onChangeText={setConfirmationCode}
                        keyboardType="numeric"
                        style={styles.textInput}
                        maxLength={6}
                        textContentType='oneTimeCode'
                      />
              </View>
              
              <TextInput inputTitle="Password" inputType="password" value={password} onChangeText={setPassword} externalError={passwordError}/>
              </ScrollView>
          </KeyboardAvoidingView>
        <View style={styles.continueBtn}>
            <ContinueButton onPress={handleConfirmNewPassword} disabled={isDisabled}/>
        </View>
        </SafeAreaView>
    </TouchableWithoutFeedback>
  )
};

export default ConfirmNewPassword;
