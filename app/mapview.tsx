import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, Text } from "react-native";
import { useTheme } from "../theme/ThemeContent";
import BottomNav from "../components/bottomNav";
import Top from "@/components/top";
import PinButton from "@/components/pinButton";
import { router } from "expo-router";
import FuelMapView from "@/components/fuelMapView";
import { useFuelStations } from "@/googleAPI/placesAPI"; 
export default function FindFuel() {
  const theme = useTheme();
  const { stations, errorMsg } = useFuelStations();
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
     //console.log("Navigate to fuel finder view");
     //router.push('./findfuel');
     router.back();
  }
  const [activeTab, setActiveTab] = useState("FindFuel");


  return (
    <SafeAreaView style={styles.container}>
      <Top />
      <View style={{flex: 1,}}>
        <FuelMapView stations={stations}></FuelMapView>
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
