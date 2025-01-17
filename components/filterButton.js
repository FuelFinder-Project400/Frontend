import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "@/theme/ThemeContent";

export default function FilterButton({ text, isActive, onPress }) {
  const theme = useTheme()
  const styles = StyleSheet.create({
    button: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      borderWidth: isActive ? 3 : 2,
      borderColor: isActive ? theme.primaryButton : theme.primaryText,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 15,
    },
    text: {
      color: theme.primaryText,
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}
