import React from "react";
import { Text, Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Polygon } from "react-native-svg";
import { useTheme } from "../theme/ThemeContent";

export default function Index() {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1, // Ensures the container fills the screen
      backgroundColor: theme.background,
    },
    logo: {
      width: 100,
      marginLeft: 10,
    },
    top: {
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      marginTop: -100, // Adjust based on your layout
    },
    profileContainer: {
      position: "relative", // Needed for absolute positioning of the star
    },
    profilePic: {
      width: 80,
      height: 80,
      borderColor: "#000",
      borderWidth: 4,
      borderRadius: 10, // Square shape
    },
    starContainer: {
      position: "absolute",
      top: -10,
      left: -10,
      width: 30,
      height: 30,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1, // Ensure the star is above the profile picture
    },
    starText: {
      position: "absolute",
      top: "25%",
      left: "38%",
      fontSize: 10,
      fontWeight: "bold",
      color: "black",
      zIndex: 2, // Ensure the text is above the star
    },
  });

  const starValue = 5; // Dynamic number for the star

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Image
          source={require("../assets/images/FuelFinerIconTransparent.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.profileContainer}>
          <View style={styles.starContainer}>
            <Svg height="30" width="30" viewBox="0 0 100 100">
              <Polygon
                points="50,0 79,90 2,35 98,35 21,90"
                fill="yellow"
                strokeWidth="0"
              />
            </Svg>
            <Text style={styles.starText}>{starValue}</Text>
          </View>
          <Image
            source={require("../assets/images/defaultProfilePic.jpg")}
            style={styles.profilePic}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
