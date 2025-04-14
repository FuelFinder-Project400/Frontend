import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking, Platform, Modal,TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Heading from './headings';
import { router } from 'expo-router';
import { postPrice, postReport } from '@/aws/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateFavouriteStationsToDB} from '@/aws/api';
import { sendThankYouNotification, sendReportSentNotification } from '@/notifications/notification-templates';
const StationCard = ({ id, name, address, petrol, diesel, distance, stars, lastUpdated, verifications, user_id }) => {

    const [isModalVisible, setModalVisible] = useState(false);
    const [isAddPriceModalVisible, setAddPriceModalVisible] = useState(false);
    const [petrolPrice, setPetrolPrice] = useState(petrol);
    const [dieselPrice, setDieselPrice] = useState(diesel);
    const [pError, setPError] = useState("");
    const [dError, setDError] = useState("");
    const [favouriteStations, setFavouriteStations] = useState([]);
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
    const getFavouriteStations = async () => {
        try {
        const storedFavourites = await AsyncStorage.getItem('favourite_stations');
        const parsedFavourites = storedFavourites ? JSON.parse(storedFavourites) : [];
        setFavouriteStations(parsedFavourites);
        setIsFavorited(parsedFavourites.some(station => station.station_id === id));
        } catch (error) {
        console.error('Error loading favourites:', error);
        }
    };

    getFavouriteStations();
    }, [id]);

    const toggleFavorite = async () => {
    try {
        let updatedFavourites = [...favouriteStations];

        const fav_station = { station_id: id, station_name: name };

        const isFavorited = updatedFavourites.some(
        (station) => station.station_id === id
        );

        if (isFavorited) {
        updatedFavourites = updatedFavourites.filter(
            (station) => station.station_id !== id
        );
        } else {
        updatedFavourites.push(fav_station);
        }

        await AsyncStorage.setItem('favourite_stations', JSON.stringify(updatedFavourites));

        setFavouriteStations(updatedFavourites);
        setIsFavorited(!isFavorited);

        updateFavouriteStationsToDB();
        
        console.log("Done");
    } catch (error) {
        console.error('Error updating favourites:', error);
    }
    };

    function getLastUpdated(lastUpdated) {
        const now = new Date();
        const updatedDate = new Date(lastUpdated);
        const diffInSeconds = Math.floor((now - updatedDate) / 1000);
        
        if (isNaN(diffInSeconds)) return "N/A";
        if (diffInSeconds < 60) return "just now";
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hrs ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
        if (diffInSeconds < 2419200) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
        if (diffInSeconds < 29030400) return `${Math.floor(diffInSeconds / 2419200)} months ago`;
        return `${Math.floor(diffInSeconds / 29030400)} years ago`;
    }

    const isVerified = verifications >= 5;

    const openMaps = () => {
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${name},${address}`;
        const appleMapsUrl = `maps://?daddr=${name}`;
        const url = Platform.OS === "ios" ? appleMapsUrl : googleMapsUrl;
    
        Linking.canOpenURL(url)
          .then((supported) => {
            if (supported) {
              Linking.openURL(url);
            } else {
              Alert.alert("Error", "Could not open maps.");
            }
          })
          .catch((err) => console.error("An error occurred", err));
    };
    
    const handleReport = async (reason) => {
        const addReport = await postReport(petrolPrice, dieselPrice, id, user_id, reason);
        if(addReport){
            //handle XP here ....
            await sendReportSentNotification();
            setModalVisible(false);
        }
    };
    const handlePriceChange = async () => {
        const addPrice = await postPrice(petrolPrice, dieselPrice, id, name);
        if(addPrice){
            //handle XP here ....
            await sendThankYouNotification();
            setAddPriceModalVisible(false);
        }

    }
    const handlePetrolChange = (text) => {
        if (text === "") {
          setPError("Petrol price cannot be empty");
        } else {
          setPError("");
        }
        setPetrolPrice(text);
      };
      
      const handleDieselChange = (text) => {
        if (text === "") {
          setDError("Diesel price cannot be empty");
        } else {
          setDError("");
        }
        setDieselPrice(text);
      };

    return (
        <View style={[styles.container, isFavorited && styles.favoritedContainer]}>
            <TouchableOpacity onPress={() => router.back()}>
                <MaterialCommunityIcons name="arrow-left-circle" size={40} color={"#000"} style={{marginVertical: 10, marginTop: -5, marginLeft: -8}} />
            </TouchableOpacity>
            <View style={styles.container2}>
                <View>
                    <View style={styles.stationDetails}>
                        <View style={styles.stationDetailsText}>
                            <Heading level={4} style={{ color: '#000' }}>
                                {name}
                            </Heading>
                        </View>
                    </View>

                    <View style={styles.starsContainer}>
                        {Array.from({ length: stars }).map((_, index) => (
                            <MaterialCommunityIcons key={index} name="star" size={20} color="#FFD700" style={styles.starIcon} />
                        ))}
                    </View>

                    <View style={{flexDirection: 'row', marginVertical: 10,}}>
                        <View style={styles.priceContainer}>
                            <Heading level={2} style={styles.priceHeading}>Petrol</Heading>
                            <Heading level={3} style={styles.priceText}>€{petrol || " N/A"}</Heading>
                        </View>
                        <View style={styles.priceContainer}>
                            <Heading level={2} style={styles.priceHeading}>Diesel</Heading>
                            <Heading level={3} style={styles.priceText}>€{diesel || " N/A"}</Heading>
                        </View>
                    </View>

                    <View style={styles.verificationContainer}>
                        <MaterialCommunityIcons name="check-circle" size={20} color={isVerified ? "#6dcf69" : "#888"} />
                        <Text style={styles.verificationText}>{verifications} verifications</Text>
                    </View>
                    
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: '#878383', fontWeight: 'bold' }}>Last Updated: {getLastUpdated(lastUpdated)}</Text>
                    </View>
                </View>

                <View style={styles.distanceContainer}>
                    <Heading level={3} style={styles.distanceText}>{distance}km</Heading>
                </View>
            </View>

            <View>
                <View style={styles.options}>
                    <TouchableOpacity style={styles.iconButton}  onPress={() => setAddPriceModalVisible(true)}>
                        <MaterialCommunityIcons name="plus-circle-outline" size={40} color="#36CB3B" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconButton} onPress={() => openMaps()}>
                        <MaterialCommunityIcons name="compass-outline" size={40} color="#59B5DC" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisible(true)}>
                        <MaterialCommunityIcons name="flag-outline" size={40} color="red" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconButton} onPress={toggleFavorite}>
                        <MaterialCommunityIcons 
                            name={isFavorited ? "star" : "star-outline"} 
                            size={40} 
                            color="yellow" 
                        />
                    </TouchableOpacity>
                </View>
                {petrol !== "" && diesel !== "" && (
                    <View style={styles.likeButtonContainer}>
                        <TouchableOpacity style={styles.likeButton}>
                        <MaterialCommunityIcons name="thumb-up-outline" size={40} color="#6dcf69" />
                        <Text style={{ marginLeft: 10 }}>Is the price correct?</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <Modal visible={isModalVisible} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Report an Issue</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={() => handleReport("Price to high")}>
                            <Text style={styles.modalButtonText}>Price (To High)</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={() => handleReport("Price to low")}>
                            <Text style={styles.modalButtonText}>Price (To Low)</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalCancelText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal visible={isAddPriceModalVisible} transparent animationType="fade">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <View>
                                <Heading level={3} style={{color: '#000', marginLeft: 10,}}>Add Price</Heading>
                                
                                <View style={{flexDirection: 'row', alignItems:'center', margin: 10,}}>
                                    <Text style={styles.label}>Enter Petrol Price (€):</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="e.g. 160.20"
                                        keyboardType="numeric"
                                        inputMode='decimal'
                                        maxLength={5}
                                        contextMenuHidden={true}
                                        onChangeText={handlePetrolChange}
                                    />
                                </View>
                                {pError ? <Text style={styles.errorText}>{pError}</Text> : null}
                                <View style={{flexDirection: 'row', alignItems:'center', margin: 10,}}>
                                    <Text style={styles.label}>Enter Diesel Price (€):</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="e.g. 160.20"
                                        keyboardType="numeric"
                                        inputMode='decimal'
                                        maxLength={5}
                                        contextMenuHidden={true}
                                        onChangeText={handleDieselChange}
                                        
                                    />
                                </View>
                                {dError ? <Text style={styles.errorText}>{dError}</Text> : null}
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity style={styles.modalAddPrice} onPress={handlePriceChange}>
                                    <Text style={styles.modalCancelText}>Add Price</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalCancel} onPress={() => setAddPriceModalVisible(false)}>
                                    <Text style={styles.modalCancelText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 10,
        borderWidth: 2,
        borderColor: 'transparent', // Default border color
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    favoritedContainer: {
        borderColor: 'yellow', // Border color when favorited
    },
    container2: {
        flexDirection: 'row',
    },
    stationDetails: {
        flexDirection: 'row',
    },
    starsContainer: {
        flexDirection: 'row',
        marginTop: 5,
    },
    stationDetailsText: {
        maxWidth: 200,
    },

    priceHeading: {
        color: '#000',
        marginRight: 15,
    },
    priceText: {
        color: '#000',
        marginRight: 15,
    },
    verificationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    verificationText: {
        color: '#888',
        fontSize: 14,
        marginLeft: 5,
    },
    distanceContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    distanceText: {
        color: '#000',
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: 20, 
    },
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 40,
        backgroundColor: '#D9D9D9',
        margin: 10, 
    },
    likeButtonContainer: {
        marginTop: 45,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    likeButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 40,
        backgroundColor: '#D9D9E990',
        margin: 10, 
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
        backgroundColor: "#e04a4a",
        borderRadius: 30,
        alignItems: "center",
    },
    modalAddPrice: { 
        margin: 10,
        paddingHorizontal: 40,
        paddingVertical: 20,
        backgroundColor: "#36CB3B",
        borderRadius: 30,
        alignItems: "center",
    },
    modalCancelText: { 
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        marginRight: 5,
      },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: "#fff",
        minWidth: 80,
        maxWidth: 80,
    },
    errorText: {
        color: "red",
        marginHorizontal: 10,
      },
});

export default StationCard;
