import React from 'react';
import { StyleSheet, TextInput as RNTextInput, View, Text } from 'react-native';
import { useTheme } from '../theme/ThemeContent';

const TextInput = ({ inputTitle = "blank", inputType = "default", value, onChangeText, externalError = '' }) => {
  const [error, setError] = React.useState('');
  const theme = useTheme();
  
  const styles = StyleSheet.create({
    input: {
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
    text: {
      margin: 5
    },
    errorText: {
      color: '#B3261E',
      fontSize: 12,
      fontWeight: 'bold',
      marginTop: -20,
      backgroundColor: '#e6bebc',
      borderRadius: 3,
      padding: 3,
      paddingTop: 20,
      borderColor: '#B3261E',
      borderWidth: 1,
      zIndex: 0,
      transitionDelay: 0.5,
    },
  });

  const getKeyboardType = () => {
    switch (inputType) {
      case 'numeric': return 'numeric';
      case 'email': return 'email-address';
      case 'phone': return 'phone-pad';
      default: return 'default';
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (text) => {
    onChangeText(text); // 👈 pass value to parent
    if (inputType === 'email') {
      setError(!isValidEmail(text) ? 'Please enter a valid email address.' : '');
    } else if (inputType === 'password' && inputTitle !== 'Confirm Password') {
      setError(!isValidPassword(text) ? 
        'Password must contain at least\n1 uppercase letter,\n1 special character,\n1 number,\nand be 8+ characters.' : '');
    } else {
      setError('');
    }
  };

  return (
    <View>
      <Text style={[styles.text, { color: theme.primaryText }]}>{inputTitle}</Text>
      <RNTextInput
        style={styles.input}
        onChangeText={handleChange}
        value={value}
        placeholder={inputTitle}
        placeholderTextColor={theme.primaryText}
        keyboardType={getKeyboardType()}
        secureTextEntry={inputType === 'password' || inputType === 'confirmPassword'}
      />
      {(error || externalError) && (
        <Text style={styles.errorText}>{error || externalError}</Text>
      )}
    </View>
  );
};

export default TextInput;
