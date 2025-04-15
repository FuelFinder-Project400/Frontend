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
      marginTop: 1,
      backgroundColor: '#e6bebc',
      borderRadius: 3,
      padding: 3,
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
  const getTextContentType = (inputType) => {
    if (inputType === 'password') {
      return 'none';
    } else if (inputType === 'confirmPassword'){
      return 'none';
    }
      else if (inputType === 'email') {
      return 'emailAddress';
    } else if (inputType === 'username') {
      return 'username';
    } else if (inputType === 'onetimepasscode'){
      return 'oneTimeCode';
    } 
    else {
      return 'none';
    }
  };
  const handleChange = (text) => {
    onChangeText(text);
    setError('');
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
        secureTextEntry={inputType === 'password' || inputType === 'confirmPassword' || inputType === 'login-password'}
        textContentType={getTextContentType(inputType)}
        autoCorrect={false}
      />
      <RNTextInput style={{height: 0.1}}/>
      {(error || externalError) && (
        <Text style={styles.errorText}>{error || externalError}</Text>
      )}
    </View>
  );
};

export default TextInput;
