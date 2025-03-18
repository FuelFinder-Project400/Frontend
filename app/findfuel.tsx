import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { useTheme } from "../theme/ThemeContent";
import BottomNav from "../components/bottomNav";
import Top from "@/components/top";
import FilterButton from "@/components/filterButton";
import FuelFinderCard from "@/components/FuelFinderCard";
import MapPinButton from "@/components/mapPinButton";
import { router } from "expo-router";

export default function FindFuel() {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    filterContainer: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginVertical: 16,
      margin: 5,
    },
    scrollContainer: {
      flex: 1,
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    scrollContent: {
      paddingBottom: 40,
    },
    mapButtonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      marginTop: -50
    },
  });

  const userPreference = "Closest";
  const userFuelPreference = "petrol";

  const [activeButton, setActiveButton] = useState(userPreference);

  const filters = ["Closest", "Cheapest", "Verified"];

  const handlePress = (filter: any) => {
    setActiveButton(filter);
  };
  const handleMapPress = () => {
     console.log("Navigate to map view");
     router.push('./mapview');
  }
  const [activeTab, setActiveTab] = useState("FindFuel");

  const mockStations = [
    {
      "id": 1,
      "station_name": "Applegreen Sligo",
      "address": "Mail Coach Rd, Knocknaganny, Sligo, F91 K122, Ireland",
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
      "address": "Finisklin Rd, Finisklin, Sligo, F91 N5RE, Ireland",
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
      "address": "Deepwater Quay, Finisklin, Sligo, F91 X5XP, Ireland",
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
      "address": "R287, Carrowroe, Carraroe, Co. Sligo, F91 K7DH, Ireland",
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
      "address": "Old Bundoran Rd, Shannon Eighter, Co. Sligo, F91 A39R, Ireland",
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
      "address": "Finisklin Rd, Rathedmond, Sligo, F91 YA29, Ireland",
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
      "address": "Pearse Rd, Knocknaganny, Sligo, F91 W9KP, Ireland",
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
      "address": "Old Bundoran Rd, Cartron, Sligo, Ireland",
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
      "address": "Pearse Rd, Cornageeha, Sligo, F91 K0DH, Ireland",
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
      "address": "R287, Carrowroe, Aughamore Far, Co. Sligo, F91 EK10, Ireland",
      "location": { "latitude": 54.2550, "longitude": -8.4600 },
      "petrol": "1.44",
      "diesel": "1.34",
      "stars": 4,
      "distance": "1.6",
      "lastUpdated" : "2025-01-14T15:30:00Z",
      "verifications" : 5,
    }
  ];
  
  const handleStationPress = (station: any) => {
    router.push({
      pathname: '/station',
      params: {
        name: station.station_name,
        address: station.address,
        petrol: station.petrol,
        diesel: station.diesel,
        distance: station.distance,
        stars: station.stars,
        lastUpdated: station.lastUpdated,
        verifications: station.verifications,
      },
    });

};
  // Function to sort stations based on the active filter
  const sortedStations = mockStations.sort((a, b) => {
    if (activeButton === "Closest") {
      return parseFloat(a.distance) - parseFloat(b.distance);
    } else if (activeButton === "Cheapest") {
      const aPrice = userFuelPreference === "petrol" ? parseFloat(a.petrol) : parseFloat(a.diesel);
      const bPrice = userFuelPreference === "petrol" ? parseFloat(b.petrol) : parseFloat(b.diesel);
      return aPrice - bPrice;
    } else if (activeButton === "Verified") {
      const aPrice = userFuelPreference === "petrol" ? parseFloat(a.petrol) : parseFloat(a.diesel);
      const bPrice = userFuelPreference === "petrol" ? parseFloat(b.petrol) : parseFloat(b.diesel);
  
      // First, sort verified stations (5 or more verifications) by price
      const aIsVerified = a.verifications >= 5;
      const bIsVerified = b.verifications >= 5;
  
      if (aIsVerified && !bIsVerified) {
        return -1; // a is verified, b is not (a comes first)
      } else if (!aIsVerified && bIsVerified) {
        return 1; // b is verified, a is not (b comes first)
      } else {
        // If both are verified or both are unverified, sort by the cheapest price
        return aPrice - bPrice;  // Sort by cheapest price for both verified and unverified stations
      }
    }
    return 0;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Top />
      <View style={styles.filterContainer}>
        {filters.map((filter) => (
          <FilterButton
            key={filter}
            text={filter}
            isActive={activeButton === filter}
            onPress={() => handlePress(filter)}
          />
        ))}
      </View>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        {sortedStations.map((station) => (
          <TouchableOpacity key={station.id} onPress={() => handleStationPress(station)}>
              <FuelFinderCard
                key={station.id}
                name={station.station_name}
                address={station.address}
                petrol={station.petrol}
                diesel={station.diesel}
                distance={station.distance}
                stars={station.stars}
                lastUpdated={station.lastUpdated}
                verifications={station.verifications}
              />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.mapButtonContainer}>
        <MapPinButton onPress={handleMapPress}></MapPinButton>
      </View>
      <View style={{ justifyContent: "flex-end" }}>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>
    </SafeAreaView>
  );
}
