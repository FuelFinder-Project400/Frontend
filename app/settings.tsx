import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Modal, TouchableWithoutFeedback, TextInput, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeContent";
import BottomNav from "../components/bottomNav";
import Heading from "@/components/headings";
import Top from "@/components/top";
import Slider from '@react-native-community/slider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function Settings() {
  
  const [activeTab, setActiveTab] = useState("Settings");
  
  const theme = useTheme();
  const initialFuelPreference = "Petrol";
  const [selectedFuel, setSelectedFuel] = useState(initialFuelPreference);
  const [searchRadius, setSearchRadius] = useState(5);
  const [isFavStationsModalVisible, setFavStationsModalVisible] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      width: '100%',
      justifyContent: 'center',
    },
    main: {
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
    },
    settingOptionContainer : {
      backgroundColor: '#FFF',
      margin: 10,
      width: '90%',
      padding: 10,
      borderRadius: 10,
      elevation: 4,
      // Shadow for iOS
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    settingOptionHeading: {
      color: '#000',
      fontWeight: 'bold',
      margin: 5,
    },
    segmentedControlContainer: {
      flexDirection: "row",
      borderRadius: 8,
      overflow: "hidden",
      backgroundColor: "#ddd",
      marginVertical: 20,
      marginHorizontal: 10,
      height: 50,
    },
    segment: {
      flex: 1,
      paddingVertical: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    activeSegment: {
      backgroundColor: "#007bff",
      borderRadius: 10,
      
    },
    inactiveSegment: {
      backgroundColor: "#ddd",
    },
    activeText: {
      color: "#fff",
      fontWeight: "bold",
    },
    inactiveText: {
      color: "#333",
      fontWeight:'bold',
    },
    text: {
      color: '#000',
      textAlign: 'center',
      fontSize: 18,
      margin: 10,
      fontWeight:'bold',
    },
    modalContainer: { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContent: { 
        backgroundColor: 'white', 
        padding: 20, 
        borderRadius: 10, 
        width: '80%', 
        alignItems: 'center' 
    },
    modalTitle: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 10 
    },
    modalButton: { 
        padding: 10, 
        marginVertical: 5, 
        backgroundColor: '#f0f0f0', 
        width: '100%', 
        alignItems: 'center', 
        borderRadius: 5 
    },
    modalButtonText: { 
        fontSize: 16 
    },
    modalCancel: { 
        margin: 10,
        paddingHorizontal: 40,
        paddingVertical: 20,
        backgroundColor: "#000",
        borderRadius: 30,
        alignItems: "center",
    },
    modalCancelText: { 
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
        <Top></Top>
        <View style={styles.main}>
          <View style={styles.settingOptionContainer}>
            <Heading level={5} style={styles.settingOptionHeading}>Fuel Preference</Heading>
            <View style={styles.segmentedControlContainer}>
              <TouchableOpacity
                style={[
                  styles.segment,
                  selectedFuel === "Petrol" ? styles.activeSegment : styles.inactiveSegment,
                ]}
                onPress={() => setSelectedFuel("Petrol")}
              >
                <Text style={selectedFuel === "Petrol" ? styles.activeText : styles.inactiveText}>
                  Petrol
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.segment,
                  selectedFuel === "Diesel" ? styles.activeSegment : styles.inactiveSegment,
                ]}
                onPress={() => setSelectedFuel("Diesel")}
              >
                <Text style={selectedFuel === "Diesel" ? styles.activeText : styles.inactiveText}>
                  Diesel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.settingOptionContainer}>
            <Heading level={5} style={styles.settingOptionHeading}>Search Radius</Heading>
            <Slider
                style={{ width: 300, height: 40, alignSelf:'center', marginTop: 10, }}
                minimumValue={1}
                maximumValue={100}
                minimumTrackTintColor="#2b93cf"
                maximumTrackTintColor="#c7c5c5"
                step={1}
                value={searchRadius}
                onValueChange={(value) => setSearchRadius(value)}
            />
            <Text style={styles.text}>{searchRadius} km</Text>
          </View>
          <View style={styles.settingOptionContainer}>
            <TouchableOpacity style={{padding: 20, flexDirection:'row', alignContent: 'center'}} onPress={() => setFavStationsModalVisible(true)}>
              <Heading level={4} style={{color:'#000', fontWeight: 'bold', marginVertical: 7, marginRight: 20}}>Manage Favourite Stations</Heading>
              <MaterialCommunityIcons name="arrow-right-circle" size={40} color="#524e4e" />
            </TouchableOpacity>
          </View>
        </View>
        <Modal visible={isFavStationsModalVisible} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Favourite Stations</Text>
                      <View>
                          <TouchableOpacity style={styles.modalCancel} onPress={() => setFavStationsModalVisible(false)}>
                              <Text style={styles.modalCancelText}>Close</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              </View>
          </TouchableWithoutFeedback>
      </Modal>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab}/>
        </View>
    </SafeAreaView>
  );
}
