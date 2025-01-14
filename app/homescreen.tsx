import React, { useState } from "react";
import { Text, Image, StyleSheet, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Polygon } from "react-native-svg";
import { useTheme } from "../theme/ThemeContent";
import Button from "@/components/button";
import BottomNav from "../components/bottomNav";
export default function Index() {
  const [activeTab, setActiveTab] = useState("Home");
  
  const theme = useTheme();

  const notifications: any[] = []; // Replace with dynamic data as needed

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
      marginTop: -150, // Adjust based on your layout
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
    notifications: {
      backgroundColor: "#D3D3D3", // Light grey background
      padding: 10,
      borderRadius: 10,
      marginHorizontal: 20,
      marginTop: -140,
      height: "35%", // About 1/4 of the screen height
    },
    notificationText: {
      fontSize: 14,
      color: "#000",
      marginVertical: 5,
    },
    noNotifications: {
      fontSize: 16,
      color: "#555",
      textAlign: "center",
      marginTop: 20,
    },
    findFuelBtn: {
      marginTop: 30,
      alignContent: 'center',
      alignItems: 'center'
    } 
  });

  const starValue = 5; // Dynamic number for the star
  const handleFindFuel = () => {
      console.log("Navigate to find fuel")
  }
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
      <View style={styles.notifications}>
        <ScrollView>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <Text key={index} style={styles.notificationText}>
                {notification}
              </Text>
            ))
          ) : (
            <Text style={styles.noNotifications}>No Notifications</Text>
          )}
        </ScrollView>
      </View>
      <View style={styles.findFuelBtn}>
        <Button level={1} onPress={handleFindFuel} color="#0e87c4"> Find Fuel</Button>
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>
    </SafeAreaView>
  );
}
