import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContent';

const Button = ({ level = 1, color = 'blue', style = {}, children, onPress }) => {
  const theme = useTheme();
  const textColor = color === 'black' ? '#fff' : theme.primaryText || '#000';
  // Define styles
  const styles = StyleSheet.create({
        buttonContainer: {
        paddingVertical: 15,
        borderRadius: 8,
        borderColor: 'black',
        borderWidth: 2,
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: color,
        width: '80%',
        margin: 15,
    },
    buttonText: {
        fontWeight: 'bold',
        color: textColor,
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
