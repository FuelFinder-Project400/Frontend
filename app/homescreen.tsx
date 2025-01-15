import React, { useState } from "react";
import { Text, Image, StyleSheet, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Polygon } from "react-native-svg";
import { useTheme } from "../theme/ThemeContent";
import Button from "@/components/button";
import BottomNav from "../components/bottomNav";
import NotificationCard from '../components/notification';
import Heading from "@/components/headings";
import { router } from "expo-router";

export default function HomeScreen() {
  
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'default', title: 'Fuel Price Change', description: 'Price has decreased at Fuel Station\n\nPetrol is now €160.40 was €161.70' },
    { id: 2, type: 'default', title: 'Fuel Price Change', description: 'Price has decreased at Fuel Station\n\nPetrol is now €160.20 was €161.30' },
    { id: 3, type: 'default', title: 'Fuel Price Change', description: 'Price has decreased at Fuel Station\n\nPetrol is now €160.10 was €161.20' },
  ]);

  const handleRemoveNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };


  const [activeTab, setActiveTab] = useState("Home");
  
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
      marginTop: -150,
    },
    profileContainer: {
      position: "relative",
    },
    profilePic: {
      width: 80,
      height: 80,
      borderColor: "#000",
      borderWidth: 4,
      borderRadius: 10,
    },
    starContainer: {
      position: "absolute",
      top: -10,
      left: -10,
      width: 30,
      height: 30,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1,
    },
    starText: {
      position: "absolute",
      top: "25%",
      left: "38%",
      fontSize: 10,
      fontWeight: "bold",
      color: "black",
      zIndex: 2,
    },
    notifications: {
      backgroundColor: "#D3D3D3",
      padding: 10,
      borderRadius: 10,
      marginHorizontal: 20,
      marginTop: -140,
      height: "35%",
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
    notificationsHeading: {
      margin: 5,
      color: '000000'
    },
    findFuelBtn: {
      marginTop: 30,
      alignContent: 'center',
      alignItems: 'center'
    } 
  });

  const starValue = 0;
  const handleFindFuel = () => {
      console.log("Navigate to find fuel"),
      router.replace('./findfuel')
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
        <Heading level={6} style={styles.notificationsHeading}>Recent Notifications</Heading>
        <ScrollView>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                type={notification.type}
                title={notification.title}
                description={notification.description}
                onClose={() => handleRemoveNotification(notification.id)}
              />
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
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab}/>
      </View>
    </SafeAreaView>
  );
}
