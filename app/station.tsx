import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContent";
import { SafeAreaView } from "react-native-safe-area-context";
import Top from '@/components/top';
import BottomNav from "../components/bottomNav";
import StationCard from "@/components/stationCard";

export default function StationPage() {
    const station = useLocalSearchParams(); // Fetch query params
    const theme = useTheme();
    const [activeTab, setActiveTab] = useState("FindFuel");
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.background,
          color: theme.primaryText,
        },
      });
    return (
    <SafeAreaView style={styles.container}>
        <Top></Top>
        <View>
          <StationCard
              id={station.id}
            />
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <BottomNav activeTab={activeTab} setActiveTab={setActiveTab}/>
        </View>
    </SafeAreaView>
    );
}