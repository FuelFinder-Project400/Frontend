import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, Text } from "react-native";
import { useTheme } from "../theme/ThemeContent";
import BottomNav from "../components/bottomNav";
import Top from "@/components/top";
import PinButton from "@/components/pinButton";
import { router } from "expo-router";
import FuelMapView from "@/components/fuelMapView";

export default function FindFuel() {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    mapButtonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      marginTop: -50
    },
  });

  const handleMapPress = () => {
     console.log("Navigate to fuel finder view");
     router.push('./findfuel');
  }
  const [activeTab, setActiveTab] = useState("FindFuel");

  const mockStations = [
    {
      "id": 1,
      "station_name": "Applegreen Sligo",
      "address": "F91 K122, Ireland",
      "location": { "latitude": 54.2697, "longitude": -8.4694 },
      "petrol": "1.45",
      "diesel": "1.35",
      "stars": 4,
      "distance": "2.5",
      "lastUpdated" : "2025-01-14T15:30:00Z",
      "verifications" : 5,
    },
    {
      "id": 2,
      "station_name": "LMS Xpress",
      "address": "F91 N5RE,Sligo, Ireland",
      "location": { "latitude": 54.2738, "longitude": -8.4835 },
      "petrol": "1.47",
      "diesel": "1.37",
      "stars": 3,
      "distance": "3.0",
      "lastUpdated" : "2025-01-14T15:30:00Z",
      "verifications" : 4,
    },
    {
      "id": 3,
      "station_name": "Sligo Fuels",
      "address": "F91 X5XP, Ireland",
      "location": { "latitude": 54.2742, "longitude": -8.4821 },
      "petrol": "1.46",
      "diesel": "1.36",
      "stars": 5,
      "distance": "2.8",
      "lastUpdated" : "2025-01-14T15:30:00Z",
      "verifications" : 4,
    },
    {
      "id": 4,
      "station_name": "Applegreen Carraroe",
      "address": "F91 K7DH, Ireland",
      "location": { "latitude": 54.2558, "longitude": -8.4622 },
      "petrol": "1.44",
      "diesel": "1.34",
      "stars": 4,
      "distance": "1.5",
      "lastUpdated" : "2025-01-14T15:30:00Z",
      "verifications" : 5,
    },
    {
      "id": 5,
      "station_name": "Top Oil Mullens Sligo",
      "address": "F91 A39R, Ireland",
      "location": { "latitude": 54.3010, "longitude": -8.4710 },
      "petrol": "1.48",
      "diesel": "1.38",
      "stars": 3,
      "distance": "4.0",
      "lastUpdated" : "2025-01-14T15:30:00Z",
      "verifications" : 4,
    },
    {
      "id": 6,
      "station_name": "Certa Sligo",
      "address": "F91 YA29, Ireland",
      "location": { "latitude": 54.2735, "longitude": -8.4829 },
      "petrol": "1.46",
      "diesel": "1.36",
      "stars": 4,
      "distance": "2.7",
      "lastUpdated" : "2025-01-14T15:30:00Z",
      "verifications" : 4,
    },
    {
      "id": 7,
      "station_name": "Mullins Foodstores 24 Hour Sligo",
      "address": "F91 W9KP, Ireland",
      "location": { "latitude": 54.2665, "longitude": -8.4712 },
      "petrol": "1.45",
      "diesel": "1.35",
      "stars": 5,
      "distance": "2.3",
      "lastUpdated" : "2025-01-14T15:30:00Z",
      "verifications" : 5,
    },
    {
      "id": 8,
      "station_name": "Circle K Cartron Hill",
      "address": "F91 HH2Y, Sligo, Ireland",
      "location": { "latitude": 54.2900, "longitude": -8.4700 },
      "petrol": "1.47",
      "diesel": "1.37",
      "stars": 4,
      "distance": "3.5",
      "lastUpdated" : "2025-01-14T15:30:00Z",
      "verifications" : 4,
    },
    {
      "id": 9,
      "station_name": "Top Oil Canning's Spar",
      "address": "F91 K0DH, Ireland",
      "location": { "latitude": 54.2660, "longitude": -8.4705 },
      "petrol": "1.45",
      "diesel": "1.35",
      "stars": 3,
      "distance": "2.4",
      "lastUpdated" : "2025-01-14T15:30:00Z",
      "verifications" : 4,
    },
    {
      "id": 10,
      "station_name": "Top Oil Sligo Fuel Card Centre",
      "address": "F91 HP20, Sligo, Ireland",
      "location": { "latitude": 54.2550, "longitude": -8.4600 },
      "petrol": "1.44",
      "diesel": "1.34",
      "stars": 4,
      "distance": "1.6",
      "lastUpdated" : "2025-01-14T15:30:00Z",
      "verifications" : 5,
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Top />
      <View style={{flex: 1,}}>
        <FuelMapView stations={mockStations}></FuelMapView>
      </View>
      <View style={styles.mapButtonContainer}>
        <PinButton name="list" onPress={handleMapPress}></PinButton>
      </View>
      <View style={{ justifyContent: "flex-end" }}>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>
    </SafeAreaView>
  );
}
