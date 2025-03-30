import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const MapPinButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name="location-pin" size={30} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#2692eb", // Modern blue color
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});

export default MapPinButton;
