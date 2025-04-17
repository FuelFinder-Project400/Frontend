import React,{useState, useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet,Image } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContent";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function BottomNav({ activeTab, setActiveTab }) {
  const theme = useTheme();
  const router = useRouter();
  const [profilePic, setProfilePic] = useState('../assets/images/defaultProfilePic.jpg');
  useEffect(() => {
      const getProfilePic = async () => {
        const profilePic = await AsyncStorage.getItem('profilePic');
        setProfilePic(profilePic);
      }
      getProfilePic();
    }, []);
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      height: 70,
      backgroundColor: theme.background,
      borderTopWidth: 1,
      borderTopColor: "#ddd",
    },
    button: {
      justifyContent: "center",
      alignItems: "center",
    },
    active: {
      color: "#ffac36", // Active color
    },
    inactive: {
      color: theme.primaryText, // Inactive color
    },
    label: {
      fontSize: 12,
      marginTop: 5,
    },
    profilePic: {
      width: 48,
      height: 48,
      borderRadius: 30,
    },
  });

  const handleNavigation = (tab, route) => {
      setActiveTab(tab);
      router.replace(route);
  };

  return (
    <View style={styles.container}>

      {/* Find Fuel Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigation("FindFuel", "/findfuel")}
      >
        <FontAwesome5
          name="gas-pump"
          size={25}
          style={activeTab === "FindFuel" ? styles.active : styles.inactive}
        />
        <Text
          style={[
            styles.label,
            activeTab === "FindFuel" ? styles.active : styles.inactive,
          ]}
        >
          Find Fuel
        </Text>
      </TouchableOpacity>

      {/* Find Fuel Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigation("Trends", "/trends")}
      >
        <FontAwesome5
          name="poll"
          size={25}
          style={activeTab === "Trends" ? styles.active : styles.inactive}
        />
        <Text
          style={[
            styles.label,
            activeTab === "Trends" ? styles.active : styles.inactive,
          ]}
        >
          Analytics
        </Text>
      </TouchableOpacity>

      {/* Settings Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigation("Settings", "/settings")}
      >
        <Image
          source={
            profilePic && profilePic.startsWith('https') 
              ? { uri: profilePic }
              : require('../assets/images/defaultProfilePic.jpg')
          }
          style={styles.profilePic}
        />
      </TouchableOpacity>
    </View>
  );
}
