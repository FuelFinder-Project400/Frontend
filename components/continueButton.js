import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  // If you use Expo for vector icons

const ContinueButton = ({ onPress, disabled }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled}>
      <View style={styles.buttonContent}>
        <Text style={styles.arrow}>
          <Ionicons name="arrow-forward" size={24} color="white" />
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    backgroundColor: 'green',
    borderRadius: 15,  // To create curved corners
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,  // Optional: Adds shadow on Android devices
    shadowColor: '#000',  // Optional: Shadow for iOS devices
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
  },
  buttonContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    color: 'white',  // Arrow color
  },
});

export default ContinueButton;
