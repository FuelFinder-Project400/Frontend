import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContent';

const Heading = ({ level = 1, style = {}, children }) => {
  const theme = useTheme(); // Directly access the theme

  // Dynamically create heading styles
  const styles = StyleSheet.create({
    heading1: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.primaryText,
      textAlign: 'center'
    },
    heading2: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.primaryText,
    },
    heading3: {
      fontSize: 24,
      fontWeight: '600',
      color: theme.primaryText,
    },
    heading4: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.primaryText,
    },
    heading5: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.primaryText,
    },
    heading6: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.primaryText,
    },
  });

  // Choose style based on level, fallback to heading1 if level is invalid
  const headingStyle = styles[`heading${level}`] || styles.heading1;

  return (
    <Text style={[headingStyle, style]}>
      {children}
    </Text>
  );
};

export default Heading;
