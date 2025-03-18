import React, { useState } from "react";
import { Text, Image, StyleSheet, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeContent";
import Button from "@/components/button";
import BottomNav from "../components/bottomNav";
import Heading from "@/components/headings";
import { router } from "expo-router";
import Top from '@/components/top';


export default function HomeScreen() {

  const [activeTab, setActiveTab] = useState("Home");
  
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    findFuelBtn: {
      marginTop: 30,
      alignContent: 'center',
      alignItems: 'center'
    } 
  });

  const handleFindFuel = () => {
      console.log("Navigate to find fuel"),
      router.replace('./findfuel')
  }
  return (
    <SafeAreaView style={styles.container}>
      <Top></Top>
      <View style={styles.findFuelBtn}>
        <Button level={1} onPress={handleFindFuel} color="#0e87c4"> Find Fuel</Button>
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab}/>
      </View>
    </SafeAreaView>
  );
}
