import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { useTheme } from '../theme/ThemeContent';
import Heading from '@/components/headings';
import { useRouter } from 'expo-router';
import ContinueButton from '@/components/continueButton';
import {postUserFromStorage} from '../aws/api';
import {registerForPushNotificationsAsync} from '@/notifications/pushNotifications';
import Cognito from '../aws/cognito';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreenSetFuelType = () => {
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
  });

  const handleSignUpComplete = async () => {
    console.log("Navigating to Home Screen");
    setDisabled(true);
    const requst = await postUserFromStorage();
    if(requst){
      router.replace('./onboarding'); //To be changed to onboarding screens.
    }
    setDisabled(false);
  };
  return (
    <SafeAreaView style={styles.container}>
        <View style={[styles.container, { alignItems: 'center' }]}>
         
        <Heading level={1} style={{ marginTop: 97 }}>
            Sign Up Complete
        </Heading>
        <Text style={{color: theme.primaryText, fontSize: 18, marginVertical: 40}}>We hope you enjoy using our app!</Text>
        </View>
        <View style={styles.continueBtn}>
        <ContinueButton onPress={handleSignUpComplete} disabled={isDisabled}/>
        </View>
    </SafeAreaView>
  );
};

export default SignUpScreenSetFuelType;
