import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Modal, TouchableWithoutFeedback,Image, Keyboard, ScrollView, Alert, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeContent";
import BottomNav from "../components/bottomNav";
import Heading from "@/components/headings";
import Top from "@/components/top";
import Slider from '@react-native-community/slider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Cognito from '../aws/cognito';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import {UpdateUserFromStorage, UploadProfilePic} from '@/aws/api';
import * as ImagePicker from 'expo-image-picker';

export default function Settings() {
  
  const [activeTab, setActiveTab] = useState("Settings");
  
  const theme = useTheme();
  const [searchRadius, setSearchRadius] = useState<number>(0);
  const [selectedFuel, setSelectedFuel] = useState('');
  const [xp, setXP] = useState<number>(0);
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState('../assets/images/defaultProfilePic.jpg');
  useEffect(() => {
    const getSearchRadius = async () => {
      const searchRadius = await AsyncStorage.getItem('searchRadius');
      setSearchRadius(searchRadius ? +searchRadius : 0);
    }
    const getFuelType = async () => {
      const fuelType: any = await AsyncStorage.getItem('fuelType');
      setSelectedFuel(fuelType);
    }
    const getXP = async () => {
      const xp: any = await AsyncStorage.getItem('xp');
      setXP(xp ? +xp : 0);
    }
    const getEmail = async () => {
      const email: any = await AsyncStorage.getItem('email');
      setEmail(email);
    }
    const getProfilePic = async () => {
      const profilePic:any = await AsyncStorage.getItem('profilePic');
      if(profilePic != ''){
        setProfilePic(profilePic);
      }
    }
    getSearchRadius();
    getFuelType();
    getXP();
    getEmail();
    getProfilePic();
  }, []);
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
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 100,
    },
    profilePic: {
      width: 60,
      height: 60,
      borderRadius: 40,
    },
  });
  const handleSignOut = () => {
    AsyncStorage.clear();
    Cognito.signOut();
    router.replace('./login');
  };
  const handleFuelTypeChange = (fuelType:string) => {
    setSelectedFuel(fuelType);
    AsyncStorage.setItem('fuelType', fuelType);
    const update:any = UpdateUserFromStorage();
    if(update){
      Alert.alert('Fuel Preference Has Been Updated To ', fuelType);
    }
  }
  const handleSearchRadiusChange = (searchRadius:number) =>{
    AsyncStorage.setItem('searchRadius', `${searchRadius}`);
    const update:any = UpdateUserFromStorage();
    if(update){
      Alert.alert('Search Radius Has Been Updated To ', `${searchRadius}km`);
    }
  }
  const handleImagePick = async () => {
    // Request permission first
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'We need access to your photos to upload a profile picture.');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      base64: true,
      quality: 1,
    });
  
    if (!result.canceled && result.assets && result.assets[0].base64) {
      const base64 = result.assets[0].base64;
      const upload:any = await UploadProfilePic(base64);
      if(upload){
        AsyncStorage.setItem('profilePic', upload.imageUrl);
        router.replace('./settings');
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
        <Top></Top>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.main}>
          <View style={styles.settingOptionContainer}>
            <Heading level={5} style={styles.settingOptionHeading}>Account Details</Heading>
            <View style={{flexDirection: 'row', margin: 5}}>
              <View style={{flexDirection:'row'}}>
                <View style={{flexDirection: 'column',alignItems:'flex-end'}}>
                  <Text style={{fontWeight: 'bold', margin: 5}}>Email:</Text>
                  <Text style={{fontWeight: 'bold', margin: 5}}>XP:</Text>
                </View>
                <View style={{flexDirection: 'column'}}>
                  <Text style={{margin: 5}}>{email}</Text>
                  <Text style={{margin: 5}}>{xp}</Text>
                </View>
              </View>
            </View>
            <View style={{flexDirection:'row', marginTop: 20}}>
            <TouchableOpacity style={{padding: 10, backgroundColor:'#007bff', width: '40%', borderRadius: 30,marginLeft: 5,elevation: 4,shadowColor: '#000',shadowOffset: { width: 0, height: 4 },shadowOpacity: 0.3,shadowRadius: 4,}} onPress={handleImagePick}>
                  <Text style={{color:'#FFF', fontWeight:'bold', fontSize: 14}}>Change Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems:'center',flexDirection:'row',padding: 10, backgroundColor:'#e61c36', width: '40%', borderRadius: 30,marginLeft: 5,elevation: 4,shadowColor: '#000',shadowOffset: { width: 0, height: 4 },shadowOpacity: 0.3,shadowRadius: 4,}} onPress={handleSignOut}>
              <Text style={{color:'#FFF', fontWeight:'bold', fontSize: 14, marginRight: 5}}>Sign Out</Text>
              <MaterialCommunityIcons name="arrow-right-circle" size={20} color="#FFF" />
            </TouchableOpacity>
            </View>
          </View>
          <View style={styles.settingOptionContainer}>
            <Heading level={5} style={styles.settingOptionHeading}>Fuel Preference</Heading>
            <View style={styles.segmentedControlContainer}>
              <TouchableOpacity
                style={[
                  styles.segment,
                  selectedFuel === "Petrol" ? styles.activeSegment : styles.inactiveSegment,
                ]}
                onPress={() => handleFuelTypeChange("Petrol")}
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
                onPress={() => handleFuelTypeChange("Diesel")}
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
                onSlidingComplete={(value) => handleSearchRadiusChange(value)}
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
      </ScrollView>
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
