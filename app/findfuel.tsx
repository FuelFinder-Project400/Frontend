import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity,RefreshControl } from "react-native";
import { useTheme } from "../theme/ThemeContent";
import BottomNav from "../components/bottomNav";
import Top from "@/components/top";
import FilterButton from "@/components/filterButton";
import FuelFinderCard from "@/components/FuelFinderCard";
import PinButton from "@/components/pinButton";
import { router } from "expo-router";
import { useFuelStations } from "@/googleAPI/placesAPI"; 
export default function FindFuel() {
  const theme = useTheme();
  const { stations: searchedStations, errorMsg, refreshStations  } = useFuelStations();
  //console.log(errorMsg);
  
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
     //console.log("Navigate to map view");
     router.push('./mapview');
  }
  const [activeTab, setActiveTab] = useState("FindFuel");
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleStationPress = (station: any) => {
    router.push({
      pathname: '/station',
      params: {
        id: station.id,
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
const stationsWithPrices = searchedStations.filter(station => station.petrol !== "");
const stationsWithoutPrices = searchedStations.filter(station => station.petrol == "");
 // Function to sort stations based on the active filter
 const sortedStationsWithPrices = (Array.isArray(stationsWithPrices) ? stationsWithPrices : []).sort((a, b) => {
  if (activeButton === "Closest") {
    return parseFloat(a.distance) - parseFloat(b.distance);
  } else if (activeButton === "Cheapest") {
    const aPrice = userFuelPreference === "petrol" ? parseFloat(a.petrol) : parseFloat(a.diesel);
    const bPrice = userFuelPreference === "petrol" ? parseFloat(b.petrol) : parseFloat(b.diesel);
    return aPrice - bPrice;
  } else if (activeButton === "Verified") {
    const aPrice = userFuelPreference === "petrol" ? parseFloat(a.petrol) : parseFloat(a.diesel);
    const bPrice = userFuelPreference === "petrol" ? parseFloat(b.petrol) : parseFloat(b.diesel);

    const aIsVerified = a.verifications >= 5;
    const bIsVerified = b.verifications >= 5;

    if (aIsVerified && !bIsVerified) {
      return -1; // a is verified, b is not (a comes first)
    } else if (!aIsVerified && bIsVerified) {
      return 1; // b is verified, a is not (b comes first)
    } else {
      return aPrice - bPrice;  // Sort by cheapest price
    }
  }
  return 0;
});
// Function to sort stations based on the active filter
const sortedStationsWithoutPrices = (Array.isArray(stationsWithoutPrices) ? stationsWithoutPrices : []).sort((a, b) => {
  if (activeButton === "Closest") {
    return parseFloat(a.distance) - parseFloat(b.distance);
  } else if (activeButton === "Cheapest") {
    const aPrice = userFuelPreference === "petrol" ? parseFloat(a.petrol) : parseFloat(a.diesel);
    const bPrice = userFuelPreference === "petrol" ? parseFloat(b.petrol) : parseFloat(b.diesel);
    return aPrice - bPrice;
  } else if (activeButton === "Verified") {
    const aPrice = userFuelPreference === "petrol" ? parseFloat(a.petrol) : parseFloat(a.diesel);
    const bPrice = userFuelPreference === "petrol" ? parseFloat(b.petrol) : parseFloat(b.diesel);

    const aIsVerified = a.verifications >= 5;
    const bIsVerified = b.verifications >= 5;

    if (aIsVerified && !bIsVerified) {
      return -1; // a is verified, b is not (a comes first)
    } else if (!aIsVerified && bIsVerified) {
      return 1; // b is verified, a is not (b comes first)
    } else {
      return aPrice - bPrice;  // Sort by cheapest price
    }
  }
  return 0;
});
const onRefresh = async () => {
  setIsRefreshing(true);
  refreshStations();
  setTimeout(() => {
    setIsRefreshing(false);
    console.log("Data refreshed");
    //console.log(searchedStations);
  }, 2000);
};
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
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent} refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}>
        {sortedStationsWithPrices.map((station) => (
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
        {sortedStationsWithoutPrices.map((station) => (
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
        <PinButton onPress={handleMapPress}></PinButton>
      </View>
      <View style={{ justifyContent: "flex-end" }}>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>
    </SafeAreaView>
  );
}
