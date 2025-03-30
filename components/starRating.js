import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Keyboard } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function StarRating({ onRatingChange }) {
  const [rating, setRating] = useState(0); // Store the selected rating

  const handlePress = (star) => {
    setRating(star); // Update rating
    onRatingChange(star); // Pass selected rating to parent component
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => handlePress(star)}>
          <MaterialCommunityIcons
            name={star <= rating ? "star" : "star-outline"} // Filled or empty star
            size={40}
            color={star <= rating ? "#FFD700" : "#808080"} // Gold for selected, grey for unselected
            style={styles.star}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  star: {
    marginHorizontal: 5,
  },
});
