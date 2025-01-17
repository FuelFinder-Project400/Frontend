import React, { useState } from "react";
import { Text, Image, StyleSheet, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Polygon } from "react-native-svg";
import { useTheme } from "../theme/ThemeContent";
import Button from "@/components/button";
import BottomNav from "../components/bottomNav";
import NotificationCard from '../components/notification';
import Heading from "@/components/headings";
import Top from "@/components/top";
export default function Settings() {
  
  const [activeTab, setActiveTab] = useState("Settings");
  
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    
  });

  return (
    <SafeAreaView style={styles.container}>
        <Top></Top>
        <Heading level={1}>Settings Screen</Heading>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab}/>
        </View>
    </SafeAreaView>
  );
}
