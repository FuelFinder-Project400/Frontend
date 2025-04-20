import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContent';

const Button = ({ level = 1, color = 'blue', style = {}, children, onPress }) => {
  const theme = useTheme();
  // Define styles
  const styles = StyleSheet.create({
    buttonContainer: {
      paddingVertical: 15,
      borderRadius: 30,
      alignItems: 'center',
      marginVertical: 10,
      borderColor: color,
      borderWidth: 3,
      backgroundColor: color + '90',
      width: '80%',
      margin: 15,
  
      // Shadow for iOS
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
  
      // Shadow for Android
      elevation: 5,
  },
    buttonText: {
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
      },
    buttonText1: {
      fontSize: 20,
    },
    buttonText2: {
      fontSize: 16,
    },
  });

  // Choose text style based on level
  const textStyle = [styles.buttonText, styles[`buttonText${level}`] || styles.buttonText1];

  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} onPress={onPress}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
