import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../theme/ThemeContent';

const InitialScreen = () => {
  const router = useRouter();
  const theme = useTheme();

  const handleLogin = () => {
    console.log('Navigate to Login Screen');
    router.replace('./login');
  };

  const handleSignUp = () => {
    console.log('Navigate to Sign Up Screen');
    router.replace('./signup');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Logo */}
      <Image
        source={require('../assets/images/FuelFinerIconTransparent.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: theme.primaryButton },
          ]}
          onPress={handleLogin}
        >
          <Text style={[styles.buttonText, { color: theme.primaryText }]}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            styles.signUpButton,
            {
              backgroundColor: theme.secondaryButton,
              borderColor: theme.border,
            },
          ]}
          onPress={handleSignUp}
        >
          <Text
            style={[
              styles.buttonText,
              styles.signUpButtonText,
              { color: theme.secondaryText },
            ]}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
  buttonContainer: {
    width: '80%',
  },
  button: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpButton: {
    borderWidth: 2,
  },
  signUpButtonText: {
    fontWeight: 'bold',
  },
});

export default InitialScreen;
