import React, { useState } from "react";
import { Text, Image, StyleSheet, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeContent";
import Button from "@/components/button";
import BottomNav from "../components/bottomNav";
import Heading from "@/components/headings";

export default function FindFuel() {

  const [activeTab, setActiveTab] = useState("FindFuel");
  
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
  });


  return (
    <SafeAreaView style={styles.container}>
        <Heading level={1}>Fuel Finder Screen</Heading>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab}/>
        </View>
    </SafeAreaView>
  );
}
