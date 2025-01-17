import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import { useTheme } from "../theme/ThemeContent";
import BottomNav from "../components/bottomNav";
import Top from "@/components/top";
import FilterButton from "@/components/filterButton";
import FuelFinderCard from "@/components/FuelFinderCard";

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
  });

  const userPreference = "Closest";
  const userFuelPreference = "petrol";

  const [activeButton, setActiveButton] = useState(userPreference);

  const filters = ["Closest", "Cheapest"];

  const handlePress = (filter: any) => {
    setActiveButton(filter);
  };

  const [activeTab, setActiveTab] = useState("FindFuel");

  const mockStations = [
    {
      id: 1,
      petrol: "160.2",
      diesel: "153.8",
      distance: "1.2",
      stars: 3,
      lastUpdated: "2025-01-14T15:30:00Z",
    },
    {
      id: 2,
      petrol: "162.5",
      diesel: "155.0",
      distance: "2.5",
      stars: 4,
      lastUpdated: "2025-01-14T14:15:00Z",
    },
    {
      id: 3,
      petrol: "159.5",
      diesel: "151.7",
      distance: "0.8",
      stars: 5,
      lastUpdated: "2025-01-14T16:00:00Z",
    },
    {
      id: 4,
      petrol: "159.4",
      diesel: "152.5",
      distance: "3.2",
      stars: 2,
      lastUpdated: "2025-01-14T10:45:00Z",
    },
    {
      id: 5,
      petrol: "161.0",
      diesel: "154.2",
      distance: "4.1",
      stars: 3,
      lastUpdated: "2025-01-14T13:00:00Z",
    },
  ];

  // Function to sort stations based on the active filter
  const sortedStations = mockStations.sort((a, b) => {
    if (activeButton === "Closest") {
      return parseFloat(a.distance) - parseFloat(b.distance);
    } else if (activeButton === "Cheapest") {
      const aPrice = userFuelPreference === "petrol" ? parseFloat(a.petrol) : parseFloat(a.diesel);
      const bPrice = userFuelPreference === "petrol" ? parseFloat(b.petrol) : parseFloat(b.diesel);
      return aPrice - bPrice;
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
          <FuelFinderCard
            key={station.id}
            petrol={station.petrol}
            diesel={station.diesel}
            distance={station.distance}
            stars={station.stars}
            lastUpdated={station.lastUpdated}
          />
        ))}
      </ScrollView>
      <View style={{ justifyContent: "flex-end" }}>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>
    </SafeAreaView>
  );
}
