import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContent";
import { useRouter } from "expo-router";

export default function BottomNav({ activeTab, setActiveTab }) {
  const theme = useTheme();
  const router = useRouter();

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
      color: "#007BFF", // Active color
    },
    inactive: {
      color: theme.primaryText, // Inactive color
    },
    label: {
      fontSize: 12,
      marginTop: 5,
    },
  });

  const handleNavigation = (tab, route) => {
      setActiveTab(tab);
      router.replace(route);
  };

  return (
    <View style={styles.container}>
      {/* Home Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigation("Home", "/homescreen")}
      >
        <MaterialIcons
          name="home"
          size={24}
          style={activeTab === "Home" ? styles.active : styles.inactive}
        />
        <Text
          style={[
            styles.label,
            activeTab === "Home" ? styles.active : styles.inactive,
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      {/* Find Fuel Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigation("FindFuel", "/findfuel")}
      >
        <FontAwesome5
          name="gas-pump"
          size={20}
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

      {/* Settings Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigation("Settings", "/settings")}
      >
        <MaterialIcons
          name="settings"
          size={24}
          style={activeTab === "Settings" ? styles.active : styles.inactive}
        />
        <Text
          style={[
            styles.label,
            activeTab === "Settings" ? styles.active : styles.inactive,
          ]}
        >
          Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
}
